from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Ayush Bridge API",
      default_version='v1',
      description="API documentation for Ayush Bridge",
   ),
   public=True,  # <--- CRITICAL: This allows access without login
   permission_classes=(permissions.AllowAny,), # <--- CRITICAL: This allows anyone to view it
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Documentation URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]