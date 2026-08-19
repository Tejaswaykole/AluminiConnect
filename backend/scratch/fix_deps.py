import re

auth_routes = [
    'communities.py', 'contributions.py', 'files.py', 'messages.py', 
    'notifications.py', 'recommendations.py', 'resumes.py', 'portfolios.py', 'mentorship.py', 'opportunities.py', 'events.py'
]

def fix_depends(content):
    lines = content.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # If the line is     _ = Depends... and the previous line ends with :, it means it's inside the function.
        if line.strip().startswith('_ = Depends') and i > 0 and lines[i-1].strip().endswith(':'):
            # We need to move it into the parameters of the def line
            def_idx = i - 1
            while def_idx >= 0 and not lines[def_idx].strip().startswith('async def'):
                def_idx -= 1
            
            # The last line of def is lines[i-1]
            # Replace the ): at the end of lines[i-1] with ,  + line.strip().replace(',', '') + ):
            
            dep_str = line.strip().rstrip(',')
            # We can just extract it and do a clean multi-line def
            
            # Let's just remove this line and put it properly.
            new_lines.pop() # remove lines[i-1] from new_lines
            
            def_end_line = lines[i-1]
            if def_end_line.endswith('):'):
                if def_end_line.endswith('()'):
                     # async def foo():
                     new_def_end_line = def_end_line[:-2] + f"({dep_str}):"
                else:
                     new_def_end_line = def_end_line[:-2] + f", {dep_str}):"
                new_lines.append(new_def_end_line)
            else:
                new_lines.append(def_end_line)
        else:
            new_lines.append(line)
        i += 1
    return '\n'.join(new_lines)

for f in auth_routes:
    path = f"api/v1/endpoints/{f}"
    with open(path, 'r') as file:
        content = file.read()
    
    new_content = fix_depends(content)
    with open(path, 'w') as file:
        file.write(new_content)
