from fastapi import APIRouter
from .endpoints import health, users, opportunities, communities, events, mentorship, notifications, files, auth, resumes, applications, messages, portfolios, contributions, audit_logs

api_router = APIRouter()
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(opportunities.router, prefix="/opportunities", tags=["Opportunities"])
api_router.include_router(communities.router, prefix="/communities", tags=["Communities"])
api_router.include_router(events.router, prefix="/events", tags=["Events"])
api_router.include_router(mentorship.router, prefix="/mentorship", tags=["Mentorship"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(files.router, prefix="/files", tags=["Files"])
api_router.include_router(resumes.router, prefix="/resumes", tags=["Resumes"])
api_router.include_router(applications.router, prefix="/applications", tags=["Applications"])
api_router.include_router(messages.router, prefix="/messages", tags=["Messages"])
api_router.include_router(portfolios.router, prefix="/portfolios", tags=["Portfolios"])
api_router.include_router(contributions.router, prefix="/contributions", tags=["Contributions"])
api_router.include_router(audit_logs.router, prefix="/audit-logs", tags=["Audit"])

from .endpoints import recommendations
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])

from api.v1.endpoints import connections, messaging, mentorship
api_router.include_router(connections.router, prefix="/connections", tags=["Connections"])
api_router.include_router(messaging.router, prefix="/messages", tags=["Messaging"])
api_router.include_router(mentorship.router, prefix="/mentorship", tags=["Mentorship"])

from api.v1.endpoints import admin, institute, analytics, storage
api_router.include_router(admin.router, prefix="/admin", tags=["Admin"])
api_router.include_router(institute.router, prefix="/institute", tags=["Institute"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(storage.router, prefix="/storage", tags=["Storage"])
