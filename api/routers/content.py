import os

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from sql_app.crud import insert_post, get_post_by_date_insert
from sql_app.dependencies.session import get_db
from sql_app.dependencies.security import has_access

router = APIRouter(
    prefix='/content',
    tags=['content']
)

# SECRET_KEY: str = f"{os.environ.get('SECRET_KEY')}"
# ALGORITHM: str = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTE = 60

# @router.get("/get_posts/", status_code=status.HTTP_200_OK)
# async def get_recent_posts(
#     db_session: Session = Depends(get_db)
# ):
#     recent_posts = get_post_by_date_insert(db = db_session)
#     return {"message: User succesfully get posts"}

@router.post("/insert_post/")
async def get_recent_posts(
    content: str,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access),
):
    insert_post(db=session, id=id_user, content=content)
    return {"message: User succesfully insert new post"}