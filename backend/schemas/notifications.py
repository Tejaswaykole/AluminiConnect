from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class NotificationsBase(BaseModel):
    pass

class NotificationsCreate(NotificationsBase):
    pass

class NotificationsUpdate(BaseModel):
    pass

class NotificationsResponse(NotificationsBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
