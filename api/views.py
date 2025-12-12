from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from thefuzz import fuzz  # <-- This was missing!

# Import both models
from .models import Diagnosis, Subscriber 

# --- 1. Fuzzy Search API ---
@swagger_auto_schema(
    method='get',
    manual_parameters=[
        openapi.Parameter('q', openapi.IN_QUERY, description="Search query (e.g. Fever)", type=openapi.TYPE_STRING)
    ],
    responses={200: 'JSON Response with fuzzy-matched diagnosis codes'}
)
@api_view(['GET'])
def search_api(request):
    query = request.GET.get('q', '') 
    
    if not query:
        return Response([])

    # 1. Get all diagnoses from DB
    all_diagnoses = Diagnosis.objects.all()
    
    scored_results = []
    
    # 2. Score each diagnosis against the user's query
    for item in all_diagnoses:
        # Calculate similarity score
        score = fuzz.partial_ratio(query.lower(), item.term.lower())
        
        # 3. Filter: Only keep good matches (> 65%)
        if score > 65:
            scored_results.append((item, score))
            
    # 4. Sort by highest score first
    scored_results.sort(key=lambda x: x[1], reverse=True)
    
    # 5. Serialize the top 10 results
    data = [
        {
            'term': item[0].term,
            'namaste': item[0].namaste_code,
            'icd': item[0].icd_code
        } 
        for item in scored_results[:10] 
    ]
    
    return Response(data)

# --- 2. Subscription API ---
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={'email': openapi.Schema(type=openapi.TYPE_STRING, description='User Email')},
        required=['email']
    ),
    responses={201: 'Subscribed Successfully', 400: 'Invalid Email'}
)
@api_view(['POST'])
def subscribe_api(request):
    email = request.data.get('email')
    
    if not email:
        return Response({'error': 'Email is required'}, status=400)
        
    # Create the subscriber (get_or_create prevents duplicates)
    obj, created = Subscriber.objects.get_or_create(email=email)
    
    if created:
        return Response({'message': 'Subscribed successfully!'})
    else:
        return Response({'message': 'You are already subscribed.'})