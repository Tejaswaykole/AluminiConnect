import pytest
from httpx import AsyncClient
import asyncio
from sqlalchemy import text
import uuid

pytestmark = pytest.mark.anyio

async def create_user_and_login(client, db_session, email, role, firstname):
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

async def test_race_condition_registration(client: AsyncClient):
    email = f"race_{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "first_name": "Race",
        "last_name": "Condition",
        "email": email,
        "password": "Password123!",
        "enrollment_number": "EN12345",
        "academic_year": "1st Year",
        "graduation_year": 2026,
        "institution_id": "00000000-0000-0000-0000-000000000000"
    }
    
    # Run two identical registration requests concurrently
    responses = await asyncio.gather(
        client.post('/api/v1/auth/register/student', json=payload),
        client.post('/api/v1/auth/register/student', json=payload)
    )
    
    statuses = [r.status_code for r in responses]
    assert 201 in statuses, "One request should succeed"
    assert 409 in statuses, "One request should conflict"

async def test_account_status(client: AsyncClient, db_session):
    email = f"status_{uuid.uuid4().hex[:8]}@example.com"
    token = await create_user_and_login(client, db_session, email, "STUDENT", "StatusUser")
    
    # Test valid token works
    resp = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    
    # Manually suspend the user in the database
    await db_session.execute(text("UPDATE \"user\" SET account_status = 'SUSPENDED' WHERE email = :e"), {"e": email})
    await db_session.commit()
    
    # Test suspended login fails
    resp_login = await client.post('/api/v1/auth/login', json={"email": email, "password": "Password123!"})
    assert resp_login.status_code in (401, 403)
    
    # Test token on protected route fails
    resp = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code in (401, 403)
    
async def test_idor_and_role_escalation(client: AsyncClient, db_session):
    email_a = f"usera_{uuid.uuid4().hex[:8]}@example.com"
    email_b = f"userb_{uuid.uuid4().hex[:8]}@example.com"
    token_a = await create_user_and_login(client, db_session, email_a, "STUDENT", "UserA")
    token_b = await create_user_and_login(client, db_session, email_b, "STUDENT", "UserB")
    
    # Role Escalation Test
    resp = await client.put('/api/v1/users/me', headers={"Authorization": f"Bearer {token_a}"}, json={
        "role": "ADMIN"
    })
    # Must either be 403, 422 (validation error), or 200 but ignore the field
    resp_me = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token_a}"})
    assert resp_me.json()["data"]["role"] == "STUDENT"
    
    # IDOR Test - Messaging
    # First get user B's ID
    resp_b = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token_b}"})
    user_b_id = resp_b.json()["data"]["id"]
    
    # If there is a POST /messages, ensure A can send to B, but A cannot claim to be B
    msg_resp = await client.post('/api/v1/messages/', headers={"Authorization": f"Bearer {token_a}"}, json={
        "receiver_id": user_b_id,
        "content": "Hello B"
    })
    
    # Get A's messages
    get_msgs_a = await client.get('/api/v1/messages/', headers={"Authorization": f"Bearer {token_a}"})
    if get_msgs_a.status_code == 200:
        msgs = get_msgs_a.json().get("data", [])
        if msgs and len(msgs) > 0:
            msg_id = msgs[0]["id"]
            # User B attempts to access A's specific message directly if such endpoint exists, or delete it
            del_resp = await client.delete(f'/api/v1/messages/{msg_id}', headers={"Authorization": f"Bearer {token_b}"})
            assert del_resp.status_code in (403, 404)

async def test_duplicate_constraints(client: AsyncClient, db_session):
    email = f"dup_{uuid.uuid4().hex[:8]}@example.com"
    token = await create_user_and_login(client, db_session, email, "STUDENT", "DupUser")
    
    # Duplicate Job Application (Assuming /opportunities/ and /applications/ exist)
    # create opportunity first or just attempt to apply to a fake uuid
    fake_opp = str(uuid.uuid4())
    resp1 = await client.post('/api/v1/applications/', headers={"Authorization": f"Bearer {token}"}, json={
        "opportunity_id": fake_opp,
        "content": "My application"
    })
    
    if resp1.status_code in (200, 201):
        resp2 = await client.post('/api/v1/applications/', headers={"Authorization": f"Bearer {token}"}, json={
            "opportunity_id": fake_opp,
            "content": "My application again"
        })
        assert resp2.status_code == 409
