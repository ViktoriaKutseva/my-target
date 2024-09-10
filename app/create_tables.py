from database import SessionManager
from models.task import Task


def init_db():
    # Create the tables
    with SessionManager() as session:
        Task.__table__.create(session.bind)


if __name__ == "__main__":
    init_db()
