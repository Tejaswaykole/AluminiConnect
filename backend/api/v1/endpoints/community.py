import uuid
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.community import CommunityCreate, CommunityResponse, CommunityPostCreate, CommunityPostResponse
from models.community import Community, CommunityPost
from api.dependencies.auth import get_current_user_id

router = APIRouter()

@router.post("/", response_model=StandardResponse)
async def create_community(payload: CommunityCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    com = Community(
        name=payload.name,
        description=payload.description,
        visibility=payload.visibility,
        created_by=current_user_id
    )
    db.add(com)
    await db.commit()
    await db.refresh(com)
    return StandardResponse(success=True, data=CommunityResponse.model_validate(com).model_dump(mode='json'))

@router.get("/", response_model=StandardResponse)
async def list_communities(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), db: AsyncSession = Depends(get_db), current_user_id: uuid.UUID = Depends(get_current_user_id)):
    query = select(Community).where(Community.deleted_at.is_(None)).order_by(desc(Community.created_at)).limit(page_size).offset((page-1)*page_size)
    result = await db.execute(query)
    items = result.scalars().all()
    return StandardResponse(success=True, data=[CommunityResponse.model_validate(i).model_dump(mode='json') for i in items])

@router.post("/posts", response_model=StandardResponse)
async def create_post(payload: CommunityPostCreate, current_user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    post = CommunityPost(
        community_id=payload.community_id,
        author_id=current_user_id,
        content=payload.content
    )
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return StandardResponse(success=True, data=CommunityPostResponse.model_validate(post).model_dump(mode='json'))
