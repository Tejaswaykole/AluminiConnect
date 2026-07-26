import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from models.notification import Notification

router = APIRouter()

@router.get('/')
async def list_notifications(
    params: PaginationParams = Depends(),
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .limit(params.limit)
        .offset(params.skip)
    )
    nots = result.scalars().all()
    not_list = [
        {
            "id": str(n.id),
            "title": n.title,
            "message": n.message,
            "type": n.type.value if hasattr(n.type, 'value') else n.type,
            "is_read": n.is_read,
            "created_at": n.created_at.isoformat() if n.created_at else None
        } for n in nots
    ]
    return StandardResponse(success=True, data=not_list)

@router.put('/{notification_id}/read')
async def mark_as_read(
    notification_id: uuid.UUID,
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Notification).where(Notification.id == notification_id, Notification.user_id == user_id))
    n = result.scalars().first()
    if n:
        n.is_read = True
        await db.commit()
    return StandardResponse(success=True, message="Notification marked as read")
