import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class InstituteUserResponse(BaseModel):
    id: uuid.UUID
    email: str
    role: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)