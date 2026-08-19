import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.admin import AdminUserResponse, AdminUserUpdate
from models.user import User
from models.enums import UserRole
from api.dependencies.auth import get_current_user

router = APIRouter()

async def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

@router.get("/users", response_model=StandardResponse)
async def list_users(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), admin: User = Depends(require_admin)):
    query = select(User).order_by(desc(User.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[AdminUserResponse.model_validate(i).model_dump(mode='json') for i in items])

@router.put("/users/{user_id}/status", response_model=StandardResponse)
async def update_user_status(user_id: uuid.UUID, payload: AdminUserUpdate, db: AsyncSession = Depends(get_db), admin: User = Depends(require_admin)):
    res = await db.execute(select(User).where(User.id == user_id))
    u = res.scalars().first()
    if not u: raise HTTPException(status_code=404, detail="User not found")
    u.account_status = payload.account_status
    await db.commit()
    return StandardResponse(success=True, message="Status updated")