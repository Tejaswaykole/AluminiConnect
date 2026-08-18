import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.events import EventCreate, EventResponse, EventRegistrationCreate, EventRegistrationResponse
from models.event import Event
from models.junctions import EventRegistration
from api.dependencies.auth import get_current_user_id
from models.user import User

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_event(payload: EventCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    event = Event(
        title=payload.title,
        description=payload.description,
        venue=payload.venue,
        event_date=payload.event_date,
        capacity=payload.capacity,
        registration_deadline=payload.registration_deadline,
        organizer_id=current_user_id
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return StandardResponse(success=True, data=EventResponse.model_validate(event).model_dump(mode='json'))

@router.get("/", response_model=StandardResponse)
async def list_events(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Event).order_by(desc(Event.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[EventResponse.model_validate(i).model_dump(mode='json') for i in items])

@router.post("/register", response_model=StandardResponse)
async def register_event(payload: EventRegistrationCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    reg = EventRegistration(event_id=payload.event_id, user_id=current_user_id)
    db.add(reg)
    try:
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=409, detail="Already registered or invalid event")
    return StandardResponse(success=True, message="Registered successfully")
