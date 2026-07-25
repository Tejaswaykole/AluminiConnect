from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.message_service import MessageService
from models.enums import MessageContext
from api.dependencies.auth import get_current_user_id
import uuid

router = APIRouter()

@router.get("/{context}")
async def get_messages(
    context: MessageContext,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    messages = await MessageService.get_messages_by_context(db, user_id, context)
    return StandardResponse(success=True, data=[m.__dict__ for m in messages])

@router.post("/")
async def send_message(
    receiver_id: uuid.UUID,
    context: MessageContext,
    content: str,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    msg = await MessageService.send_message(db, user_id, receiver_id, context, content)
    return StandardResponse(success=True, data=msg.__dict__, message="Message sent")
