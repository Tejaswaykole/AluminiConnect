import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class CommunityCreate(BaseModel):
    name: str
    description: str
    category_id: Optional[uuid.UUID] = None
    visibility: str = "PUBLIC"
    
class CommunityResponse(BaseModel):
    id: uuid.UUID
    name: str
    description: str
    visibility: str
    created_by: uuid.UUID
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class CommunityPostCreate(BaseModel):
    community_id: uuid.UUID
    content: str
    
class CommunityPostResponse(BaseModel):
    id: uuid.UUID
    community_id: uuid.UUID
    author_id: uuid.UUID
    content: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
