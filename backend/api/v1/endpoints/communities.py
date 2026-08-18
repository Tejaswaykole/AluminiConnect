import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker

router = APIRouter()

@router.get('/', dependencies=[Depends(get_current_user)])
async def list_communities(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    return StandardResponse(success=True, data=[])
