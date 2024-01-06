from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from sqlalchemy.orm import Session
from sql_app.crud import   edit_message, delete_message, get_all_messages,send_new_message
from sql_app.dependencies.security import has_access
from sql_app.dependencies.session import get_db
from sql_app.schemas import Post

router = APIRouter(
    prefix='/message',
    tags=['message']
)

@router.get("/get_all_messages/")
async def api_get_all_messages(
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access),
):
    personal_posts = get_all_messages(db = session, id_user=id_user)
    if personal_posts is None:
        raise HTTPException(
            status_code=status.HTTP_204_NO_CONTENT,
            detail="No message"
        )
    return personal_posts

@router.post("/new_message/")
async def api_send_new_send(
    content: str,
    id_post: int,
    session: Session = Depends(get_db),
    id_sender: int = Depends(has_access),
):
    new_message = send_new_message(content=content, id_post=id_post, db=session, id_sender=id_sender)
    
    if new_message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The post no longer exists"
        )
    
    if new_message is False:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user no longer exists"
        )
    
    
    
    return {"message: User succesfully send new message"}

@router.post("/edit_message/")
async def api_edit_message(
    id_message: int,
    edit: str,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access),
):
    editing = edit_message(db = session,
                 id_user = id_user,
                 id_message = id_message,
                 edit = edit)
    if editing is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This message is not yours"
        )

    return {"message: User succesfully edit message"}

@router.post("/delete_message/")
async def api_delete_message(
    id_message: int,
    session: Session = Depends(get_db),
    id_user: int = Depends(has_access),
):
    deleting = delete_message(db = session,
                 id_user = id_user,
                 id_message = id_message,)
    if deleting is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="This message is not yours"
        )

    return {"message: User succesfully delete message"}