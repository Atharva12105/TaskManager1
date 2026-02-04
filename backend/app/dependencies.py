from fastapi import Depends, HTTPException
from .auth import get_current_user

def admin_required(user=Depends(get_current_user)):
    if user.role != "admin":
        raise HTTPException(403, "Admin only")
    return user
