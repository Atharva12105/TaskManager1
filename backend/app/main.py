from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import tasks, users
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.vercel.app",      # 🔥 allow all Vercel frontends
    ],
    allow_origin_regex="https://.*\\.vercel\\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router, prefix="/api/v1")
app.include_router(tasks.router, prefix="/api/v1")
