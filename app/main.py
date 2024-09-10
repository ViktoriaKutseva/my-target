from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from api.v1.endpoints import task, home


app = FastAPI(title="Task Manager", version="1.0")

# Serve static files
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="templates")

# Include routers for task and home
app.include_router(home.router)
app.include_router(task.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

# from contextlib import asynccontextmanager
# from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates
# from app.api.v1.endpoints import task
# from app.api.v1.endpoints import home
#
#
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     print("Starting up the Task Manager app!")
#     yield
#     print("Shutting down the Task Manager app!")
#
#
# app = FastAPI(title="Task Manager", version="1.0", lifespan=lifespan)
#
# app.mount("/static", StaticFiles(directory='static'), name="static")
# templates = Jinja2Templates(directory="templates")
#
# app.include_router(home.router)  # Register the home router
# app.include_router(task.router)
#
#
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
