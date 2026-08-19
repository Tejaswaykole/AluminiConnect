import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.announcements import AnnouncementCreate, AnnouncementResponse
from models.foundation import Announcement, AnnouncementStatus
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_announcement(payload: AnnouncementCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    # Note: RBAC middleware usually protects this endpoint.
    ann = Announcement(
        title=payload.title,
        content=payload.content,
        scope=payload.scope,
        target_audience=payload.target_audience,
        author_id=current_user_id,
        status=AnnouncementStatus.PUBLISHED,
        published_at=datetime.now(timezone.utc)
    )
    db.add(ann)
    await db.commit()
    await db.refresh(ann)
    return StandardResponse(success=True, data=AnnouncementResponse.model_validate(ann).model_dump(mode='json'))

@router.get("/", response_model=StandardResponse)
async def list_announcements(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Announcement).where(Announcement.status == AnnouncementStatus.PUBLISHED).order_by(desc(Announcement.published_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[AnnouncementResponse.model_validate(i).model_dump(mode='json') for i in items])
