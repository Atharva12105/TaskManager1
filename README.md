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

---

## 🔐 Authentication APIs

### 1️⃣ Register User  
**POST** `/auth/register`

```
**Request**
```json
{
  "email": "user@gmail.com",
  "password": "1234"
}
Response
{
  "id": 5,
  "email": "user@gmail.com",
  "role": "user"
}
```
2️⃣ Login User
POST /auth/login
```
Request
```json
{
  "email": "user@gmail.com",
  "password": "1234"
}
Response

{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "role": "user"
}
```
Save in frontend:
Authorization: Bearer <access_token>

3️⃣ Get Logged-In User
GET /auth/me
```
Headers
Authorization: Bearer <token>

Response
```json
{
  "id": 5,
  "email": "user@gmail.com",
  "role": "user"
}
```

👨‍💼 Admin APIs
4️⃣ Get All Users (Admin Only)
GET /auth/users
```
Headers
Authorization: Bearer <admin-token>
Response
```json
[
  {
    "id": 1,
    "email": "admin@gmail.com",
    "role": "admin"
  },
  {
    "id": 2,
    "email": "user@gmail.com",
    "role": "user"
  }
]
```

5️⃣ Promote User to Admin
PUT /auth/promote/{user_id}
Example
```
PUT /auth/promote/2
Headers
Authorization: Bearer <admin-token>
Response
```json
{
  "message": "User promoted to admin"
}
```
✅ Task APIs
6️⃣ Create Task
POST /tasks
```
Headers
Authorization: Bearer <token>
Request
```json
{
  "title": "Finish frontend",
  "description": "Build dashboard UI"
}
Response
{
  "id": 3,
  "title": "Finish frontend",
  "description": "Build dashboard UI",
  "user_id": 5
}
```
7️⃣ Get My Tasks (User)
GET /tasks
```
Headers
Authorization: Bearer <user-token>
Response
```json
[
  {
    "id": 3,
    "title": "Finish frontend",
    "description": "Build dashboard UI"
  }
]
```
8️⃣ Get All Tasks (Admin Only)
GET /tasks/all
```
Headers
Authorization: Bearer <admin-token>
Response
```json
[
  {
    "id": 1,
    "title": "Backend",
    "description": "Fix auth",
    "user_id": 2
  },
  {
    "id": 3,
    "title": "Frontend",
    "description": "Build UI",
    "user_id": 5
  }
]
```
9️⃣ Update Own Task (User)
PUT /tasks/{task_id}
```
Example
PUT /tasks/3
Headers
Authorization: Bearer <user-token>
```json
Request
{
  "title": "Finish frontend UI",
  "description": "Dashboard + Login"
}
Response
{
  "message": "Task updated"
}
```






## 🔑 Demo Credentials

Use the following demo accounts to test role-based access:

### 👤 Admin
Email: ak@gmail.com 
Password: 1234  

### 👥 User
Email: ak2@gmail.com 
Password: 12345  

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
```

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




