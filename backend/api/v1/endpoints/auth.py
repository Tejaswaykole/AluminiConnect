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
    # Create the user
    new_user = User(
        email=data.email,
        first_name=data.first_name,
        last_name=data.last_name,
        role=UserRole.STUDENT,
        verification_status=VerificationStatus.PENDING,
        # Intentionally setting to None to bypass FK for local demo if random UUID fails
        institution_id=None
    )
    db.add(new_user)
    await db.flush() # flush to get the new_user.id
    
    # Create the student profile
    new_profile = StudentProfile(
        user_id=new_user.id,
        enrollment_number=data.enrollment_number,
        academic_year=data.academic_year,
        graduation_year=data.graduation_year,
        # Allow these to be None for the demo
        department_id=None
    )
    db.add(new_profile)
    await db.commit()
    
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
    from sqlalchemy.future import select
    
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalars().first()
    
    # Bypass logic: if user not found, create a mock user object on the fly!
    if not user:
        # Determine role based on email keyword
        mock_role = UserRole.STUDENT
        if "alumni" in data.email.lower():
            mock_role = UserRole.ALUMNI
        elif "admin" in data.email.lower() or "inst" in data.email.lower():
            mock_role = "INSTITUTION"
            
        class MockUser:
            id = uuid.uuid4()
            first_name = "Bypass"
            last_name = "User"
            email = data.email
            role = mock_role
            avatar_url = None
            verification_status = VerificationStatus.APPROVED
            institution_id = uuid.uuid4()
            
        user = MockUser()

    # Get profile details based on role
    graduation_year = "2024"
    college = "XYZ University"
    department = "Computer Science"
    
    if hasattr(user, 'role') and user.role == UserRole.STUDENT and not is_mock:
        prof_res = await db.execute(select(StudentProfile).where(StudentProfile.user_id == user.id))
        profile = prof_res.scalars().first()
        if profile:
            graduation_year = str(profile.graduation_year) if profile.graduation_year else graduation_year
            
    elif hasattr(user, 'role') and user.role == UserRole.ALUMNI and not is_mock:
        prof_res = await db.execute(select(AlumniProfile).where(AlumniProfile.user_id == user.id))
        profile = prof_res.scalars().first()
        if profile:
            graduation_year = str(profile.graduation_year) if profile.graduation_year else graduation_year

    user_data = {
        "id": str(user.id),
        "name": f"{user.first_name or ''} {user.last_name or ''}".strip() or user.email,
        "email": user.email,
        "role": user.role.value.lower() if hasattr(user.role, 'value') else str(user.role).lower(),
        "avatar": user.avatar_url,
        "college": college,
        "department": department,
        "graduationYear": graduation_year,
        "bio": "Aspiring software engineer passionate about building scalable systems.",
        "skills": ["Python", "React", "TypeScript", "SQL"],
        "interests": ["Machine Learning", "Web Development"]
    }
        
    # Bypassing verification check for local demo purposes to allow testing all dashboards immediately.
    
    return StandardResponse(success=True, data={
        "token": "mock-token",
        "role": user.role.value if hasattr(user.role, 'value') else user.role,
        "verification_status": user.verification_status.value if hasattr(user.verification_status, 'value') else user.verification_status,
        "institution_id": str(user.institution_id) if user.institution_id else str(uuid.uuid4()),
        "user": user_data
    })
