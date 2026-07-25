import time
import uuid
import logging
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

logger = logging.getLogger(__name__)

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())
        start_time = time.time()
        
        logger.info(f"Request started: {request.method} {request.url.path} (ID: {request_id})")
        
        response = await call_next(request)
        
        process_time = time.time() - start_time
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time"] = str(process_time)
        
        logger.info(f"Request completed: {request.method} {request.url.path} - Status: {response.status_code} - Time: {process_time:.4f}s")
        return response

class SimpleRateLimitMiddleware(BaseHTTPMiddleware):
    """
    A rudimentary in-memory rate limiter for QA demonstration.
    In production, use Redis and FastAPI-Limiter.
    """
    def __init__(self, app, max_requests: int = 100, window_seconds: int = 60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._requests = {}

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        current_time = time.time()
        
        if client_ip not in self._requests:
            self._requests[client_ip] = []
            
        # Clean up old requests
        self._requests[client_ip] = [
            req_time for req_time in self._requests[client_ip]
            if current_time - req_time < self.window_seconds
        ]
        
        if len(self._requests[client_ip]) >= self.max_requests:
            logger.warning(f"Rate limit exceeded for IP: {client_ip}")
            return JSONResponse(
                status_code=429,
                content={"success": False, "message": "Too many requests. Please try again later.", "data": None}
            )
            
        self._requests[client_ip].append(current_time)
        return await call_next(request)
