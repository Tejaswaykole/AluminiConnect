from typing import List, Union
from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Alumni Connect"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    DATABASE_URL: str
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    # AI Settings
    GROQ_API_KEY: str = ''
    GROQ_MODEL: str = 'llama3-70b-8192'
    AI_TIMEOUT: int = 30
    AI_MAX_TOKENS: int = 1024
    AI_TEMPERATURE: float = 0.7
    AI_RETRY_COUNT: int = 3

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore"

settings = Settings()
