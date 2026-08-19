import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class ReportCreate(BaseModel):
    reported_entity_type: str
    reported_entity_id: uuid.UUID
    reason: str
    
class ReportResponse(BaseModel):
    id: uuid.UUID
    reporter_id: uuid.UUID
    reported_entity_type: str
    reported_entity_id: uuid.UUID
    reason: str
    status: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
