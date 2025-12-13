"""URL Configuration for API App

Defines the URL routing for all API endpoints.
All URLs are prefixed with /api/ (configured in backend/urls.py)

Available Endpoints:
    - /api/search/ - Fuzzy search for disease mappings
    - /api/subscribe/ - Email subscription management
"""

from django.urls import path
from .views import search_api, subscribe_api

# ============================================================================
# API URL PATTERNS
# ============================================================================
# All patterns are automatically prefixed with /api/ from main urls.py

urlpatterns = [
    # GET /api/search/?q=<query>
    # Public endpoint for searching NAMASTE <-> ICD-11 mappings
    path('search/', search_api, name='search_api'),
    
    # POST /api/subscribe/
    # Public endpoint for email subscription
    path('subscribe/', subscribe_api, name='subscribe_api'),
]