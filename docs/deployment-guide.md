# Vercel Deployment Guide

AlmaBridge v1.0.0 is configured for zero-configuration deployments using Vercel.

## 1. Backend (FastAPI) Deployment
Vercel supports Python serverless functions out of the box.

1. Connect your GitHub repository to Vercel.
2. Create a new Project and select the `backend` directory as the Root Directory.
3. Configure the following Environment Variables in the Vercel Dashboard:
   - `DATABASE_URL` (Your Supabase PostgreSQL connection string)
   - `GROQ_API_KEY` (Your Groq AI provider key)
   - `JWT_SECRET_KEY` (A secure random string)
   - `CORS_ORIGINS` (Set to your frontend URL)
4. The `vercel.json` included in `backend/` handles the routing to `main.py`.

## 2. Frontend (Expo Web) Deployment
1. Create a second Project in Vercel.
2. Select the `frontend` directory as the Root Directory.
3. The included `vercel.json` automatically overrides the build command to `npx expo export -p web` and sets the output directory to `dist`.
4. Add Frontend Environment Variables:
   - `EXPO_PUBLIC_API_URL` (Set this to the Vercel URL of your backend project)

## 3. Database Migrations
Vercel serverless functions are ephemeral. You must run Alembic migrations manually or via GitHub Actions before deployment.
```bash
cd backend
alembic upgrade head
```

## 4. Backups and Disaster Recovery
- **Database**: Use Supabase's built-in Point-in-Time Recovery (PITR) or daily automated backups.
- **Storage**: Ensure Supabase Storage buckets are backed up routinely if hosting critical user files like resumes.
