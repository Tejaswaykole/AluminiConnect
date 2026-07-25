from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.audit_service import AuditService
from api.dependencies.auth import get_current_user_id
import uuid

router = APIRouter()

@router.get("/")
async def get_recent_audit_logs(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    # TODO: Add RBAC check for InstitutionAdmin only
    logs = await AuditService.get_logs(db, limit=100)
    return StandardResponse(success=True, data=[log.__dict__ for log in logs])
