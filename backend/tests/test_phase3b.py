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

async def test_opportunities(client: AsyncClient):
    token1, id1 = await register_user(client, f"o1_{uuid.uuid4().hex[:6]}@example.com", "ALUMNI")
    
    # 1. Create opportunity
    resp = await client.post('/api/v1/opportunities/', headers={"Authorization": f"Bearer {token1}"}, json={
        "title": "Software Engineer Intern",
        "description": "Great internship",
        "opportunity_type_id": "00000000-0000-0000-0000-000000000000",
        "company": "Tech Corp"
    })
    assert resp.status_code == 200
    opp_id = resp.json()["data"]["id"]
    
    # 2. List opportunities
    resp = await client.get('/api/v1/opportunities/', headers={"Authorization": f"Bearer {token1}"})
    assert resp.status_code == 200
    assert len(resp.json()["data"]) > 0

async def test_referrals(client: AsyncClient):
    token1, id1 = await register_user(client, f"r1_{uuid.uuid4().hex[:6]}@example.com", "ALUMNI")
    token2, id2 = await register_user(client, f"r2_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    
    # 1. Create referral (as ALUMNI)
    resp = await client.post('/api/v1/referrals/', headers={"Authorization": f"Bearer {token1}"}, json={
        "opportunity_info": "Google SWE Referral"
    })
    assert resp.status_code == 200
    
    # 2. Try to create referral (as STUDENT) - should fail
    resp = await client.post('/api/v1/referrals/', headers={"Authorization": f"Bearer {token2}"}, json={
        "opportunity_info": "Google SWE Referral"
    })
    assert resp.status_code == 403
    
    # 3. List referrals
    resp = await client.get('/api/v1/referrals/', headers={"Authorization": f"Bearer {token2}"})
    assert resp.status_code == 200

async def test_applications(client: AsyncClient):
    token1, id1 = await register_user(client, f"a1_{uuid.uuid4().hex[:6]}@example.com", "ALUMNI")
    token2, id2 = await register_user(client, f"a2_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    
    # 1. Create opportunity
    resp = await client.post('/api/v1/opportunities/', headers={"Authorization": f"Bearer {token1}"}, json={
        "title": "Software Engineer Intern",
        "description": "Great internship",
        "opportunity_type_id": "00000000-0000-0000-0000-000000000000",
        "company": "Tech Corp"
    })
    opp_id = resp.json()["data"]["id"]
    
    # 2. Apply to opportunity
    resp = await client.post('/api/v1/applications/', headers={"Authorization": f"Bearer {token2}"}, json={
        "opportunity_id": opp_id
    })
    assert resp.status_code == 200
    
    # 3. Apply again - should fail with 409
    resp = await client.post('/api/v1/applications/', headers={"Authorization": f"Bearer {token2}"}, json={
        "opportunity_id": opp_id
    })
    assert resp.status_code == 409
    
    # 4. View own applications
    resp = await client.get('/api/v1/applications/me', headers={"Authorization": f"Bearer {token2}"})
    assert resp.status_code == 200
    assert len(resp.json()["data"]) >= 1
