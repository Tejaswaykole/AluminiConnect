from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.resume_service import ResumeService
from api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker
import uuid

router = APIRouter()

@router.get("/", dependencies=[Depends(get_current_user)])
async def get_my_resumes(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    resumes = await ResumeService.get_resumes_by_user(db, user_id)
    return StandardResponse(success=True, data=[r.__dict__ for r in resumes])

@router.post("/", dependencies=[Depends(RoleChecker(["STUDENT", "ALUMNI"]))])
async def upload_resume(
    file_uri: str,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    resume = await ResumeService.create_resume(db, user_id, file_uri)
    # Trigger async AI analysis
    await ResumeService.analyze_resume_with_ai(db, resume.id)
    return StandardResponse(success=True, data=resume.__dict__, message="Resume uploaded and analysis started")
