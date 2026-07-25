from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.drive_service import DriveService
from api.dependencies.auth import get_current_user_id
import uuid
from pydantic import BaseModel

router = APIRouter()

class DriveCreate(BaseModel):
    title: str
    company_id: uuid.UUID
    description: str | None = None
    drive_date: str | None = None

@router.get("/")
async def get_all_drives(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    drives = await DriveService.get_drives(db)
    return StandardResponse(success=True, data=[d.__dict__ for d in drives])

@router.post("/")
async def create_drive(
    data: DriveCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    drive = await DriveService.create_drive(db, data.title, data.company_id, data.description, data.drive_date)
    return StandardResponse(success=True, data=drive.__dict__, message="Placement drive created successfully")
