import uuid
from datetime import datetime
from sqlalchemy import String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid
from .base import BaseModel
from .enums import OpportunityStatus

class Opportunity(BaseModel):
    __tablename__ = "opportunity"

    title: Mapped[str] = mapped_column(String, index=True)
    description: Mapped[str] = mapped_column(String)
    opportunity_type_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("opportunity_type.id", ondelete="SET NULL"), nullable=True)
    company: Mapped[str] = mapped_column(String)
    location: Mapped[str] = mapped_column(String, nullable=True)
    deadline: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[OpportunityStatus] = mapped_column(Enum(OpportunityStatus, name="opportunitystatus_enum"))
    created_by: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    deleted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True, index=True)

    # Relationships
    applications: Mapped[list["JobApplication"]] = relationship("JobApplication", back_populates="opportunity", cascade="all, delete-orphan")