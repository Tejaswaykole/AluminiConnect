from pydantic import BaseModel, ConfigDict
from typing import Optional, List
import uuid
from datetime import datetime

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    avatar_url: Optional[str] = None

class StudentProfileUpdate(BaseModel):
    enrollment_number: Optional[str] = None
    academic_year: Optional[str] = None
    graduation_year: Optional[int] = None
    resume_url: Optional[str] = None
    bio: Optional[str] = None
    department_id: Optional[uuid.UUID] = None

class AlumniProfileUpdate(BaseModel):
    graduation_year: Optional[int] = None
    enrollment_number: Optional[str] = None
    current_company: Optional[str] = None
    job_title: Optional[str] = None
    experience_years: Optional[int] = None
    bio: Optional[str] = None
    mentorship_available: Optional[bool] = None
    industry_id: Optional[uuid.UUID] = None

class UserProfileUpdate(BaseModel):
    user: Optional[UserUpdate] = None
    student_profile: Optional[StudentProfileUpdate] = None
    alumni_profile: Optional[AlumniProfileUpdate] = None

class StudentProfileResponse(BaseModel):
    id: uuid.UUID
    enrollment_number: Optional[str]
    academic_year: Optional[str]
    graduation_year: Optional[int]
    resume_url: Optional[str]
    bio: Optional[str]
    department_id: Optional[uuid.UUID]
    
    model_config = ConfigDict(from_attributes=True)

class AlumniProfileResponse(BaseModel):
    id: uuid.UUID
    graduation_year: Optional[int]
    enrollment_number: Optional[str]
    current_company: Optional[str]
    job_title: Optional[str]
    experience_years: Optional[int]
    bio: Optional[str]
    mentorship_available: Optional[bool]
    industry_id: Optional[uuid.UUID]
    
    model_config = ConfigDict(from_attributes=True)

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    first_name: Optional[str]
    last_name: Optional[str]
    avatar_url: Optional[str]
    role: str
    student_profile: Optional[StudentProfileResponse] = None
    alumni_profile: Optional[AlumniProfileResponse] = None
    profile_completeness: Optional[int] = 0

    model_config = ConfigDict(from_attributes=True)

class PublicStudentProfileResponse(BaseModel):
    id: uuid.UUID
    department_id: Optional[uuid.UUID]
    academic_year: Optional[str]
    graduation_year: Optional[int]
    bio: Optional[str]

    model_config = ConfigDict(from_attributes=True)

class PublicAlumniProfileResponse(BaseModel):
    id: uuid.UUID
    graduation_year: Optional[int]
    current_company: Optional[str]
    job_title: Optional[str]
    industry_id: Optional[uuid.UUID]
    experience_years: Optional[int]
    bio: Optional[str]
    mentorship_available: Optional[bool]

    model_config = ConfigDict(from_attributes=True)

class PublicUserResponse(BaseModel):
    id: uuid.UUID
    first_name: Optional[str]
    last_name: Optional[str]
    avatar_url: Optional[str]
    role: str
    student_profile: Optional[PublicStudentProfileResponse] = None
    alumni_profile: Optional[PublicAlumniProfileResponse] = None

    model_config = ConfigDict(from_attributes=True)

class PaginatedPublicUsers(BaseModel):
    data: List[PublicUserResponse]
    total: int
    page: int
    page_size: int
