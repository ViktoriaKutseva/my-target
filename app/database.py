# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

class SessionManager:
    def __init__(self):
        self.database_url = "sqlite:///./test.db"
        self.engine = create_engine(self.database_url, connect_args={"check_same_thread": False})
        self.session_maker = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.base = declarative_base()  # Define the base for the models

    def __enter__(self):
        self.session = self.session_maker()
        return self.session

    def __exit__(self, exc_type, exc_value, traceback):
        if self.session:
            self.session.close()
