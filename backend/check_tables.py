import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

async def check():
    engine = create_async_engine('postgresql+asyncpg://postgres.wuxkdbdfbuvetmahdflo:Tejuuu%409860%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres')
    async with engine.connect() as conn:
        result = await conn.execute(text("SELECT tablename FROM pg_tables WHERE schemaname = 'public'"))
        print([r[0] for r in result])

asyncio.run(check())
