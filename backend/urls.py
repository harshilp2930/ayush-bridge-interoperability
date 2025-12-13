from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
   TokenRefreshView,
   TokenVerifyView,
)
from api.auth import UsernameEmailTokenObtainPairView

# 1. Schema View: Sets up the public documentation view
schema_view = get_schema_view(
   openapi.Info(
      title="Ayush Bridge API",
      default_version='v1',
      description="API documentation for Ayush Bridge - Bridging NAMASTE and ICD-11 standards",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # --- Authentication Endpoints ---
   path('api/auth/', include('dj_rest_auth.urls')),  # Login, Logout, Password Reset
   path('api/auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration
   path('api/auth/register/', include('dj_rest_auth.registration.urls')),  # Alias for registration
   path('api/auth/token/', UsernameEmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('api/auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # --------------------------------
    
    path('api/', include('api.urls')),
    
    path('accounts/login/', admin.site.login), 
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]