# TinyLink - Starter (Next.js + Prisma)

## What this contains
- Next.js (pages router) scaffold
- API routes matching the assignment spec:
  - `POST /api/links` - create link (409 if code exists)
  - `GET /api/links`  - list links
  - `GET /api/links/:code` - stats for one code
  - `DELETE /api/links/:code` - delete link
  - `GET /healthz` - health check
- Prisma schema and client helper
- Simple frontend (Dashboard) at `/` and stats page at `/code/:code`
- Redirect route at `/:code`

## Run locally (short)
1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client and push schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Run dev server:
   ```bash
   npm run dev
   ```

## Deploy
- Push repo to GitHub and deploy on Vercel. Set `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL` in Vercel env vars.
- Use Neon (Postgres) for a free Postgres DB.

## Notes
This is a starter scaffold. You will likely want to improve UX, add validation and tests, and polish CSS.