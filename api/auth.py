from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import AuthenticationFailed


class UsernameEmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Allow login using either username or email."""

    def validate(self, attrs):
        request = self.context.get('request')
        identifier = (
            attrs.get('username')
            or (request.data.get('email') if request else None)
        )

        if not identifier:
            raise AuthenticationFailed("Username or email is required.", code="no_credentials")

        User = get_user_model()
        user = User.objects.filter(
            Q(username__iexact=identifier) | Q(email__iexact=identifier)
        ).first()

        if not user or not user.is_active:
            raise AuthenticationFailed(self.error_messages['no_active_account'], code='no_active_account')

        # Force username for the parent serializer
        attrs['username'] = user.username
        return super().validate(attrs)


class UsernameEmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = UsernameEmailTokenObtainPairSerializer
