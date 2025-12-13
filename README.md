# 🌉 Ayush Bridge Interoperability API (Python / Django REST Framework)

## ✨ Project Summary

This project is the production-ready backend that powers the Ayush Bridge Interoperability Platform. Built with **Django REST Framework (DRF)**, it provides a structured, secure, and fully documented RESTful API, demonstrating expertise in full-stack deployment and complex cloud environment management.

## 🚀 Live Environment & Documentation

| Component | Endpoint | Host Platform |
| :--- | :--- | :--- |
| **Live API Documentation** | `https://ayush-backend-r2im.onrender.com/api-docs/` | **Render** |
| **Live Frontend Interface** | `https://ayush-bridge-interoperability.vercel.app/` | **Vercel** |

## 🎯 Technical Highlights & Professional Achievements

This project showcases a complete professional skill set focused on production stability and developer experience:

### Cloud Infrastructure & DevOps

* **Decoupled Architecture:** Successfully managed a decoupled application stack, integrating a **Django/Render** backend with a **React/Vercel** frontend.
* **Production Hardening:** Configured the application for external cloud deployment, including strict control over environment variables and deployment commands.
* **Interoperability:** Implemented **`django-cors-headers`** to establish secure cross-domain communication between Vercel and Render services.

### Critical Production Debugging (The Static File Challenge)

* **Problem Resolution:** Successfully diagnosed and resolved a complex, non-trivial `404 Not Found` error for static assets (CSS/JS) encountered in the live `DEBUG=False` environment.
* **Solution Implementation:** Integrated and configured **WhiteNoise** middleware with the required `STORAGES` backend and ensured precise execution of the **`collectstatic`** command within the Render CI/CD pipeline, guaranteeing 100% asset delivery.

### API & Developer Experience

* **Framework:** Built entirely on **Django REST Framework**, utilizing Class-Based Views and Routers for scalable endpoint definition.
* **Documentation:** Implemented **DRF-Yasg (Swagger UI)** to auto-generate and host interactive, real-time documentation, serving as the single source of truth for API consumers.
* **Scalability Foundation:** Established architecture ready for immediate integration of authentication, caching (e.g., Redis), and database upgrades (e.g., PostgreSQL).

---

## ⚙️ Local Setup Guide

Follow these steps to clone and run the project locally.

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/harshilp2930/ayush-bridge-interoperability](https://github.com/harshilp2930/ayush-bridge-interoperability)
    cd ayush-bridge-interoperability
    ```

2.  **Initialize Environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: .\venv\Scripts\activate
    ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Database Migration & Superuser:**
    ```bash
    python manage.py migrate
    python manage.py createsuperuser 
    ```

5.  **Run Server:**
    ```bash
    python manage.py runserver
    ```

The local API documentation is accessible at: `http://127.0.0.1:8000/api-docs/`

---

This project is open-source under the MIT License.