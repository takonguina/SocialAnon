import os

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from sql_app.crud import insert_post, get_post_by_date_insert
from sql_app.dependencies.session import get_db
from sql_app.dependencies.security import has_access
from sql_app.schemas import Post

router = APIRouter(
    prefix='/content',
    tags=['content']
)

@router.post("/insert_new_post/")
async def insert_new_post(
    content: str,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access),
):
    insert_post(db=session, id=id_user, content=content)
    return {"message: User succesfully insert new post"}


@router.post("/get_recent_posts/", response_model=list[Post])
async def get_recent_posts(
    session: Session = Depends(get_db),
    _: int = Depends(has_access)
):
    recent_posts = get_post_by_date_insert(db=session)
    return recent_posts