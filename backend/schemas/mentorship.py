from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class MentorshipBase(BaseModel):
    pass

class MentorshipCreate(MentorshipBase):
    pass

class MentorshipUpdate(BaseModel):
    pass

class MentorshipResponse(MentorshipBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
