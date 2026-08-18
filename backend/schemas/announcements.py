import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    scope: str
    target_audience: Optional[str] = None
    
class AnnouncementResponse(BaseModel):
    id: uuid.UUID
    title: str
    content: str
    scope: str
    target_audience: Optional[str]
    author_id: uuid.UUID
    status: str
    published_at: Optional[datetime]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
