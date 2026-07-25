from pydantic import BaseModel, Field
from typing import List

class ContentModerationResult(BaseModel):
    is_flagged: bool = Field(..., description="True if the content violates community guidelines.")
    categories: List[str] = Field(..., description="Categories of violation (e.g. spam, hate speech, offensive, duplicate).")
    confidence: float = Field(..., description="Confidence score from 0.0 to 1.0.")
    explanation: str = Field(..., description="Brief explanation of why the content was flagged or approved.")
