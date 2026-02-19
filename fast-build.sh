#!/bin/bash

# Fast Development Build Script for Restaurant Admin
echo "🚀 Starting fast development build..."

# Set environment variables for faster builds
export FAST_REFRESH=true
export RCT_METRO_PORT=8081

# Clean previous builds if needed
if [ "$1" = "clean" ]; then
    echo "🧹 Cleaning build artifacts..."
    cd android
    ./gradlew clean
    cd ..
    rm -rf ios/build
    rm -rf node_modules/.cache
    npx react-native start --reset-cache &
    METRO_PID=$!
    echo "✅ Clean complete"
    sleep 5
    kill $METRO_PID 2>/dev/null
fi

# Start Metro bundler in background with optimizations
echo "📦 Starting Metro bundler..."
npx react-native start --reset-cache &
METRO_PID=$!

# Wait for Metro to start
echo "⏳ Waiting for Metro to start..."
sleep 10

# Build and run for Android (optimized)
echo "🤖 Building for Android (Debug - Single Architecture)..."
npx react-native run-android --mode Debug

echo "🎉 Build complete! Metro PID: $METRO_PID"
echo "To stop Metro: kill $METRO_PID"