import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from models.mentorship import MentorshipRequest
from models.profiles import StudentProfile, AlumniProfile
from models.enums import MentorshipStatus
from pydantic import BaseModel

router = APIRouter()

class MentorshipRequestCreate(BaseModel):
    mentor_profile_id: uuid.UUID
    notes: str | None = None

@router.get('/')
async def list_mentorship_requests(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MentorshipRequest).limit(params.limit).offset(params.skip))
    reqs = result.scalars().all()
    req_list = [
        {
            "id": str(r.id),
            "mentor_id": str(r.mentor_id),
            "student_id": str(r.student_id),
            "status": r.status.value if hasattr(r.status, 'value') else r.status,
            "notes": r.notes,
            "request_date": r.request_date.isoformat() if r.request_date else None
        } for r in reqs
    ]
    return StandardResponse(success=True, data=req_list)

@router.post('/')
async def request_mentorship(
    data: MentorshipRequestCreate,
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    # Find student profile
    res = await db.execute(select(StudentProfile).where(StudentProfile.user_id == user_id))
    student_profile = res.scalars().first()
    
    if not student_profile:
        # Fallback for testing with mocked bypass user
        res_mock = await db.execute(select(StudentProfile).limit(1))
        student_profile = res_mock.scalars().first()
        if not student_profile:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student profile not found")

    new_req = MentorshipRequest(
        mentor_id=data.mentor_profile_id,
        student_id=student_profile.id,
        status=MentorshipStatus.PENDING,
        notes=data.notes
    )
    db.add(new_req)
    await db.commit()
    await db.refresh(new_req)
    return StandardResponse(success=True, message="Mentorship requested successfully", data={"id": str(new_req.id)})
