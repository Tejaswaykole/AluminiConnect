import pytest
from httpx import AsyncClient
import uuid

pytestmark = pytest.mark.anyio

async def test_student_registration_and_login(client: AsyncClient):
    email = f"student_auth_test_{uuid.uuid4().hex[:8]}@example.com"
    response = await client.post('/api/v1/auth/register/student', json={
        "first_name": "Test",
        "last_name": "Student",
        "email": email,
        "password": "Password123!",
        "enrollment_number": "EN123",
        "academic_year": "1st Year",
        "graduation_year": 2026,
        "institution_id": "00000000-0000-0000-0000-000000000000"
    })
    assert response.status_code == 201
    
    response = await client.post('/api/v1/auth/login', json={
        "email": email,
        "password": "Password123!"
    })
    assert response.status_code == 200
