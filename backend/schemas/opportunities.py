
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class OpportunityCreate(BaseModel):
    title: str
    description: str
    opportunity_type_id: uuid.UUID
    company: str
    location: Optional[str] = None
    deadline: Optional[datetime] = None

class OpportunityResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    opportunity_type_id: uuid.UUID
    company: str
    location: Optional[str]
    deadline: Optional[datetime]
    status: str
    created_by: uuid.UUID
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
