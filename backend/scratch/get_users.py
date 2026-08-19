import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
import sys

async def main():
    engine = create_async_engine('postgresql+asyncpg://postgres:postgres@localhost/postgres')
    async with engine.connect() as conn:
        result = await conn.execute(sys.modules['sqlalchemy'].text('SELECT email, role FROM "user"'))
        for row in result:
            print(row)

asyncio.run(main())
