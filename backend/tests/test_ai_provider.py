import pytest
from app.ai.providers.groq_provider import GroqProvider
from app.ai.schemas.resume import ResumeAnalysisResult
from app.ai.exceptions.core import AIValidationError, AIRateLimitError
from unittest.mock import patch, AsyncMock
from pydantic import ValidationError

@pytest.fixture
def mock_groq_provider():
    with patch('app.ai.providers.groq_provider.ai_settings') as mock_settings:
        mock_settings.GROQ_API_KEY = "test_key"
        mock_settings.AI_RETRY_COUNT = 1
        yield GroqProvider()

@pytest.mark.asyncio
async def test_groq_generate_text(mock_groq_provider):
    mock_response = {
        "choices": [{"message": {"content": "Hello World"}}]
    }
    
    with patch.object(mock_groq_provider, '_make_request', new_callable=AsyncMock) as mock_request:
        mock_request.return_value = mock_response
        result = await mock_groq_provider.generate_text("System", "User")
        assert result == "Hello World"
        mock_request.assert_called_once()

@pytest.mark.asyncio
async def test_groq_generate_json_success(mock_groq_provider):
    mock_response = {
        "choices": [{"message": {"content": '{"summary": "Test", "skills": ["Python"], "missing_skills": [], "score": 90, "strengths": [], "weaknesses": [], "recommendations": []}'}}]
    }
    
    with patch.object(mock_groq_provider, '_make_request', new_callable=AsyncMock) as mock_request:
        mock_request.return_value = mock_response
        result = await mock_groq_provider.generate_json("System", "User", ResumeAnalysisResult)
        
        assert isinstance(result, ResumeAnalysisResult)
        assert result.score == 90
        assert result.skills == ["Python"]

@pytest.mark.asyncio
async def test_groq_generate_json_validation_error(mock_groq_provider):
    # Missing required 'score' field
    mock_response = {
        "choices": [{"message": {"content": '{"summary": "Test", "skills": ["Python"], "missing_skills": [], "strengths": [], "weaknesses": [], "recommendations": []}'}}]
    }
    
    with patch.object(mock_groq_provider, '_make_request', new_callable=AsyncMock) as mock_request:
        mock_request.return_value = mock_response
        with pytest.raises(AIValidationError):
            await mock_groq_provider.generate_json("System", "User", ResumeAnalysisResult)
