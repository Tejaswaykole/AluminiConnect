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
