import asyncio
import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text, inspect

# Load environment variables from .env
load_dotenv()

async def check():
    # Use the DATABASE_URL from .env or fallback to the provided URL
    db_url = os.getenv('DATABASE_URL', 'postgresql+asyncpg://postgres.wuxkdbdfbuvetmahdflo:Tejuuu%409860%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres')
    
    engine = create_async_engine(db_url)
    
    # We must use run_sync to use the inspector with an async engine
    def get_tables(sync_conn):
        inspector = inspect(sync_conn)
        return inspector.get_table_names()

    async with engine.connect() as conn:
        tables = await conn.run_sync(get_tables)
        print("Database Tables Found:")
        print(tables)

asyncio.run(check())

