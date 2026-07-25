import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class AISettings(BaseSettings):
    # Groq Settings
    GROQ_API_KEY: str = ""
    GROQ_BASE_URL: str = "https://api.groq.com/openai/v1"
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_FALLBACK_MODELS: list[str] = ["llama-3.1-8b-instant", "openai/gpt-oss-120b"]
    
    # Provider Settings
    AI_TIMEOUT: int = 30
    AI_MAX_TOKENS: int = 1024
    AI_TEMPERATURE: float = 0.7
    AI_RETRY_COUNT: int = 3

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), ".env"),
        env_file_encoding='utf-8',
        extra='ignore'
    )

ai_settings = AISettings()
