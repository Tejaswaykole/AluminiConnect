import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_
from models.message import Message
from models.enums import MessageContext

class MessageService:
    @staticmethod
    async def get_messages_by_context(db: AsyncSession, user_id: uuid.UUID, context: MessageContext) -> list[Message]:
        result = await db.execute(
            select(Message)
            .where(
                and_(
                    Message.context == context,
                    or_(Message.sender_id == user_id, Message.receiver_id == user_id)
                )
            )
            .order_by(Message.created_at.desc())
        )
        return list(result.scalars().all())

    @staticmethod
    async def send_message(db: AsyncSession, sender_id: uuid.UUID, receiver_id: uuid.UUID, context: MessageContext, content: str) -> Message:
        message = Message(
            sender_id=sender_id,
            receiver_id=receiver_id,
            context=context,
            content=content
        )
        db.add(message)
        await db.commit()
        await db.refresh(message)
        return message
