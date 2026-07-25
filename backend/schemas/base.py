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
