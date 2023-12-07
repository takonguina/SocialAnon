from pydantic import BaseModel
from datetime import datetime

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
