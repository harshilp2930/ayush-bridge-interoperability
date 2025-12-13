"""URL Configuration for Ayush Bridge Backend

Defines all URL routes for the application including:
- Django admin panel
- Authentication endpoints (JWT, registration)
- API endpoints (via api.urls)
- API documentation (Swagger, ReDoc)

For more information see:
https://docs.djangoproject.com/en/stable/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions

# Swagger/OpenAPI documentation imports
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# JWT authentication views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from api.auth import UsernameEmailTokenObtainPairView


# ============================================================================
# API DOCUMENTATION SCHEMA
# ============================================================================
# Configure Swagger/OpenAPI schema view (drf-yasg)

schema_view = get_schema_view(
    openapi.Info(
        title="Ayush Bridge API",
        default_version='v1',
        description="API documentation for Ayush Bridge - Bridging NAMASTE and ICD-11 standards",
    ),
    public=True,  # Schema accessible without authentication
    permission_classes=(permissions.AllowAny,),  # Anyone can view docs
)

# ============================================================================
# URL PATTERNS
# ============================================================================

urlpatterns = [
    # -------------------------------------------------------------------------
    # ADMIN PANEL
    # -------------------------------------------------------------------------
    # Django admin interface at /admin/
    path('admin/', admin.site.urls),
    
    # -------------------------------------------------------------------------
    # AUTHENTICATION ENDPOINTS
    # -------------------------------------------------------------------------
    # dj-rest-auth endpoints (login, logout, password reset)
    # POST /api/auth/login/ - Login (returns JWT tokens)
    # POST /api/auth/logout/ - Logout
    # POST /api/auth/password/reset/ - Password reset
    path('api/auth/', include('dj_rest_auth.urls')),
    
    # User registration endpoint
    # POST /api/auth/registration/ - Register new user
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    
    # Registration alias for convenience
    # POST /api/auth/register/ - Same as /registration/
    path('api/auth/register/', include('dj_rest_auth.registration.urls')),
    
    # JWT token management endpoints
    # POST /api/auth/token/ - Obtain JWT access + refresh tokens (login)
    #      Body: {"username": "user", "password": "pass"} OR {"email": "user@example.com", "password": "pass"}
    path('api/auth/token/', UsernameEmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # POST /api/auth/token/refresh/ - Refresh access token using refresh token
    #      Body: {"refresh": "<refresh_token>"}
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # POST /api/auth/token/verify/ - Verify if access token is valid
    #      Body: {"token": "<access_token>"}
    path('api/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # -------------------------------------------------------------------------
    # API ENDPOINTS
    # -------------------------------------------------------------------------
    # Include all API endpoints from api.urls
    # GET /api/search/ - Disease search
    # POST /api/subscribe/ - Email subscription
    path('api/', include('api.urls')),
    
    # -------------------------------------------------------------------------
    # API DOCUMENTATION
    # -------------------------------------------------------------------------
    # Admin login redirect
    path('accounts/login/', admin.site.login),
    
    # Swagger UI at /swagger/ (interactive API documentation)
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    
    # Alternative Swagger UI path at /api-docs/
    path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui-alt'),
    
    # OpenAPI 3.0 schema endpoint (raw JSON)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    
    # drf-spectacular Swagger UI at /api/docs/
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
    
    # ReDoc UI at /redoc/ (alternative documentation view)
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]