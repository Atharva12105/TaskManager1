Deployment: https://task-frontend-iech.vercel.app

# 🚀 Task Manager SaaS – PrimeTrade Internship Assignment

A full-stack, role-based Task Management System built as part of the **PrimeTrade Backend & Frontend Developer Internship Assignment**.  
This project demonstrates secure authentication, role-based access control, REST APIs, cloud database integration, and a production-ready frontend.

---

## 🧩 Tech Stack

### Backend
- FastAPI (Python)
- PostgreSQL (Neon Cloud Database)
- SQLAlchemy ORM
- JWT Authentication
- Passlib (bcrypt hashing)
- Swagger (OpenAPI)

### Frontend
- Next.js (React)
- TypeScript
- CSS

### Cloud & DevOps
- Vercel (Frontend & Backend hosting)
- Neon (Cloud PostgreSQL)
- GitHub (Version control)

---

## 🔐 Features

### Authentication
- User registration
- Secure password hashing (bcrypt)
- JWT-based login
- Token-based authentication

### Role-Based Access Control

Two roles:
- **User**
- **Admin**

| Feature | User | Admin |
|------|------|------|
| Register & Login | ✅ | ✅ |
| Create Tasks | ✅ | ✅ |
| View Own Tasks | ✅ | ✅ |
| Update Own Tasks | ✅ | ✅ |
| Delete Own Tasks | ✅ | ❌ |
| View All Users | ❌ | ✅ |
| View All Tasks | ❌ | ✅ |
| Delete Any Task | ❌ | ✅ |
| Promote User to Admin | ❌ | ✅ |

---

## 📋 Core Functionality

- Task CRUD (Create, Read, Update, Delete)
- Secure REST APIs
- JWT protected routes
- Admin dashboard
- User dashboard
- Swagger API documentation
- Cloud database (Neon)
- Production deployment

---

## 🧪 API Testing

Swagger UI is available at:
https://task-backend-topaz.vercel.app/docs


From Swagger you can:
- Register users
- Login
- Generate JWT
- Test all protected APIs

---

## 🗄️ Database Schema

### Users
| Column | Type |
|------|------|
| id | Integer |
| email | String |
| hashed_password | String |
| role | user / admin |

### Tasks
| Column | Type |
|------|------|
| id | Integer |
| title | String |
| description | String |
| owner_id | Foreign Key → users.id |

---

## ⚙️ Local Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Create .env:
DATABASE_URL=<your_neon_url>
JWT_SECRET=<your_secret>

Frontend
cd frontend
npm install
npm run dev

Create .env.local:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1

🚀 Deployment
Frontend deployed on Vercel
Backend deployed on Vercel
Database hosted on Neon
All secrets are stored securely using Vercel Environment Variables.
📈 Scalability Notes
This architecture supports:
Stateless JWT-based APIs
Cloud database scaling (Neon)
Independent frontend and backend scaling
API versioning (/api/v1)
Easy microservice expansion
Future improvements:
Redis caching
Rate limiting
Background workers
Docker containers
Load balancing




