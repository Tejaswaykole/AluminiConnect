
# Architecture Overview

## Full-Stack Architecture
The Alumni Connect platform utilizes an Expo frontend and a FastAPI backend, interacting via RESTful APIs. Data persistence is handled via Supabase (PostgreSQL).

## Frontend (Expo & React Native Web)
- **Framework:** Expo
- **Routing:** Expo Router
- **Styling:** NativeWind (strict minimal design system)
- **State Management:** Zustand (Global State) & TanStack Query (Server State)
- **Architecture:** Feature-Sliced Design. Business logic is encapsulated in `features/`.

## Backend (FastAPI)
- **Framework:** FastAPI (Python)
- **ORM:** SQLAlchemy + Alembic for migrations
- **Architecture:** Clean Layered Architecture
  - `api/`: HTTP Transport layer only.
  - `services/`: Business Logic.
  - `repositories/`: Database Interactions.
  - `schemas/`: Pydantic Models for validation.

## Database (Supabase)
- PostgreSQL relational structure.
- Alembic will manage the schema via the backend.

## AI Integration (Groq)
- The frontend will not communicate with Groq directly to protect API keys.
- All AI operations route through a specific FastAPI service layer.
