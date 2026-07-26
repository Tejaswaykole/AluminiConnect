import uuid
from sqlalchemy import String, ForeignKey, Enum, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid
from .base import BaseModel
from .enums import DriveStatus

class PlacementDrive(BaseModel):
    __tablename__ = "placement_drive"

    title: Mapped[str] = mapped_column(String)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("company.id", ondelete="CASCADE"), index=True)
    status: Mapped[DriveStatus] = mapped_column(Enum(DriveStatus, name="drivestatus_enum"), default=DriveStatus.DRAFT)
    description: Mapped[str] = mapped_column(String, nullable=True)
    eligible_batches: Mapped[str] = mapped_column(String, nullable=True) # e.g. "2024,2025"
    eligible_departments: Mapped[str] = mapped_column(String, nullable=True) # e.g. "CS,IT"
    drive_date: Mapped[str] = mapped_column(String, nullable=True)
    
    # Relationships
    company: Mapped["Company"] = relationship("Company", backref="drives")
