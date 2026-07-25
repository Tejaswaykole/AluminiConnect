import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from models.contribution import ContributionRecord

class ContributionService:
    @staticmethod
    async def get_contributions_by_user(db: AsyncSession, user_id: uuid.UUID) -> list[ContributionRecord]:
        result = await db.execute(select(ContributionRecord).where(ContributionRecord.user_id == user_id).order_by(ContributionRecord.created_at.desc()))
        return list(result.scalars().all())

    @staticmethod
    async def get_total_contribution_score(db: AsyncSession, user_id: uuid.UUID) -> int:
        result = await db.execute(select(func.sum(ContributionRecord.points)).where(ContributionRecord.user_id == user_id))
        score = result.scalar()
        return score if score else 0

    @staticmethod
    async def add_contribution(db: AsyncSession, user_id: uuid.UUID, activity_type: str, points: int, description: str | None = None) -> ContributionRecord:
        record = ContributionRecord(
            user_id=user_id,
            activity_type=activity_type,
            points=points,
            description=description
        )
        db.add(record)
        await db.commit()
        await db.refresh(record)
        return record
