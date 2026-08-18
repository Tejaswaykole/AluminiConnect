import os

backend_dir = "backend"
schemas_dir = os.path.join(backend_dir, "schemas")
api_dir = os.path.join(backend_dir, "api", "v1", "endpoints")

schemas = {
    "admin.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class AdminUserUpdate(BaseModel):
    account_status: str

class AdminUserResponse(BaseModel):
    id: uuid.UUID
    email: str
    role: str
    account_status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
''',
    "institute.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class InstituteUserResponse(BaseModel):
    id: uuid.UUID
    email: str
    role: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
''',
    "analytics.py": '''
from pydantic import BaseModel
from typing import Optional, Dict, Any

class AnalyticsResponse(BaseModel):
    total_users: int
    students: int
    alumni: int
    active_users: int
    suspended_users: int
    connections: int
    opportunities: int
    events: int
    reports: int
''',
    "storage.py": '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class FileMetadataResponse(BaseModel):
    id: uuid.UUID
    uploader_id: uuid.UUID
    file_path: str
    file_type: str
    file_size_bytes: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
'''
}

apis = {
    "admin.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.admin import AdminUserResponse, AdminUserUpdate
from models.user import User
from models.enums import UserRole
from api.dependencies.auth import get_current_user

router = APIRouter()

async def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

@router.get("/users", response_model=StandardResponse)
async def list_users(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), admin: User = Depends(require_admin)):
    query = select(User).order_by(desc(User.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[AdminUserResponse.model_validate(i).model_dump(mode='json') for i in items])

@router.put("/users/{user_id}/status", response_model=StandardResponse)
async def update_user_status(user_id: uuid.UUID, payload: AdminUserUpdate, db: AsyncSession = Depends(get_db), admin: User = Depends(require_admin)):
    res = await db.execute(select(User).where(User.id == user_id))
    u = res.scalars().first()
    if not u: raise HTTPException(status_code=404, detail="User not found")
    u.account_status = payload.account_status
    await db.commit()
    return StandardResponse(success=True, message="Status updated")
''',
    "institute.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.institute import InstituteUserResponse
from models.user import User
from models.enums import UserRole
from api.dependencies.auth import get_current_user

router = APIRouter()

async def require_institute(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.INSTITUTE:
        raise HTTPException(status_code=403, detail="Institute access required")
    return current_user

@router.get("/students", response_model=StandardResponse)
async def list_students(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), inst: User = Depends(require_institute)):
    query = select(User).where(User.role == UserRole.STUDENT).order_by(desc(User.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[InstituteUserResponse.model_validate(i).model_dump(mode='json') for i in items])
''',
    "analytics.py": '''
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from database.session import get_db
from schemas.base import StandardResponse
from schemas.analytics import AnalyticsResponse
from models.user import User
from models.enums import UserRole
from models.connection import Connection
from models.opportunity import Opportunity
from models.event import Event
from models.foundation import Report
from api.dependencies.auth import get_current_user

router = APIRouter()

async def require_admin_or_institute(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.ADMIN, UserRole.INSTITUTE]:
        raise HTTPException(status_code=403, detail="Elevated access required")
    return current_user

@router.get("/", response_model=StandardResponse)
async def get_analytics(db: AsyncSession = Depends(get_db), user: User = Depends(require_admin_or_institute)):
    # Very basic counts for demonstration
    total = await db.execute(select(func.count(User.id)))
    students = await db.execute(select(func.count(User.id)).where(User.role == UserRole.STUDENT))
    alumni = await db.execute(select(func.count(User.id)).where(User.role == UserRole.ALUMNI))
    
    conns = await db.execute(select(func.count(Connection.id)))
    opps = await db.execute(select(func.count(Opportunity.id)))
    events = await db.execute(select(func.count(Event.id)))
    reports = await db.execute(select(func.count(Report.id)))
    
    data = AnalyticsResponse(
        total_users=total.scalar() or 0,
        students=students.scalar() or 0,
        alumni=alumni.scalar() or 0,
        active_users=0,
        suspended_users=0,
        connections=conns.scalar() or 0,
        opportunities=opps.scalar() or 0,
        events=events.scalar() or 0,
        reports=reports.scalar() or 0
    )
    return StandardResponse(success=True, data=data.model_dump(mode='json'))
''',
    "storage.py": '''
import uuid
import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from schemas.storage import FileMetadataResponse
from models.foundation import FileMetadata
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/upload", response_model=StandardResponse)
async def upload_file(file: UploadFile = File(...), current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    # Ensure S3 / Storage integration exists. For now, mock it as requested to just report missing configuration.
    if not os.getenv("S3_BUCKET_NAME"):
        raise HTTPException(status_code=501, detail="Storage configuration missing (S3_BUCKET_NAME not set)")
        
    fm = FileMetadata(
        uploader_id=current_user_id,
        bucket_name=os.getenv("S3_BUCKET_NAME"),
        file_path=f"uploads/{uuid.uuid4()}_{file.filename}",
        file_type=file.content_type,
        file_size_bytes=0 # mock
    )
    db.add(fm)
    await db.commit()
    await db.refresh(fm)
    return StandardResponse(success=True, data=FileMetadataResponse.model_validate(fm).model_dump(mode='json'))
'''
}

for name, code in schemas.items():
    with open(os.path.join(schemas_dir, name), "w") as f:
        f.write(code.strip())
        
for name, code in apis.items():
    with open(os.path.join(api_dir, name), "w") as f:
        f.write(code.strip())
        
# update router.py
router_path = os.path.join(api_dir, "..", "router.py")
with open(router_path, "r") as f: router_code = f.read()
if "admin.router" not in router_code:
    with open(router_path, "a") as f:
        f.write('''
from api.v1.endpoints import admin, institute, analytics, storage
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
api_router.include_router(institute.router, prefix="/institute", tags=["Institute"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(storage.router, prefix="/storage", tags=["Storage"])
''')

print("Phase 3D APIs Generated!")
