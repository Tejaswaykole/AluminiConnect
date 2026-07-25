import os

backend_dir = r"c:\Users\tejas\OneDrive\Desktop\ALumini\backend"
core_dir = os.path.join(backend_dir, "core")
deps_dir = os.path.join(backend_dir, "api", "dependencies")
services_dir = os.path.join(backend_dir, "services")

# 1. core/exceptions.py
exc_py = """from fastapi import HTTPException, status

class DomainException(HTTPException):
    def __init__(self, detail: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        super().__init__(status_code=status_code, detail=detail)

class DuplicateRegistrationException(DomainException):
    def __init__(self):
        super().__init__(detail="User is already registered for this event.")

class CommunityAccessDeniedException(DomainException):
    def __init__(self):
        super().__init__(detail="Access denied. You are not a member of this community.", status_code=status.HTTP_403_FORBIDDEN)

class MentorshipUnavailableException(DomainException):
    def __init__(self):
        super().__init__(detail="Alumni is currently not accepting mentorship requests.")

class OpportunityClosedException(DomainException):
    def __init__(self):
        super().__init__(detail="This opportunity is closed and no longer accepting applications.")
"""
with open(os.path.join(core_dir, "exceptions.py"), "w", encoding="utf-8") as f: f.write(exc_py)

# 2. api/dependencies/auth.py (JWT + RBAC)
auth_py = """from typing import List, Optional
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
"""
with open(os.path.join(deps_dir, "auth.py"), "w", encoding="utf-8") as f: f.write(auth_py)

# 3. Notification Service placeholder
notif_py = """import logging
from typing import Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

async def create_notification(db: AsyncSession, user_id: uuid.UUID, message: str, notif_type: str):
    logger.info(f"Audit/Notification generated for user {user_id}: [{notif_type}] {message}")
    # In a full implementation, insert into notifications table here
"""
with open(os.path.join(services_dir, "notification_service.py"), "w", encoding="utf-8") as f: f.write(notif_py)

print("Phase 10 core business scaffold created.")
