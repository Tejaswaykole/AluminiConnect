from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel, EmailStr
import uuid

from database.session import get_db
from schemas.base import StandardResponse
from models.user import User
from models.enums import UserRole, VerificationStatus, AccountStatus
from models.profiles import StudentProfile, AlumniProfile
from core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

class StudentRegistration(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    department_id: uuid.UUID | None = None
    enrollment_number: str
    academic_year: str
    graduation_year: int

class AlumniRegistration(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    department_id: uuid.UUID | None = None
    graduation_year: int
    current_company: str | None = None
    job_title: str | None = None
    enrollment_number: str | None = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

async def _check_email_exists(email: str, db: AsyncSession):
    result = await db.execute(select(User).where(User.email == email))
    if result.scalars().first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

@router.post("/register/student", status_code=status.HTTP_201_CREATED)
async def register_student(data: StudentRegistration, db: AsyncSession = Depends(get_db)):
    await _check_email_exists(data.email, db)
    
    try:
        new_user = User(
            email=data.email,
            first_name=data.first_name,
            last_name=data.last_name,
            hashed_password=get_password_hash(data.password),
            role=UserRole.STUDENT,
            verification_status=VerificationStatus.PENDING,
            account_status=AccountStatus.ACTIVE,
            is_active=True
        )
        db.add(new_user)
        await db.flush()
        
        new_profile = StudentProfile(
            user_id=new_user.id,
            enrollment_number=data.enrollment_number,
            academic_year=data.academic_year,
            graduation_year=data.graduation_year,
            department_id=data.department_id
        )
        db.add(new_profile)
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
        
    return StandardResponse(success=True, message="Student registered successfully, pending verification.")

@router.post("/register/alumni", status_code=status.HTTP_201_CREATED)
async def register_alumni(data: AlumniRegistration, db: AsyncSession = Depends(get_db)):
    await _check_email_exists(data.email, db)
    
    try:
        new_user = User(
            email=data.email,
            first_name=data.first_name,
            last_name=data.last_name,
            hashed_password=get_password_hash(data.password),
            role=UserRole.ALUMNI,
            verification_status=VerificationStatus.PENDING,
            account_status=AccountStatus.ACTIVE,
            is_active=True
        )
        db.add(new_user)
        await db.flush()
        
        new_profile = AlumniProfile(
            user_id=new_user.id,
            graduation_year=data.graduation_year,
            current_company=data.current_company,
            job_title=data.job_title,
            mentorship_available=False
        )
        db.add(new_profile)
        await db.commit()
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
        
    return StandardResponse(success=True, message="Alumni registered successfully, pending verification.")

@router.post("/login")
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalars().first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        
    if not user.hashed_password:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Password Setup Required")
        
    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
        
    if user.account_status != AccountStatus.ACTIVE:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is not active")
        
    # Generate token
    access_token = create_access_token(data={"sub": str(user.id)})
    
    user_data = {
        "id": str(user.id),
        "name": f"{user.first_name or ''} {user.last_name or ''}".strip() or user.email,
        "email": user.email,
        "role": user.role.value if hasattr(user.role, 'value') else user.role,
        "avatar": user.avatar_url
    }
        
    return StandardResponse(success=True, data={
        "token": access_token,
        "role": user_data["role"],
        "user": user_data
    })
