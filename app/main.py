from fastapi import FastAPI
from app.api.v1.endpoints import task  # Importing the task router
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up the Task Manager app!")
    yield
    print("Shutting down the Task Manager app!")

app = FastAPI(title="Task Manager", version="1.0", lifespan=lifespan)

app.include_router(task.router, prefix="/tasks", tags=["tasks"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
