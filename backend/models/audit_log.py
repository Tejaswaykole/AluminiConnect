import uuid
from sqlalchemy import String, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from .base import BaseModel

class AuditLog(BaseModel):
    __tablename__ = "audit_log"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True, index=True)
    action: Mapped[str] = mapped_column(String, index=True) # e.g. "APPROVED_DRIVE", "CHANGED_ROLE"
    resource_type: Mapped[str] = mapped_column(String) # e.g. "DRIVE", "USER"
    resource_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    details: Mapped[dict] = mapped_column(JSON, nullable=True)
    
    # Relationships
    user: Mapped["User"] = relationship("User")
