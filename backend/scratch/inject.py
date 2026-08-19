import os
import re

files_auth = [
    'communities.py', 'contributions.py', 'files.py', 'messages.py', 
    'notifications.py', 'recommendations.py', 'resumes.py', 'portfolios.py', 'mentorship.py', 'opportunities.py', 'events.py'
]

for f in files_auth:
    path = f"api/v1/endpoints/{f}"
    with open(path, 'r') as file:
        content = file.read()
    
    if "RoleChecker" not in content and "get_current_user" not in content:
        content = content.replace("from api.dependencies.auth import get_current_user_id", "from api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker")
        if "from api.dependencies.auth import get_current_user_id" not in content:
            content = content.replace("from fastapi import APIRouter, Depends", "from fastapi import APIRouter, Depends\nfrom api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker")
            
        with open(path, 'w') as file:
            file.write(content)
