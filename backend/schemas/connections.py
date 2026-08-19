
import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from models.connection import ConnectionStatus

class ConnectionRequest(BaseModel):
    target_id: uuid.UUID

class ConnectionResponse(BaseModel):
    id: uuid.UUID
    requester_id: uuid.UUID
    target_id: uuid.UUID
    status: ConnectionStatus
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
