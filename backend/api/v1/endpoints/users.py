import uuid
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_db
from schemas.base import StandardResponse
from api.dependencies.pagination import PaginationParams
from api.dependencies.auth import get_current_user_id
from sqlalchemy.future import select
from sqlalchemy import func, or_, desc, asc
from models.user import User
from models.profiles import StudentProfile, AlumniProfile
from models.enums import UserRole
from schemas.users import UserProfileUpdate, UserResponse, StudentProfileResponse, AlumniProfileResponse
from typing import Optional, List
from models.junctions import StudentSkill, AlumniSkill

router = APIRouter()

@router.get('/')
async def list_users(params: PaginationParams = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).limit(params.limit).offset(params.skip))
    users = result.scalars().all()
    user_list = [
        {
            "id": str(u.id),
            "email": u.email,
            "first_name": u.first_name,
            "last_name": u.last_name,
            "name": f"{u.first_name or ''} {u.last_name or ''}".strip(),
            "avatar": u.avatar_url,
            "role": u.role.value if hasattr(u.role, 'value') else u.role
        } for u in users
    ]
    return StandardResponse(success=True, data=user_list)

@router.get('/me')
async def get_me(user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    u = result.scalars().first()
    if not u:
        return StandardResponse(success=False, message="User not found", data=None)
        
    student_profile = None
    alumni_profile = None
    
    score = 0
    total = 3
    if u.first_name: score += 1
    if u.last_name: score += 1
    if u.avatar_url: score += 1
    
    if u.role == UserRole.STUDENT:
        prof_res = await db.execute(select(StudentProfile).where(StudentProfile.user_id == u.id))
        sp = prof_res.scalars().first()
        total += 3
        if sp:
            if sp.enrollment_number: score += 1
            if sp.graduation_year: score += 1
            if sp.bio: score += 1
            student_profile = StudentProfileResponse.model_validate(sp).model_dump(mode='json')
    elif u.role == UserRole.ALUMNI:
        prof_res = await db.execute(select(AlumniProfile).where(AlumniProfile.user_id == u.id))
        ap = prof_res.scalars().first()
        total += 4
        if ap:
            if ap.current_company: score += 1
            if ap.job_title: score += 1
            if ap.graduation_year: score += 1
            if ap.bio: score += 1
            alumni_profile = AlumniProfileResponse.model_validate(ap).model_dump(mode='json')
    
    data = {
        "id": str(u.id),
        "email": u.email,
        "first_name": u.first_name,
        "last_name": u.last_name,
        "name": f"{u.first_name or ''} {u.last_name or ''}".strip(),
        "avatar_url": u.avatar_url,
        "role": u.role.value if hasattr(u.role, 'value') else u.role,
        "student_profile": student_profile,
        "alumni_profile": alumni_profile,
        "profile_completeness": int((score / total) * 100)
    }
    return StandardResponse(success=True, data=data)

@router.put('/me')
async def update_me(payload: UserProfileUpdate, user_id: uuid.UUID = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    u = result.scalars().first()
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
        
    if payload.user:
        if payload.user.first_name is not None: u.first_name = payload.user.first_name
        if payload.user.last_name is not None: u.last_name = payload.user.last_name
        if payload.user.avatar_url is not None: u.avatar_url = payload.user.avatar_url
        
    if u.role == UserRole.STUDENT and payload.student_profile:
        prof_res = await db.execute(select(StudentProfile).where(StudentProfile.user_id == u.id))
        sp = prof_res.scalars().first()
        if not sp:
            sp = StudentProfile(user_id=u.id)
            db.add(sp)
        
        update_data = payload.student_profile.model_dump(exclude_unset=True)
        for k, v in update_data.items():
            setattr(sp, k, v)
            
    elif u.role == UserRole.ALUMNI and payload.alumni_profile:
        prof_res = await db.execute(select(AlumniProfile).where(AlumniProfile.user_id == u.id))
        ap = prof_res.scalars().first()
        if not ap:
            ap = AlumniProfile(user_id=u.id)
            db.add(ap)
            
        update_data = payload.alumni_profile.model_dump(exclude_unset=True)
        for k, v in update_data.items():
            setattr(ap, k, v)
            
    await db.commit()
    return StandardResponse(success=True, message="Profile updated successfully")

@router.get('/students', response_model=StandardResponse)
async def discover_students(
    search: Optional[str] = Query(None),
    department_id: Optional[uuid.UUID] = Query(None),
    graduation_year: Optional[int] = Query(None),
    skill_id: Optional[uuid.UUID] = Query(None),
    sort_by: Optional[str] = Query("newest", pattern="^(newest|name|graduation_year)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    query = select(User, StudentProfile).join(StudentProfile, User.id == StudentProfile.user_id).where(User.role == UserRole.STUDENT, User.account_status == 'ACTIVE')
    count_query = select(func.count(User.id.distinct())).join(StudentProfile, User.id == StudentProfile.user_id).where(User.role == UserRole.STUDENT, User.account_status == 'ACTIVE')
    
    if search:
        search_term = f"%{search}%"
        or_cond = or_(User.first_name.ilike(search_term), User.last_name.ilike(search_term))
        query = query.where(or_cond)
        count_query = count_query.where(or_cond)
    if department_id:
        query = query.where(StudentProfile.department_id == department_id)
        count_query = count_query.where(StudentProfile.department_id == department_id)
    if graduation_year:
        query = query.where(StudentProfile.graduation_year == graduation_year)
        count_query = count_query.where(StudentProfile.graduation_year == graduation_year)
    if skill_id:
        query = query.join(StudentSkill, StudentSkill.student_id == StudentProfile.id).where(StudentSkill.skill_id == skill_id)
        count_query = count_query.join(StudentSkill, StudentSkill.student_id == StudentProfile.id).where(StudentSkill.skill_id == skill_id)
        
    if sort_by == "newest":
        query = query.order_by(desc(User.created_at))
    elif sort_by == "name":
        query = query.order_by(asc(User.first_name), asc(User.last_name))
    elif sort_by == "graduation_year":
        query = query.order_by(desc(StudentProfile.graduation_year))
        
    total = (await db.execute(count_query)).scalar() or 0
    
    query = query.limit(page_size).offset((page - 1) * page_size)
    result = await db.execute(query)
    
    items = []
    seen = set()
    for u, sp in result.all():
        if u.id in seen: continue
        seen.add(u.id)
        items.append({
            "id": str(u.id),
            "first_name": u.first_name,
            "last_name": u.last_name,
            "avatar_url": u.avatar_url,
            "role": u.role.value if hasattr(u.role, 'value') else u.role,
            "student_profile": {
                "id": str(sp.id),
                "department_id": str(sp.department_id) if sp.department_id else None,
                "academic_year": sp.academic_year,
                "graduation_year": sp.graduation_year,
                "bio": sp.bio
            }
        })
        
    return StandardResponse(success=True, data={"data": items, "total": total, "page": page, "page_size": page_size})

@router.get('/alumni', response_model=StandardResponse)
async def discover_alumni(
    search: Optional[str] = Query(None),
    industry_id: Optional[uuid.UUID] = Query(None),
    graduation_year: Optional[int] = Query(None),
    company: Optional[str] = Query(None),
    skill_id: Optional[uuid.UUID] = Query(None),
    sort_by: Optional[str] = Query("newest", pattern="^(newest|name|graduation_year|experience)$"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    query = select(User, AlumniProfile).join(AlumniProfile, User.id == AlumniProfile.user_id).where(User.role == UserRole.ALUMNI, User.account_status == 'ACTIVE')
    count_query = select(func.count(User.id.distinct())).join(AlumniProfile, User.id == AlumniProfile.user_id).where(User.role == UserRole.ALUMNI, User.account_status == 'ACTIVE')
    
    if search:
        search_term = f"%{search}%"
        or_cond = or_(User.first_name.ilike(search_term), User.last_name.ilike(search_term), AlumniProfile.current_company.ilike(search_term), AlumniProfile.job_title.ilike(search_term))
        query = query.where(or_cond)
        count_query = count_query.where(or_cond)
    if industry_id:
        query = query.where(AlumniProfile.industry_id == industry_id)
        count_query = count_query.where(AlumniProfile.industry_id == industry_id)
    if graduation_year:
        query = query.where(AlumniProfile.graduation_year == graduation_year)
        count_query = count_query.where(AlumniProfile.graduation_year == graduation_year)
    if company:
        query = query.where(AlumniProfile.current_company.ilike(f"%{company}%"))
        count_query = count_query.where(AlumniProfile.current_company.ilike(f"%{company}%"))
    if skill_id:
        query = query.join(AlumniSkill, AlumniSkill.alumni_id == AlumniProfile.id).where(AlumniSkill.skill_id == skill_id)
        count_query = count_query.join(AlumniSkill, AlumniSkill.alumni_id == AlumniProfile.id).where(AlumniSkill.skill_id == skill_id)
        
    if sort_by == "newest":
        query = query.order_by(desc(User.created_at))
    elif sort_by == "name":
        query = query.order_by(asc(User.first_name), asc(User.last_name))
    elif sort_by == "graduation_year":
        query = query.order_by(desc(AlumniProfile.graduation_year))
    elif sort_by == "experience":
        query = query.order_by(desc(AlumniProfile.experience_years))
        
    total = (await db.execute(count_query)).scalar() or 0
    
    query = query.limit(page_size).offset((page - 1) * page_size)
    result = await db.execute(query)
    
    items = []
    seen = set()
    for u, ap in result.all():
        if u.id in seen: continue
        seen.add(u.id)
        items.append({
            "id": str(u.id),
            "first_name": u.first_name,
            "last_name": u.last_name,
            "avatar_url": u.avatar_url,
            "role": u.role.value if hasattr(u.role, 'value') else u.role,
            "alumni_profile": {
                "id": str(ap.id),
                "graduation_year": ap.graduation_year,
                "current_company": ap.current_company,
                "job_title": ap.job_title,
                "industry_id": str(ap.industry_id) if ap.industry_id else None,
                "experience_years": ap.experience_years,
                "bio": ap.bio,
                "mentorship_available": ap.mentorship_available
            }
        })
        
    return StandardResponse(success=True, data={"data": items, "total": total, "page": page, "page_size": page_size})

@router.get('/students/{id}', response_model=StandardResponse)
async def get_public_student(id: uuid.UUID, current_user: User = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User, StudentProfile).join(StudentProfile, User.id == StudentProfile.user_id).where(User.id == id, User.role == UserRole.STUDENT, User.account_status == 'ACTIVE'))
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Student not found")
        
    u, sp = row
    return StandardResponse(success=True, data={
        "id": str(u.id),
        "first_name": u.first_name,
        "last_name": u.last_name,
        "avatar_url": u.avatar_url,
        "role": u.role.value if hasattr(u.role, 'value') else u.role,
        "student_profile": {
            "id": str(sp.id),
            "department_id": str(sp.department_id) if sp.department_id else None,
            "academic_year": sp.academic_year,
            "graduation_year": sp.graduation_year,
            "bio": sp.bio
        }
    })

@router.get('/alumni/{id}', response_model=StandardResponse)
async def get_public_alumni(id: uuid.UUID, current_user: User = Depends(get_current_user_id), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User, AlumniProfile).join(AlumniProfile, User.id == AlumniProfile.user_id).where(User.id == id, User.role == UserRole.ALUMNI, User.account_status == 'ACTIVE'))
    row = result.first()
    if not row:
        raise HTTPException(status_code=404, detail="Alumni not found")
        
    u, ap = row
    return StandardResponse(success=True, data={
        "id": str(u.id),
        "first_name": u.first_name,
        "last_name": u.last_name,
        "avatar_url": u.avatar_url,
        "role": u.role.value if hasattr(u.role, 'value') else u.role,
        "alumni_profile": {
            "id": str(ap.id),
            "graduation_year": ap.graduation_year,
            "current_company": ap.current_company,
            "job_title": ap.job_title,
            "industry_id": str(ap.industry_id) if ap.industry_id else None,
            "experience_years": ap.experience_years,
            "bio": ap.bio,
            "mentorship_available": ap.mentorship_available
        }
    })
