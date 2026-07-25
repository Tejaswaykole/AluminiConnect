# Testing Guide

This document outlines the testing strategies used in AlmaBridge to ensure code quality and application stability.

## Backend Testing
We use `pytest` for executing tests and standard mocking libraries to isolate components.

### Structure
- `backend/tests/`: Root for all backend tests.
- `conftest.py`: Contains shared fixtures (e.g., database sessions, mocked AI configurations).
- `test_auth.py`: Ensures JWT tokens are securely encoded, decoded, and that expired signatures are handled correctly.
- `test_ai_provider.py`: Validates the `GroqProvider` abstraction. We mock the HTTP responses to ensure `httpx` logic behaves securely against timeouts, rate limits, and schema validation errors without incurring API costs.

### Execution
Run tests locally using:
```bash
cd backend
pytest tests/
```

## Frontend Testing
We use `jest` and `@testing-library/react-native` to render components in a virtual DOM.

### Structure
- `frontend/__tests__/components/`: Contains tests for foundational reusable primitives.
- `Button.test.tsx`: Validates rendering, `onPress` events, and loading states.
- `Badge.test.tsx`: Validates multiple variant renderings.

### Execution
Run tests locally using:
```bash
cd frontend
npm test
```
