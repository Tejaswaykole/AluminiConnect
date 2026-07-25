from pydantic import BaseModel
from typing import Optional, List
import uuid
from datetime import datetime

class UsersBase(BaseModel):
    pass

class UsersCreate(UsersBase):
    pass

class UsersUpdate(BaseModel):
    pass

class UsersResponse(UsersBase):
    id: uuid.UUID
    class Config:
        from_attributes = True
