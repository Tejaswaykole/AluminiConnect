import os

auth_routes = {
    'communities.py': {'get': 'get_current_user'},
    'contributions.py': {'get': 'get_current_user'},
    'events.py': {'get': 'get_current_user', 'post': 'RoleChecker(["ADMIN", "INSTITUTE"])'},
    'files.py': {'get': 'get_current_user'},
    'mentorship.py': {'get': 'get_current_user', 'post': 'RoleChecker(["STUDENT", "ALUMNI"])'},
    'messages.py': {'get': 'get_current_user', 'post': 'get_current_user'},
    'notifications.py': {'get': 'get_current_user', 'put': 'get_current_user'},
    'opportunities.py': {'get': 'get_current_user', 'post': 'RoleChecker(["ADMIN", "INSTITUTE"])'},
    'portfolios.py': {'get': 'get_current_user', 'post': 'RoleChecker(["STUDENT", "ALUMNI"])'},
    'recommendations.py': {'post': 'get_current_user'},
    'resumes.py': {'get': 'get_current_user', 'post': 'RoleChecker(["STUDENT", "ALUMNI"])'}
}

for f, methods in auth_routes.items():
    path = f"api/v1/endpoints/{f}"
    with open(path, 'r') as file:
        content = file.read()
    
    # ensure imports exist
    if "RoleChecker" not in content:
        content = content.replace("from api.dependencies.auth import get_current_user_id", "from api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker")
        if "from api.dependencies.auth import get_current_user_id" not in content:
            content = content.replace("from fastapi import APIRouter", "from fastapi import APIRouter\nfrom api.dependencies.auth import get_current_user_id, get_current_user, RoleChecker")

    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if line.startswith('@router.get('):
            dep = methods.get('get')
            if dep and 'dependencies' not in line:
                line = line.replace(')', f", dependencies=[Depends({dep})])")
        elif line.startswith('@router.post('):
            dep = methods.get('post')
            if dep and 'dependencies' not in line:
                line = line.replace(')', f", dependencies=[Depends({dep})])")
        elif line.startswith('@router.put('):
            dep = methods.get('put')
            if dep and 'dependencies' not in line:
                line = line.replace(')', f", dependencies=[Depends({dep})])")
                
        new_lines.append(line)
        
    with open(path, 'w') as file:
        file.write('\n'.join(new_lines))
