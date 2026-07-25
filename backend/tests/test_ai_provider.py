import pytest
from ai.providers.groq_provider import GroqProvider
from ai.exceptions import AIProviderException
from unittest.mock import patch

@pytest.fixture
def groq_provider():
    return GroqProvider()

@pytest.mark.asyncio
async def test_groq_generate_json_success(groq_provider):
    with patch('ai.providers.groq_provider.settings') as mock_settings:
        mock_settings.GROQ_API_KEY = "test_key"
        result = await groq_provider.generate_json("System", "User")
        assert result == '{"success": true}'

@pytest.mark.asyncio
async def test_groq_generate_json_no_api_key(groq_provider):
    with patch('ai.providers.groq_provider.settings') as mock_settings:
        mock_settings.GROQ_API_KEY = ""
        with pytest.raises(AIProviderException) as exc_info:
            await groq_provider.generate_json("System", "User")
        assert str(exc_info.value) == "Groq API Key not configured"
