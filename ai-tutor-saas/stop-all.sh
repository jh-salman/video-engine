#!/bin/bash

echo "🛑 Stopping All Servers..."
echo ""

# Kill Nx servers
pkill -f "nx serve" 2>/dev/null
pkill -f "remotion" 2>/dev/null

sleep 2

echo "✅ All servers stopped"
echo ""
echo "To start again, run: ./start-all.sh"

