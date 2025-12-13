"""Custom JWT Authentication for Ayush Bridge

Provides flexible authentication allowing users to login with
either username OR email address.

Standard JWT authentication only accepts username.
This custom implementation makes login more user-friendly.
"""

from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed


# ============================================================================
# CUSTOM JWT TOKEN SERIALIZER
# ============================================================================
class UsernameEmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extended JWT serializer that accepts either username or email for login.
    
    Overrides the default SimpleJWT behavior to provide flexible authentication.
    Users can login with:
        - {"username": "user123", "password": "pass"}
        - {"email": "user@example.com", "password": "pass"}
    
    Returns standard JWT access and refresh tokens on success.
    """

    def validate(self, attrs):
        """
        Custom validation to support username or email login.
        
        Args:
            attrs (dict): Request data containing username/email and password
        
        Returns:
            dict: Validated data with JWT tokens
        
        Raises:
            AuthenticationFailed: If credentials are invalid or user is inactive
        """
        # Extract username or email from request
        request = self.context.get('request')
        identifier = (
            attrs.get('username')  # Try username field first
            or (request.data.get('email') if request else None)  # Fall back to email
        )

        # Validate that some identifier was provided
        if not identifier:
            raise AuthenticationFailed(
                "Username or email is required.",
                code="no_credentials"
            )

        # Look up user by username OR email (case-insensitive)
        User = get_user_model()
        user = User.objects.filter(
            Q(username__iexact=identifier) | Q(email__iexact=identifier)
        ).first()

        # Validate user exists and is active
        if not user or not user.is_active:
            raise AuthenticationFailed(
                self.error_messages['no_active_account'],
                code='no_active_account'
            )

        # Convert email to username for parent serializer
        # (SimpleJWT expects 'username' field)
        attrs['username'] = user.username
        
        # Call parent validation to generate tokens
        return super().validate(attrs)


# ============================================================================
# CUSTOM JWT TOKEN VIEW
# ============================================================================
class UsernameEmailTokenObtainPairView(TokenObtainPairView):
    """
    JWT token endpoint that accepts username or email.
    
    Endpoint: POST /api/auth/token/
    
    Request Body:
        {"username": "user", "password": "pass"}
        OR
        {"email": "user@example.com", "password": "pass"}
    
    Response (200 OK):
        {
            "access": "<jwt_access_token>",
            "refresh": "<jwt_refresh_token>"
        }
    
    Use access token in headers: Authorization: Bearer <access_token>
    """
    serializer_class = UsernameEmailTokenObtainPairSerializer
