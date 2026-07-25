# Security Guide

AlmaBridge prioritizes security across its architecture. This document outlines the key defenses implemented as of Phase 13.

## API Security
- **Strict CORS**: Cross-Origin Resource Sharing is enforced via `CORSMiddleware` in `main.py`, ensuring only whitelisted frontend domains can communicate with the backend.
- **Rate Limiting**: A basic in-memory `SimpleRateLimitMiddleware` restricts clients to 100 requests per 60 seconds. (Note: For production at scale, this should be swapped to Redis/FastAPI-Limiter).
- **Authentication**: JWT tokens are used exclusively. Passwords are theoretically hashed with `passlib` before hitting PostgreSQL.
- **Authorization**: RBAC (Role-Based Access Control) prevents students from accessing Placement-only endpoints.

## AI Integration Security
- **Secrets Management**: The `GROQ_API_KEY` is loaded securely via `pydantic-settings` from an `.env` file that is ignored by source control (`.gitignore`). It is never logged.
- **Prompt Injection Defense**: By enforcing strict JSON schemas (via Pydantic) on all LLM responses, we mitigate the risk of prompt injections hijacking our API response structures.
- **Rate Limit Resilience**: The `GroqProvider` implements an exponential backoff retry mechanism to gracefully handle provider outages or rate limits (`HTTP 429`) without crashing the user experience.

## Auditing & Error Handling
- **Centralized Exceptions**: Internal Python exceptions are caught by `app_exception_handler` and converted into standardized JSON structures. Internal stack traces are never leaked to the frontend.
- **Request Logging**: `RequestLoggingMiddleware` assigns a unique `X-Request-ID` to every HTTP request, logging execution time and status codes without logging sensitive headers or payload data.
