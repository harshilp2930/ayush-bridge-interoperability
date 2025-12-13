"""Database Models for Ayush Bridge Application

This module defines the data models for:
1. Diagnosis - Maps disease terms between NAMASTE and ICD-11 standards
2. Subscriber - Stores email subscriptions for platform updates
"""

from django.db import models


# ============================================================================
# DIAGNOSIS MODEL
# ============================================================================
class Diagnosis(models.Model):
    """
    Stores disease/diagnosis mappings between NAMASTE and ICD-11 coding systems.
    
    NAMASTE: National Medical Standards (Indian traditional medicine)
    ICD-11: International Classification of Diseases (WHO standard)
    
    Attributes:
        term: Human-readable disease name (e.g., "Jwara (Fever)")
        namaste_code: NAMASTE standard code (e.g., "NAM-01-0023")
        icd_code: ICD-11 standard code (e.g., "MG26")
    """
    # Disease name (supports both English and traditional terms)
    term = models.CharField(
        max_length=255,
        help_text="Disease name in human-readable format"
    )
    
    # NAMASTE coding system identifier
    namaste_code = models.CharField(
        max_length=50,
        help_text="NAMASTE standard code for this diagnosis"
    )
    
    # ICD-11 coding system identifier
    icd_code = models.CharField(
        max_length=50,
        help_text="ICD-11 standard code for this diagnosis"
    )

    def __str__(self):
        """String representation shows the disease term."""
        return self.term
    
    class Meta:
        verbose_name = "Diagnosis"
        verbose_name_plural = "Diagnoses"
        ordering = ['term']  # Alphabetical order by default


# ============================================================================
# SUBSCRIBER MODEL
# ============================================================================
class Subscriber(models.Model):
    """
    Stores email addresses of users subscribed to platform updates.
    
    Email addresses are unique - duplicate subscriptions are prevented.
    
    Attributes:
        email: Subscriber's email address (unique constraint)
        date_joined: Timestamp when subscription was created
    """
    # Email address (enforces uniqueness at database level)
    email = models.EmailField(
        unique=True,
        help_text="Subscriber's email address"
    )
    
    # Auto-timestamp when subscription is created
    date_joined = models.DateTimeField(
        auto_now_add=True,
        help_text="Date and time when subscription was created"
    )

    def __str__(self):
        """String representation shows the email address."""
        return self.email
    
    class Meta:
        verbose_name = "Subscriber"
        verbose_name_plural = "Subscribers"
        ordering = ['-date_joined']  # Newest subscribers first