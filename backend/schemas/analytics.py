from pydantic import BaseModel
from typing import Optional, Dict, Any

class AnalyticsResponse(BaseModel):
    total_users: int
    students: int
    alumni: int
    active_users: int
    suspended_users: int
    connections: int
    opportunities: int
    events: int
    reports: int