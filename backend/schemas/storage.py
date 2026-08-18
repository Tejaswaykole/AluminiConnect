import uuid
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

class FileMetadataResponse(BaseModel):
    id: uuid.UUID
    uploader_id: uuid.UUID
    file_path: str
    file_type: str
    file_size_bytes: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)