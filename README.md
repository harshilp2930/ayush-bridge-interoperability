# Ayush Bridge Interoperability (Django + React)

End-to-end Ayush–ICD11 interoperability stack: Django REST API (Render) plus React frontend (Vercel). Supports fuzzy diagnosis search, email subscriptions, and JWT authentication.

## Live URLs

| Component             | URL                                                 | Host   |
| --------------------- | --------------------------------------------------- | ------ |
| API docs (Swagger)    | https://ayush-backend-r2im.onrender.com/api-docs/   | Render |
| OpenAPI (spectacular) | https://ayush-backend-r2im.onrender.com/api/schema/ | Render |
| Frontend              | https://ayush-bridge-interoperability.vercel.app/   | Vercel |

## Features

- Fuzzy diagnosis search (NAMASTE ↔ ICD-11 mapping)
- Email subscription capture
- JWT auth (SimpleJWT via dj-rest-auth)
- Public API docs (Swagger + Redoc)
- CORS-enabled for decoupled frontend

## API Overview

Public endpoints

- GET /api/search/?q=... — fuzzy diagnosis search
- POST /api/subscribe/ — email subscription

Auth endpoints (JWT)

- POST /api/auth/token/ — obtain access/refresh (username or email + password)
- POST /api/auth/token/refresh/ — refresh access token
- POST /api/auth/registration/ — user registration (alias: /api/auth/register/)

## Tech Stack

- Backend: Django 5.2, Django REST Framework, SimpleJWT, dj-rest-auth, django-allauth
- Docs: drf-yasg (Swagger UI), drf-spectacular (OpenAPI schema)
- Frontend: React (Vercel)
- Deployment: Render (backend), Vercel (frontend)

## Quickstart (Backend)

```bash
git clone https://github.com/harshilp2930/ayush-bridge-interoperability.git
cd ayush-bridge-interoperability
python -m venv venv
venv\Scripts\activate  # Windows (or: source venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Local docs: http://127.0.0.1:8000/api-docs/

## Quickstart (Frontend)

```bash
cd frontend
npm install
npm run start
```

## Configuration Notes

- CORS is enabled for cross-origin access from Vercel
- Static files served via WhiteNoise in production
- Default auth: JWT (SimpleJWT) through dj-rest-auth

## Contributing

PRs welcome. Please run migrations and lint before submitting.

## License

MIT
