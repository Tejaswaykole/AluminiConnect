from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class FilesBase(BaseModel):
    pass

class FilesCreate(FilesBase):
    pass

class FilesUpdate(BaseModel):
    pass

class FilesResponse(FilesBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
