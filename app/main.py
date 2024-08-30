from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
import os

app = FastAPI()

static_dir = os.path.abspath("static")
# Mount the static directory to serve static files
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Set up Jinja2 template directory
templates = Jinja2Templates(directory=os.path.abspath("app/templates"))

@app.get("/", response_class=HTMLResponse)
async def read_index():
    index_path = os.path.join(static_dir, "index.html")
    if not os.path.isfile(index_path):
        return HTMLResponse("Index file not found", status_code=404)
    with open(index_path) as f:
        return f.read()

@app.get("/tasks", response_class=HTMLResponse)
async def read_tasks(request: Request):
    # Example task data; replace with actual task data as needed
    dummy_tasks = [
        {"title": "Task 1", "description": "Description 1", "is_done": False},
        {"title": "Task 2", "description": "Description 2", "is_done": True}
    ]
    # Render the task.html template with the dummy task data
    return templates.TemplateResponse("task.html", {"request": request, "tasks": dummy_tasks})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import HTMLResponse
# import os
# from typing import List
#
# app = FastAPI()
#
# # Use absolute path relative to the script's location if 'app' is the working directory
# static_dir = os.path.abspath("static")
#
# # Check if the directory exists
# if not os.path.isdir(static_dir):
#     raise RuntimeError(f"Directory '{static_dir}' does not exist")
#
# # Mount the static directory
# app.mount("/static", StaticFiles(directory=static_dir), name="static")
#
# @app.get("/", response_class=HTMLResponse)
# async def read_index():
#     index_path = os.path.join(static_dir, "index.html")
#     if not os.path.isfile(index_path):
#         return HTMLResponse("Index file not found", status_code=404)
#     with open(index_path) as f:
#         return f.read()
#
# # Include your router setup here
# # app.include_router(task.router, prefix="/tasks", tags=["tasks"])
#
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
