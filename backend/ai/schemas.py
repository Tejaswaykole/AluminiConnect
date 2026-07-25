from pydantic import BaseModel
from typing import List

class ResumeAnalysisResponse(BaseModel):
    summary: str
    skills_extracted: List[str]
    missing_skills: List[str]
    ats_score: int
    improvements: List[str]

class ModerationResult(BaseModel):
    is_safe: bool
    flagged_categories: List[str]
    recommendation: str
