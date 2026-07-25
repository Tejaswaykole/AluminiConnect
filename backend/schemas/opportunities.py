from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class OpportunitiesBase(BaseModel):
    pass

class OpportunitiesCreate(OpportunitiesBase):
    pass

class OpportunitiesUpdate(BaseModel):
    pass

class OpportunitiesResponse(OpportunitiesBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
