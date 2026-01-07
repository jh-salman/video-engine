#!/bin/bash

# Test API endpoints with dummy data
API_URL="http://localhost:3001"

echo "🚀 Testing AI Tutor SaaS API (Mock Mode)"
echo "=========================================="
echo ""

# Test 1: Generate Tutorial
echo "📝 Test 1: Generating tutorial..."
RESPONSE=$(curl -s -X POST "$API_URL/api/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Building a React Component",
    "topic": "React hooks and state management",
    "userId": "test-user-123"
  }')

echo "Response: $RESPONSE"
echo ""

# Extract tutorial ID
TUTORIAL_ID=$(echo $RESPONSE | grep -o '"tutorialId":"[^"]*' | cut -d'"' -f4)

if [ -z "$TUTORIAL_ID" ]; then
  echo "❌ Failed to get tutorial ID"
  exit 1
fi

echo "✅ Tutorial created with ID: $TUTORIAL_ID"
echo ""

# Test 2: Render Video
echo "🎬 Test 2: Rendering video..."
RENDER_RESPONSE=$(curl -s -X POST "$API_URL/api/render" \
  -H "Content-Type: application/json" \
  -d "{
    \"tutorialId\": \"$TUTORIAL_ID\"
  }")

echo "Response: $RENDER_RESPONSE"
echo ""

echo "✅ Tests completed!"
echo ""
echo "Check uploads directory for generated files:"
echo "  - Audio: uploads/audio/$TUTORIAL_ID.mp3"
echo "  - Video: uploads/videos/$TUTORIAL_ID.mp4"

