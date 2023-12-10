import os

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from sql_app.crud import delete_post, insert_post, get_post_by_date_insert, like_post, unlike_post
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


@router.get("/get_recent_posts/", response_model=list[Post])
async def get_recent_posts(
    session: Session = Depends(get_db),
    _: int = Depends(has_access)
):
    recent_posts = get_post_by_date_insert(db=session)
    return recent_posts

@router.post("/like_post/")
async def new_like_post(
    id_post: int,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access)
 
):
    new_like = like_post(db = session,
              id_user= id_user,
              id_post=id_post)
    
    if new_like is None:
        raise HTTPException(
            status_code=status.HTTP_208_ALREADY_REPORTED,
            detail="Already liked"
        )
    elif new_like is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This post doesn't exist"
        )

    return {"message: User succesfully like the post"}

@router.post("/unlike_post/")
async def api_unlike_post(
    id_post: int,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access)
):
    new_unlike = unlike_post(db = session,
              id_user= id_user,
              id_post=id_post)
    
    if new_unlike is None:
        raise HTTPException(
            status_code=status.HTTP_208_ALREADY_REPORTED,
            detail="Already unliked"
        )
    elif new_unlike is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This post doesn't exist"
        )

    return {"message: User succesfully unlike the post"}

@router.post("/delete_post/")
async def api_delete_post(id_post: int,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access)
):
    post = delete_post(db = session, id_user=id_user, id_post=id_post)
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="This post doesn't exist"
        )
    return {"message: User succesfully delete the post"}