import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

pytestmark = pytest.mark.anyio

async def register_user(client: AsyncClient, email: str, role: str):
    payload = {
        "first_name": "Test",
        "last_name": "User",
        "email": email,
        "password": "Password123!"
    }
    if role == "STUDENT":
        payload.update({
            "enrollment_number": f"EN_{uuid.uuid4().hex[:6]}",
            "academic_year": "1st Year",
            "graduation_year": 2026,
            "department_id": None
        })
    else:
        payload.update({
            "graduation_year": 2020,
            "current_company": "Tech Corp",
            "job_title": "Engineer",
            "experience_years": 5
        })
        
    res = await client.post(f'/api/v1/auth/register/{role.lower()}', json=payload)
    if res.status_code != 201:
        print("Registration error:", res.json())
    
    resp = await client.post('/api/v1/auth/login', json={
        "email": email,
        "password": "Password123!"
    })
    token = resp.json()["data"]["token"]
    
    me_resp = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"})
    return token, me_resp.json()["data"]["id"]

async def test_connections(client: AsyncClient):
    token1, id1 = await register_user(client, f"u1_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    token2, id2 = await register_user(client, f"u2_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    resp = await client.post('/api/v1/connections/request', headers={"Authorization": f"Bearer {token1}"}, json={"target_id": id2})
    assert resp.status_code == 200
    conn_id = resp.json()["data"]["id"]
    resp = await client.post(f'/api/v1/connections/{conn_id}/accept', headers={"Authorization": f"Bearer {token2}"})
    assert resp.status_code == 200

async def test_messaging(client: AsyncClient):
    token1, id1 = await register_user(client, f"u3_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    token2, id2 = await register_user(client, f"u4_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    resp = await client.post('/api/v1/messages/send', headers={"Authorization": f"Bearer {token1}"}, json={"receiver_id": id2, "content": "Hello!"})
    assert resp.status_code == 200
    resp = await client.get(f'/api/v1/messages/conversations/{id2}', headers={"Authorization": f"Bearer {token1}"})
    assert resp.status_code == 200

async def test_mentorship(client: AsyncClient):
    token1, id1 = await register_user(client, f"u5_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    token2, id2 = await register_user(client, f"u6_{uuid.uuid4().hex[:6]}@example.com", "ALUMNI")
    resp = await client.post('/api/v1/mentorship/request', headers={"Authorization": f"Bearer {token1}"}, json={"mentor_id": id2, "notes": "Help me"})
    assert resp.status_code == 200
    req_id = resp.json()["data"]["id"]
    resp = await client.post(f'/api/v1/mentorship/{req_id}/accept', headers={"Authorization": f"Bearer {token2}"})
    assert resp.status_code == 200
