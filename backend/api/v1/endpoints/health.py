import time
import logging
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from database.session import get_db
from schemas.health import HealthResponse
from schemas.base import StandardResponse

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/health", response_model=StandardResponse[dict])
async def health_check(db: AsyncSession = Depends(get_db)):
    start_time = time.time()
    db_status = "connected"
    migration = "unknown"
    latency_ms = 0
    success = True
    message = "Database connected successfully."

    try:
        # Check basic connectivity
        await db.execute(text("SELECT 1"))
        
        # Check alembic migration version
        try:
            result = await db.execute(text("SELECT version_num FROM alembic_version"))
            version_row = result.scalar()
            if version_row:
                migration = str(version_row)
            else:
                migration = "none"
        except SQLAlchemyError:
            migration = "table_not_found"

        latency_ms = int((time.time() - start_time) * 1000)
        logger.info("Health check database connection verified.")

    except SQLAlchemyError as e:
        success = False
        message = "Database connection failed."
        db_status = "disconnected"
        logger.error(f"Database connection error during health check: {str(e)}")

    response_data = {
        "database": db_status,
        "latency_ms": latency_ms,
        "migration": migration,
        "version": "1.0.0"
    }

    resp = StandardResponse(
        success=success,
        message=message,
        data=response_data,
        errors=[] if success else ["Connection error"]
    )
    
    return JSONResponse(
        status_code=status.HTTP_200_OK if success else status.HTTP_503_SERVICE_UNAVAILABLE,
        content=resp.model_dump()
    )
