
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from database.session import get_db
from schemas.base import StandardResponse
from schemas.applications import ApplicationCreate, ApplicationResponse
from models.application import JobApplication
from models.enums import ApplicationStatus
from models.opportunity import Opportunity
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def apply(payload: ApplicationCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    opp_res = await db.execute(select(Opportunity).where(Opportunity.id == payload.opportunity_id))
    opp = opp_res.scalars().first()
    if not opp or opp.deleted_at or opp.status != "OPEN":
        raise HTTPException(status_code=400, detail="Opportunity is closed or does not exist")
        
    app = JobApplication(user_id=current_user_id, opportunity_id=payload.opportunity_id, resume_id=payload.resume_id, status=ApplicationStatus.APPLIED)
    db.add(app)
    try:
        await db.commit()
        await db.refresh(app)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=409, detail="Application already submitted")
        
    return StandardResponse(success=True, data=ApplicationResponse.model_validate(app).model_dump(mode='json'))

@router.get("/me", response_model=StandardResponse)
async def my_applications(db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    result = await db.execute(select(JobApplication).where(JobApplication.user_id == current_user_id))
    items = result.scalars().all()
    return StandardResponse(success=True, data=[ApplicationResponse.model_validate(i).model_dump(mode='json') for i in items])
