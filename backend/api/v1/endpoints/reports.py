import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.reports import ReportCreate, ReportResponse
from models.foundation import Report, ReportStatus
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_report(payload: ReportCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    report = Report(
        reporter_id=current_user_id,
        reported_entity_type=payload.reported_entity_type,
        reported_entity_id=payload.reported_entity_id,
        reason=payload.reason,
        status=ReportStatus.OPEN
    )
    db.add(report)
    await db.commit()
    await db.refresh(report)
    return StandardResponse(success=True, data=ReportResponse.model_validate(report).model_dump(mode='json'))
