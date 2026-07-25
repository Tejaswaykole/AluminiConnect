import uuid
from sqlalchemy import String, Boolean, Integer, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from .base import BaseModel

class Resume(BaseModel):
    __tablename__ = "resume"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    file_uri: Mapped[str] = mapped_column(String)
    version: Mapped[int] = mapped_column(Integer, default=1)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    ats_score: Mapped[int] = mapped_column(Integer, nullable=True)
    
    # Store AI analysis results (e.g. keywords, formatting suggestions, skill gaps)
    ai_feedback: Mapped[dict] = mapped_column(JSON, nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", backref="resumes")
