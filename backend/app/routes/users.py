
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..security import hash_password, verify_password, create_token
from ..auth import get_current_user
from fastapi import Form

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(400, "Email already exists")

    user = User(email=email, hashed_password=hash_password(password), role="user")
    db.add(user)
    db.commit()
    return {"message": "User created"}

@router.post("/login")
def login(
    username: str = Form(...),   # Swagger OAuth2 sends username
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    # We use email as username
    user = db.query(User).filter(User.email == username).first()

    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(401, "Invalid credentials")

    token = create_token({"id": user.id, "role": user.role})
    return {"access_token": token, "token_type": "bearer", "role": user.role}

# ---------------- ADMIN FEATURES ---------------- #

@router.get("/users")
def get_all_users(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(403, "Admin only")
    return db.query(User).all()

@router.put("/promote/{user_id}")
def promote_user(user_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(403, "Admin only")

    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(404, "User not found")

    target.role = "admin"
    db.commit()
    return {"message": f"{target.email} is now admin"}
