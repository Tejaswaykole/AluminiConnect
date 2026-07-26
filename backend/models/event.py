import uuid
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid
from .base import BaseModel

class Event(BaseModel):
    __tablename__ = "event"

    title: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String, nullable=True)
    banner_url: Mapped[str] = mapped_column(String, nullable=True)
    venue: Mapped[str] = mapped_column(String, nullable=True)
    event_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), index=True)
    organizer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    capacity: Mapped[int] = mapped_column(Integer, nullable=True)
    registration_deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)