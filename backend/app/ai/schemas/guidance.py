from pydantic import BaseModel, Field
from typing import List

class CareerGuidanceResult(BaseModel):
    career_paths: List[str] = Field(..., description="Potential career paths tailored to the user.")
    learning_roadmap: List[str] = Field(..., description="Step-by-step roadmap for skill acquisition.")
    certifications: List[str] = Field(..., description="Recommended certifications to pursue.")
    skill_recommendations: List[str] = Field(..., description="Specific skills to learn next.")
    career_advice: str = Field(..., description="General career advice based on the user's profile.")

class SkillGapAnalysisResult(BaseModel):
    missing_skills: List[str] = Field(..., description="Skills required for target career but missing from profile.")
    learning_sequence: List[str] = Field(..., description="Recommended sequence to learn the missing skills.")
    priority_score: int = Field(..., description="Priority score from 1-100 indicating urgency.")
    estimated_roadmap: str = Field(..., description="Estimated time and roadmap to bridge the gap.")
