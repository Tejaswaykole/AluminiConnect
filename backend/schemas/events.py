import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    description: str
    venue: str
    event_date: datetime
    capacity: Optional[int] = None
    registration_deadline: Optional[datetime] = None
    
class EventResponse(BaseModel):
    id: uuid.UUID
    title: str
    description: str
    venue: str
    event_date: datetime
    organizer_id: uuid.UUID
    capacity: Optional[int]
    registration_deadline: Optional[datetime]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class EventRegistrationCreate(BaseModel):
    event_id: uuid.UUID
    
class EventRegistrationResponse(BaseModel):
    event_id: uuid.UUID
    user_id: uuid.UUID
    registered_at: datetime
    model_config = ConfigDict(from_attributes=True)
