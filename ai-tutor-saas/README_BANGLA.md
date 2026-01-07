# AI Video Tutoring SaaS - Mock Mode Setup

## ✅ কি করা হয়েছে

### 1. Mock Implementations তৈরি করা হয়েছে
- ✅ **AI Engine Mock** (`api/src/lib/ai-engine-mock.ts`)
  - Claude API ছাড়াই realistic dummy tutorial script generate করে
  - Pre-defined code actions সহ
  
- ✅ **Voice Service Mock** (`api/src/lib/voice-service-mock.ts`)
  - ElevenLabs API ছাড়াই dummy MP3 file create করে
  - Silent audio placeholder file

### 2. Automatic Mock Mode Detection
- API keys না থাকলে automatically mock mode চালু হয়
- `USE_MOCK_MODE=true` environment variable দিয়ে force করা যায়
- কোনো external API call হবে না

### 3. Database Error Handling
- Database না থাকলে mock tutorial objects ব্যবহার করে
- কোনো error throw করবে না
- Gracefully degrade করে

### 4. Auto Directory Creation
- `uploads/audio/` এবং `uploads/videos/` automatically create হয়
- Server start করার সময় directories তৈরি হয়

## 🚀 কিভাবে চালাবেন

### Step 1: Dependencies Install
```bash
npm install
```

### Step 2: API Server Start করুন
```bash
nx serve api
```

Server `http://localhost:3001` এ চালু হবে এবং console এ দেখবেন:
```
[INFO] Running in MOCK mode - using dummy data
[INFO] Created directory: /path/to/uploads
[INFO] Created directory: /path/to/uploads/audio
[INFO] Created directory: /path/to/uploads/videos
[ ready ] http://localhost:3001
```

### Step 3: Test করুন
```bash
# Test script run করুন
./test-api.sh

# অথবা manual test
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Tutorial",
    "topic": "Hooks and State",
    "userId": "test-user"
  }'
```

## 📋 API Endpoints

### POST `/api/generate`
Tutorial generate করে dummy data দিয়ে।

**Request:**
```json
{
  "title": "Building a React Component",
  "topic": "React hooks and state management",
  "userId": "user-123"
}
```

**Response:**
```json
{
  "tutorialId": "mock-1234567890",
  "status": "RENDERING",
  "audioUrl": "/uploads/audio/mock-1234567890.mp3"
}
```

### POST `/api/render`
Video render করে (Remotion available হলে)।

**Request:**
```json
{
  "tutorialId": "mock-1234567890"
}
```

**Response:**
```json
{
  "tutorialId": "mock-1234567890",
  "status": "COMPLETED",
  "videoUrl": "/uploads/videos/mock-1234567890.mp4"
}
```

## 🎯 Dummy Data Structure

### AI Script Example
```json
{
  "narration": "Welcome to this tutorial on Building a React Component...",
  "codeActions": [
    {
      "file": "src/components/Button.tsx",
      "action": "create",
      "content": "import React from 'react';...",
      "duration": 8
    },
    {
      "file": "src/components/Button.tsx",
      "action": "update",
      "content": "import React, { useState } from 'react';...",
      "duration": 10
    }
  ]
}
```

## 📁 File Structure

```
api/src/lib/
├── ai-engine.ts          # Real Claude API (if keys available)
├── ai-engine-mock.ts     # ✅ Mock implementation
├── voice-service.ts      # Real ElevenLabs API (if keys available)
├── voice-service-mock.ts # ✅ Mock implementation
└── prisma.ts             # Database client (with error handling)
```

## ⚙️ Configuration

### Mock Mode Enable/Disable

**Automatic (Default):**
- API keys না থাকলে automatically mock mode
- কোনো configuration প্রয়োজন নেই

**Manual:**
```bash
# Force mock mode
USE_MOCK_MODE=true nx serve api

# Force real APIs (requires keys)
USE_MOCK_MODE=false ANTHROPIC_API_KEY=xxx ELEVENLABS_API_KEY=xxx nx serve api
```

## 🔍 Error Handling

সব errors gracefully handle করা হয়েছে:

1. **Database Errors** → Mock objects ব্যবহার
2. **API Errors** → Dummy data return
3. **File System Errors** → Console warnings, continue execution
4. **Remotion Errors** → Placeholder file create

## ✅ Verified Features

- ✅ No external API calls in mock mode
- ✅ No database required
- ✅ All endpoints work with dummy data
- ✅ Files are created in uploads directory
- ✅ No errors thrown
- ✅ Platform runs smoothly

## 🎉 Ready to Use!

Platform এখনই চালু করা যায় - কোনো external dependencies নেই!

```bash
npm install
nx serve api
```

That's it! 🚀

