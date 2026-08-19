import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

pytestmark = pytest.mark.anyio

async def create_user_and_login(client: AsyncClient, email, role, firstname):
    await client.post(f'/api/v1/auth/register/{role.lower()}', json={
        "first_name": firstname,
        "last_name": "Test",
        "email": email,
        "password": "Password123!",
        "enrollment_number": f"EN_{uuid.uuid4().hex[:6]}",
        "academic_year": "1st Year",
        "graduation_year": 2026,
        "institution_id": "00000000-0000-0000-0000-000000000000"
    })
    resp = await client.post('/api/v1/auth/login', json={
        "email": email,
        "password": "Password123!"
    })
    return resp.json()["data"]["token"]

async def test_discovery(client: AsyncClient):
    email = f"discover_{uuid.uuid4().hex[:8]}@example.com"
    token = await create_user_and_login(client, email, "STUDENT", "DiscoverUser")
    
    # Test students list
    resp = await client.get('/api/v1/users/students', headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    data = resp.json()
    assert "data" in data["data"]
    assert data["data"]["total"] > 0
    
    # Test public student
    student_id = data["data"]["data"][0]["id"]
    resp = await client.get(f'/api/v1/users/students/{student_id}', headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    assert resp.json()["data"]["first_name"]
