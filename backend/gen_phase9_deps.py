import os
import uuid

backend_dir = r"c:\Users\tejas\OneDrive\Desktop\ALumini\backend"
os.makedirs(os.path.join(backend_dir, "api", "dependencies"), exist_ok=True)
os.makedirs(os.path.join(backend_dir, "schemas"), exist_ok=True)
os.makedirs(os.path.join(backend_dir, "repositories"), exist_ok=True)
os.makedirs(os.path.join(backend_dir, "services"), exist_ok=True)
os.makedirs(os.path.join(backend_dir, "api", "v1", "endpoints"), exist_ok=True)

auth_py = """import uuid
from typing import Optional
from fastapi import Header, HTTPException
from database.session import get_db

async def get_current_user_id() -> uuid.UUID:
    # Placeholder for JWT parsing
    return uuid.uuid4()
"""
with open(os.path.join(backend_dir, "api", "dependencies", "auth.py"), "w", encoding="utf-8") as f: f.write(auth_py)

pagination_py = """from typing import Optional
from fastapi import Query
from pydantic import BaseModel

class PaginationParams(BaseModel):
    page: int = Query(1, ge=1)
    page_size: int = Query(10, ge=1, le=100)
    search: Optional[str] = Query(None)
    order_by: Optional[str] = Query(None)
    order: Optional[str] = Query("desc", regex="^(asc|desc)$")
"""
with open(os.path.join(backend_dir, "api", "dependencies", "pagination.py"), "w", encoding="utf-8") as f: f.write(pagination_py)

print("Dependencies generated")
