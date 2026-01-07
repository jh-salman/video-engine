#!/bin/bash

cd "$(dirname "$0")"

echo "🚀 Starting All Apps - AI Tutor SaaS"
echo "====================================="
echo ""

# Check dependencies
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
fi

# Create directories
mkdir -p uploads/audio uploads/videos
echo "✅ Directories ready"
echo ""

# Check if ports are available
check_port() {
  lsof -ti:$1 > /dev/null 2>&1
}

if check_port 3001; then
  echo "⚠️  Port 3001 is already in use (API)"
fi
if check_port 3000; then
  echo "⚠️  Port 3000 is already in use (Web)"
fi
if check_port 3002; then
  echo "⚠️  Port 3002 is already in use (Remotion)"
fi
echo ""

echo "🌐 Starting API Server (http://localhost:3001)..."
npx nx serve api &
API_PID=$!
echo "   [PID: $API_PID]"
sleep 2

echo "🎨 Starting Web Frontend (http://localhost:3000)..."
npx nx serve web &
WEB_PID=$!
echo "   [PID: $WEB_PID]"
sleep 2

echo "🎬 Starting Remotion Studio (http://localhost:3002)..."
cd apps/video-engine
npm run dev &
REMOTION_PID=$!
cd ../..
echo "   [PID: $REMOTION_PID]"
sleep 2

echo ""
echo "✅ All apps started!"
echo ""
echo "📋 Access URLs:"
echo "   - API:      http://localhost:3001"
echo "   - Web:      http://localhost:3000"
echo "   - Remotion: http://localhost:3002"
echo ""
echo "⏹️  To stop all servers, run: pkill -f 'nx serve' && pkill -f 'remotion'"
echo ""
echo "Waiting for servers to be ready..."
sleep 5

# Check server status
echo ""
echo "📊 Server Status:"
if curl -s http://localhost:3001/ > /dev/null 2>&1; then
  echo "   ✅ API Server: Running"
else
  echo "   ⏳ API Server: Starting..."
fi

if curl -s http://localhost:3000/ > /dev/null 2>&1; then
  echo "   ✅ Web Server: Running"
else
  echo "   ⏳ Web Server: Starting..."
fi

echo ""
echo "💡 Servers are running in background"
echo "   Open http://localhost:3000 in your browser"
