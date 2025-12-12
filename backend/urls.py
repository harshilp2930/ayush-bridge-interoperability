from django.contrib import admin
from django.urls import path
# 1. Import the views module correctly from your 'api' app
from api import views

# Imports for Swagger
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Ayush-ICD Interoperability API",
      default_version='v1',
      description="API to bridge Traditional Medicine (NAMASTE) with International Standards (ICD-11).",
      contact=openapi.Contact(email="your.email@college.edu"),
      license=openapi.License(name="Academic License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 2. This is the correct line. It uses 'views.search_api'
    path('api/search/', views.search_api, name='search_api'),

    # Swagger Documentation Links
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('api/subscribe/', views.subscribe_api, name='subscribe_api'),
]