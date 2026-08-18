import uuid
from datetime import datetime
from sqlalchemy import String, Enum, DateTime, ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, Index
from .base import BaseModel
from .enums import MentorshipStatus

class MentorshipRequest(BaseModel):
    __tablename__ = "mentorship_request"

    mentor_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("alumni_profile.id", ondelete="CASCADE"), index=True)
    student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("student_profile.id", ondelete="CASCADE"), index=True)
    status: Mapped[MentorshipStatus] = mapped_column(Enum(MentorshipStatus, name="mentorshipstatus_enum"))
    notes: Mapped[str] = mapped_column(String, nullable=True)
    request_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP"))
    accepted_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        Index(
            "uq_active_mentorship",
            "mentor_id",
            "student_id",
            unique=True,
            postgresql_where=text("status IN ('PENDING', 'ACCEPTED')")
        ),
    )