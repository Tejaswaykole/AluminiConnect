import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from sqlalchemy import or_
from models.message import Message
from models.enums import MessageContext
from pydantic import BaseModel

router = APIRouter()

class MessageCreate(BaseModel):
    receiver_id: uuid.UUID
    content: str

@router.get('/')
async def get_messages(
    params: PaginationParams = Depends(),
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    # Fetch messages where the user is sender or receiver
    result = await db.execute(
        select(Message)
        .where(or_(Message.sender_id == user_id, Message.receiver_id == user_id))
        .order_by(Message.created_at.desc())
        .limit(params.limit)
        .offset(params.skip)
    )
    msgs = result.scalars().all()
    msg_list = [
        {
            "id": str(m.id),
            "sender_id": str(m.sender_id),
            "receiver_id": str(m.receiver_id),
            "content": m.content,
            "context": m.context.value if hasattr(m.context, 'value') else m.context,
            "is_read": m.is_read,
            "created_at": m.created_at.isoformat() if m.created_at else None
        } for m in msgs
    ]
    return StandardResponse(success=True, data=msg_list)

@router.post('/')
async def send_message(
    data: MessageCreate,
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    new_msg = Message(
        sender_id=user_id,
        receiver_id=data.receiver_id,
        content=data.content,
        context=MessageContext.DIRECT,
        is_read=False
    )
    db.add(new_msg)
    await db.commit()
    await db.refresh(new_msg)
    return StandardResponse(success=True, message="Message sent successfully", data={"id": str(new_msg.id)})
