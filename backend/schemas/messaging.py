
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class MessageCreate(BaseModel):
    receiver_id: uuid.UUID
    content: str
    context: Optional[str] = None

class MessageResponse(BaseModel):
    id: uuid.UUID
    sender_id: uuid.UUID
    receiver_id: uuid.UUID
    content: str
    context: Optional[str] = None
    is_read: bool
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
