import uuid
from sqlalchemy import String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from .base import BaseModel

class StudentProfile(BaseModel):
    __tablename__ = "student_profile"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), unique=True)
    department_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("department.id", ondelete="SET NULL"), nullable=True)
    enrollment_number: Mapped[str] = mapped_column(String, nullable=True)
    academic_year: Mapped[str] = mapped_column(String, nullable=True)
    graduation_year: Mapped[int] = mapped_column(Integer, nullable=True)
    resume_url: Mapped[str] = mapped_column(String, nullable=True)
    bio: Mapped[str] = mapped_column(String, nullable=True)

class AlumniProfile(BaseModel):
    __tablename__ = "alumni_profile"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id", ondelete="CASCADE"), unique=True)
    graduation_year: Mapped[int] = mapped_column(Integer, nullable=True)
    enrollment_number: Mapped[str] = mapped_column(String, nullable=True)
    current_company: Mapped[str] = mapped_column(String, nullable=True)
    job_title: Mapped[str] = mapped_column(String, nullable=True)
    industry_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("industry.id", ondelete="SET NULL"), nullable=True)
    experience_years: Mapped[int] = mapped_column(Integer, nullable=True)
    bio: Mapped[str] = mapped_column(String, nullable=True)
    mentorship_available: Mapped[bool] = mapped_column(Boolean, default=False)