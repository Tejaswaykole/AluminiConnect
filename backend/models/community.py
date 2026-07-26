import uuid
from datetime import datetime
from sqlalchemy import String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Uuid, JSON
from .base import BaseModel
from .enums import CommunityVisibility

class Community(BaseModel):
    __tablename__ = "community"

    name: Mapped[str] = mapped_column(String, unique=True, index=True)
    description: Mapped[str] = mapped_column(String, nullable=True)
    category_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("community_category.id", ondelete="SET NULL"), nullable=True)
    cover_image_url: Mapped[str] = mapped_column(String, nullable=True)
    visibility: Mapped[CommunityVisibility] = mapped_column(Enum(CommunityVisibility, name="communityvisibility_enum"))
    created_by: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    deleted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True, index=True)

class CommunityPost(BaseModel):
    __tablename__ = "community_post"

    community_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("community.id", ondelete="CASCADE"), index=True)
    author_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    content: Mapped[str] = mapped_column(String)
    images: Mapped[list[str]] = mapped_column(JSON(), nullable=True)
    deleted_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)