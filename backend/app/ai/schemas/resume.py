from pydantic import BaseModel, Field
from typing import List

class ResumeAnalysisResult(BaseModel):
    summary: str = Field(..., description="A brief summary of the resume.")
    skills: List[str] = Field(..., description="List of technical and soft skills extracted.")
    missing_skills: List[str] = Field(..., description="Skills missing that are typically expected for this profile.")
    score: int = Field(..., description="A score out of 100 representing overall quality.")
    strengths: List[str] = Field(..., description="Key strengths identified in the resume.")
    weaknesses: List[str] = Field(..., description="Areas for improvement.")
    recommendations: List[str] = Field(..., description="Actionable recommendations to improve ATS parsing and impact.")
