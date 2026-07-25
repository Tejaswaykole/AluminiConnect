from typing import Optional
from fastapi import Query
from pydantic import BaseModel

class PaginationParams(BaseModel):
    page: int = Query(1, ge=1)
    page_size: int = Query(10, ge=1, le=100)
    search: Optional[str] = Query(None)
    order_by: Optional[str] = Query(None)
    order: Optional[str] = Query("desc", regex="^(asc|desc)$")
