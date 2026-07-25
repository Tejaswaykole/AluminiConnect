from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class EventsBase(BaseModel):
    pass

class EventsCreate(EventsBase):
    pass

class EventsUpdate(BaseModel):
    pass

class EventsResponse(EventsBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
