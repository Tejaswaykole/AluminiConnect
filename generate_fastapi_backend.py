import os

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

backend_dir = r"c:\Users\tejas\OneDrive\Desktop\ALumini\backend"

# Requirements
reqs = """
fastapi==0.104.1
pydantic==2.4.2
pydantic-settings==2.0.3
uvicorn==0.24.0
pytest==7.4.3
httpx==0.25.1
"""
with open(os.path.join(backend_dir, "requirements.txt"), "a", encoding="utf-8") as f:
    f.write(reqs)

# .env.example
env_content = """
ENVIRONMENT=development
DEBUG=True
API_V1_STR=/api/v1
PROJECT_NAME=AlmaBridge

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/almabridge

# CORS
BACKEND_CORS_ORIGINS=["http://localhost:3000"]
"""
create_file(os.path.join(backend_dir, ".env.example"), env_content)

# core/config.py
config_py = """
from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AlmaBridge"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    DATABASE_URL: str
    
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
"""
create_file(os.path.join(backend_dir, "core", "config.py"), config_py)

# schemas/base.py
base_schema_py = """
from typing import Generic, TypeVar, Optional, List, Any
from pydantic import BaseModel, Field

T = TypeVar("T")

class PaginationMeta(BaseModel):
    page: int
    page_size: int
    total: int
    total_pages: int

class MetaData(BaseModel):
    pagination: Optional[PaginationMeta] = None
    # Add other metadata if needed

class StandardResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = ""
    data: Optional[T] = None
    errors: Optional[List[Any]] = None
    meta: Optional[MetaData] = None
"""
create_file(os.path.join(backend_dir, "schemas", "base.py"), base_schema_py)
create_file(os.path.join(backend_dir, "schemas", "health.py"), """from pydantic import BaseModel\n\nclass HealthResponse(BaseModel):\n    status: str\n    database: str\n    version: str""")

# database/session.py
session_py = """
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=settings.DEBUG, future=True)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
"""
create_file(os.path.join(backend_dir, "database", "session.py"), session_py)

# repositories/base.py
repo_base_py = """
from typing import Generic, TypeVar, Type, Optional, List, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from models.base import BaseModel

ModelType = TypeVar("ModelType", bound=BaseModel)

class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> Optional[ModelType]:
        result = await db.execute(select(self.model).filter(self.model.id == id))
        return result.scalars().first()

    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> List[ModelType]:
        result = await db.execute(select(self.model).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, db: AsyncSession, obj_in: dict) -> ModelType:
        db_obj = self.model(**obj_in)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(self, db: AsyncSession, db_obj: ModelType, obj_in: dict) -> ModelType:
        for field, value in obj_in.items():
            setattr(db_obj, field, value)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def delete(self, db: AsyncSession, id: Any) -> ModelType:
        obj = await self.get(db, id)
        if obj:
            await db.delete(obj)
            await db.commit()
        return obj
"""
create_file(os.path.join(backend_dir, "repositories", "base.py"), repo_base_py)

# services/base.py
service_base_py = """
from typing import Generic, TypeVar, Any, Optional
from repositories.base import BaseRepository

RepoType = TypeVar("RepoType", bound=BaseRepository)

class BaseService(Generic[RepoType]):
    def __init__(self, repository: RepoType):
        self.repository = repository
"""
create_file(os.path.join(backend_dir, "services", "base.py"), service_base_py)

# core/exceptions.py
exceptions_py = """
class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
"""
create_file(os.path.join(backend_dir, "core", "exceptions.py"), exceptions_py)

# core/handlers.py
handlers_py = """
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from core.exceptions import AppException
from schemas.base import StandardResponse

async def app_exception_handler(request: Request, exc: AppException):
    resp = StandardResponse(success=False, message=exc.message, errors=[])
    return JSONResponse(status_code=exc.status_code, content=resp.model_dump())

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = [{"loc": err["loc"], "msg": err["msg"], "type": err["type"]} for err in exc.errors()]
    resp = StandardResponse(success=False, message="Validation error", errors=errors)
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=resp.model_dump())

async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    resp = StandardResponse(success=False, message="Database error occurred", errors=[str(exc)])
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=resp.model_dump())
"""
create_file(os.path.join(backend_dir, "core", "handlers.py"), handlers_py)

# core/middleware.py
middleware_py = """
import time
import uuid
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

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
"""
create_file(os.path.join(backend_dir, "core", "middleware.py"), middleware_py)

# api/v1/endpoints/health.py
health_py = """
from fastapi import APIRouter
from schemas.health import HealthResponse
from schemas.base import StandardResponse

router = APIRouter()

@router.get("/health", response_model=StandardResponse[HealthResponse])
async def health_check():
    # In a real scenario, check DB connection here.
    return StandardResponse(
        success=True, 
        message="System is healthy", 
        data=HealthResponse(status="OK", database="Connected", version="1.0.0")
    )
"""
create_file(os.path.join(backend_dir, "api", "v1", "endpoints", "health.py"), health_py)

# api/v1/router.py
router_py = """
from fastapi import APIRouter
from api.v1.endpoints import health

api_router = APIRouter()
api_router.include_router(health.router, tags=["Health"])
"""
create_file(os.path.join(backend_dir, "api", "v1", "router.py"), router_py)

# main.py
main_py = """
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError

from core.config import settings
from core.exceptions import AppException
from core.handlers import app_exception_handler, validation_exception_handler, sqlalchemy_exception_handler
from core.middleware import RequestLoggingMiddleware
from api.v1.router import api_router
from schemas.base import StandardResponse

logging.basicConfig(level=logging.INFO if settings.DEBUG else logging.WARNING)

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version="1.0.0",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        description="AlmaBridge API documentation"
    )

    # Middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(RequestLoggingMiddleware)

    # Exception Handlers
    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)

    # Routers
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/", response_model=StandardResponse[dict])
    async def root():
        return StandardResponse(success=True, message="AlmaBridge API", data={"version": "1.0.0"})

    return app

app = create_app()
"""
create_file(os.path.join(backend_dir, "main.py"), main_py)

# Create remaining structure
os.makedirs(os.path.join(backend_dir, "tests", "api"), exist_ok=True)
create_file(os.path.join(backend_dir, "tests", "conftest.py"), "# Pytest configuration\n")
os.makedirs(os.path.join(backend_dir, "utils"), exist_ok=True)
create_file(os.path.join(backend_dir, "utils", "pagination.py"), "# Pagination helpers\n")

print("FastAPI Foundation generated.")
