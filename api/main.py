from fastapi import FastAPI, Depends
from typing import Annotated
from sqlalchemy.orm import Session
from sql_app.dependencies.session import get_db
from sql_app.database import SessionLocal, engine
from sql_app.schemas import UserBase, CreateUserRequest, UserOut
from sql_app.crud import create_user
import auth

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(auth.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.post("/register/", response_model=UserOut) #path parameter
# async def get_register(infos: CreateUserRequest, 
#                        db: Session = Depends(get_db)):
#     db_user = create_user(db=db, user=infos)
#     return db_user




# @app.get("/login/")
# async def hello():
#      return {}

