#!/usr/bin/env python
"""Create a test user for API authentication testing."""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Delete existing test user if it exists
User.objects.filter(username='apitestuser').delete()

# Create a simple, verified test user
user = User.objects.create_user(
    username='apitestuser',
    email='api@test.com',
    password='TestPassword123!',
    is_active=True
)
user.save()

print("✅ User created successfully!")
print(f"Username: {user.username}")
print(f"Email: {user.email}")
print(f"Is Active: {user.is_active}")
print("\nYou can now login at: https://ayush-backend-r2im.onrender.com/api/auth/login/")
print("Username: apitestuser")
print("Password: TestPassword123!")
