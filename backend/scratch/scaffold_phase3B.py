import os

backend_dir = "backend"

schema_ops = '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class OpportunityCreate(BaseModel):
    title: str
    description: str
    opportunity_type_id: uuid.UUID
    company: str
    location: Optional[str] = None
    deadline: Optional[datetime] = None

class OpportunityResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    opportunity_type_id: uuid.UUID
    company: str
    location: Optional[str]
    deadline: Optional[datetime]
    status: str
    created_by: uuid.UUID
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
'''

schema_ref = '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ReferralCreate(BaseModel):
    opportunity_info: str
    deadline: Optional[datetime] = None

class ReferralResponse(BaseModel):
    id: uuid.UUID
    alumni_id: uuid.UUID
    opportunity_info: str
    status: str
    deadline: Optional[datetime]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
'''

schema_app = '''
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ApplicationCreate(BaseModel):
    opportunity_id: uuid.UUID
    resume_id: Optional[uuid.UUID] = None

class ApplicationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    opportunity_id: uuid.UUID
    resume_id: Optional[uuid.UUID]
    status: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
'''

with open(os.path.join(backend_dir, "schemas", "opportunities.py"), "w") as f: f.write(schema_ops)
with open(os.path.join(backend_dir, "schemas", "referrals.py"), "w") as f: f.write(schema_ref)
with open(os.path.join(backend_dir, "schemas", "applications.py"), "w") as f: f.write(schema_app)

api_ops = '''
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
'''

api_ref = '''
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
'''

api_app = '''
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
'''

with open(os.path.join(backend_dir, "api", "v1", "endpoints", "opportunities.py"), "w") as f: f.write(api_ops)
with open(os.path.join(backend_dir, "api", "v1", "endpoints", "referrals.py"), "w") as f: f.write(api_ref)
with open(os.path.join(backend_dir, "api", "v1", "endpoints", "applications.py"), "w") as f: f.write(api_app)

# update router.py
router_path = os.path.join(backend_dir, "api", "v1", "router.py")
with open(router_path, "r") as f: router_code = f.read()
if "opportunities.router" not in router_code:
    with open(router_path, "a") as f:
        f.write('''
from api.v1.endpoints import opportunities, referrals, applications
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Opportunities"])
api_router.include_router(referrals.router, prefix="/referrals", tags=["Referrals"])
api_router.include_router(applications.router, prefix="/applications", tags=["Applications"])
''')

print("Phase 3B APIs Generated!")
