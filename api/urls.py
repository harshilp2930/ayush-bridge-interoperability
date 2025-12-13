from django.urls import path
from .views import search_api, subscribe_api, create_test_user_view

urlpatterns = [
    path('search/', search_api, name='search_api'),
    path('subscribe/', subscribe_api, name='subscribe_api'),
    path('create-test-user/', create_test_user_view, name='create_test_user'),  # TEMPORARY
]