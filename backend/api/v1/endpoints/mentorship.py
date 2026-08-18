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
from models.profiles import StudentProfile, AlumniProfile
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
        
    sp_res = await db.execute(select(StudentProfile).where(StudentProfile.user_id == current_user_id))
    student_profile = sp_res.scalars().first()
    if not student_profile:
        raise HTTPException(status_code=403, detail="Only students can request mentorship")
        
    ap_res = await db.execute(select(AlumniProfile).where(AlumniProfile.user_id == payload.mentor_id))
    alumni_profile = ap_res.scalars().first()
    if not alumni_profile:
        raise HTTPException(status_code=404, detail="Mentor not found")
        
    result = await db.execute(select(MentorshipRequest).where(
        MentorshipRequest.student_id == student_profile.id,
        MentorshipRequest.mentor_id == alumni_profile.id,
        MentorshipRequest.status.in_([MentorshipStatus.PENDING, MentorshipStatus.ACCEPTED])
    ))
    existing = result.scalars().first()
    if existing:
        raise HTTPException(status_code=400, detail="Mentorship request already exists or active")
        
    req = MentorshipRequest(
        student_id=student_profile.id,
        mentor_id=alumni_profile.id,
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
        
    ap_res = await db.execute(select(AlumniProfile).where(AlumniProfile.user_id == current_user_id))
    alumni_profile = ap_res.scalars().first()
    if not alumni_profile or req.mentor_id != alumni_profile.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    if req.status != MentorshipStatus.PENDING:
        raise HTTPException(status_code=400, detail="Request is not pending")
        
    req.status = MentorshipStatus.ACCEPTED
    req.accepted_date = datetime.now(timezone.utc)
    await db.commit()
    return StandardResponse(success=True, message="Mentorship accepted")
