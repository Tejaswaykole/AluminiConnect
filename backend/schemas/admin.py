import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class AdminUserUpdate(BaseModel):
    account_status: str

class AdminUserResponse(BaseModel):
    id: uuid.UUID
    email: str
    role: str
    account_status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)