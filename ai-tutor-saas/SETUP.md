# Setup Guide

## 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_tutor_saas?schema=public"

# Anthropic (Claude AI)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# ElevenLabs
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Better Auth
BETTER_AUTH_SECRET=your_secret_key_here_min_32_chars
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (for Better Auth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# API Server
HOST=localhost
PORT=3001
```

## 2. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

## 3. Create Upload Directories

```bash
mkdir -p uploads/audio uploads/videos
```

## 4. Start Development Servers

### Terminal 1: API Server
```bash
nx serve api
# Runs on http://localhost:3001
```

### Terminal 2: Web Frontend
```bash
nx serve web
# Runs on http://localhost:3000
```

### Terminal 3: Remotion Studio (for video preview)
```bash
cd apps/video-engine
npm run dev
# Opens Remotion Studio
```

## 5. Testing the Pipeline

### Generate a Tutorial

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building a React Component",
    "topic": "React components and props",
    "userId": "test-user-id"
  }'
```

### Render a Video

```bash
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "tutorialId": "your-tutorial-id-here"
  }'
```

## Features Verified

✅ **Realistic Typing Animations**
- Variable typing speed (50-150ms per character)
- Deterministic randomness for Remotion compatibility
- 500ms pause after opening brackets (`{`, `(`, `[`)
- Blinking cursor animation

✅ **Three-Panel Layout**
- Virtual IDE (top left)
- Browser Preview (top right)
- Terminal (bottom, spans both columns)

✅ **Production-Ready API Endpoints**
- `/api/generate` - Generates AI script and voice
- `/api/render` - Renders video using Remotion

✅ **Type-Safe Shared Types**
- All types defined in `libs/shared/types`
- Used across frontend, backend, and video engine

## Troubleshooting

### Prisma Issues
- Make sure `DATABASE_URL` is set correctly
- Run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` to apply migrations

### Better Auth Issues
- Ensure `BETTER_AUTH_SECRET` is at least 32 characters
- Set both `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL`
- For Google OAuth, configure OAuth credentials in Google Cloud Console

### Remotion Issues
- Make sure all dependencies are installed in `apps/video-engine`
- Check that audio files are accessible at the specified paths
- Verify that code actions have valid durations

