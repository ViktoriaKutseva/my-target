from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from schemas.task import Task, TaskCreate, TaskUpdate
from services import task_service


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


@router.put("/tasks/{id}", response_model=dict)
def update_task(id: int, task_data: TaskUpdate):
    # Verify the task ID exists
    task_service_instance = task_service.TaskService()
    task = task_service_instance.get_task_by_id(id)  # Use `get_task` to fetch the task by `id`
    if not task:
        raise HTTPException(status_code=404, detail=f"Task with id {id} not found")

    # Proceed to update
    success = task_service_instance.update_task(id, task_data)  # Pass `id` to `update_task`
    if not success:
        raise HTTPException(status_code=400, detail="Failed to update task. Check task data.")

    return {"detail": "Task updated"}

@router.delete("/tasks/{task_id}", response_model=dict)
def delete_task(task_id: int):
    success = task_service.TaskService().delete_task(task_id)  # Example function from service layer
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Task deleted"}

@router.post("/puk")
def puk_task(request: Request):
    print('puuk')
