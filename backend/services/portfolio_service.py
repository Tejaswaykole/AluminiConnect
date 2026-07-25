import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.portfolio import PortfolioItem

class PortfolioService:
    @staticmethod
    async def get_portfolio_by_user(db: AsyncSession, user_id: uuid.UUID) -> list[PortfolioItem]:
        result = await db.execute(select(PortfolioItem).where(PortfolioItem.user_id == user_id).order_by(PortfolioItem.created_at.desc()))
        return list(result.scalars().all())

    @staticmethod
    async def add_portfolio_item(db: AsyncSession, user_id: uuid.UUID, title: str, item_type: str, description: str | None = None, link: str | None = None) -> PortfolioItem:
        item = PortfolioItem(
            user_id=user_id,
            title=title,
            description=description,
            link=link,
            item_type=item_type
        )
        db.add(item)
        await db.commit()
        await db.refresh(item)
        return item
