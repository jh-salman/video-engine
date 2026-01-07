# 🚀 সব Apps চালু করার নির্দেশনা

## Quick Start

### সব Apps একসাথে চালু করুন:
```bash
./start-all.sh
```

### আলাদা আলাদা চালু করুন:

#### Terminal 1: API Server
```bash
npm run start:api
# বা
npx nx serve api
```
**URL:** http://localhost:3001

#### Terminal 2: Web Frontend
```bash
npm run start:web
# বা
npx nx serve web
```
**URL:** http://localhost:3000

#### Terminal 3: Remotion Studio
```bash
npm run start:remotion
# বা
cd apps/video-engine && npm run dev
```
**URL:** http://localhost:3002

## 🛑 সব Apps বন্ধ করুন:
```bash
./stop-all.sh
```

## 📋 Server URLs

| App | URL | Description |
|-----|-----|-------------|
| **API** | http://localhost:3001 | Backend API server |
| **Web** | http://localhost:3000 | Next.js frontend |
| **Remotion** | http://localhost:3002 | Video rendering studio |

## ✅ Verification

### Check API Server:
```bash
curl http://localhost:3001/
# Expected: {"message":"AI Tutor SaaS API"}
```

### Check Web Server:
```bash
curl http://localhost:3000/
# Expected: HTML content
```

### Check All Ports:
```bash
lsof -ti:3000,3001,3002
```

## 🧪 Test API

### Generate Tutorial:
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Tutorial",
    "topic": "Hooks",
    "userId": "test-user"
  }'
```

### Render Video:
```bash
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{"tutorialId": "your-tutorial-id"}'
```

## 📁 Project Structure

```
ai-tutor-saas/
├── apps/
│   ├── api/          → Port 3001 (Express API)
│   ├── web/          → Port 3000 (Next.js Frontend)
│   └── video-engine/  → Port 3002 (Remotion Studio)
└── start-all.sh      → Start all apps
```

## ⚠️ Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)
```

### Servers Not Starting
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Reset Nx cache
npx nx reset
```

### Remotion Not Starting
```bash
cd apps/video-engine
npm install
npm run dev
```

## 🎯 Expected Behavior

1. ✅ API Server starts on port 3001
2. ✅ Web Server starts on port 3000  
3. ✅ Remotion Studio starts on port 3002
4. ✅ All servers run in mock mode (no external APIs needed)
5. ✅ No errors in console

## 💡 Tips

- সব servers background এ run করবে
- Logs দেখতে: `tail -f /tmp/*-server.log`
- Browser এ http://localhost:3000 open করুন
- API test করতে: http://localhost:3001/api/generate

