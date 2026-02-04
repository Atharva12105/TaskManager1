<<<<<<< HEAD
🚀 Task Manager SaaS – PrimeTrade Internship Assignment
A full-stack, role-based Task Management system built as part of the PrimeTrade Backend / Frontend Developer Internship Assignment.
The project demonstrates secure authentication, role-based access control, REST APIs, cloud database integration, and a production-ready frontend.

🧩 Tech Stack
Backend
FastAPI (Python)
PostgreSQL (Neon Cloud Database)
SQLAlchemy ORM
JWT Authentication
Passlib (bcrypt hashing)
Swagger (OpenAPI)

Frontend
Next.js (React)
TypeScript
Fetch API
CSS

Cloud & DevOps
Vercel (Frontend + Backend hosting)
Neon (Cloud PostgreSQL)
GitHub (Version control)

🔐 Features.
Authentication
User registration
Secure password hashing (bcrypt)
JWT based login
Token-based authentication
Role-Based Access Control
Two roles:
User
Admin

| Feature               | User | Admin |
| --------------------- | ---- | ----- |
| Register & Login      | ✅    | ✅     |
| Create Tasks          | ✅    | ✅     |
| View Own Tasks        | ✅    | ✅     |
| Update Own Tasks      | ✅    | ✅     |
| Delete Own Tasks      | ✅    | ❌     |
| View All Users        | ❌    | ✅     |
| View All Tasks        | ❌    | ✅     |
| Delete Any Task       | ❌    | ✅     |
| Promote User to Admin | ❌    | ✅     |

📋 Core Functionality
Task CRUD (Create, Read, Update, Delete)
Secure REST API
JWT protected routes
Admin dashboard
User dashboard
Swagger documentation
Cloud database
Production deployment

🧪 API Testing
Swagger UI is available at:
/docs
Example:
https://task-backend-topaz.vercel.app/docs
From Swagger you can:
Register users
Login
Generate JWT
Test protected APIs

🗄️ Database Schema

Users
| Column          | Type         |
| --------------- | ------------ |
| id              | Integer      |
| email           | String       |
| hashed_password | String       |
| role            | user / admin |

Tasks
| Column      | Type                   |
| ----------- | ---------------------- |
| id          | Integer                |
| title       | String                 |
| description | String                 |
| owner_id    | Foreign Key → users.id |


⚙️ Local Setup
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Create .env:
DATABASE_URL=<your_neon_url>
JWT_SECRET=<your_secret>

# Frontend
cd frontend
npm install
npm run dev
Create .env.local:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1

🚀 Deployment
Frontend deployed on Vercel
Backend deployed on Vercel
Database hosted on Neon
Secrets are stored securely using Vercel Environment Variables.
📈 Scalability Notes
This architecture supports:
Horizontal scaling via stateless JWT APIs
Database scaling via Neon
Easy microservice extension
CDN-based frontend via Vercel
API versioning (/api/v1)
Future upgrades:
Redis caching
Rate limiting
Microservices
Queue workers
Docker containers
=======

>>>>>>> cde398888095b220541bf19db03dd034d9e9f52f
