import httpx
import json
from typing import List, Dict, Any
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from core.config import settings

router = APIRouter()

class MatchRequest(BaseModel):
    source_profile: Dict[str, Any]
    target_profiles: List[Dict[str, Any]]

class MatchResponse(BaseModel):
    id: str
    match_score: int
    reason: str

@router.post("/match", response_model=List[MatchResponse])
async def generate_matches(request: MatchRequest):
    if not settings.GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured.")

    prompt = f"""
    You are an AI matchmaking assistant for a university alumni-student network.
    Given a Source Profile and a list of Target Profiles, evaluate how well each target profile matches the source profile based on skills, career goals, and opportunities.
    
    Source Profile:
    {json.dumps(request.source_profile, indent=2)}
    
    Target Profiles:
    {json.dumps(request.target_profiles, indent=2)}
    
    For each target profile, provide a match_score (0-100) and a brief 1-sentence reason for the match.
    Respond ONLY with a valid JSON array of objects, with each object containing "id" (the target profile id), "match_score" (integer), and "reason" (string).
    """

    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": settings.GROQ_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant that only responds in valid JSON."},
            {"role": "user", "content": prompt}
        ],
        "temperature": settings.AI_TEMPERATURE,
        "max_tokens": settings.AI_MAX_TOKENS,
        "response_format": {"type": "json_object"}
    }
    
    # We ask for a json array, but response_format json_object requires an object.
    # So we'll update the prompt slightly.
    data["messages"][1]["content"] += "\nReturn a JSON object with a single key 'matches' which is the array of match objects."

    async with httpx.AsyncClient(timeout=settings.AI_TIMEOUT) as client:
        try:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=data
            )
            response.raise_for_status()
            
            result_json = response.json()
            content = result_json["choices"][0]["message"]["content"]
            parsed_content = json.loads(content)
            
            matches = parsed_content.get("matches", [])
            return matches
            
        except httpx.HTTPStatusError as e:
            print(f"Groq API Error: {e.response.text}")
            raise HTTPException(status_code=500, detail="Failed to fetch AI recommendations.")
        except Exception as e:
            print(f"Error during AI match: {str(e)}")
            raise HTTPException(status_code=500, detail="Internal server error during AI matchmaking.")
