import json
import httpx
from pydantic import BaseModel, ValidationError
from ..config.settings import ai_settings
from .base import BaseAIProvider
from ..exceptions.core import AIProviderError, AIRateLimitError, AITimeoutError, AIValidationError
import asyncio

class GroqProvider(BaseAIProvider):
    def __init__(self):
        self.api_key = ai_settings.GROQ_API_KEY
        self.base_url = ai_settings.GROQ_BASE_URL
        self.model = ai_settings.GROQ_MODEL
        
        if not self.api_key:
            raise ValueError("GROQ_API_KEY is not set in environment.")

    async def _make_request(self, messages: list, response_format: dict = None) -> dict:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": ai_settings.AI_TEMPERATURE,
            "max_tokens": ai_settings.AI_MAX_TOKENS,
        }
        
        if response_format:
            payload["response_format"] = response_format

        for attempt in range(ai_settings.AI_RETRY_COUNT):
            try:
                async with httpx.AsyncClient(timeout=ai_settings.AI_TIMEOUT) as client:
                    response = await client.post(
                        f"{self.base_url}/chat/completions",
                        headers=headers,
                        json=payload
                    )
                    
                    if response.status_code == 429:
                        if attempt == ai_settings.AI_RETRY_COUNT - 1:
                            raise AIRateLimitError("Groq API rate limit exceeded.")
                        await asyncio.sleep(2 ** attempt)  # Exponential backoff
                        continue
                        
                    response.raise_for_status()
                    return response.json()
                    
            except httpx.TimeoutException:
                if attempt == ai_settings.AI_RETRY_COUNT - 1:
                    raise AITimeoutError("Request to Groq API timed out.")
            except httpx.HTTPStatusError as e:
                raise AIProviderError(f"Groq API returned an error: {e.response.text}")
            except Exception as e:
                raise AIProviderError(f"Unexpected error communicating with Groq: {str(e)}")

    async def generate_text(self, system_prompt: str, user_prompt: str, **kwargs) -> str:
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        data = await self._make_request(messages)
        return data["choices"][0]["message"]["content"]

    async def generate_json(self, system_prompt: str, user_prompt: str, schema: BaseModel, **kwargs) -> BaseModel:
        # Force JSON mode
        sys_prompt_with_json = system_prompt + "\n\nIMPORTANT: You must output ONLY valid JSON matching the requested schema."
        
        messages = [
            {"role": "system", "content": sys_prompt_with_json},
            {"role": "user", "content": user_prompt}
        ]
        
        data = await self._make_request(messages, response_format={"type": "json_object"})
        raw_content = data["choices"][0]["message"]["content"]
        
        try:
            parsed_json = json.loads(raw_content)
            return schema.model_validate(parsed_json)
        except json.JSONDecodeError as e:
            raise AIValidationError(f"Failed to parse JSON from AI response: {str(e)}\nRaw Response: {raw_content}")
        except ValidationError as e:
            raise AIValidationError(f"AI response did not match schema: {str(e)}\nRaw JSON: {parsed_json}")
