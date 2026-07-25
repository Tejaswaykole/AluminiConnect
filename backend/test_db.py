
import asyncio
from database.session import engine
from sqlalchemy import text

async def test():
    try:
        async with engine.begin() as conn:
            res = await conn.execute(text('SELECT 1'))
            print('SUCCESS: Database connected successfully! SELECT 1 returned:', res.scalar())
    except Exception as e:
        print('ERROR: Connection failed:', str(e))

asyncio.run(test())

