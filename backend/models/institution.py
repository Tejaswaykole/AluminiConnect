import uuid
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
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
    
    # Relationships
    # Note: typing for back_populates is string based for late binding
    users: Mapped[list["User"]] = relationship("User", back_populates="institution", cascade="all, delete-orphan")
    placement_cells: Mapped[list["PlacementCell"]] = relationship("PlacementCell", back_populates="institution", cascade="all, delete-orphan")


class PlacementCell(BaseModel):
    __tablename__ = "placement_cell"

    institution_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("institution.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String, default="Main Placement Cell")
    contact_email: Mapped[str] = mapped_column(String, nullable=True)
    contact_phone: Mapped[str] = mapped_column(String, nullable=True)

    # Relationships
    institution: Mapped["Institution"] = relationship("Institution", back_populates="placement_cells")
