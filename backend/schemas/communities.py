from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class CommunitiesBase(BaseModel):
    pass

class CommunitiesCreate(CommunitiesBase):
    pass

class CommunitiesUpdate(BaseModel):
    pass

class CommunitiesResponse(CommunitiesBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
