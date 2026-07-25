from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from pydantic import BaseModel

class BaseAIProvider(ABC):
    """Abstract base class for AI providers."""
    
    @abstractmethod
    async def generate_text(self, system_prompt: str, user_prompt: str, **kwargs) -> str:
        """Generate a plain text response from the AI."""
        pass

    @abstractmethod
    async def generate_json(self, system_prompt: str, user_prompt: str, schema: BaseModel, **kwargs) -> BaseModel:
        """Generate a structured JSON response validated against a Pydantic schema."""
        pass
