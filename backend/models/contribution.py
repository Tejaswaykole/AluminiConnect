import uuid
from sqlalchemy import String, ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from .base import BaseModel

class ContributionRecord(BaseModel):
    __tablename__ = "contribution_record"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    activity_type: Mapped[str] = mapped_column(String) # e.g. 'MENTORSHIP_HOUR', 'JOB_REFERRAL', 'GUEST_LECTURE'
    points: Mapped[int] = mapped_column(Integer, default=10)
    description: Mapped[str] = mapped_column(String, nullable=True)
    
    # Relationships
    user: Mapped["User"] = relationship("User", backref="contributions")
