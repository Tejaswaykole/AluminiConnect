import sys
import os
import asyncio
from dotenv import load_dotenv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
load_dotenv()

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from models.user import User
from models.profiles import StudentProfile, AlumniProfile
from models.event import Event
from models.opportunity import Opportunity
from models.enums import UserRole, VerificationStatus, OpportunityStatus
import uuid
from datetime import datetime, timedelta

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./almabridge.db")
engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_data():
    async with AsyncSessionLocal() as session:
        print("Starting seeding process...")

        # 1. Students from JTM College of Engineering
        students = [
            {
                "email": "amit.kumar@example.com",
                "first_name": "Amit",
                "last_name": "Kumar",
                "bio": "Computer Engineering student at JTM College of Engineering, passionate about AI and ML.",
                "enrollment_number": "JTM2024CS01",
                "academic_year": "3rd Year",
                "graduation_year": 2025
            },
            {
                "email": "sneha.patil@example.com",
                "first_name": "Sneha",
                "last_name": "Patil",
                "bio": "Information Technology student at JTM College of Engineering. Learning React and Node.js.",
                "enrollment_number": "JTM2024IT02",
                "academic_year": "2nd Year",
                "graduation_year": 2026
            },
            {
                "email": "rahul.deshmukh@example.com",
                "first_name": "Rahul",
                "last_name": "Deshmukh",
                "bio": "Electronics & Telecom student at JTM College of Engineering.",
                "enrollment_number": "JTM2024ENTC03",
                "academic_year": "4th Year",
                "graduation_year": 2024
            }
        ]

        # 2. Alumni Data (TCS, Infosys, Zomato, Flipkart, etc.)
        alumni = [
            {
                "email": "rohit.sharma@example.com",
                "first_name": "Rohit",
                "last_name": "Sharma",
                "current_company": "TCS (Tata Consultancy Services)",
                "job_title": "Systems Engineer",
                "experience_years": 4,
                "bio": "Working at TCS Pune. JTM College of Engineering Alumni 2020. Happy to refer students.",
                "mentorship_available": True,
                "graduation_year": 2020
            },
            {
                "email": "priyanka.joshi@example.com",
                "first_name": "Priyanka",
                "last_name": "Joshi",
                "current_company": "Infosys",
                "job_title": "Senior Software Engineer",
                "experience_years": 6,
                "bio": "Full-stack developer at Infosys Bangalore. JTM Alumni 2018.",
                "mentorship_available": True,
                "graduation_year": 2018
            },
            {
                "email": "vikram.singh@example.com",
                "first_name": "Vikram",
                "last_name": "Singh",
                "current_company": "Zomato",
                "job_title": "Product Manager",
                "experience_years": 8,
                "bio": "Product Manager at Zomato Gurgaon. Love building consumer tech.",
                "mentorship_available": False,
                "graduation_year": 2016
            },
            {
                "email": "neha.kulkarni@example.com",
                "first_name": "Neha",
                "last_name": "Kulkarni",
                "current_company": "Flipkart",
                "job_title": "Data Scientist",
                "experience_years": 3,
                "bio": "Data Scientist at Flipkart Bangalore. JTM College of Engineering 2021 batch.",
                "mentorship_available": True,
                "graduation_year": 2021
            }
        ]
        
        student_ids = []
        alumni_ids = []

        for s in students:
            res = await session.execute(select(User).filter(User.email == s["email"]))
            user = res.scalar_one_or_none()
            if not user:
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
            student_ids.append(user.id)

        for a in alumni:
            res = await session.execute(select(User).filter(User.email == a["email"]))
            user = res.scalar_one_or_none()
            if not user:
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
            alumni_ids.append(user.id)
            
        await session.flush()

        # 3. Add Events
        if alumni_ids:
            events = [
                {
                    "title": "JTM Alumni Meet 2024",
                    "description": "Annual gathering of JTM College of Engineering Alumni.",
                    "venue": "JTM College Auditorium",
                    "event_date": datetime.now() + timedelta(days=30),
                    "capacity": 500,
                    "organizer_id": alumni_ids[0]
                },
                {
                    "title": "Tech Talk: AI in e-commerce",
                    "description": "Guest lecture by Data Scientist from Flipkart.",
                    "venue": "Virtual (Google Meet)",
                    "event_date": datetime.now() + timedelta(days=7),
                    "capacity": 100,
                    "organizer_id": alumni_ids[3] # Neha (Flipkart)
                }
            ]
            
            for e in events:
                res = await session.execute(select(Event).filter(Event.title == e["title"]))
                if not res.scalar_one_or_none():
                    event = Event(**e)
                    session.add(event)

        # 4. Add Opportunities (Jobs)
        if alumni_ids:
            opportunities = [
                {
                    "title": "Software Development Engineer 1",
                    "description": "Looking for freshers from JTM College of Engineering.",
                    "company": "TCS",
                    "location": "Pune, Maharashtra",
                    "deadline": datetime.now() + timedelta(days=15),
                    "status": OpportunityStatus.OPEN,
                    "created_by": alumni_ids[0] # Rohit (TCS)
                },
                {
                    "title": "Frontend Developer Intern",
                    "description": "React.js internship opportunity for 3rd year students.",
                    "company": "Zomato",
                    "location": "Gurgaon (Remote)",
                    "deadline": datetime.now() + timedelta(days=10),
                    "status": OpportunityStatus.OPEN,
                    "created_by": alumni_ids[2] # Vikram (Zomato)
                }
            ]
            
            for o in opportunities:
                res = await session.execute(select(Opportunity).filter(Opportunity.title == o["title"]))
                if not res.scalar_one_or_none():
                    opp = Opportunity(**o)
                    session.add(opp)

        await session.commit()
        print("Database successfully seeded with JTM College and Indian Context Data!")

if __name__ == "__main__":
    asyncio.run(seed_data())
