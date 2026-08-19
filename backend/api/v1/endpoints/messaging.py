
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_, desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.messaging import MessageCreate, MessageResponse
from models.message import Message
from api.dependencies.auth import get_current_user_id
from api.dependencies.pagination import PaginationParams

router = APIRouter()

@router.post("/send", response_model=StandardResponse)
async def send_message(
    payload: MessageCreate,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    if payload.receiver_id == current_user_id:
        raise HTTPException(status_code=400, detail="Cannot send message to yourself")
        
    msg = Message(
        sender_id=current_user_id,
        receiver_id=payload.receiver_id,
        content=payload.content,
        context=payload.context
    )
    db.add(msg)
    await db.commit()
    await db.refresh(msg)
    return StandardResponse(success=True, data=MessageResponse.model_validate(msg).model_dump(mode='json'))

@router.get("/conversations/{user_id}", response_model=StandardResponse)
async def get_conversation(
    user_id: uuid.UUID,
    params: PaginationParams = Depends(),
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    query = select(Message).where(
        or_(
            and_(Message.sender_id == current_user_id, Message.receiver_id == user_id),
            and_(Message.sender_id == user_id, Message.receiver_id == current_user_id)
        )
    ).order_by(desc(Message.created_at)).limit(params.limit).offset(params.skip)
    
    result = await db.execute(query)
    messages = result.scalars().all()
    
    return StandardResponse(success=True, data=[MessageResponse.model_validate(m).model_dump(mode='json') for m in messages])
