import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.placement_drive import PlacementDrive
from models.enums import DriveStatus

class DriveService:
    @staticmethod
    async def get_drives(db: AsyncSession) -> list[PlacementDrive]:
        result = await db.execute(select(PlacementDrive).order_by(PlacementDrive.created_at.desc()))
        return list(result.scalars().all())

    @staticmethod
    async def create_drive(db: AsyncSession, title: str, company_id: uuid.UUID, description: str | None = None, drive_date: str | None = None) -> PlacementDrive:
        drive = PlacementDrive(
            title=title,
            company_id=company_id,
            description=description,
            drive_date=drive_date,
            status=DriveStatus.DRAFT
        )
        db.add(drive)
        await db.commit()
        await db.refresh(drive)
        return drive
