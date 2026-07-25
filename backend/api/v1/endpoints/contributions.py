from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.contribution_service import ContributionService
from api.dependencies.auth import get_current_user_id
import uuid

router = APIRouter()

@router.get("/")
async def get_my_contributions(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    contributions = await ContributionService.get_contributions_by_user(db, user_id)
    score = await ContributionService.get_total_contribution_score(db, user_id)
    return StandardResponse(success=True, data={
        "score": score,
        "records": [c.__dict__ for c in contributions]
    })
