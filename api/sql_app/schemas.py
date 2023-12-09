from pydantic import BaseModel
from datetime import datetime


class Token(BaseModel):
    access_token: str 
    token_type: str

class UserBase(BaseModel):
    email: str

class CreateUserRequest(UserBase):
    password: str

class UserOut(UserBase):
    id_user: int
    email_validated: bool
    date_insert: datetime

    class Config:
        orm_mode = True

class Post(BaseModel):
    id_post: int
    content: str
    likes_post: int
    date_insert: datetime
    class Config:
        orm_mode = True