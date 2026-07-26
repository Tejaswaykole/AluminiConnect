import uuid
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from models.opportunity import Opportunity
from models.enums import OpportunityStatus
from pydantic import BaseModel

router = APIRouter()

class OpportunityCreate(BaseModel):
    title: str
    description: str
    company: str
    location: str | None = None
    deadline: datetime | None = None

@router.get('/')
async def list_opportunities(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Opportunity).limit(params.limit).offset(params.skip))
    opps = result.scalars().all()
    opp_list = [
        {
            "id": str(o.id),
            "title": o.title,
            "description": o.description,
            "company": o.company,
            "location": o.location,
            "deadline": o.deadline.isoformat() if o.deadline else None,
            "status": o.status.value if hasattr(o.status, 'value') else o.status
        } for o in opps
    ]
    return StandardResponse(success=True, data=opp_list)

@router.post('/')
async def create_opportunity(
    data: OpportunityCreate,
    user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    new_opp = Opportunity(
        title=data.title,
        description=data.description,
        company=data.company,
        location=data.location,
        deadline=data.deadline,
        status=OpportunityStatus.OPEN,
        created_by=user_id
    )
    db.add(new_opp)
    await db.commit()
    await db.refresh(new_opp)
    return StandardResponse(success=True, message="Opportunity created successfully", data={"id": str(new_opp.id)})
