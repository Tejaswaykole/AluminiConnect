from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.application_service import ApplicationService
from api.dependencies.auth import get_current_user_id
import uuid

router = APIRouter()

@router.get("/")
async def get_my_applications(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    applications = await ApplicationService.get_applications_by_user(db, user_id)
    return StandardResponse(success=True, data=[a.__dict__ for a in applications])

@router.post("/{opportunity_id}")
async def apply_to_job(
    opportunity_id: uuid.UUID,
    resume_id: uuid.UUID | None = None,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    application = await ApplicationService.apply_to_opportunity(db, user_id, opportunity_id, resume_id)
    return StandardResponse(success=True, data=application.__dict__, message="Successfully applied to opportunity")
