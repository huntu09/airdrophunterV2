#!/bin/bash

# Script to build TWA using Bubblewrap

echo "Building TWA for AirdropHunter..."

# Check if bubblewrap is installed
if ! command -v bubblewrap &> /dev/null; then
    echo "Installing Bubblewrap CLI..."
    npm install -g @bubblewrap/cli
fi

# Check if keystore exists
if [ ! -f "android.keystore" ]; then
    echo "Keystore not found. Generating..."
    ./scripts/generate-keystore.sh
fi

# Initialize TWA project if not already done
if [ ! -d "android-app" ]; then
    echo "Initializing TWA project..."
    bubblewrap init --manifest https://airdrophunter.com/manifest.json
else
    echo "TWA project already initialized."
fi

# Update TWA project with latest manifest
echo "Updating TWA project..."
bubblewrap update

# Build APK
echo "Building APK..."
bubblewrap build

# Build App Bundle (for Play Store)
echo "Building App Bundle..."
bubblewrap build --android-app-bundle

echo "✅ Build complete!"
echo "APK location: ./app-release-signed.apk"
echo "Bundle location: ./app-release-bundle.aab"

echo "Next steps:"
echo "1. Test the APK on a device: adb install app-release-signed.apk"
echo "2. Upload the App Bundle to Google Play Console"
