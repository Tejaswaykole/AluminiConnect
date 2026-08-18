
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.referrals import ReferralCreate, ReferralResponse
from models.foundation import Referral, ReferralStatus
from models.profiles import AlumniProfile
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_referral(payload: ReferralCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    # Check if Alumni
    res = await db.execute(select(AlumniProfile).where(AlumniProfile.user_id == current_user_id))
    alumni = res.scalars().first()
    if not alumni:
        raise HTTPException(status_code=403, detail="Only Alumni can create referrals")
        
    ref = Referral(alumni_id=current_user_id, opportunity_info=payload.opportunity_info, deadline=payload.deadline, status=ReferralStatus.PENDING)
    db.add(ref)
    await db.commit()
    await db.refresh(ref)
    return StandardResponse(success=True, data=ReferralResponse.model_validate(ref).model_dump(mode='json'))

@router.get("/", response_model=StandardResponse)
async def list_referrals(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Referral).order_by(desc(Referral.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[ReferralResponse.model_validate(i).model_dump(mode='json') for i in items])
