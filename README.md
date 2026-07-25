# AlmaBridge (Alumni Connect)

AlmaBridge is a comprehensive university networking platform connecting students, alumni, and placement officers. It features an intelligent AI layer for career guidance, resume analysis, and networking recommendations.

## Architecture
- **Frontend**: React Native (Expo) using NativeWind (TailwindCSS) and Zustand.
- **Backend**: FastAPI (Python) using SQLAlchemy and Pydantic.
- **AI Integration**: Modular architecture powered by Groq (LLama3-70b-8192).

## Developer Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- PostgreSQL (or Supabase instance)

### Backend Setup
1. `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate environment: `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. Install dependencies: `pip install -r requirements.txt`
5. Create a `.env` file (see `.env.example`). *Note: Ensure you include a `GROQ_API_KEY` to run AI Services.*
6. Run server: `uvicorn main:app --reload`

### Frontend Setup
1. `cd frontend`
2. Install dependencies: `npm install`
3. Start Expo: `npx expo start`

## Documentation
- [Architecture Guide](docs/architecture.md)
- [Frontend Design System](docs/design-system.md)
- [AI Integration](docs/ai-integration.md)
- [Security Guide](docs/security-guide.md)
- [Testing Guide](docs/testing-guide.md)

## Testing
- Backend tests (pytest): `cd backend && pytest tests/`
- Frontend tests (jest): `cd frontend && npm test`
