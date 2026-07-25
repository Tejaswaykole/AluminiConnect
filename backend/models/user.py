import uuid
from sqlalchemy import String, Boolean, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel
from .enums import UserRole, VerificationStatus

class User(BaseModel):
    __tablename__ = "user"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    external_auth_id: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="userrole_enum"))
    verification_status: Mapped[VerificationStatus] = mapped_column(Enum(VerificationStatus, name="verificationstatus_enum"), default=VerificationStatus.PENDING)
    
    # Multi-tenancy
    institution_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("institution.id", ondelete="CASCADE"), nullable=True)
    company_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("company.id", ondelete="CASCADE"), nullable=True)
    
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    first_name: Mapped[str] = mapped_column(String, nullable=True)
    last_name: Mapped[str] = mapped_column(String, nullable=True)
    avatar_url: Mapped[str] = mapped_column(String, nullable=True)
    
    # Relationships
    institution: Mapped["Institution"] = relationship("Institution", back_populates="users")
    company: Mapped["Company"] = relationship("Company", back_populates="recruiters")