from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from services.portfolio_service import PortfolioService
from api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker
import uuid
from pydantic import BaseModel

router = APIRouter()

class PortfolioItemCreate(BaseModel):
    title: str
    item_type: str
    description: str | None = None
    link: str | None = None

@router.get("/", dependencies=[Depends(get_current_user)])
async def get_my_portfolio(
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    items = await PortfolioService.get_portfolio_by_user(db, user_id)
    return StandardResponse(success=True, data=[i.__dict__ for i in items])

@router.post("/", dependencies=[Depends(RoleChecker(["STUDENT", "ALUMNI"]))])
async def add_portfolio_item(
    data: PortfolioItemCreate,
    db: AsyncSession = Depends(get_db),
    user_id: uuid.UUID = Depends(get_current_user_id)
):
    item = await PortfolioService.add_portfolio_item(db, user_id, data.title, data.item_type, data.description, data.link)
    return StandardResponse(success=True, data=item.__dict__, message="Portfolio item added")
