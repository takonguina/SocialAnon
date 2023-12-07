from sqlalchemy.orm import Session
from . import models, schemas

def get_user_by_id(db: Session, id: int):
    return db.query(models.Users).filter(models.Users.id_user == id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Users).filter(models.Users.email == email).first()

def create_user(db: Session, user: schemas.CreateUserRequest):
    db_user = models.Users(email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user