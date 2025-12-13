from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# 1. Schema View: Sets up the public documentation view
schema_view = get_schema_view(
   openapi.Info(
      title="Ayush Bridge API",
      default_version='v1',
      description="API documentation for Ayush Bridge",
   ),
   public=True,  # <--- CRITICAL: Allows access without login
   permission_classes=(permissions.AllowAny,), # <--- CRITICAL: Allows anyone to view it
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # 2. Login Fix: Redirects any system request for a login page to the existing admin login.
    path('accounts/login/', admin.site.login), 
    
    # 3. Documentation URL: Sets the documentation access point
    path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]