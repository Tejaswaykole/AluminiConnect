
import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_, and_, desc
from database.session import get_db
from schemas.base import StandardResponse
from schemas.connections import ConnectionRequest, ConnectionResponse
from models.connection import Connection, ConnectionStatus
from models.user import User
from api.dependencies.auth import get_current_user_id
from api.dependencies.pagination import PaginationParams

router = APIRouter()

@router.get("/", response_model=StandardResponse)
async def get_connections(
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Connection).where(
        or_(Connection.requester_id == current_user_id, Connection.target_id == current_user_id),
        Connection.status == ConnectionStatus.ACCEPTED
    ))
    connections = result.scalars().all()
    return StandardResponse(success=True, data=[ConnectionResponse.model_validate(c).model_dump(mode='json') for c in connections])

@router.get("/requests", response_model=StandardResponse)
async def get_connection_requests(
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Connection).where(
        Connection.target_id == current_user_id,
        Connection.status == ConnectionStatus.PENDING
    ))
    requests = result.scalars().all()
    return StandardResponse(success=True, data=[ConnectionResponse.model_validate(r).model_dump(mode='json') for r in requests])

@router.post("/request", response_model=StandardResponse)
async def request_connection(
    payload: ConnectionRequest,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    if payload.target_id == current_user_id:
        raise HTTPException(status_code=400, detail="Cannot connect to yourself")
        
    result = await db.execute(select(Connection).where(
        or_(
            and_(Connection.requester_id == current_user_id, Connection.target_id == payload.target_id),
            and_(Connection.requester_id == payload.target_id, Connection.target_id == current_user_id)
        )
    ))
    existing = result.scalars().first()
    if existing:
        if existing.status == ConnectionStatus.PENDING:
            raise HTTPException(status_code=400, detail="Connection request already pending")
        if existing.status == ConnectionStatus.ACCEPTED:
            raise HTTPException(status_code=400, detail="Already connected")
        if existing.status == ConnectionStatus.BLOCKED:
            raise HTTPException(status_code=403, detail="Connection blocked")
            
    conn = Connection(requester_id=current_user_id, target_id=payload.target_id, status=ConnectionStatus.PENDING)
    db.add(conn)
    await db.commit()
    await db.refresh(conn)
    return StandardResponse(success=True, data=ConnectionResponse.model_validate(conn).model_dump(mode='json'))

@router.post("/{conn_id}/accept", response_model=StandardResponse)
async def accept_connection(
    conn_id: uuid.UUID,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Connection).where(Connection.id == conn_id))
    conn = result.scalars().first()
    if not conn:
        raise HTTPException(status_code=404, detail="Connection not found")
        
    if conn.target_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to accept this request")
        
    if conn.status != ConnectionStatus.PENDING:
        raise HTTPException(status_code=400, detail="Request is not pending")
        
    conn.status = ConnectionStatus.ACCEPTED
    await db.commit()
    return StandardResponse(success=True, message="Connection accepted")

@router.delete("/{conn_id}", response_model=StandardResponse)
async def remove_connection(
    conn_id: uuid.UUID,
    current_user_id: uuid.UUID = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Connection).where(Connection.id == conn_id))
    conn = result.scalars().first()
    if not conn:
        raise HTTPException(status_code=404, detail="Connection not found")
        
    if conn.requester_id != current_user_id and conn.target_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    await db.delete(conn)
    await db.commit()
    return StandardResponse(success=True, message="Connection removed")
