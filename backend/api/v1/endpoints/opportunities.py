
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc, asc, or_
from database.session import get_db
from schemas.base import StandardResponse
from schemas.opportunities import OpportunityCreate, OpportunityResponse
from models.opportunity import Opportunity
from api.dependencies.auth import get_current_user_id
from models.user import User

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_opportunity(payload: OpportunityCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    opp = Opportunity(
        title=payload.title,
        description=payload.description,
        opportunity_type_id=payload.opportunity_type_id,
        company=payload.company,
        location=payload.location,
        deadline=payload.deadline,
        created_by=current_user_id,
        status="OPEN"
    )
    db.add(opp)
    await db.commit()
    await db.refresh(opp)
    return StandardResponse(success=True, data=OpportunityResponse.model_validate(opp).model_dump(mode='json'))

@router.get("/", response_model=StandardResponse)
async def list_opportunities(
    search: str = None, company: str = None, status: str = "OPEN",
    page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)
):
    query = select(Opportunity).where(Opportunity.deleted_at.is_(None))
    if status: query = query.where(Opportunity.status == status)
    if company: query = query.where(Opportunity.company.ilike(f"%{company}%"))
    if search: query = query.where(or_(Opportunity.title.ilike(f"%{search}%"), Opportunity.description.ilike(f"%{search}%")))
    
    query = query.order_by(desc(Opportunity.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[OpportunityResponse.model_validate(i).model_dump(mode='json') for i in items])
