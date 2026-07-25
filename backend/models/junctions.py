import uuid
from datetime import datetime
from sqlalchemy import ForeignKey, DateTime, text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from .base import BaseModel

class StudentSkill(BaseModel):
    __tablename__ = "student_skill"
    student_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("student_profile.id", ondelete="CASCADE"), index=True)
    skill_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("skill.id", ondelete="CASCADE"), index=True)

class AlumniSkill(BaseModel):
    __tablename__ = "alumni_skill"
    alumni_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("alumni_profile.id", ondelete="CASCADE"), index=True)
    skill_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("skill.id", ondelete="CASCADE"), index=True)

class OpportunitySkill(BaseModel):
    __tablename__ = "opportunity_skill"
    opportunity_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("opportunity.id", ondelete="CASCADE"), index=True)
    skill_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("skill.id", ondelete="CASCADE"), index=True)

class CommunityMembership(BaseModel):
    __tablename__ = "community_membership"
    community_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("community.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    joined_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))

class EventRegistration(BaseModel):
    __tablename__ = "event_registration"
    event_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("event.id", ondelete="CASCADE"), index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    registered_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=text("now()"))