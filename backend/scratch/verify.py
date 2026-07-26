import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = 'postgresql+asyncpg://postgres.wuxkdbdfbuvetmahdflo:Tejuuu%409860%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'

async def verify():
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        result = await conn.execute(text('SELECT first_name, last_name, email, role FROM "user"'))
        users = result.fetchall()
        print('--- USERS IN DATABASE ---')
        for u in users:
            print(f'{u[0]} {u[1]} ({u[2]}) - {u[3]}')

if __name__ == '__main__':
    asyncio.run(verify())
