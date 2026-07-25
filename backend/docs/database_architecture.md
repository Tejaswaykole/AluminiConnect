# Database Architecture Documentation

## Overview
This database is designed for the AlmaBridge platform using PostgreSQL. It is built to support students, alumni, placement cells, and admins. The schema is highly normalized (3NF) and uses an authentication-agnostic approach where the user's identity is linked to an external auth provider via `external_auth_id`.

## Naming Conventions
- **Tables and Columns**: `snake_case` (e.g., `student_profile`, `created_at`).
- **Primary Keys**: `id` mapped to UUID.
- **Foreign Keys**: `[entity]_id` (e.g., `user_id`, `department_id`).
- **Junction Tables**: `[entity1]_[entity2]` (e.g., `student_skill`).
- **Enums**: Lowercase table/type format (e.g., `userrole_enum`).

## Migrations
Migrations are managed via **Alembic**.
- Command to run: `alembic upgrade head`
- Command to generate: `alembic revision --autogenerate -m "message"`

## ER Diagram
Refer to the implementation plan for the visual Mermaid ER diagram.

## Soft Deletes
Soft deletes are implemented using a `deleted_at` timestamp. Tables like `opportunity`, `community`, and `community_post` use this to retain historical data without breaking foreign key references.
