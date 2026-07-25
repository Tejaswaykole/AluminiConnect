import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.application import JobApplication
from models.enums import ApplicationStatus

class ApplicationService:
    @staticmethod
    async def get_applications_by_user(db: AsyncSession, user_id: uuid.UUID) -> list[JobApplication]:
        result = await db.execute(select(JobApplication).where(JobApplication.user_id == user_id))
        return list(result.scalars().all())

    @staticmethod
    async def apply_to_opportunity(db: AsyncSession, user_id: uuid.UUID, opportunity_id: uuid.UUID, resume_id: uuid.UUID | None = None) -> JobApplication:
        application = JobApplication(
            user_id=user_id,
            opportunity_id=opportunity_id,
            resume_id=resume_id,
            status=ApplicationStatus.APPLIED
        )
        db.add(application)
        await db.commit()
        await db.refresh(application)
        return application
    
    @staticmethod
    async def update_application_status(db: AsyncSession, application_id: uuid.UUID, new_status: ApplicationStatus) -> JobApplication | None:
        application = await db.get(JobApplication, application_id)
        if application:
            application.status = new_status
            await db.commit()
            await db.refresh(application)
        return application
