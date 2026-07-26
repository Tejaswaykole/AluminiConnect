import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from core.config import settings
from database.base import Base

# Import all models so Base knows about them
import models.user
import models.student_profile
import models.alumni_profile
import models.department
import models.industry
import models.skill
import models.opportunity
import models.opportunity_type
import models.event
import models.mentorship
import models.message
import models.notification
import models.community

async def create_tables():
    engine = create_async_engine(settings.DATABASE_URL, echo=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("All tables created successfully.")

if __name__ == "__main__":
    asyncio.run(create_tables())
