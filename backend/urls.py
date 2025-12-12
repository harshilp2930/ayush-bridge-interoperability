from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# --- Updated Schema View (Public Access) ---
schema_view = get_schema_view(
   openapi.Info(
      title="Ayush Bridge API",
      default_version='v1',
      description="API documentation for Ayush Bridge Interoperability Engine",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,  # <--- This makes it accessible to everyone
   permission_classes=(permissions.AllowAny,), # <--- This removes the login requirement
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # Documentation URLs
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]