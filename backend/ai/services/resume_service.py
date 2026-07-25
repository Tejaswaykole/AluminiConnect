from ai.providers.base import BaseAIProvider
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
