from fastapi import FastAPI, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from sql_app.dependencies.session import get_db
from sql_app.database import SessionLocal, engine
from sql_app.schemas import UserBase, CreateUserRequest, UserOut
from sql_app.crud import create_user
import routers.auth as auth
import routers.content as content

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(auth.router)
app.include_router(content.router)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)