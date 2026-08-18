import uuid
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Uuid
from .base import BaseModel

class Institution(BaseModel):
    __tablename__ = "institution"

    name: Mapped[str] = mapped_column(String, index=True)
    institution_type: Mapped[str] = mapped_column(String, nullable=True)
    university: Mapped[str] = mapped_column(String, nullable=True)
    accreditation: Mapped[str] = mapped_column(String, nullable=True)
    official_email: Mapped[str] = mapped_column(String, nullable=True)
    website: Mapped[str] = mapped_column(String, nullable=True)
    address: Mapped[str] = mapped_column(String, nullable=True)
    
    # Contact info
    primary_contact_name: Mapped[str] = mapped_column(String, nullable=True)
    principal_name: Mapped[str] = mapped_column(String, nullable=True)
    placement_head_name: Mapped[str] = mapped_column(String, nullable=True)
    
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    
    # Relationships (Legacy users and placement cells removed)
