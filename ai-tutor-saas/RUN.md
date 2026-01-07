# 🚀 Platform চালু করার নির্দেশনা

## Quick Start

### Option 1: Script ব্যবহার করে (সবচেয়ে সহজ)
```bash
./start-server.sh
```

### Option 2: Manual Start
```bash
# 1. Dependencies install (যদি না করা থাকে)
npm install

# 2. Upload directories তৈরি করুন
mkdir -p uploads/audio uploads/videos

# 3. Server start করুন
npx nx serve api
```

## ✅ Server চালু হলে

Server `http://localhost:3001` এ চালু হবে এবং দেখবেন:

```
[INFO] Running in MOCK mode - using dummy data
[INFO] Created directory: /path/to/uploads/audio
[INFO] Created directory: /path/to/uploads/videos
[ ready ] http://localhost:3001
```

## 🧪 Test করুন

### Terminal 1: Server চালু রাখুন
```bash
./start-server.sh
```

### Terminal 2: API Test করুন

#### Test 1: Generate Tutorial
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building a React Component",
    "topic": "React hooks and state management",
    "userId": "test-user-123"
  }'
```

**Expected Response:**
```json
{
  "tutorialId": "mock-1234567890",
  "status": "RENDERING",
  "audioUrl": "/uploads/audio/mock-1234567890.mp3"
}
```

#### Test 2: Render Video (উপরের response থেকে tutorialId ব্যবহার করুন)
```bash
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "tutorialId": "mock-1234567890"
  }'
```

**Expected Response:**
```json
{
  "tutorialId": "mock-1234567890",
  "status": "COMPLETED",
  "videoUrl": "/uploads/videos/mock-1234567890.mp4"
}
```

### Test Script ব্যবহার করুন
```bash
./test-api.sh
```

## 📁 Generated Files

Server চালু হলে এই files তৈরি হবে:

```
uploads/
├── audio/
│   └── mock-*.mp3    # Dummy audio files
└── videos/
    └── mock-*.mp4    # Rendered videos (if Remotion available)
```

## 🔍 Verify Server Status

```bash
# Check if server is running
curl http://localhost:3001/

# Expected: {"message":"AI Tutor SaaS API"}
```

## ⚠️ Troubleshooting

### Port 3001 already in use
```bash
PORT=3002 npx nx serve api
```

### Build errors
```bash
# Clean and rebuild
npx nx reset
npx nx serve api
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## ✅ Success Indicators

- ✅ Server starts without errors
- ✅ Console shows "Running in MOCK mode"
- ✅ `/api/generate` endpoint works
- ✅ `/api/render` endpoint works
- ✅ Files created in `uploads/` directory

## 🎉 Ready!

Platform এখন চালু! কোনো external APIs বা database প্রয়োজন নেই - সব dummy data দিয়ে কাজ করবে।

