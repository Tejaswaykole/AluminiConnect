from .base import BaseAIProvider
from core.config import settings
from ai.exceptions import AIProviderException

class GroqProvider(BaseAIProvider):
    async def generate_json(self, system_prompt: str, user_prompt: str) -> str:
        if not settings.GROQ_API_KEY:
            raise AIProviderException("Groq API Key not configured")
        # Placeholder for HTTP call to Groq REST API enforcing JSON object output
        return '{"success": true}'
