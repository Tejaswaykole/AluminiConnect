from ..providers.base import BaseAIProvider

CHAT_SYSTEM_PROMPT = """
You are Alma, the intelligent assistant for the AlmaBridge university alumni platform.
Your goal is to help students and alumni with platform navigation, career advice, resume guidance, and interview preparation.
You are professional, concise, and helpful. Do not hallucinate information about users or events.
"""

class AIChatService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider

    async def chat(self, user_message: str, context: str = "") -> str:
        """Processes a chat message and returns a text response."""
        system_prompt = CHAT_SYSTEM_PROMPT
        if context:
            system_prompt += f"\n\nContext:\n{context}"
            
        result = await self.provider.generate_text(
            system_prompt=system_prompt,
            user_prompt=user_message
        )
        return result
