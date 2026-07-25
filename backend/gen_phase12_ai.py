import os

backend_dir = r"c:\Users\tejas\OneDrive\Desktop\ALumini\backend"
ai_dir = os.path.join(backend_dir, "ai")
os.makedirs(ai_dir, exist_ok=True)
os.makedirs(os.path.join(ai_dir, "providers"), exist_ok=True)
os.makedirs(os.path.join(ai_dir, "prompts"), exist_ok=True)
os.makedirs(os.path.join(ai_dir, "services"), exist_ok=True)

# 1. Config placeholders
with open(os.path.join(backend_dir, "core", "config.py"), "a", encoding="utf-8") as f:
    f.write("\n    GROQ_API_KEY: str = ''\n    AI_MODEL: str = 'llama3-8b-8192'\n    AI_TEMPERATURE: float = 0.7\n")

# 2. Exceptions
with open(os.path.join(ai_dir, "exceptions.py"), "w", encoding="utf-8") as f:
    f.write("class AIProviderException(Exception): pass\nclass AIVisualizationException(Exception): pass\n")

# 3. Provider Abstraction
with open(os.path.join(ai_dir, "providers", "base.py"), "w", encoding="utf-8") as f:
    f.write("""from abc import ABC, abstractmethod

class BaseAIProvider(ABC):
    @abstractmethod
    async def generate_json(self, system_prompt: str, user_prompt: str) -> str:
        pass
""")

with open(os.path.join(ai_dir, "providers", "groq_provider.py"), "w", encoding="utf-8") as f:
    f.write("""from .base import BaseAIProvider
from core.config import settings
from ai.exceptions import AIProviderException

class GroqProvider(BaseAIProvider):
    async def generate_json(self, system_prompt: str, user_prompt: str) -> str:
        if not settings.GROQ_API_KEY:
            raise AIProviderException("Groq API Key not configured")
        # Placeholder for HTTP call to Groq REST API enforcing JSON object output
        return '{"success": true}'
""")

# 4. Schemas
with open(os.path.join(ai_dir, "schemas.py"), "w", encoding="utf-8") as f:
    f.write("""from pydantic import BaseModel
from typing import List

class ResumeAnalysisResponse(BaseModel):
    summary: str
    skills_extracted: List[str]
    missing_skills: List[str]
    ats_score: int
    improvements: List[str]

class ModerationResult(BaseModel):
    is_safe: bool
    flagged_categories: List[str]
    recommendation: str
""")

# 5. Prompts
with open(os.path.join(ai_dir, "prompts", "resume.py"), "w", encoding="utf-8") as f:
    f.write("""RESUME_SYSTEM_PROMPT = "You are an expert ATS and career advisor. Output STRICT JSON only."
RESUME_USER_PROMPT_TEMPLATE = "Analyze this resume text: {resume_text}"
""")

# 6. Services
with open(os.path.join(ai_dir, "services", "resume_service.py"), "w", encoding="utf-8") as f:
    f.write("""from ai.providers.base import BaseAIProvider
from ai.schemas import ResumeAnalysisResponse
from ai.prompts.resume import RESUME_SYSTEM_PROMPT, RESUME_USER_PROMPT_TEMPLATE
import json

class ResumeAnalysisService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider
        
    async def analyze_resume(self, resume_text: str) -> ResumeAnalysisResponse:
        user_prompt = RESUME_USER_PROMPT_TEMPLATE.format(resume_text=resume_text)
        raw_json = await self.provider.generate_json(RESUME_SYSTEM_PROMPT, user_prompt)
        # Parse and validate with Pydantic
        # For boilerplate, we'll return a mock valid shape if parsing fails
        try:
            data = json.loads(raw_json)
            return ResumeAnalysisResponse(**data)
        except:
            return ResumeAnalysisResponse(summary="Mock", skills_extracted=[], missing_skills=[], ats_score=0, improvements=[])
""")

print("Phase 12 AI Module scaffolded.")
