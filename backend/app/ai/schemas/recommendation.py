from pydantic import BaseModel, Field
from typing import List

class RankedItem(BaseModel):
    id: str = Field(..., description="ID of the recommended item.")
    score: int = Field(..., description="Match score (0-100).")
    explanation: str = Field(..., description="Explanation of why this item is a good match.")

class RecommendationResult(BaseModel):
    recommendations: List[RankedItem] = Field(..., description="List of top recommendations.")
