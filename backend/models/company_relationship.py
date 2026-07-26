import uuid
from sqlalchemy import String, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid
from .base import BaseModel
import enum

class PartnershipStatus(str, enum.Enum):
    PROSPECT = "PROSPECT"
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"

class CompanyRelationship(BaseModel):
    __tablename__ = "company_relationship"

    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("company.id", ondelete="CASCADE"), index=True, unique=True)
    status: Mapped[PartnershipStatus] = mapped_column(Enum(PartnershipStatus, name="partnershipstatus_enum"), default=PartnershipStatus.PROSPECT)
    account_manager_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True) # Typically a Placement Officer
    notes: Mapped[str] = mapped_column(String, nullable=True)
    
    # Relationships
    company: Mapped["Company"] = relationship("Company", backref="relationship")
    account_manager: Mapped["User"] = relationship("User")
