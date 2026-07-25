from fastapi import APIRouter
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
