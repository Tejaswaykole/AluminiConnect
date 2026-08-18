import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.institute import InstituteUserResponse
from models.user import User
from models.enums import UserRole
from api.dependencies.auth import get_current_user

router = APIRouter()

async def require_institute(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.INSTITUTE:
        raise HTTPException(status_code=403, detail="Institute access required")
    return current_user

@router.get("/students", response_model=StandardResponse)
async def list_students(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), inst: User = Depends(require_institute)):
    query = select(User).where(User.role == UserRole.STUDENT).order_by(desc(User.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[InstituteUserResponse.model_validate(i).model_dump(mode='json') for i in items])