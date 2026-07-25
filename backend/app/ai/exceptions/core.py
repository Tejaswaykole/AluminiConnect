class AIBaseException(Exception):
    """Base exception for all AI-related errors."""
    pass

class AIProviderError(AIBaseException):
    """Raised when the AI provider returns an error."""
    pass

class AIRateLimitError(AIProviderError):
    """Raised when the AI provider rate limits the application."""
    pass

class AITimeoutError(AIProviderError):
    """Raised when a request to the AI provider times out."""
    pass

class AIValidationError(AIBaseException):
    """Raised when the AI response fails Pydantic schema validation."""
    pass
