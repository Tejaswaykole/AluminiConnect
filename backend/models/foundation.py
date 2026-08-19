import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel
import enum

class ReferralStatus(str, enum.Enum):
    PENDING = "PENDING"
    REVIEWED = "REVIEWED"
    ACCEPTED = "ACCEPTED"
    REJECTED = "REJECTED"

class ReportStatus(str, enum.Enum):
    OPEN = "OPEN"
    INVESTIGATING = "INVESTIGATING"
    RESOLVED = "RESOLVED"
    DISMISSED = "DISMISSED"

class AnnouncementStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    ARCHIVED = "ARCHIVED"

class Referral(BaseModel):
    __tablename__ = "referral"

    alumni_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"))
    opportunity_info: Mapped[str] = mapped_column(String)
    status: Mapped[ReferralStatus] = mapped_column(Enum(ReferralStatus, name="referralstatus_enum"), default=ReferralStatus.PENDING)
    deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)

class Report(BaseModel):
    __tablename__ = "report"

    reporter_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    reported_entity_type: Mapped[str] = mapped_column(String) # e.g. "USER", "POST", "COMMENT"
    reported_entity_id: Mapped[str] = mapped_column(String)
    reason: Mapped[str] = mapped_column(String)
    status: Mapped[ReportStatus] = mapped_column(Enum(ReportStatus, name="reportstatus_enum"), default=ReportStatus.OPEN)
    moderation_action: Mapped[str] = mapped_column(String, nullable=True)

class Announcement(BaseModel):
    __tablename__ = "announcement"

    author_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    scope: Mapped[str] = mapped_column(String) # e.g. "PLATFORM", "DEPARTMENT"
    target_audience: Mapped[str] = mapped_column(String) # e.g. "ALL", "ALUMNI", "STUDENTS"
    title: Mapped[str] = mapped_column(String)
    content: Mapped[str] = mapped_column(String)
    status: Mapped[AnnouncementStatus] = mapped_column(Enum(AnnouncementStatus, name="announcementstatus_enum"), default=AnnouncementStatus.DRAFT)
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
