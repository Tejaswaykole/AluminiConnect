from ..providers.base import BaseAIProvider
from ..prompts.guidance import CAREER_GUIDANCE_SYSTEM_PROMPT, SKILL_GAP_SYSTEM_PROMPT
from ..schemas.guidance import CareerGuidanceResult, SkillGapAnalysisResult
import json

class CareerGuidanceService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider

    async def generate_career_guidance(self, profile_data: dict) -> CareerGuidanceResult:
        """Generates career guidance based on the user's profile."""
        user_prompt = f"Profile details:\n{json.dumps(profile_data, indent=2)}"
        
        result = await self.provider.generate_json(
            system_prompt=CAREER_GUIDANCE_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            schema=CareerGuidanceResult
        )
        return result

class SkillGapAnalysisService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider

    async def analyze_skill_gap(self, user_skills: list, target_career: str) -> SkillGapAnalysisResult:
        """Analyzes missing skills between current skills and target career."""
        user_prompt = f"Current Skills: {', '.join(user_skills)}\nTarget Career: {target_career}"
        
        result = await self.provider.generate_json(
            system_prompt=SKILL_GAP_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            schema=SkillGapAnalysisResult
        )
        return result
