import uuid
from sqlalchemy import String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid, UniqueConstraint
from .base import BaseModel
from .enums import ApplicationStatus

class JobApplication(BaseModel):
    __tablename__ = "job_application"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    opportunity_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("opportunity.id", ondelete="CASCADE"), index=True)
    resume_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("resume.id", ondelete="SET NULL"), nullable=True)
    status: Mapped[ApplicationStatus] = mapped_column(Enum(ApplicationStatus, name="applicationstatus_enum"), default=ApplicationStatus.APPLIED)
    
    # Relationships
    user: Mapped["User"] = relationship("User", backref="applications")
    opportunity: Mapped["Opportunity"] = relationship("Opportunity", back_populates="applications")
    resume: Mapped["Resume"] = relationship("Resume")

    __table_args__ = (
        UniqueConstraint("user_id", "opportunity_id", name="uq_job_application_user_opp"),
    )
