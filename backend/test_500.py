import asyncio
import httpx
from main import app

async def test():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app, raise_app_exceptions=False), base_url='http://test') as client:
        resp = await client.post('/api/v1/auth/register/student', json={'first_name':'Test', 'last_name':'Test', 'email':'t@e.com', 'password':'Password123!', 'enrollment_number':'E123', 'academic_year':'1', 'graduation_year':2026, 'institution_id':'00000000-0000-0000-0000-000000000000'})
        print(resp.text)

if __name__ == '__main__':
    asyncio.run(test())
