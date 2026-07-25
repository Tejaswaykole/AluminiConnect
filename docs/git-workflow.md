# Git Workflow Strategy

This project adheres to a strict branching strategy.

## Permanent Branches
The following branches are permanent and must never be deleted. No additional long-lived branches should be created.
- `main`: Production-ready code.
- `frontend`: Frontend implementation (Expo).
- `backend`: Backend implementation (FastAPI).
- `database`: Database migrations and schema definitions.
- `integration`: Unifying frontend and backend before main.
- `ai`: AI feature implementations (Groq).

## Rules
- **No Automatic Operations:** Do not perform commits, pushes, merges, or checkouts unless explicitly instructed.
- **Commit Messages:** Must be concise and meaningful. Do not use generic messages like "Update" or "Work Done".
  - *Example:* "Initialize project architecture"
  - *Example:* "Configure Expo foundation"
