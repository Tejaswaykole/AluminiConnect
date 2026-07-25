from pydantic import BaseModel, Field
from typing import List

class ProfileIntelligenceResult(BaseModel):
    missing_fields: List[str] = Field(..., description="Fields that should be filled for a complete profile.")
    suggested_bio: str = Field(..., description="An AI-generated improved version of the user's bio.")
    missing_achievements: List[str] = Field(..., description="Suggestions for achievements the user might want to add based on their skills.")
    missing_skills: List[str] = Field(..., description="Skills they likely have but forgot to list, based on their experience.")
