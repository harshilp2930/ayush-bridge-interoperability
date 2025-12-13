from django.urls import path
from .views import search_api, subscribe_api, CreateTestUserView

urlpatterns = [
    path('search/', search_api, name='search_api'),
    path('subscribe/', subscribe_api, name='subscribe_api'),
    path('create-test-user/', CreateTestUserView.as_view(), name='create_test_user'),  # TEMPORARY
]