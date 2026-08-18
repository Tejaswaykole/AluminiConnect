import uuid
from sqlalchemy import String, Boolean, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel
from .enums import UserRole, VerificationStatus, AccountStatus

class User(BaseModel):
    __tablename__ = "user"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    external_auth_id: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="userrole_enum"))
    verification_status: Mapped[VerificationStatus] = mapped_column(Enum(VerificationStatus, name="verificationstatus_enum"), default=VerificationStatus.PENDING)
    
    # Removed legacy multi-tenancy keys (institution_id, company_id)
    
    hashed_password: Mapped[str] = mapped_column(String, nullable=True)
    account_status: Mapped[AccountStatus] = mapped_column(Enum(AccountStatus, name="accountstatus_enum"), default=AccountStatus.ACTIVE)
    
    first_name: Mapped[str] = mapped_column(String, nullable=True)
    last_name: Mapped[str] = mapped_column(String, nullable=True)
    avatar_url: Mapped[str] = mapped_column(String, nullable=True)
    
    # Relationships (Legacy institution/company relationships removed)