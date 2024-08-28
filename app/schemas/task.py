from pydantic import BaseModel

class Task(BaseModel):
    id: int
    title: str
    description: str = None
    is_done: bool = False

class TaskCreate(BaseModel):
    title: str
    description: str = None

class TaskUpdate(BaseModel):
    title: str = None
    description: str = None
    is_done: bool = None
