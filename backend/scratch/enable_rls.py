import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = 'postgresql+asyncpg://postgres.wuxkdbdfbuvetmahdflo:Tejuuu%409860%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'

async def enable_rls():
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        # Get all tables in the public schema
        result = await conn.execute(text("SELECT tablename FROM pg_tables WHERE schemaname = 'public'"))
        tables = [row[0] for row in result.fetchall()]
        
        for table in tables:
            print(f"Enabling RLS on public.{table}...")
            # Enable RLS
            await conn.execute(text(f"ALTER TABLE public.{table} ENABLE ROW LEVEL SECURITY;"))
            
    print("RLS successfully enabled on all public tables!")

if __name__ == "__main__":
    asyncio.run(enable_rls())
