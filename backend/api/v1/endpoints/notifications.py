import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.notifications import NotificationResponse
from models.notification import Notification
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_notifications(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Notification).where(Notification.user_id == current_user_id).order_by(desc(Notification.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[NotificationResponse.model_validate(i).model_dump(mode='json') for i in items])
