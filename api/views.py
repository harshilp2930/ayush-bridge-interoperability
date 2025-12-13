"""API Views for Ayush Bridge Application

This module contains all API endpoints for the Ayush Bridge application:
1. Fuzzy Search API - Search for diseases using fuzzy matching (NAMASTE to ICD-11 mapping)
2. Subscription API - Email subscription management for updates

All endpoints are documented with Swagger/OpenAPI specifications.
"""

# Django REST Framework imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# Swagger/OpenAPI documentation imports
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Fuzzy matching library for intelligent search
from thefuzz import fuzz

# Application models
from .models import Diagnosis, Subscriber


# ============================================================================
# FUZZY SEARCH API ENDPOINT
# ============================================================================
# Public endpoint for searching disease mappings between NAMASTE and ICD-11
@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter(
            'q', 
            openapi.IN_QUERY, 
            description="Search query (e.g. Fever, Jwara, Cough)", 
            type=openapi.TYPE_STRING,
            required=True,
            example="Fever"
        )
    ],
    responses={
        200: openapi.Response(
            description='List of matching diagnoses',
            schema=openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'term': openapi.Schema(type=openapi.TYPE_STRING, description='Disease name'),
                        'namaste': openapi.Schema(type=openapi.TYPE_STRING, description='NAMASTE code'),
                        'icd': openapi.Schema(type=openapi.TYPE_STRING, description='ICD-11 code'),
                    }
                ),
                example=[
                    {
                        "term": "Fever",
                        "namaste": "NS-01",
                        "icd": "BA01.1"
                    }
                ]
            )
        )
    }
)
@api_view(['GET'])  # Only accept GET requests
@permission_classes([AllowAny])  # Public endpoint - no authentication required
def search_api(request):
    """
    Fuzzy search for disease mappings between NAMASTE and ICD-11 codes.
    
    This endpoint uses fuzzy matching to find relevant disease mappings,
    even if the search query is misspelled or incomplete.
    
    Query Parameters:
        q (str): Search query (e.g., "Fever", "Jwara", "Cough")
    
    Returns:
        list: Top 10 matching diagnoses with term, NAMASTE code, and ICD-11 code
              Sorted by relevance score (highest match first)
    
    Example:
        GET /api/search/?q=fever
        Returns: [{"term": "Fever", "namaste": "NS-01", "icd": "BA01.1"}, ...]
    """
    # Extract search query from URL parameters
    query = request.GET.get('q', '')
    
    # Return empty list if no query provided
    if not query:
        return Response([])

    # Step 1: Fetch all disease diagnoses from database
    all_diagnoses = Diagnosis.objects.all()
    
    # Step 2: Score each diagnosis for similarity to the search query
    scored_results = []  # Will store tuples of (diagnosis, score, term_length)
    
    for item in all_diagnoses:
        # Calculate fuzzy match score using multiple algorithms for better accuracy
        # Combine three methods to get more consistent results:
        #   1. token_set_ratio: Compares word sets, ignoring order (best for multi-word terms)
        #   2. token_sort_ratio: Sorts tokens before comparing (good for word reordering)
        #   3. partial_ratio: Finds longest substring match (for partial queries)
        score1 = fuzz.token_set_ratio(query.lower(), item.term.lower())
        score2 = fuzz.token_sort_ratio(query.lower(), item.term.lower())
        score3 = fuzz.partial_ratio(query.lower(), item.term.lower())
        
        # Take the average of the three scores for more balanced results
        combined_score = (score1 + score2 + score3) / 3
        
        # Step 3: Filter - only keep good matches (score > 65%)
        if combined_score > 65:
            # Store: diagnosis, combined score, and term length (for secondary sort)
            scored_results.append((item, combined_score, len(item.term)))
    
    # Step 4: Sort results with multi-criteria ranking
    # Primary: Higher combined score (better match)
    # Secondary: Shorter term length (more specific/direct match)
    # Tertiary: Alphabetical (consistent ordering)
    scored_results.sort(key=lambda x: (-x[1], x[2], x[0].term))
    
    # Step 5: Format and return top 10 results as JSON
    data = [
        {
            'term': item[0].term,           # Disease name
            'namaste': item[0].namaste_code,  # NAMASTE standard code
            'icd': item[0].icd_code          # ICD-11 standard code
        }
        for item in scored_results[:10]  # Limit to top 10 matches
    ]
    
    return Response(data)


# ============================================================================
# EMAIL SUBSCRIPTION API ENDPOINT
# ============================================================================
# Public endpoint for managing email subscriptions to platform updates
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_STRING, 
                description='User Email address',
                example='user@example.com'
            )
        },
        required=['email']
    ),
    responses={
        201: openapi.Response(
            description='Subscription successful',
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING)
                },
                example={'message': 'Subscribed successfully!'}
            )
        ),
        400: openapi.Response(
            description='Invalid email',
            schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                },
                example={'error': 'Email is required'}
            )
        )
    }
)
@api_view(['POST'])  # Only accept POST requests
@permission_classes([AllowAny])  # Public endpoint - no authentication required
def subscribe_api(request):
    """
    Subscribe an email address to receive platform updates.
    
    Handles duplicate subscriptions gracefully - will not create duplicates
    if the email is already subscribed.
    
    Request Body:
        email (str): Valid email address to subscribe
    
    Returns:
        Success: {"message": "Subscribed successfully!"} (200)
        Already exists: {"message": "You are already subscribed."} (200)
        Error: {"error": "Email is required"} (400)
    
    Example:
        POST /api/subscribe/
        Body: {"email": "user@example.com"}
    """
    # Extract email from request body
    email = request.data.get('email')
    
    # Validate that email was provided
    if not email:
        return Response({'error': 'Email is required'}, status=400)
    
    # Create subscriber or get existing one
    # get_or_create returns (object, created_boolean)
    # This prevents duplicate subscriptions
    obj, created = Subscriber.objects.get_or_create(email=email)
    
    # Return appropriate message based on whether it's a new subscription
    if created:
        return Response({'message': 'Subscribed successfully!'})
    else:
        return Response({'message': 'You are already subscribed.'})