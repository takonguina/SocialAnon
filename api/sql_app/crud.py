from sqlalchemy.orm import Session
from . import models, schemas

def get_user_by_id(db: Session, id: int):
    return db.query(models.Users).filter(models.Users.id_user == id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Users).filter(models.Users.email == email).first()

def get_post_by_date_insert(db: Session):
    return db.query(models.Posts).order_by(models.Posts.date_insert.desc()).all()

def insert_post(db: Session, id: int, content: str):
    new_post = models.Posts(id_user=id, content=content)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

def create_user(db: Session, user: schemas.CreateUserRequest):
    db_user = models.Users(email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user