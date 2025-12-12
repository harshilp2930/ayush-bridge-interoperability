import csv
import os
import django

# 1. Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings') # Change 'backend' if your project folder is named 'ayush_project'
django.setup()

from api.models import Diagnosis

def run_import():
    file_path = 'ayush_data.csv'
    
    if not os.path.exists(file_path):
        print("❌ Error: ayush_data.csv not found")
        return

    print("✅ Found file! Importing data...")
    
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        
        # Skip the first row (headers)
        next(reader, None)

        count = 0
        for row in reader:
            # Skip empty lines or Series headers
            if not row or row[0].startswith("---"):
                continue
            
            # Ensure the row has enough columns (term, namaste, icd)
            if len(row) >= 3:
                obj, created = Diagnosis.objects.get_or_create(
                    term=row[0],
                    defaults={
                        'namaste_code': row[1],
                        'icd_code': row[2]
                    }
                )
                if created:
                    count += 1
                    print(f"   Added: {row[0]}")

    print(f"\n🎉 SUCCESS: Database now has {Diagnosis.objects.count()} total records!")

if __name__ == '__main__':
    run_import()