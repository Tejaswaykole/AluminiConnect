import uuid
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from models.user import User

router = APIRouter()

@router.get('/')
async def list_users(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).limit(params.limit).offset(params.skip))
    users = result.scalars().all()
    user_list = [
        {
            "id": str(u.id),
            "email": u.email,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "role": u.role.value if hasattr(u.role, 'value') else u.role
        } for u in users
    ]
    return StandardResponse(success=True, data=user_list)

@router.get('/me')
async def get_me(user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    u = result.scalars().first()
    if not u:
        return StandardResponse(success=False, message="User not found", data=None)
    
    data = {
        "id": str(u.id),
        "email": u.email,
        "first_name": u.first_name,
        "last_name": u.last_name,
        "role": u.role.value if hasattr(u.role, 'value') else u.role
    }
    return StandardResponse(success=True, data=data)
