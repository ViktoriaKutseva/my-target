from app.database import SessionManager


def get_db():
    db = SessionManager()
    try:
        yield db
    finally:
        db.session.close()


# Example of a configuration setting
class Settings:
    def __init__(self):
        self.database_url = "sqlite:///./test.db"
        self.secret_key = "your_secret_key_here"


settings = Settings()


# Example of utility function
def get_settings():
    return settings
