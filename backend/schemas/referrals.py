
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ReferralCreate(BaseModel):
    opportunity_info: str
    deadline: Optional[datetime] = None

class ReferralResponse(BaseModel):
    id: uuid.UUID
    alumni_id: uuid.UUID
    opportunity_info: str
    status: str
    deadline: Optional[datetime]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
