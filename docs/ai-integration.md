# AI Integration Architecture

## Overview
Phase 12 introduced the Artificial Intelligence capabilities of AlmaBridge.
The AI layer is designed as a standalone, provider-agnostic package in the backend (`backend/app/ai/`).
It currently utilizes the **Groq API** (`llama3-70b-8192`) via a REST approach using `httpx`.

## Architecture Layers
- **Configuration**: Managed through Pydantic `BaseSettings` (`config/settings.py`), loading the API Key, model specifications, timeouts, and token limits.
- **Provider Layer**: `BaseAIProvider` defines the abstract interface. `GroqProvider` implements asynchronous HTTP calls to Groq. This isolates the application from API-specific logic, meaning we can swap in an OpenAI or Anthropic provider seamlessly in the future.
- **Prompts**: `prompts/` directory centralizes all LLM system prompts (Resume, Guidance, Moderation, Recommendation). We do not hardcode prompts in our service files.
- **Schemas**: `schemas/` utilizes Pydantic to ensure all AI responses are strictly validated JSON structures. The `GroqProvider` forces the `json_object` response format and runs responses through these schemas.
- **Services**: The domain-level abstraction. Business logic can simply call `ResumeIntelligenceService.analyze_resume(text)` and receive a fully-typed `ResumeAnalysisResult` object.

## Implemented AI Services
1. **ResumeIntelligenceService**: Extracts summaries, skills, strengths, and suggests ATS improvements.
2. **CareerGuidanceService**: Generates learning roadmaps, certification recommendations, and performs skill gap analysis between a student's profile and a target career.
3. **RecommendationService**: A generic matching engine for Opportunities, Mentors, Communities, and Events. Returns scored and explained matches.
4. **ContentModerationService**: Automates the review of user content to detect spam or offensive language before it reaches a human moderator.
5. **AIChatService**: Provides text-based conversational guidance via the "Alma" persona.

## Security & Reliability
- **Strict Pydantic Validation**: Guarantees the application never crashes due to unexpected LLM hallucinations.
- **Exponential Backoff**: `GroqProvider` handles `HTTP 429` Rate Limits safely.
- **No Direct Data Mutation**: AI services return intelligence; business services decide how to store or present it. No AI service has database credentials.
