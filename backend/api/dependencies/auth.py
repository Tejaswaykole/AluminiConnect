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

async def get_current_user_id(authorization: Optional[str] = Header(None)) -> uuid.UUID:
    if not authorization:
        # Fallback for dev
        return uuid.uuid4()
    return uuid.uuid4()
