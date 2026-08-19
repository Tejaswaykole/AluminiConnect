import sys; sys.path.insert(0, "C:\\Users\\tejas\\OneDrive\\Desktop\\ALumini\\backend")
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from models.user import User
from models.profiles import StudentProfile, AlumniProfile
from models.enums import UserRole, VerificationStatus
import uuid
import sys
import os
from dotenv import load_dotenv

# Append current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_data():
    async with AsyncSessionLocal() as session:
        # Check if users already exist to avoid duplication
        result = await session.execute(select(User).limit(1))
        
        # 1. Indian students from Maharashtra
        students = [
            {
                "email": "ramesh.patil@example.com",
                "first_name": "Ramesh",
                "last_name": "Patil",
                "bio": "Computer Science student from Pune, Maharashtra. Passionate about AI.",
                "enrollment_number": "STU2024001",
                "academic_year": "3rd Year",
                "graduation_year": 2025
            },
            {
                "email": "aditi.joshi@example.com",
                "first_name": "Aditi",
                "last_name": "Joshi",
                "bio": "IT student from Mumbai, Maharashtra. Web development enthusiast.",
                "enrollment_number": "STU2024002",
                "academic_year": "2nd Year",
                "graduation_year": 2026
            },
            {
                "email": "suresh.deshmukh@example.com",
                "first_name": "Suresh",
                "last_name": "Deshmukh",
                "bio": "Engineering student from Nagpur, Maharashtra.",
                "enrollment_number": "STU2024003",
                "academic_year": "4th Year",
                "graduation_year": 2024
            }
        ]

        # 2. Alumni Data (Entrepreneurs, Startup Founders, etc.)
        alumni = [
            {
                "email": "anil.kulkarni@example.com",
                "first_name": "Anil",
                "last_name": "Kulkarni",
                "current_company": "TechInnovate Startup",
                "job_title": "Startup Founder & CEO",
                "experience_years": 8,
                "bio": "Started my own SaaS company in Bangalore. Happy to mentor aspiring entrepreneurs.",
                "mentorship_available": True,
                "graduation_year": 2018
            },
            {
                "email": "priya.sharma@example.com",
                "first_name": "Priya",
                "last_name": "Sharma",
                "current_company": "FinTech Disruptors",
                "job_title": "Entrepreneur / CTO",
                "experience_years": 10,
                "bio": "Building the next generation of fintech solutions. Startup co-founder.",
                "mentorship_available": True,
                "graduation_year": 2016
            },
            {
                "email": "rahul.verma@example.com",
                "first_name": "Rahul",
                "last_name": "Verma",
                "current_company": "Global Tech Corp",
                "job_title": "Senior Software Engineer",
                "experience_years": 5,
                "bio": "Backend engineer specializing in Python and Go.",
                "mentorship_available": False,
                "graduation_year": 2021
            }
        ]
        
        for s in students:
            # Check if exists
            res = await session.execute(select(User).filter(User.email == s["email"]))
            if res.scalar_one_or_none():
                continue
            
            user = User(
                email=s["email"],
                first_name=s["first_name"],
                last_name=s["last_name"],
                role=UserRole.STUDENT,
                verification_status=VerificationStatus.APPROVED,
                is_active=True
            )
            session.add(user)
            await session.flush()
            
            student_profile = StudentProfile(
                user_id=user.id,
                enrollment_number=s["enrollment_number"],
                academic_year=s["academic_year"],
                graduation_year=s["graduation_year"],
                bio=s["bio"]
            )
            session.add(student_profile)

        for a in alumni:
            res = await session.execute(select(User).filter(User.email == a["email"]))
            if res.scalar_one_or_none():
                continue
                
            user = User(
                email=a["email"],
                first_name=a["first_name"],
                last_name=a["last_name"],
                role=UserRole.ALUMNI,
                verification_status=VerificationStatus.APPROVED,
                is_active=True
            )
            session.add(user)
            await session.flush()
            
            alumni_profile = AlumniProfile(
                user_id=user.id,
                graduation_year=a["graduation_year"],
                current_company=a["current_company"],
                job_title=a["job_title"],
                experience_years=a["experience_years"],
                bio=a["bio"],
                mentorship_available=a["mentorship_available"]
            )
            session.add(alumni_profile)
            
        await session.commit()
        print("Data seeded successfully!")

if __name__ == "__main__":
    asyncio.run(seed_data())
