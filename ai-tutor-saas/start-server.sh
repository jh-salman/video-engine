#!/bin/bash

echo "🚀 Starting AI Tutor SaaS API Server..."
echo "========================================"
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
fi

# Create uploads directories
mkdir -p uploads/audio uploads/videos
echo "✅ Upload directories ready"
echo ""

# Start the server
echo "🌐 Starting server on http://localhost:3001"
echo "   Press Ctrl+C to stop"
echo ""
echo "📝 Mock Mode: ON (no API keys required)"
echo ""

npx nx serve api

