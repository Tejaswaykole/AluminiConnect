import sys
import os
sys.path.insert(0, os.path.abspath("."))
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from core.config import settings
from models.base import Base

import models

async def create_tables():
    engine = create_async_engine(settings.DATABASE_URL, echo=True)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("All tables created successfully.")

if __name__ == "__main__":
    asyncio.run(create_tables())
