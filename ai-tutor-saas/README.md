# AI Video Tutoring SaaS

A production-level AI-powered video tutoring platform that generates interactive coding tutorials with AI-generated scripts, human-like voice narration, and animated IDE demonstrations.

## 🏗️ Architecture

This project is built as an Nx monorepo with the following structure:

- **`apps/web`** - Next.js frontend application (App Router)
- **`apps/api`** - Express.js backend API
- **`apps/video-engine`** - Remotion-based video rendering engine
- **`libs/shared/types`** - Shared TypeScript types
- **`libs/shared/utils`** - Shared utility functions

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Express.js, Prisma, PostgreSQL
- **AI**: Claude 3.5 Sonnet (Anthropic)
- **Voice**: ElevenLabs API
- **Video**: Remotion
- **Auth**: Better Auth (Google OAuth + Email/Password)
- **Monorepo**: Nx 22.3

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- API keys:
  - Anthropic API key (for Claude)
  - ElevenLabs API key (for voice synthesis)
  - Google OAuth credentials (for authentication)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Update the following variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `ELEVENLABS_API_KEY` - Your ElevenLabs API key
- `BETTER_AUTH_SECRET` - A random secret for Better Auth
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - Google OAuth credentials

### 3. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

### 4. Create Upload Directories

```bash
mkdir -p uploads/audio uploads/videos
```

### 5. Start Development Servers

```bash
# Start API server (port 3001)
nx serve api

# Start web frontend (port 3000)
nx serve web

# Start Remotion studio (for video preview)
cd apps/video-engine && npm run dev
```

## 📁 Project Structure

```
ai-tutor-saas/
├── apps/
│   ├── api/                 # Express backend
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── ai-engine.ts      # Claude AI integration
│   │       │   ├── voice-service.ts  # ElevenLabs integration
│   │       │   └── prisma.ts         # Prisma client
│   │       └── main.ts               # API routes
│   ├── video-engine/        # Remotion video rendering
│   │   └── src/
│   │       ├── components/
│   │       │   ├── VirtualIDE.tsx    # Animated code editor
│   │       │   ├── BrowserPreview.tsx # Browser mockup
│   │       │   └── Terminal.tsx      # Terminal component
│   │       ├── Tutorial.tsx          # Main composition
│   │       └── Root.tsx              # Remotion root
│   └── web/                 # Next.js frontend
│       └── app/
├── libs/
│   └── shared/
│       ├── types/           # Shared TypeScript types
│       └── utils/           # Shared utilities
└── prisma/
    └── schema.prisma        # Database schema
```

## 🎯 Key Features

### 1. AI Script Generation
- Uses Claude 3.5 Sonnet to generate detailed tutorial scripts
- Creates structured JSON with narration and code actions
- Each code action includes timing information for synchronization

### 2. Voice Synthesis
- Converts narration text to high-quality human speech using ElevenLabs
- Supports custom voice selection
- Generates MP3 audio files

### 3. Virtual IDE Component
- **Variable Typing Speed**: Random 50-150ms delay per character
- **Smart Pauses**: 500ms pause after opening brackets (`{`, `(`, `[`)
- **Blinking Cursor**: Realistic cursor animation
- **Breathing UI**: Subtle scale animation using Framer Motion
- **File Tabs**: Visual file management interface

### 4. Video Rendering Pipeline
- Remotion-based video composition
- Synchronizes code actions with audio narration
- Three-panel layout: IDE, Browser Preview, Terminal
- Exports high-quality MP4 videos

## 🔌 API Endpoints

### POST `/api/generate`
Generates a new tutorial with AI script and voice synthesis.

**Request Body:**
```json
{
  "title": "Building a React Component",
  "topic": "React components and props",
  "userId": "user-id-here"
}
```

**Response:**
```json
{
  "tutorialId": "tutorial-id",
  "status": "RENDERING",
  "audioUrl": "/uploads/audio/tutorial-id.mp3"
}
```

### POST `/api/render`
Renders the video for a tutorial.

**Request Body:**
```json
{
  "tutorialId": "tutorial-id"
}
```

**Response:**
```json
{
  "tutorialId": "tutorial-id",
  "status": "COMPLETED",
  "videoUrl": "/uploads/videos/tutorial-id.mp4"
}
```

## 🎨 Virtual IDE Features

The VirtualIDE component includes:

1. **Realistic Typing Animation**
   - Variable speed per character (50-150ms)
   - Pauses after brackets for readability
   - Smooth character-by-character rendering

2. **Visual Polish**
   - VS Code-inspired dark theme
   - Blinking cursor
   - Breathing animation on the container
   - Status bar with line/column info

3. **Code Actions**
   - Supports create, update, and delete operations
   - File path display in tab bar
   - Action type shown in status bar

## 🗄️ Database Schema

### User Model
- `id` (String, CUID)
- `email` (String, unique)
- `name` (String, optional)
- `image` (String, optional)
- `createdAt`, `updatedAt` (DateTime)

### Tutorial Model
- `id` (String, CUID)
- `title` (String)
- `topic` (String)
- `aiScript` (JSON) - Contains narration and codeActions
- `audioUrl` (String, optional)
- `videoUrl` (String, optional)
- `status` (Enum: IDEATING, GENERATING_VOICE, RENDERING, COMPLETED)
- `userId` (String, foreign key)
- `createdAt`, `updatedAt` (DateTime)

## 🚧 Development

### Running Tests
```bash
nx test api
nx test web
```

### Building for Production
```bash
nx build api
nx build web
```

### Database Migrations
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy
```

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Nx](https://nx.dev)
- Video rendering powered by [Remotion](https://www.remotion.dev)
- AI powered by [Anthropic Claude](https://www.anthropic.com)
- Voice synthesis by [ElevenLabs](https://elevenlabs.io)
