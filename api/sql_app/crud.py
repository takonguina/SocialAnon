from sqlalchemy.orm import Session
from . import models, schemas

def add_commit(db: Session, row):
    db.add(row)
    db.commit()

def create_user(db: Session, user: schemas.CreateUserRequest):
    db_user = models.Users(email=user.email, password=user.password)
    add_commit(db=db,
               row=db_user)
    return db_user

def get_user_by_id(db: Session, id: int):
    return db.query(models.Users).filter(models.Users.id_user == id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Users).filter(models.Users.email == email).first()

def get_post_by_date_insert(db: Session):
    return db.query(models.Posts).order_by(models.Posts.date_insert.desc()).all()

def insert_post(db: Session, id: int, content: str):
    new_post = models.Posts(id_user=id, content=content)
    add_commit(db = db,
               row = new_post)

def increment_like(db: Session, id_post: int):
    post = db.query(models.Posts).filter(models.Posts.id_post == id_post).first()
    if post == None:
        return False
    post.likes_post += 1
    add_commit(db = db,
               row=post)
    return True

def like_post(db: Session, id_user: int, id_post: int):
    like = db.query(models.Likes).filter(models.Likes.id_post == id_post, models.Likes.id_user == id_user).first()
    if like:
        return None
    else :
        post = increment_like(db = db, id_post=id_post)
        if post is False:
            return post
    new_like = models.Likes(id_post=id_post,id_user=id_user)
    add_commit(db = db,
               row = new_like)
    return True

def decrement_like(db: Session, id_post: int):
    post = db.query(models.Posts).filter(models.Posts.id_post == id_post).first()
    if post == None:
        return False
    post.likes_post -= 1
    add_commit(db = db,
               row=post)
    return True

def unlike_post(db: Session, id_user: int, id_post: int):
    like = db.query(models.Likes).filter(models.Likes.id_post == id_post, models.Likes.id_user == id_user).first()
    if like is None:
        return None
    else:
        post =  decrement_like(db = db, id_post=id_post)
        if post is False:
            return post
    db.delete(like)
    db.commit()
    return True
        

def delete_post(db: Session, id_user: int, id_post: int):
    post = db.query(models.Posts).filter(models.Posts.id_post == id_post, models.Posts.id_user == id_user).first()
    if post is None:
        return None
    db.delete(post)
    db.commit()
    return True
    