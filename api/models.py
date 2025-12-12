from django.db import models

class Diagnosis(models.Model):
    term = models.CharField(max_length=255)      # e.g., "Jwara (Fever)"
    namaste_code = models.CharField(max_length=50) # e.g., "NAM-01-0023"
    icd_code = models.CharField(max_length=50)     # e.g., "MG26"

    def __str__(self):
        return self.term
    
class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email