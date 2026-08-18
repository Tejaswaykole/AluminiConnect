import pytest
from httpx import AsyncClient
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
    elif role == "ALUMNI":
        payload.update({
            "graduation_year": 2020,
            "current_company": "Tech Corp",
            "job_title": "Engineer",
            "experience_years": 5,
            "enrollment_number": f"AL_{uuid.uuid4().hex[:6]}",
            "industry_id": None
        })
        
    res = await client.post(f'/api/v1/auth/register/{role.lower()}', json=payload)
    resp = await client.post('/api/v1/auth/login', json={"email": email, "password": "Password123!"})
    if "data" not in resp.json():
        return None, None
    token = resp.json()["data"]["token"]
    me_resp = await client.get('/api/v1/users/me', headers={"Authorization": f"Bearer {token}"})
    return token, me_resp.json()["data"]["id"]

async def test_admin_and_institute_apis(client: AsyncClient):
    token_admin, id_admin = await register_user(client, f"ad_{uuid.uuid4().hex[:6]}@example.com", "ADMIN")
    token_inst, id_inst = await register_user(client, f"inst_{uuid.uuid4().hex[:6]}@example.com", "INSTITUTE")
    token_stud, id_stud = await register_user(client, f"stud_{uuid.uuid4().hex[:6]}@example.com", "STUDENT")
    
    # 1. Admin accessing admin
    if token_admin:
        resp = await client.get('/api/v1/admin/users', headers={"Authorization": f"Bearer {token_admin}"})
        assert resp.status_code == 200
        
    # 2. Student accessing admin
    if token_stud:
        resp = await client.get('/api/v1/admin/users', headers={"Authorization": f"Bearer {token_stud}"})
        assert resp.status_code == 403
        
    # 3. Institute accessing institute
    if token_inst:
        resp = await client.get('/api/v1/institute/students', headers={"Authorization": f"Bearer {token_inst}"})
        assert resp.status_code == 200
        
    # 4. Analytics
    if token_admin:
        resp = await client.get('/api/v1/analytics/', headers={"Authorization": f"Bearer {token_admin}"})
        assert resp.status_code == 200
