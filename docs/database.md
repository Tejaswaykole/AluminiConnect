# Database Planning & Strategy

## Supabase PostgreSQL
- We are using Supabase as our managed PostgreSQL instance.
- Connection strings are managed securely via environment variables.

## Migrations (Alembic)
- All schema changes must go through Alembic migrations via the FastAPI backend.
- We will NOT create tables directly via the Supabase dashboard to maintain source-of-truth in code.

## Naming Conventions
- **Tables:** Plural, snake_case (e.g., `users`, `events`).
- **Columns:** snake_case (e.g., `created_at`, `first_name`).
- **Primary Keys:** `id` (UUIDv4).
- **Foreign Keys:** `[table_singular]_id` (e.g., `user_id`).

## Architecture Prep
- No tables have been created yet, as this will happen in Phase 7.
