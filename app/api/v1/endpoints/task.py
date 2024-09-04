from fastapi import APIRouter, HTTPException, Depends, Request
from typing import List
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.services import task_service

router = APIRouter()


# @router.get("/tasks", response_model=List[Task])
# def get_tasks():
#     tasks = task_service.TaskService().get_all_tasks()  # Example function from service layer
#     return tasks


@router.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int):
    task = task_service.TaskService().get_task_by_id(task_id)  # Example function from service layer
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/tasks", response_model=Task)
def create_task(task: TaskCreate):
    new_task = task_service.TaskService().create_task(task)  # Example function from service layer
    return new_task


@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskUpdate):
    updated_task = task_service.TaskService().update_task(task_id, task)  # Example function from service layer
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@router.delete("/tasks/{task_id}", response_model=dict)
def delete_task(task_id: int):
    success = task_service.TaskService().delete_task(task_id)  # Example function from service layer
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Task deleted"}

@router.post("/puk")
def puk_task(request: Request):
    print('puuk')