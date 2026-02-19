#!/bin/bash

# Fast iOS Development Build Script for Restaurant Admin
echo "📱 Starting fast iOS development build..."

# Set environment variables for faster builds
export FAST_REFRESH=true
export RCT_METRO_PORT=8081
export SKIP_BUNDLING=0

# Check if Metro is running
if ! curl -s http://localhost:8081/status > /dev/null 2>&1; then
    echo "📦 Starting Metro bundler..."
    npx react-native start --reset-cache &
    METRO_PID=$!
    echo "⏳ Waiting for Metro to start..."
    sleep 10
else
    echo "📦 Metro is already running"
    METRO_PID=""
fi

# Clean if requested
if [ "$1" = "clean" ]; then
    echo "🧹 Cleaning iOS build artifacts..."
    cd ios
    xcodebuild clean -workspace RestaurantAdmin.xcworkspace -scheme RestaurantAdmin
    rm -rf build
    cd ..
    echo "✅ iOS clean complete"
fi

# Build and run for iOS (optimized for simulator)
echo "📱 Building for iOS Simulator..."
echo "Using iPhone 15 simulator for optimal performance"

# Run with optimized settings
npx react-native run-ios \
  --simulator="iPhone 15" \
  --mode Debug \
  --verbose

echo "🎉 iOS build complete!"
if [ "$METRO_PID" != "" ]; then
    echo "Metro PID: $METRO_PID"
    echo "To stop Metro: kill $METRO_PID"
fi