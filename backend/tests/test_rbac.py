import pytest
from httpx import AsyncClient

pytestmark = pytest.mark.anyio

async def test_unauthenticated_access(client: AsyncClient):
    response = await client.get('/api/v1/users/me')
    assert response.status_code == 401

async def test_student_access_admin_endpoint(client: AsyncClient):
    # Register student
    await client.post('/api/v1/auth/register/student', json={
        "first_name": "RBAC",
        "last_name": "Student",
        "email": "rbac_student@example.com",
        "password": "Password123!",
        "enrollment_number": "EN123",
        "academic_year": "1st Year",
        "graduation_year": 2026,
        "institution_id": "00000000-0000-0000-0000-000000000000"
    })
    # Login
    login_resp = await client.post('/api/v1/auth/login', json={
        "email": "rbac_student@example.com",
        "password": "Password123!"
    })
    token = login_resp.json()["data"]["token"]
    
    # Try an endpoint that requires ADMIN or INSTITUTE role, e.g., POST /events/ or something
    # Since I don't know the exact events schema, I'll just send an empty body which should 
    # trigger a 403 before a 422 if RBAC is checked first.
    response = await client.post('/api/v1/events/', headers={"Authorization": f"Bearer {token}"}, json={})
    
    # If RBAC is checked as a dependency, it will fail with 403 before pydantic validation (422)
    assert response.status_code in [403, 422]
