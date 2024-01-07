from sqlalchemy import or_, func
from sqlalchemy.orm import joinedload,Session
from . import models, schemas

def add_commit(db: Session, row):
    db.add(row)
    db.commit()

def create_user(db: Session, user: schemas.CreateUserRequest):
    check_email = db.query(models.Users).filter(models.Users.email == user.email).first()
    if check_email is None:
        db_user = models.Users(email=user.email, password=user.password)
        add_commit(db=db,
                row=db_user)
        return True
    else:
        return None

def get_user_by_id(db: Session, id: int):
    return db.query(models.Users).filter(models.Users.id_user == id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.Users).filter(models.Users.email == email).first()

def get_post_by_date_insert(db: Session, id_user: int):
    posts = db.query(models.Posts).order_by(models.Posts.date_insert.desc()).all()
    user_likes = set(like.id_post for like in db.query(models.Likes).filter(models.Likes.id_user == id_user).all())
    for post in posts:
        post.liked = post.id_post in user_likes
    return posts

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
    like = db.query(models.Likes).filter(models.Likes.id_post == id_post,
                                         models.Likes.id_user == id_user
                                         ).first()
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
    like = db.query(models.Likes).filter(models.Likes.id_post == id_post,
                                         models.Likes.id_user == id_user
                                         ).first()
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
    post = db.query(models.Posts).filter(models.Posts.id_post == id_post,
                                         models.Posts.id_user == id_user
                                         ).first()
    if post is None:
        return None
    db.delete(post)
    db.commit()

def send_new_message(content: str, db: Session, id_sender: int, id_post: int):
    post = db.query(models.Posts).filter(models.Posts.id_post == id_post).first()
    
    id_receiver = post.id_user

    if post is None:
        return None
    if id_receiver is None:
        return False
    if id_receiver == id_sender:
        return 0

    check_conversation = db.query(models.Message).filter(models.Message.id_post == id_post,
                                                         models.Message.id_sender == id_sender).first()
    if check_conversation is None:
        new_conversation = models.Conversation(id_post=id_post)
        add_commit(db = db,
                   row = new_conversation)
        conversation = new_conversation.id_conversation
        new_message = models.Message(id_post=id_post,
                                     id_conversation=conversation,
                                     id_sender=id_sender,
                                     id_receiver=id_receiver,
                                     message_text=content
                                     )
        add_commit(db = db,
                   row = new_message)
    else :
        old_conversation = check_conversation.id_conversation
        new_message = models.Message(id_post=id_post,
                                     id_conversation=old_conversation,
                                     id_sender=id_sender,
                                     id_receiver=id_receiver,
                                     message_text=content
                                     )
        add_commit(db = db,
                   row = new_message)
    return True

def get_all_messages(db: Session, id_user: int):
    all_messages = db.query(models.Conversation
                            ).options(joinedload(models.Conversation.messages)
                                      ).join(models.Message, models.Conversation.id_conversation == models.Message.id_conversation
                                             ).filter(or_(models.Message.id_receiver == id_user, models.Message.id_sender == id_user)
                                               ).all()
    return all_messages


def edit_message(db: Session, id_user: int, id_message: int, edit: str):
    message = db.query(models.Message).filter(models.Message.id_message == id_message).first()
    if message.id_sender == id_user:
        message.message_text = edit
        add_commit(db=db,
                   row=message)
    else:
        return None

def delete_message(db: Session, id_user: int, id_message: int):
    message = db.query(models.Message).filter(models.Message.id_message == id_message).first()
    if message.id_sender == id_user:
        db.delete(message)
        db.commit()
        return True
    else:
        return None
