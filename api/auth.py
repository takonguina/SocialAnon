import os
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from starlette import status
from sql_app.database import SessionLocal
from sql_app.models import Users
from sql_app.schemas import CreateUserRequest
from sql_app.crud import create_user
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY = f"{os.environ.get('SECRET_KEY')}"
ALGORITHM = f"{os.environ.get('ALGORITHM')}"

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')

""" class CreateUserRequest(BaseModel):
    email: str
    password: str """

class Token(BaseModel):
    access_token: str 
    token_type: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def user_register(create_user_request: CreateUserRequest,
                        db_session: Session = Depends(get_db)):
    create_user(db=db_session,
                user=CreateUserRequest(email=create_user_request.email,
                                       password=bcrypt_context.hash(create_user_request.password))
                 )
    return {"message: USer created successfully"}
