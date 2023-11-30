from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sql_app.dependencies.session import get_db
from sql_app.database import SessionLocal, engine
from sql_app.models import CompleteUser
from sql_app.schemas import UserBase, UserCreate, User
from sql_app.crud import create_user

app = FastAPI()

@app.get("/")
async def hello():
    return {"hello : world"}

@app.post("/register/", response_model=User) #path parameter
async def get_register(infos: UserCreate, 
                       db: Session = Depends(get_db)):
    db_user = create_user(db=db, user=infos)
    return db_user


