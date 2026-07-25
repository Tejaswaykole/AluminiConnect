import uuid
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import BaseModel

class Company(BaseModel):
    __tablename__ = "company"

    name: Mapped[str] = mapped_column(String, index=True, unique=True)
    website: Mapped[str] = mapped_column(String, nullable=True)
    industry: Mapped[str] = mapped_column(String, nullable=True)
    description: Mapped[str] = mapped_column(String, nullable=True)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    
    # Relationships
    # A company has multiple recruiters (users with COMPANY_RECRUITER role and company_id)
    recruiters: Mapped[list["User"]] = relationship("User", back_populates="company")
