import pytest
from httpx import AsyncClient
import uuid

pytestmark = pytest.mark.anyio

async def register_user(client: AsyncClient, email: str, role: str = "STUDENT"):
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
    res = await client.post(f'/api/v1/auth/register/{role.lower()}', json=payload)
    resp = await client.post('/api/v1/auth/login', json={"email": email, "password": "Password123!"})
    return resp.json()["data"]["token"]

async def test_events(client: AsyncClient):
    token = await register_user(client, f"e_{uuid.uuid4().hex[:6]}@example.com")
    resp = await client.post('/api/v1/events/', headers={"Authorization": f"Bearer {token}"}, json={
        "title": "Tech Meetup",
        "description": "Networking",
        "venue": "Campus",
        "event_date": "2026-10-10T10:00:00Z"
    })
    assert resp.status_code == 200
    event_id = resp.json()["data"]["id"]
    
    resp = await client.post('/api/v1/events/register', headers={"Authorization": f"Bearer {token}"}, json={"event_id": event_id})
    assert resp.status_code == 200
    
    resp = await client.post('/api/v1/events/register', headers={"Authorization": f"Bearer {token}"}, json={"event_id": event_id})
    assert resp.status_code == 409

async def test_notifications(client: AsyncClient):
    token = await register_user(client, f"n_{uuid.uuid4().hex[:6]}@example.com")
    resp = await client.get('/api/v1/notifications/', headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200

async def test_community(client: AsyncClient):
    token = await register_user(client, f"c_{uuid.uuid4().hex[:6]}@example.com")
    resp = await client.post('/api/v1/community', headers={"Authorization": f"Bearer {token}"}, json={
        "name": "Developers Club",
        "description": "Tech group",
        "visibility": "PUBLIC"
    })
    assert resp.status_code == 200
    c_id = resp.json()["data"]["id"]
    
    resp = await client.post('/api/v1/community/posts', headers={"Authorization": f"Bearer {token}"}, json={
        "community_id": c_id,
        "content": "Hello World!"
    })
    assert resp.status_code == 200

async def test_reports(client: AsyncClient):
    token = await register_user(client, f"r_{uuid.uuid4().hex[:6]}@example.com")
    resp = await client.post('/api/v1/reports', headers={"Authorization": f"Bearer {token}"}, json={
        "reported_entity_type": "USER",
        "reported_entity_id": "00000000-0000-0000-0000-000000000000",
        "reason": "Spam"
    })
    assert resp.status_code == 200

async def test_announcements(client: AsyncClient):
    token = await register_user(client, f"a_{uuid.uuid4().hex[:6]}@example.com")
    resp = await client.post('/api/v1/announcements', headers={"Authorization": f"Bearer {token}"}, json={
        "title": "Welcome",
        "content": "Hello",
        "scope": "GLOBAL"
    })
    assert resp.status_code == 200
