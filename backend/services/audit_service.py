import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.audit_log import AuditLog

class AuditService:
    @staticmethod
    async def log_action(db: AsyncSession, user_id: uuid.UUID | None, action: str, resource_type: str, resource_id: uuid.UUID | None = None, details: dict | None = None) -> AuditLog:
        log = AuditLog(
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            details=details
        )
        db.add(log)
        await db.commit()
        await db.refresh(log)
        return log

    @staticmethod
    async def get_logs(db: AsyncSession, limit: int = 50) -> list[AuditLog]:
        result = await db.execute(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(limit))
        return list(result.scalars().all())
