import os

backend_dir = "backend"
schemas_dir = os.path.join(backend_dir, "schemas")
api_dir = os.path.join(backend_dir, "api", "v1", "endpoints")

schemas = {
    "events.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    description: str
    venue: str
    event_date: datetime
    capacity: Optional[int] = None
    registration_deadline: Optional[datetime] = None
    
class EventResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    venue: str
    event_date: datetime
    organizer_id: uuid.UUID
    capacity: Optional[int]
    registration_deadline: Optional[datetime]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class EventRegistrationCreate(BaseModel):
    event_id: uuid.UUID
    
class EventRegistrationResponse(BaseModel):
    event_id: uuid.UUID
    user_id: uuid.UUID
    registered_at: datetime
    model_config = ConfigDict(from_attributes=True)
''',
    "notifications.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class NotificationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    type: str
    title: str
    message: str
    is_read: bool
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
''',
    "community.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class CommunityCreate(BaseModel):
    name: str
    description: str
    category_id: Optional[uuid.UUID] = None
    visibility: str = "PUBLIC"
    
class CommunityResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str
    visibility: str
    created_by: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class CommunityPostCreate(BaseModel):
    community_id: uuid.UUID
    content: str
    
class CommunityPostResponse(BaseModel):
    id: uuid.UUID
    community_id: uuid.UUID
    author_id: uuid.UUID
    content: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
''',
    "reports.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ReportCreate(BaseModel):
    reported_entity_type: str
    reported_entity_id: uuid.UUID
    reason: str
    
class ReportResponse(BaseModel):
    id: uuid.UUID
    reporter_id: uuid.UUID
    reported_entity_type: str
    reported_entity_id: uuid.UUID
    reason: str
    status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
''',
    "announcements.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    scope: str
    target_audience: Optional[str] = None
    
class AnnouncementResponse(BaseModel):
    id: uuid.UUID
    title: str
    content: str
    scope: str
    target_audience: Optional[str]
    author_id: uuid.UUID
    status: str
    published_at: Optional[datetime]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
'''
}

apis = {
    "events.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.events import EventCreate, EventResponse, EventRegistrationCreate, EventRegistrationResponse
from models.foundation import Event
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
''',
    "notifications.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.notifications import NotificationResponse
from models.message import Notification
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def list_notifications(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Notification).where(Notification.user_id == current_user_id).order_by(desc(Notification.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[NotificationResponse.model_validate(i).model_dump(mode='json') for i in items])
''',
    "community.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.community import CommunityCreate, CommunityResponse, CommunityPostCreate, CommunityPostResponse
from models.foundation import Community, CommunityPost
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_community(payload: CommunityCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    com = Community(
        name=payload.name,
        description=payload.description,
        visibility=payload.visibility,
        created_by=current_user_id
    )
    db.add(com)
    await db.commit()
    await db.refresh(com)
    return StandardResponse(success=True, data=CommunityResponse.model_validate(com).model_dump(mode='json'))

@router.get("/", response_model=StandardResponse)
async def list_communities(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Community).where(Community.deleted_at.is_(None)).order_by(desc(Community.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[CommunityResponse.model_validate(i).model_dump(mode='json') for i in items])

@router.post("/posts", response_model=StandardResponse)
async def create_post(payload: CommunityPostCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    post = CommunityPost(
        community_id=payload.community_id,
        author_id=current_user_id,
        content=payload.content
    )
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return StandardResponse(success=True, data=CommunityPostResponse.model_validate(post).model_dump(mode='json'))
''',
    "reports.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.reports import ReportCreate, ReportResponse
from models.foundation import Report, ReportStatus
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_report(payload: ReportCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    report = Report(
        reporter_id=current_user_id,
        reported_entity_type=payload.reported_entity_type,
        reported_entity_id=payload.reported_entity_id,
        reason=payload.reason,
        status=ReportStatus.OPEN
    )
    db.add(report)
    await db.commit()
    await db.refresh(report)
    return StandardResponse(success=True, data=ReportResponse.model_validate(report).model_dump(mode='json'))
''',
    "announcements.py": '''
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.announcements import AnnouncementCreate, AnnouncementResponse
from models.foundation import Announcement, AnnouncementStatus, AnnouncementScope
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_announcement(payload: AnnouncementCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    # Note: RBAC middleware usually protects this endpoint.
    ann = Announcement(
        title=payload.title,
        content=payload.content,
        scope=AnnouncementScope[payload.scope],
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
'''
}

for name, code in schemas.items():
    with open(os.path.join(schemas_dir, name), "w") as f:
        f.write(code.strip() + "\\n")
        
for name, code in apis.items():
    with open(os.path.join(api_dir, name), "w") as f:
        f.write(code.strip() + "\\n")
        
# update router.py
router_path = os.path.join(api_dir, "..", "router.py")
with open(router_path, "r") as f: router_code = f.read()
if "events.router" not in router_code:
    with open(router_path, "a") as f:
        f.write('''
from api.v1.endpoints import events, notifications, community, reports, announcements
api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(community.router, prefix="/community", tags=["Community"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(announcements.router, prefix="/announcements", tags=["Announcements"])
''')

print("Phase 3C APIs Generated!")
