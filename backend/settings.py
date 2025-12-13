"""
Django settings for backend project.
"""

from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
SECRET_KEY = 'django-insecure-b_hvd)8unuj=t(d0n=1ovdbj1o2q8!v_z!f1!v=%36+oc5b%y+'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False 

ALLOWED_HOSTS = ['*']


# ============================================================================
# INSTALLED APPLICATIONS
# ============================================================================

INSTALLED_APPS = [
    # Django Core Apps
    'django.contrib.admin',        # Admin interface
    'django.contrib.auth',         # Authentication framework
    'django.contrib.contenttypes', # Content type framework
    'django.contrib.sessions',     # Session framework
    'django.contrib.messages',     # Messaging framework
    'django.contrib.staticfiles',  # Static file management
    'django.contrib.sites',        # Multi-site support (required by allauth)
    
    # Django REST Framework
    'rest_framework',              # Core DRF
    'rest_framework.authtoken',    # Token authentication support
    
    # Authentication & Registration
    'dj_rest_auth',                # REST API authentication endpoints
    'dj_rest_auth.registration',   # User registration endpoints
    'allauth',                     # Advanced user management
    'allauth.account',             # Account management
    'allauth.socialaccount',       # Social authentication (optional)
    
    # API Utilities
    'corsheaders',                 # CORS headers for frontend access
    'drf_spectacular',             # OpenAPI 3.0 schema generation
    'drf_yasg',                    # Swagger UI documentation
    
    # Custom Apps
    'api',                         # Ayush Bridge API application
]

# Required by django-allauth for multi-site support
SITE_ID = 1

# ============================================================================
# MIDDLEWARE CONFIGURATION
# ============================================================================
# Middleware processes requests/responses in the order listed

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',      # Static file serving
    'django.middleware.security.SecurityMiddleware',   # Security enhancements
    'django.contrib.sessions.middleware.SessionMiddleware',  # Session management
    'django.middleware.common.CommonMiddleware',       # Common utilities
    'django.middleware.csrf.CsrfViewMiddleware',      # CSRF protection
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # User authentication
    'django.contrib.messages.middleware.MessageMiddleware',     # Flash messages
    'django.middleware.clickjacking.XFrameOptionsMiddleware',   # Clickjacking protection
    'allauth.account.middleware.AccountMiddleware',    # django-allauth support
    'corsheaders.middleware.CorsMiddleware',           # CORS headers
    'django.middleware.common.CommonMiddleware',       # Additional common middleware
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================
# Using SQLite for simplicity (consider PostgreSQL for production)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ============================================================================
# PASSWORD VALIDATION
# ============================================================================
# Enforce strong password requirements

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ============================================================================
# INTERNATIONALIZATION
# ============================================================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ============================================================================
# STATIC FILES CONFIGURATION
# ============================================================================
# Served via WhiteNoise in production

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# WhiteNoise storage backend for compressed static files
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# ============================================================================
# CORS CONFIGURATION
# ============================================================================
# Allow frontend to access API from different origin
# TODO: Restrict to specific frontend domain in production

CORS_ALLOW_ALL_ORIGINS = True


# ============================================================================
# DJANGO REST FRAMEWORK CONFIGURATION
# ============================================================================

REST_FRAMEWORK = {
    # Authentication: Use JWT tokens for all requests
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    
    # Authorization: Require authentication by default
    # Individual views can override with @permission_classes([AllowAny])
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    
    # API Documentation: Use drf-spectacular for OpenAPI 3.0 schema
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# Enable JWT authentication in dj-rest-auth
REST_USE_JWT = True


# ============================================================================
# JWT (JSON WEB TOKEN) CONFIGURATION
# ============================================================================

SIMPLE_JWT = {
    # Use "Bearer" prefix in Authorization header
    "AUTH_HEADER_TYPES": ("Bearer",),
    
    # Access token valid for 60 minutes
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    
    # Refresh token valid for 7 days
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

# ============================================================================
# DJANGO-ALLAUTH CONFIGURATION
# ============================================================================
# Settings for user registration and account management

# Disable email verification for simplified registration
# Users can register and login immediately without email confirmation
ACCOUNT_EMAIL_VERIFICATION = 'none'

# Email is optional for registration
ACCOUNT_EMAIL_REQUIRED = False

# Username is required for registration
ACCOUNT_USERNAME_REQUIRED = True

# Allow login with either username or email
ACCOUNT_AUTHENTICATION_METHOD = 'username_email'


# ============================================================================
# DEFAULT MODEL FIELD
# ============================================================================
# Use BigAutoField for primary keys (recommended for Django 3.2+)

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ============================================================================
# DRF-YASG (SWAGGER UI) CONFIGURATION
# ============================================================================
# Settings for Swagger API documentation

SWAGGER_SETTINGS = {
    # Disable session authentication in Swagger UI
    'USE_SESSION_AUTH': False,
    
    # No security definitions (using JWT via custom headers)
    'SECURITY_DEFINITIONS': None,
}


# ============================================================================
# DRF-SPECTACULAR (OPENAPI 3.0) CONFIGURATION
# ============================================================================
# Settings for OpenAPI 3.0 schema generation

SPECTACULAR_SETTINGS = {
    'TITLE': 'Ayush Bridge API',
    'DESCRIPTION': 'API documentation for Ayush Bridge - Bridging NAMASTE and ICD-11 standards',
    'VERSION': '1.0.0',
}
