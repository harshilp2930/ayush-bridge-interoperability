from django.contrib import admin
# Change 'MedicalTerm' to 'Diagnosis' to match your models.py
from .models import Diagnosis

admin.site.register(Diagnosis)