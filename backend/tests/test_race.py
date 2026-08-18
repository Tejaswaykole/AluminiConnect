import pytest
from httpx import AsyncClient, ASGITransport
import asyncio
import uuid

pytestmark = pytest.mark.anyio

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

    # Temporarily change the client to raise app exceptions to see the traceback
    # Assuming client is a fixture, we can just do one call and await asyncio.gather
    
    responses = await asyncio.gather(
        client.post('/api/v1/auth/register/student', json=payload),
        client.post('/api/v1/auth/register/student', json=payload)
    )
    
    statuses = [r.status_code for r in responses]
    print(statuses)
    for r in responses:
        if r.status_code == 500:
            print(r.text)
    assert 409 in statuses, "One request should conflict"
