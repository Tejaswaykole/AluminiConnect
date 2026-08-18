import os
import ast

def parse_models(models_dir):
    models = {}
    for filename in os.listdir(models_dir):
        if not filename.endswith('.py') or filename == '__init__.py':
            continue
        with open(os.path.join(models_dir, filename), 'r') as f:
            code = f.read()
        tree = ast.parse(code)
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                bases = [b.id for b in node.bases if isinstance(b, ast.Name)]
                if 'BaseModel' in bases or any('Base' in b for b in bases):
                    fields = []
                    for item in node.body:
                        if isinstance(item, ast.AnnAssign) and isinstance(item.target, ast.Name):
                            fields.append(item.target.id)
                    models[node.name] = fields
    return models

print(parse_models('backend/models'))
