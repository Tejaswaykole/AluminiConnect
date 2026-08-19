import os

backend_dir = "backend"

schema_connections = '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from models.connection import ConnectionStatus

class ConnectionRequest(BaseModel):
    target_id: uuid.UUID

class ConnectionResponse(BaseModel):
    id: uuid.UUID
    requester_id: uuid.UUID
    target_id: uuid.UUID
    status: ConnectionStatus
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
'''

schema_messaging = '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class MessageCreate(BaseModel):
    receiver_id: uuid.UUID
    content: str
    context: Optional[str] = None

class MessageResponse(BaseModel):
    id: uuid.UUID
    sender_id: uuid.UUID
    receiver_id: uuid.UUID
    content: str
    context: Optional[str] = None
    is_read: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
'''

schema_mentorship = '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from models.mentorship import MentorshipStatus

class MentorshipCreateRequest(BaseModel):
    mentor_id: uuid.UUID
    notes: Optional[str] = None

class MentorshipResponse(BaseModel):
    id: uuid.UUID
    mentor_id: uuid.UUID
    student_id: uuid.UUID
    status: MentorshipStatus
    notes: Optional[str] = None
    request_date: Optional[datetime]
    accepted_date: Optional[datetime]
    
    model_config = ConfigDict(from_attributes=True)
'''

with open(os.path.join(backend_dir, "schemas", "connections.py"), "w") as f:
    f.write(schema_connections)
with open(os.path.join(backend_dir, "schemas", "messaging.py"), "w") as f:
    f.write(schema_messaging)
with open(os.path.join(backend_dir, "schemas", "mentorship.py"), "w") as f:
    f.write(schema_mentorship)

api_connections = '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_, desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.connections import ConnectionRequest, ConnectionResponse
from models.connection import Connection, ConnectionStatus
from models.user import User
from api.dependencies.auth import get_current_user_id
from api.dependencies.pagination import PaginationParams

router = APIRouter()

@router.post("/request", response_model=StandardResponse)
async def request_connection(
    payload: ConnectionRequest,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    if payload.target_id == current_user_id:
        raise HTTPException(status_code=400, detail="Cannot connect to yourself")
        
    result = await db.execute(select(Connection).where(
        or_(
            and_(Connection.requester_id == current_user_id, Connection.target_id == payload.target_id),
            and_(Connection.requester_id == payload.target_id, Connection.target_id == current_user_id)
        )
    ))
    existing = result.scalars().first()
    if existing:
        if existing.status == ConnectionStatus.PENDING:
            raise HTTPException(status_code=400, detail="Connection request already pending")
        if existing.status == ConnectionStatus.ACCEPTED:
            raise HTTPException(status_code=400, detail="Already connected")
        if existing.status == ConnectionStatus.BLOCKED:
            raise HTTPException(status_code=403, detail="Connection blocked")
            
    conn = Connection(requester_id=current_user_id, target_id=payload.target_id, status=ConnectionStatus.PENDING)
    db.add(conn)
    await db.commit()
    await db.refresh(conn)
    return StandardResponse(success=True, data=ConnectionResponse.model_validate(conn).model_dump(mode='json'))

@router.post("/{conn_id}/accept", response_model=StandardResponse)
async def accept_connection(
    conn_id: uuid.UUID,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Connection).where(Connection.id == conn_id))
    conn = result.scalars().first()
    if not conn:
        raise HTTPException(status_code=404, detail="Connection not found")
        
    if conn.target_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to accept this request")
        
    if conn.status != ConnectionStatus.PENDING:
        raise HTTPException(status_code=400, detail="Request is not pending")
        
    conn.status = ConnectionStatus.ACCEPTED
    await db.commit()
    return StandardResponse(success=True, message="Connection accepted")

@router.delete("/{conn_id}", response_model=StandardResponse)
async def remove_connection(
    conn_id: uuid.UUID,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Connection).where(Connection.id == conn_id))
    conn = result.scalars().first()
    if not conn:
        raise HTTPException(status_code=404, detail="Connection not found")
        
    if conn.requester_id != current_user_id and conn.target_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    await db.delete(conn)
    await db.commit()
    return StandardResponse(success=True, message="Connection removed")
'''

api_messaging = '''
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
'''

api_mentorship = '''
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_, desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.mentorship import MentorshipCreateRequest, MentorshipResponse
from models.mentorship import MentorshipRequest, MentorshipStatus
from api.dependencies.auth import get_current_user_id
from api.dependencies.pagination import PaginationParams

router = APIRouter()

@router.post("/request", response_model=StandardResponse)
async def request_mentorship(
    payload: MentorshipCreateRequest,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    if payload.mentor_id == current_user_id:
        raise HTTPException(status_code=400, detail="Cannot request mentorship from yourself")
        
    result = await db.execute(select(MentorshipRequest).where(
        MentorshipRequest.student_id == current_user_id,
        MentorshipRequest.mentor_id == payload.mentor_id,
        MentorshipRequest.status.in_([MentorshipStatus.PENDING, MentorshipStatus.ACCEPTED])
    ))
    existing = result.scalars().first()
    if existing:
        raise HTTPException(status_code=400, detail="Mentorship request already exists or active")
        
    req = MentorshipRequest(
        student_id=current_user_id,
        mentor_id=payload.mentor_id,
        notes=payload.notes,
        status=MentorshipStatus.PENDING,
        request_date=datetime.now(timezone.utc)
    )
    db.add(req)
    await db.commit()
    await db.refresh(req)
    return StandardResponse(success=True, data=MentorshipResponse.model_validate(req).model_dump(mode='json'))

@router.post("/{req_id}/accept", response_model=StandardResponse)
async def accept_mentorship(
    req_id: uuid.UUID,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(MentorshipRequest).where(MentorshipRequest.id == req_id))
    req = result.scalars().first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")
        
    if req.mentor_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    if req.status != MentorshipStatus.PENDING:
        raise HTTPException(status_code=400, detail="Request is not pending")
        
    req.status = MentorshipStatus.ACCEPTED
    req.accepted_date = datetime.now(timezone.utc)
    await db.commit()
    return StandardResponse(success=True, message="Mentorship accepted")
'''

with open(os.path.join(backend_dir, "api", "v1", "endpoints", "connections.py"), "w") as f:
    f.write(api_connections)
with open(os.path.join(backend_dir, "api", "v1", "endpoints", "messaging.py"), "w") as f:
    f.write(api_messaging)
with open(os.path.join(backend_dir, "api", "v1", "endpoints", "mentorship.py"), "w") as f:
    f.write(api_mentorship)

# update router.py
router_path = os.path.join(backend_dir, "api", "v1", "router.py")
with open(router_path, "r") as f:
    router_code = f.read()

router_additions = '''
from api.v1.endpoints import connections, messaging, mentorship
api_router.include_router(connections.router, prefix="/connections", tags=["Connections"])
api_router.include_router(messaging.router, prefix="/messages", tags=["Messaging"])
api_router.include_router(mentorship.router, prefix="/mentorship", tags=["Mentorship"])
'''
if "connections.router" not in router_code:
    with open(router_path, "a") as f:
        f.write(router_additions)

print("Scaffolded phase 3A APIs")
