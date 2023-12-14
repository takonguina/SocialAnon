import os
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sql_app.dependencies.session import get_db
from sql_app.dependencies.security import create_jwt
from sqlalchemy.orm import Session
from starlette import status
from sql_app.database import SessionLocal
from sql_app.schemas import CreateUserRequest, Token
from sql_app.crud import create_user, get_user_by_email
from passlib.context import CryptContext
from jose import jwt, JWTError
from settings import settings

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

SECRET_KEY: str = f"{os.environ.get('SECRET_KEY')}"
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTE = 60

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt_context.verify(plain_password, hashed_password)

@router.post("/register/", status_code=status.HTTP_201_CREATED)
async def user_register(
    create_user_request: CreateUserRequest,
    db_session: Session = Depends(get_db)
):

    create_user(
        db=db_session,
        user=CreateUserRequest(email=create_user_request.email,
                                       password=bcrypt_context.hash(create_user_request.password))
                 )
    return {"message: User created successfully"}

@router.post("/login/", response_model=Token)
async def login_for_access_token(
    form_data: CreateUserRequest,
    db_session: Session = Depends(get_db)
):
    db_user = get_user_by_email(db=db_session, email=form_data.email)

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email not registered"
        )


    check_password = verify_password(
        plain_password = form_data.password,
        hashed_password = db_user.password
        )

    if not check_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wrong Password"
        )

    access_token = create_jwt(
        str(db_user.id_user))

    return {"access_token": access_token, "token_type": "bearer"}