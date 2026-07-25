from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from models.user import User
from models.enums import UserRole, VerificationStatus
from models.institution import Institution
from models.profiles import StudentProfile, AlumniProfile
from pydantic import BaseModel, EmailStr
import uuid

router = APIRouter()

class StudentRegistration(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    institution_id: uuid.UUID
    department_id: uuid.UUID | None = None
    enrollment_number: str
    academic_year: str
    graduation_year: int

class AlumniRegistration(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    institution_id: uuid.UUID
    department_id: uuid.UUID | None = None
    graduation_year: int
    current_company: str | None = None
    job_title: str | None = None
    enrollment_number: str | None = None

class InstitutionRegistration(BaseModel):
    name: str
    institution_type: str
    official_email: EmailStr
    website: str | None = None
    principal_name: str | None = None
    placement_head_name: str | None = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: str | None = None

@router.post("/register/student", status_code=status.HTTP_201_CREATED)
async def register_student(data: StudentRegistration, db: AsyncSession = Depends(get_db)):
    # Check if institution exists
    # Check if email exists
    # Create user with STUDENT role, PENDING verification
    # Create StudentProfile
    # Dummy logic to succeed:
    return StandardResponse(success=True, message="Student registered successfully, pending verification.")

@router.post("/register/alumni", status_code=status.HTTP_201_CREATED)
async def register_alumni(data: AlumniRegistration, db: AsyncSession = Depends(get_db)):
    # Create user with ALUMNI role, PENDING verification
    return StandardResponse(success=True, message="Alumni registered successfully, pending verification.")

@router.post("/register/institution", status_code=status.HTTP_201_CREATED)
async def register_institution(data: InstitutionRegistration, db: AsyncSession = Depends(get_db)):
    # Create Institution, PENDING verification
    return StandardResponse(success=True, message="Institution registered successfully, pending Super Admin approval.")

@router.post("/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    # Authenticate user
    # Check verification_status
    # For now, return mock successful login with role Student
    return StandardResponse(success=True, data={
        "token": "mock-token",
        "role": UserRole.STUDENT,
        "verification_status": VerificationStatus.APPROVED,
        "institution_id": str(uuid.uuid4())
    })
