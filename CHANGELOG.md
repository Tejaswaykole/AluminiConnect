# Changelog

All notable changes to the AlmaBridge platform will be documented in this file.

## [v1.0.0] - 2026-07-25
### Added
- **Core Architecture**: Initialized full monorepo setup with React Native (Expo) frontend and FastAPI (Python) backend.
- **Authentication**: JWT-based RBAC authentication mapping Users to specific roles (Student, Alumni, Placement Officer, Admin).
- **Frontend Modules**:
  - Student Dashboard
  - Alumni Networking Hub
  - Placement Officer Analytics & Drive Management
- **Backend Services**:
  - Users, Profiles, Communities, Opportunities, Events, and Mentorship Repositories and Services.
- **AI Integration**:
  - Modular AI abstraction layer using Groq LLMs.
  - ResumeIntelligenceService for ATS scoring.
  - CareerGuidanceService for roadmap generation.
  - RecommendationService for alumni and job matching.
  - ContentModerationService for community safety.
- **Security & Quality**:
  - Automated CI/CD pipeline via GitHub Actions.
  - Basic Rate Limiting and strict CORS.
  - Health check endpoint `/health`.
  - Comprehensive `jest` and `pytest` testing scaffolding.

### Known Limitations (v1.0.0)
- End-to-end integration tests via Appium/Detox are not fully automated.
- Native mobile builds (APK/IPA) rely entirely on Expo Application Services (EAS) and are not covered by Vercel CI.
- Rate limiting is in-memory and will not sync across multiple Vercel serverless functions.
