from sqlalchemy.orm import Session
from . import models, schemas

def get_user(db: Session, id: int):
    return db.query(models.CompleteUser).filter(models.CompleteUser.id_user == id).first()

def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.CompleteUser(email=user.email, password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user