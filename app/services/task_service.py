from sqlalchemy.orm import Session
from app.models.task import Task

from app.database import SessionManager
from app.schemas.task import TaskCreate, TaskUpdate  # Assuming schemas.py contains Pydantic schemas

class TaskService:
    def get_all_tasks(self, skip: int = 0, limit: int = 10):
        """
        Retrieve all tasks with optional pagination.
        """
        with SessionManager() as session:
            return session.query(Task).offset(skip).limit(limit).all()

    # Function to retrieve a task by its ID
    def get_task_by_id(self, db: Session, task_id: int):
        """
        Retrieve a single task by ID.
        """
        with SessionManager() as session:
            return db.query(Task).filter(Task.id == task_id).first()

    # Function to create a new task
    def create_task(self, task_data: TaskCreate):
        """
        Create a new task.
        """
        with SessionManager() as session:
            new_task = Task(
                title=task_data.title,
                description=task_data.description,
                is_done=task_data.is_done
            )
            session.add(new_task)
            session.commit()
            session.refresh(new_task)
            return new_task

    # Function to update an existing task
    def update_task(self, db: Session, task_id: int, task_data: TaskUpdate):
        """
        Update an existing task.
        """
        with SessionManager() as session:
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
    def delete_task(self, db: Session, task_id: int):
        """
        Delete a task by ID.
        """
        with SessionManager() as session:
            task = db.query(Task).filter(Task.id == task_id).first()
            if task:
                db.delete(task)
                db.commit()
            return task

