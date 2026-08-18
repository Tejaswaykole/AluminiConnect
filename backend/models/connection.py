import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey, Enum, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel
import enum
from sqlalchemy.sql import func

class ConnectionStatus(str, enum.Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"
    BLOCKED = "BLOCKED"

class Connection(BaseModel):
    __tablename__ = "connection"

    requester_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    target_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    status: Mapped[ConnectionStatus] = mapped_column(Enum(ConnectionStatus, name="connectionstatus_enum"), default=ConnectionStatus.PENDING)
    
    __table_args__ = (
        UniqueConstraint("requester_id", "target_id", name="uq_connection_requester_target"),
        CheckConstraint("requester_id != target_id", name="check_no_self_connection"),
    )
