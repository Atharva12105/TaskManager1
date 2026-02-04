
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database import get_db
from ..models import Task
from ..auth import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])

class TaskCreate(BaseModel):
    title: str
    description: str = ""

@router.post("/")
def create_task(task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_task = Task(title=task.title, description=task.description, owner_id=user.id)
    db.add(new_task)
    db.commit()
    return new_task

@router.get("/")
def get_tasks(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if user.role == "admin":
        return db.query(Task).all()
    return db.query(Task).filter(Task.owner_id == user.id).all()

@router.put("/{task_id}")
def update_task(task_id: int, task: TaskCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if not db_task:
        raise HTTPException(404, "Task not found")

    if db_task.owner_id != user.id and user.role != "admin":
        raise HTTPException(403, "Not allowed")

    db_task.title = task.title
    db_task.description = task.description
    db.commit()
    return db_task

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(404, "Task not found")

    if task.owner_id != user.id and user.role != "admin":
        raise HTTPException(403, "Not allowed")

    db.delete(task)
    db.commit()
    return {"message": "Deleted"}
