import uuid
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from models.event import Event
from pydantic import BaseModel

router = APIRouter()

class EventCreate(BaseModel):
    title: str
    description: str | None = None
    venue: str | None = None
    event_date: datetime
    capacity: int | None = None

@router.get('/')
async def list_events(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Event).limit(params.limit).offset(params.skip))
    events = result.scalars().all()
    event_list = [
        {
            "id": str(e.id),
            "title": e.title,
            "description": e.description,
            "venue": e.venue,
            "event_date": e.event_date.isoformat() if e.event_date else None,
            "capacity": e.capacity
        } for e in events
    ]
    return StandardResponse(success=True, data=event_list)

@router.post('/')
async def create_event(
    data: EventCreate,
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    new_event = Event(
        title=data.title,
        description=data.description,
        venue=data.venue,
        event_date=data.event_date,
        capacity=data.capacity,
        organizer_id=user_id
    )
    db.add(new_event)
    await db.commit()
    await db.refresh(new_event)
    return StandardResponse(success=True, message="Event created successfully", data={"id": str(new_event.id)})
