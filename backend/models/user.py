from sqlalchemy import String, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column
from .base import BaseModel
from .enums import UserRole

class User(BaseModel):
    __tablename__ = "user"

    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    external_auth_id: Mapped[str] = mapped_column(String, unique=True, nullable=True)
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="userrole_enum"))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    first_name: Mapped[str] = mapped_column(String, nullable=True)
    last_name: Mapped[str] = mapped_column(String, nullable=True)
    avatar_url: Mapped[str] = mapped_column(String, nullable=True)