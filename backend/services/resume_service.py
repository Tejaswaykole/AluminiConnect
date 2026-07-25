import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.resume import Resume
from models.user import User

class ResumeService:
    @staticmethod
    async def get_resumes_by_user(db: AsyncSession, user_id: uuid.UUID) -> list[Resume]:
        result = await db.execute(select(Resume).where(Resume.user_id == user_id).order_by(Resume.version.desc()))
        return list(result.scalars().all())

    @staticmethod
    async def create_resume(db: AsyncSession, user_id: uuid.UUID, file_uri: str) -> Resume:
        # Determine next version
        existing = await ResumeService.get_resumes_by_user(db, user_id)
        next_version = len(existing) + 1
        
        resume = Resume(
            user_id=user_id,
            file_uri=file_uri,
            version=next_version,
            ats_score=0 # placeholder before Groq analysis
        )
        db.add(resume)
        await db.commit()
        await db.refresh(resume)
        return resume
    
    @staticmethod
    async def analyze_resume_with_ai(db: AsyncSession, resume_id: uuid.UUID) -> Resume:
        # Placeholder for Groq integration
        resume = await db.get(Resume, resume_id)
        if resume:
            resume.ats_score = 85
            resume.ai_feedback = {
                "keywords": ["React", "FastAPI"],
                "improvements": "Add more metrics to bullet points."
            }
            await db.commit()
            await db.refresh(resume)
        return resume
