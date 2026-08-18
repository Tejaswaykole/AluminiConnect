import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from database.session import get_db
from schemas.base import StandardResponse
from schemas.analytics import AnalyticsResponse
from models.user import User
from models.enums import UserRole
from models.connection import Connection
from models.opportunity import Opportunity
from models.event import Event
from models.foundation import Report
from api.dependencies.auth import get_current_user

router = APIRouter()

async def require_admin_or_institute(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRole.ADMIN, UserRole.INSTITUTE]:
        raise HTTPException(status_code=403, detail="Elevated access required")
    return current_user

@router.get("/", response_model=StandardResponse)
async def get_analytics(db: AsyncSession = Depends(get_db), user: User = Depends(require_admin_or_institute)):
    # Very basic counts for demonstration
    total = await db.execute(select(func.count(User.id)))
    students = await db.execute(select(func.count(User.id)).where(User.role == UserRole.STUDENT))
    alumni = await db.execute(select(func.count(User.id)).where(User.role == UserRole.ALUMNI))
    
    conns = await db.execute(select(func.count(Connection.id)))
    opps = await db.execute(select(func.count(Opportunity.id)))
    events = await db.execute(select(func.count(Event.id)))
    reports = await db.execute(select(func.count(Report.id)))
    
    data = AnalyticsResponse(
        total_users=total.scalar() or 0,
        students=students.scalar() or 0,
        alumni=alumni.scalar() or 0,
        active_users=0,
        suspended_users=0,
        connections=conns.scalar() or 0,
        opportunities=opps.scalar() or 0,
        events=events.scalar() or 0,
        reports=reports.scalar() or 0
    )
    return StandardResponse(success=True, data=data.model_dump(mode='json'))