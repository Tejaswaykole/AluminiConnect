from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from .base import BaseModel

class Department(BaseModel):
    __tablename__ = "department"
    name: Mapped[str] = mapped_column(String, unique=True, index=True)

class Industry(BaseModel):
    __tablename__ = "industry"
    name: Mapped[str] = mapped_column(String, unique=True, index=True)

class Skill(BaseModel):
    __tablename__ = "skill"
    name: Mapped[str] = mapped_column(String, unique=True, index=True)

class CommunityCategory(BaseModel):
    __tablename__ = "community_category"
    name: Mapped[str] = mapped_column(String, unique=True, index=True)

class OpportunityType(BaseModel):
    __tablename__ = "opportunity_type"
    name: Mapped[str] = mapped_column(String, unique=True, index=True)