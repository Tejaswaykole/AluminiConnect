import os
backend_dir = r"c:\Users\tejas\OneDrive\Desktop\ALumini\backend"

modules = ["users", "opportunities", "communities", "events", "mentorship", "notifications", "files"]

for mod in modules:
    # schemas
    with open(os.path.join(backend_dir, "schemas", f"{mod}.py"), "w", encoding="utf-8") as f:
        f.write(f"from pydantic import BaseModel\nfrom typing import Optional, List\nimport uuid\nfrom datetime import datetime\n\nclass {mod.capitalize()}Base(BaseModel):\n    pass\n\nclass {mod.capitalize()}Create({mod.capitalize()}Base):\n    pass\n\nclass {mod.capitalize()}Update(BaseModel):\n    pass\n\nclass {mod.capitalize()}Response({mod.capitalize()}Base):\n    id: uuid.UUID\n    class Config:\n        from_attributes = True\n")
    
    # repo
    with open(os.path.join(backend_dir, "repositories", f"{mod}_repo.py"), "w", encoding="utf-8") as f:
        f.write(f"from .base import BaseRepository\nfrom sqlalchemy.ext.asyncio import AsyncSession\n\nclass {mod.capitalize()}Repository(BaseRepository):\n    pass\n")
        
    # service
    with open(os.path.join(backend_dir, "services", f"{mod}_service.py"), "w", encoding="utf-8") as f:
        f.write(f"from .base import BaseService\nfrom repositories.{mod}_repo import {mod.capitalize()}Repository\n\nclass {mod.capitalize()}Service(BaseService):\n    pass\n")

    # endpoint
    with open(os.path.join(backend_dir, "api", "v1", "endpoints", f"{mod}.py"), "w", encoding="utf-8") as f:
        f.write(f"import uuid\nfrom fastapi import APIRouter, Depends\nfrom sqlalchemy.ext.asyncio import AsyncSession\nfrom database.session import get_db\nfrom schemas.base import StandardResponse\nfrom api.dependencies.pagination import PaginationParams\nfrom api.dependencies.auth import get_current_user_id\n\nrouter = APIRouter()\n\n@router.get('/')\nasync def list_{mod}(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):\n    return StandardResponse(success=True, data=[])\n")

# router.py
router_py = """from fastapi import APIRouter
from .endpoints import health, users, opportunities, communities, events, mentorship, notifications, files

api_router = APIRouter()
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Opportunities"])
api_router.include_router(communities.router, prefix="/communities", tags=["Communities"])
api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(mentorship.router, prefix="/mentorship", tags=["Mentorship"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(files.router, prefix="/files", tags=["Files"])
"""
with open(os.path.join(backend_dir, "api", "v1", "router.py"), "w", encoding="utf-8") as f: f.write(router_py)

print("Generated boilerplates")
