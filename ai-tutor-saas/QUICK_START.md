# Quick Start Guide (Mock Mode)

## 🚀 Platform চালু করার সহজ উপায়

### 1. Dependencies Install করুন
```bash
npm install
```

### 2. API Server চালু করুন
```bash
nx serve api
```

Server `http://localhost:3001` এ চালু হবে।

**Note:** API keys না থাকলে automatically **MOCK MODE** এ চলবে - কোনো error হবে না!

### 3. Test করুন

#### Option A: Script ব্যবহার করে
```bash
./test-api.sh
```

#### Option B: Manual Test
```bash
# Generate Tutorial
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building a React Component",
    "topic": "React hooks",
    "userId": "test-user"
  }'

# Response থেকে tutorialId নিয়ে render করুন
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "tutorialId": "your-tutorial-id-here"
  }'
```

## ✅ কি কাজ করবে

1. **AI Script Generation** ✅
   - Dummy tutorial script তৈরি হবে
   - Realistic code actions সহ

2. **Voice Generation** ✅
   - Dummy MP3 file তৈরি হবে
   - `uploads/audio/` folder এ save হবে

3. **Video Rendering** ✅
   - Remotion render হবে (যদি available হয়)
   - `uploads/videos/` folder এ save হবে

4. **Database** ⚠️
   - Database না থাকলে mock objects ব্যবহার করবে
   - কোনো error throw করবে না

## 📁 Generated Files

```
uploads/
├── audio/
│   └── {tutorialId}.mp3    # Dummy audio file
└── videos/
    └── {tutorialId}.mp4     # Rendered video (if Remotion works)
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
PORT=3002 nx serve api
```

### Database Errors
- Database না থাকলে automatically mock mode use করবে
- কোনো configuration প্রয়োজন নেই

### Remotion Errors
- Remotion না থাকলে dummy video file create করবে
- Platform চলতে থাকবে

## 🎯 Next Steps

1. Frontend UI তৈরি করুন (`apps/web`)
2. Real API keys যোগ করুন (optional)
3. Database setup করুন (optional)

**সব কিছু optional - platform এখনই চালু করা যায়!**

