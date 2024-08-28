from sqlalchemy.orm import Session
from app.models import Task  # Assuming models.py contains the Task model
from app.schemas.task import TaskCreate, TaskUpdate  # Assuming schemas.py contains Pydantic schemas

class TaskService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_tasks(db: Session, skip: int = 0, limit: int = 10):
        """
        Retrieve all tasks with optional pagination.
        """
        return db.query(Task).offset(skip).limit(limit).all()

    # Function to retrieve a task by its ID
    def get_task_by_id(db: Session, task_id: int):
        """
        Retrieve a single task by ID.
        """
        return db.query(Task).filter(Task.id == task_id).first()

    # Function to create a new task
    def create_task(db: Session, task_data: TaskCreate):
        """
        Create a new task.
        """
        new_task = Task(
            title=task_data.title,
            description=task_data.description,
            is_done=task_data.is_done
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task

    # Function to update an existing task
    def update_task(db: Session, task_id: int, task_data: TaskUpdate):
        """
        Update an existing task.
        """
        task = db.query(Task).filter(Task.id == task_id).first()
        if task:
            if task_data.title is not None:
                task.title = task_data.title
            if task_data.description is not None:
                task.description = task_data.description
            if task_data.is_done is not None:
                task.is_done = task_data.is_done
            db.commit()
            db.refresh(task)
        return task

    # Function to delete a task
    def delete_task(db: Session, task_id: int):
        """
        Delete a task by ID.
        """
        task = db.query(Task).filter(Task.id == task_id).first()
        if task:
            db.delete(task)
            db.commit()
        return task
