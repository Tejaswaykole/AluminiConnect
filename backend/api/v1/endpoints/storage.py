import uuid
import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from schemas.storage import FileMetadataResponse
from models.file import FileMetadata
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/upload", response_model=StandardResponse)
async def upload_file(file: UploadFile = File(...), current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    # Ensure S3 / Storage integration exists. For now, mock it as requested to just report missing configuration.
    if not os.getenv("S3_BUCKET_NAME"):
        raise HTTPException(status_code=501, detail="Storage configuration missing (S3_BUCKET_NAME not set)")
        
    fm = FileMetadata(
        uploader_id=current_user_id,
        bucket_name=os.getenv("S3_BUCKET_NAME"),
        file_path=f"uploads/{uuid.uuid4()}_{file.filename}",
        file_type=file.content_type,
        file_size_bytes=0 # mock
    )
    db.add(fm)
    await db.commit()
    await db.refresh(fm)
    return StandardResponse(success=True, data=FileMetadataResponse.model_validate(fm).model_dump(mode='json'))
