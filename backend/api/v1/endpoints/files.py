import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.get('/')
async def list_files(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    return StandardResponse(success=True, data=[])
