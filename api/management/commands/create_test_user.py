"""Create a test user for API authentication."""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create a test user for API authentication'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        
        username = 'apitestuser'
        email = 'api@test.com'
        password = 'TestPassword123!'
        
        # Delete existing test user if exists
        if User.objects.filter(username=username).exists():
            User.objects.filter(username=username).delete()
            self.stdout.write(self.style.WARNING(f'Deleted existing user: {username}'))
        
        # Create new test user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_active=True
        )
        
        self.stdout.write(self.style.SUCCESS(f'✅ User created successfully!'))
        self.stdout.write(f'Username: {user.username}')
        self.stdout.write(f'Email: {user.email}')
        self.stdout.write(f'Is Active: {user.is_active}')
        self.stdout.write(f'\nPassword: {password}')
        self.stdout.write('\nYou can now login at: /api/auth/login/')
