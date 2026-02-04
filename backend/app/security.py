from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = "HS256"

pwd = CryptContext(schemes=["bcrypt"])

def hash_password(p):
    return pwd.hash(p)

def verify_password(p, h):
    return pwd.verify(p, h)

def create_token(data):
    data["exp"] = datetime.utcnow() + timedelta(hours=1)
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
