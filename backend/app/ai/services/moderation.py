from ..providers.base import BaseAIProvider
from ..prompts.moderation import MODERATION_SYSTEM_PROMPT
from ..schemas.moderation import ContentModerationResult

class ContentModerationService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider

    async def moderate_content(self, content_text: str) -> ContentModerationResult:
        """Analyzes content for community guideline violations."""
        user_prompt = f"Please analyze the following content:\n\n{content_text}"
        
        result = await self.provider.generate_json(
            system_prompt=MODERATION_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            schema=ContentModerationResult
        )
        return result
