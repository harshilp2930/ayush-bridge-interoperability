from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from thefuzz import fuzz  # <-- This was missing!
from django.contrib.auth import get_user_model

# Import both models
from .models import Diagnosis, Subscriber 

# --- 1. Fuzzy Search API ---
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
@api_view(['GET'])
@permission_classes([AllowAny])
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
@api_view(['POST'])
@permission_classes([AllowAny])
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


# --- TEMPORARY: Create Test User Endpoint ---
class CreateTestUserView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        """Temporary endpoint to create a test user. DELETE THIS AFTER USE!"""
        User = get_user_model()

        username = 'apitestuser'
        email = 'api@test.com'
        password = 'TestPassword123!'

        User.objects.filter(username=username).delete()

        User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_active=True
        )

        return Response({
            'status': 'success',
            'message': 'Test user created!',
            'username': username,
            'password': password,
            'login_url': '/api/auth/login/'
        })