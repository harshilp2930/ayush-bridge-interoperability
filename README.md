# 💠 Ayush Bridge: Interoperability Engine for Traditional Medicine

> **Live Demo:** [https://ayush-bridge-interoperability.vercel.app](https://ayush-bridge-interoperability.vercel.app)  
> **Backend API:** [https://ayush-backend-r2im.onrender.com/swagger/](https://ayush-backend-r2im.onrender.com/swagger/)

## 🏥 Problem Statement
In the Indian healthcare ecosystem, Traditional Medicine (Ayush) and Modern Medicine (Allopathy) speak different digital languages. 
* **Modern Medicine** uses **WHO ICD-11** standards.
* **Ayurveda** uses **NAMASTE** (National Ayush Morbidity Standardized Terminologies).

This disconnect makes it impossible to create unified Electronic Health Records (EHR) or file standardized insurance claims for Ayush treatments.

## 🚀 The Solution: Ayush Bridge
Ayush Bridge is a full-stack interoperability engine that semantically maps traditional diagnosis terms to international standards. It acts as a "Google Translate" for medical systems, allowing an Ayurvedic diagnosis like *"Jwara"* to be instantly recognized as *"MG26 (Fever)"* in global hospital systems.

## ✨ Key Features
* **🔍 Smart Fuzzy Search:** Implemented **Levenshtein Distance Algorithm** (via Python) to handle typos and spelling variations (e.g., searching "Feever" still finds "Fever").
* **🌍 Dual-Standard Mapping:** Simultaneously retrieves **NAMASTE Codes** (National) and **ICD-11 TM2 Codes** (International).
* **⚡ RESTful API Architecture:** Fast, scalable backend built with **Django REST Framework** serving JSON data.
* **🎨 Glassmorphism UI:** A modern, responsive React frontend designed for medical clerks and doctors.
* **☁️ Cloud Native:** Fully deployed with CI/CD pipelines on **Vercel** (Frontend) and **Render** (Backend).

## 🛠️ Tech Stack
* **Frontend:** React.js, CSS3 (Custom Responsive Design), Axios
* **Backend:** Django, Django REST Framework (DRF), Python 3.9
* **Database:** SQLite (Dev) / PostgreSQL (Prod)
* **Algorithms:** `thefuzz` (Fuzzy Logic matching)
* **DevOps:** Git, GitHub, Gunicorn, Vercel, Render

## 📊 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/search/?q=term` | Fuzzy search for diseases (e g. "Fever") |
| `POST` | `/api/subscribe/` | Subscribe email for updates |
| `GET` | `/swagger/` | Interactive API Documentation |

---
**Developed by Harshil Patel** *Computer Science Engineering Student*