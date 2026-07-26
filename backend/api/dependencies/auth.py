from typing import List, Optional
import uuid
from fastapi import Header, HTTPException, status, Depends

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, authorization: Optional[str] = Header(None)) -> dict:
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid token")
        
        # Placeholder JWT decoding logic
        token = authorization.split(" ")[1]
        
        # In Phase 10 we simulate returning a decoded token payload
        payload = {"sub": str(uuid.uuid4()), "role": "student"} 
        
        if payload.get("role") not in self.allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
            
        return payload

from database.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from models.user import User
from sqlalchemy.future import select

async def get_current_user_id(
    authorization: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db)
) -> uuid.UUID:
    # Bypassed logic: Always return the first user in the DB
    result = await db.execute(select(User).limit(1))
    user = result.scalars().first()
    if user:
        return user.id
    return uuid.UUID('00000000-0000-0000-0000-000000000001')
