from ..providers.base import BaseAIProvider
from ..prompts.resume import RESUME_ANALYSIS_SYSTEM_PROMPT
from ..schemas.resume import ResumeAnalysisResult

class ResumeIntelligenceService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider

    async def analyze_resume(self, resume_text: str) -> ResumeAnalysisResult:
        """Analyzes a parsed resume text and returns structured insights."""
        user_prompt = f"Here is the resume text:\n\n{resume_text}"
        
        result = await self.provider.generate_json(
            system_prompt=RESUME_ANALYSIS_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            schema=ResumeAnalysisResult
        )
        return result
