# 📊 Server Status Check

## Quick Status Check

```bash
# Check all servers
curl http://localhost:3001/ && echo " ✅ API Running"
curl http://localhost:3000/ > /dev/null && echo " ✅ Web Running" || echo " ⏳ Web Starting"

# Check ports
lsof -ti:3000,3001,3002
```

## Manual Start (if needed)

### Terminal 1 - API:
```bash
cd /Users/salman/Development/Team-x/ai-tutor-saas
npx nx serve api
```

### Terminal 2 - Web:
```bash
cd /Users/salman/Development/Team-x/ai-tutor-saas
npx nx serve web
```

### Terminal 3 - Remotion:
```bash
cd /Users/salman/Development/Team-x/ai-tutor-saas/apps/video-engine
npm run dev
```

## Access URLs

- 🌐 **API**: http://localhost:3001
- 🎨 **Web**: http://localhost:3000  
- 🎬 **Remotion**: http://localhost:3002

## Test API

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","topic":"Test","userId":"test"}'
```

