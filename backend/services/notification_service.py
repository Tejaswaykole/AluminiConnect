import logging
from typing import Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)

async def create_notification(db: AsyncSession, user_id: uuid.UUID, message: str, notif_type: str):
    logger.info(f"Audit/Notification generated for user {user_id}: [{notif_type}] {message}")
    # In a full implementation, insert into notifications table here
