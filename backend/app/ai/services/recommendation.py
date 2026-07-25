from ..providers.base import BaseAIProvider
from ..prompts.recommendation import RECOMMENDATION_SYSTEM_PROMPT
from ..schemas.recommendation import RecommendationResult
import json

class RecommendationService:
    def __init__(self, provider: BaseAIProvider):
        self.provider = provider

    async def get_recommendations(self, user_profile: dict, items: list, item_type: str) -> RecommendationResult:
        """
        Generic recommendation engine.
        `items` should be a list of dictionaries with at least an 'id' and 'description' or 'details'.
        `item_type` is a string like 'Alumni Mentors', 'Opportunities', 'Communities', etc.
        """
        user_prompt = (
            f"User Profile:\n{json.dumps(user_profile, indent=2)}\n\n"
            f"Available {item_type}:\n{json.dumps(items, indent=2)}\n\n"
            "Rank the top matches for this user."
        )
        
        result = await self.provider.generate_json(
            system_prompt=RECOMMENDATION_SYSTEM_PROMPT,
            user_prompt=user_prompt,
            schema=RecommendationResult
        )
        return result
