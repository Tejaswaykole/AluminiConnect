import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

from core.config import settings
from core.exceptions import AppException
from core.handlers import app_exception_handler, validation_exception_handler, sqlalchemy_exception_handler
from core.middleware import RequestLoggingMiddleware, SimpleRateLimitMiddleware
from api.v1.router import api_router
from schemas.base import StandardResponse

logging.basicConfig(level=logging.INFO if settings.DEBUG else logging.WARNING)

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version="1.0.0",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        description="Alumni Connect API documentation"
    )

    # Middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], # Allow all for local dev to avoid trailing slash issues
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestLoggingMiddleware)
    app.add_middleware(SimpleRateLimitMiddleware, max_requests=100, window_seconds=60)

    # Exception Handlers
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)

    # Routers
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/", response_model=StandardResponse[dict])
    async def root():
        return StandardResponse(success=True, message="Alumni Connect API", data={"version": "1.0.0"})

    return app

app = create_app()
