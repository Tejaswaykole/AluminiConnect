
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ApplicationCreate(BaseModel):
    opportunity_id: uuid.UUID
    resume_id: Optional[uuid.UUID] = None

class ApplicationResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    opportunity_id: uuid.UUID
    resume_id: Optional[uuid.UUID]
    status: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
