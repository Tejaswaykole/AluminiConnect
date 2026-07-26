import asyncio
import uuid
import sys
import os

# Add the backend directory to python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select

from models.user import User
from models.community import Community
from models.enums import UserRole, CommunityVisibility
from database.session import engine

async def main():
    async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    async with async_session() as session:
        # 1. Ensure the stable dev user exists
        dev_uuid = uuid.UUID('00000000-0000-0000-0000-000000000001')
        user_query = await session.execute(select(User).where(User.id == dev_uuid))
        dev_user = user_query.scalar_one_or_none()
        
        if not dev_user:
            dev_user = User(
                id=dev_uuid,
                email="dev_stable@example.com",
                hashed_password="dummy_hash",
                role=UserRole.STUDENT,
                is_active=True
            )
            session.add(dev_user)
            await session.flush()
            print("Seeded dev stable user.")
        else:
            print("Dev user already exists.")
        
        # 2. Seed communities with standard UUIDs
        communities_to_seed = [
            {
                "id": uuid.UUID("11111111-1111-1111-1111-111111111111"),
                "name": "Web Developers Guild",
                "description": "A community for discussing the latest in frontend and backend web technologies.",
                "visibility": CommunityVisibility.PUBLIC
            },
            {
                "id": uuid.UUID("22222222-2222-2222-2222-222222222222"),
                "name": "Data Science Enthusiasts",
                "description": "Sharing resources, datasets, and career advice for data science.",
                "visibility": CommunityVisibility.PUBLIC
            }
        ]
        
        for c_data in communities_to_seed:
            c_query = await session.execute(select(Community).where(Community.id == c_data["id"]))
            existing_c = c_query.scalar_one_or_none()
            if not existing_c:
                new_c = Community(**c_data)
                session.add(new_c)
                print(f"Seeded community: {c_data['name']}")
            else:
                print(f"Community {c_data['name']} already exists.")
                
        await session.commit()
        print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(main())
