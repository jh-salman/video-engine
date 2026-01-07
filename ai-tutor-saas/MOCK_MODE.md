# Mock Mode Guide

এই platform এখন **MOCK MODE** এ চলছে - অর্থাৎ third-party APIs (Claude, ElevenLabs) ছাড়াই dummy data দিয়ে সব কাজ করবে।

## কিভাবে Mock Mode চালু করবেন

### Option 1: Environment Variable
```bash
USE_MOCK_MODE=true
```

### Option 2: API Keys না দিলে automatically mock mode
যদি `ANTHROPIC_API_KEY` বা `ELEVENLABS_API_KEY` না থাকে, তাহলে automatically mock mode চালু হবে।

## Mock Mode এ কি হবে

### 1. AI Script Generation
- Claude API এর পরিবর্তে realistic dummy data return করবে
- Pre-defined tutorial script with code actions
- কোনো API call হবে না

### 2. Voice Generation  
- ElevenLabs API এর পরিবর্তে dummy MP3 file create করবে
- Silent audio file (placeholder)
- File system এ save হবে

### 3. Database (Optional)
- Database না থাকলে mock tutorial object create করবে
- Real database operations skip হবে
- Tutorial ID `mock-${timestamp}` format এ হবে

## Testing without External APIs

### 1. Generate Tutorial
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building a React Component",
    "topic": "React hooks and state management",
    "userId": "test-user-123"
  }'
```

### 2. Render Video
```bash
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "tutorialId": "your-tutorial-id"
  }'
```

## Dummy Data Structure

### AI Script Example
```json
{
  "narration": "Welcome to this tutorial...",
  "codeActions": [
    {
      "file": "src/components/Button.tsx",
      "action": "create",
      "content": "import React from 'react'...",
      "duration": 8
    }
  ]
}
```

### Files Created
- `uploads/audio/{tutorialId}.mp3` - Dummy audio file
- `uploads/videos/{tutorialId}.mp4` - Video file (if Remotion available)

## Error Handling

Mock mode এ সব errors gracefully handle করা হবে:
- Database errors → Mock objects ব্যবহার
- API errors → Dummy data return
- File system errors → Console warnings

## Production Mode

Real APIs ব্যবহার করতে:
1. Set `ANTHROPIC_API_KEY` and `ELEVENLABS_API_KEY`
2. Set `USE_MOCK_MODE=false` or remove it
3. Ensure database is configured

