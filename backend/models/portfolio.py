import uuid
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from .base import BaseModel

class PortfolioItem(BaseModel):
    __tablename__ = "portfolio_item"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(String, nullable=True)
    link: Mapped[str] = mapped_column(String, nullable=True)
    item_type: Mapped[str] = mapped_column(String) # e.g. 'PROJECT', 'PUBLICATION', 'PATENT', 'CERTIFICATE'
    
    # Relationships
    user: Mapped["User"] = relationship("User", backref="portfolio_items")
