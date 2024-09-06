from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import HTMLResponse
from typing import List
from app.schemas.task import Task, TaskCreate, TaskUpdate
from app.services import task_service
from fastapi.templating import Jinja2Templates

router = APIRouter()

templates = Jinja2Templates(directory="templates")

@router.get("/tasks", response_class=HTMLResponse)
async def view_tasks(request: Request):
    tasks = task_service.TaskService().get_tasks()  # Fetch all tasks
    return templates.TemplateResponse("task.html", {"request": request, "tasks": tasks})

@router.get("/tasks/new", response_class=HTMLResponse)
async def create_task_form(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

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

# from fastapi import APIRouter, HTTPException, Depends, Request
# from typing import List
# from app.schemas.task import Task, TaskCreate, TaskUpdate
# from app.services import task_service
#
# router = APIRouter()
#
#
# @router.get("/tasks/{task_id}", response_model=Task)
# def get_task(task_id: int):
#     task = task_service.TaskService().get_task_by_id(task_id)  # Example function from service layer
#     if not task:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return task
#
#
# @router.post("/tasks", response_model=Task)
# def create_task(task: TaskCreate):
#     new_task = task_service.TaskService().create_task(task)  # Example function from service layer
#     return new_task
#
#
# @router.put("/tasks/{task_id}", response_model=Task)
# def update_task(task_id: int, task: TaskUpdate):
#     updated_task = task_service.TaskService().update_task(task_id, task)  # Example function from service layer
#     if not updated_task:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return updated_task
#
#
# @router.delete("/tasks/{task_id}", response_model=dict)
# def delete_task(task_id: int):
#     success = task_service.TaskService().delete_task(task_id)  # Example function from service layer
#     if not success:
#         raise HTTPException(status_code=404, detail="Task not found")
#     return {"detail": "Task deleted"}
#
#
# @router.post("/puk")
# def puk_task(request: Request):
#     print('puuk')
