
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from models.mentorship import MentorshipStatus

class MentorshipCreateRequest(BaseModel):
    mentor_id: uuid.UUID
    notes: Optional[str] = None

class MentorshipResponse(BaseModel):
    id: uuid.UUID
    mentor_id: uuid.UUID
    student_id: uuid.UUID
    status: MentorshipStatus
    notes: Optional[str] = None
    request_date: Optional[datetime]
    accepted_date: Optional[datetime]
    
    model_config = ConfigDict(from_attributes=True)
