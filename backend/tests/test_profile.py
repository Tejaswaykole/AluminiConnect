import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
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

async def test_profile_update(client: AsyncClient):
    email = f"profile_{uuid.uuid4().hex[:8]}@example.com"
    token = await create_user_and_login(client, email, "STUDENT", "ProUser")
    
    # Get Profile
    resp = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["first_name"] == "ProUser"
    assert data["student_profile"]["graduation_year"] == 2026
    
    # Update Profile
    update_resp = await client.put('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"}, json={
        "user": {
            "first_name": "UpdatedProUser"
        },
        "student_profile": {
            "graduation_year": 2027,
            "bio": "New student bio!"
        }
    })
    assert update_resp.status_code == 200
    
    # Verify Update
    resp = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"})
    data = resp.json()["data"]
    assert data["first_name"] == "UpdatedProUser"
    assert data["student_profile"]["graduation_year"] == 2027
    assert data["student_profile"]["bio"] == "New student bio!"
    assert data["profile_completeness"] > 0
