#!/bin/bash

# Script untuk test build process step by step

echo "🧪 Testing Build Process for AirdropHunter TWA"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        exit 1
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

echo "Step 1: Checking Prerequisites..."

# Check Node.js
node --version > /dev/null 2>&1
print_status $? "Node.js installed"

# Check Java
java -version > /dev/null 2>&1
print_status $? "Java installed"

# Check Bubblewrap
bubblewrap --version > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "Bubblewrap CLI installed"
else
    print_warning "Bubblewrap not found. Installing..."
    npm install -g @bubblewrap/cli
    print_status $? "Bubblewrap CLI installed"
fi

echo ""
echo "Step 2: Checking Android SDK..."

if [ -z "$ANDROID_HOME" ]; then
    print_warning "ANDROID_HOME not set. Please set it manually."
else
    print_status 0 "ANDROID_HOME is set: $ANDROID_HOME"
fi

echo ""
echo "Step 3: Checking Keystore..."

if [ -f "android.keystore" ]; then
    print_status 0 "Keystore exists"
    
    # Get fingerprint
    echo "SHA-256 Fingerprint:"
    keytool -list -v -keystore android.keystore -alias android -storepass android 2>/dev/null | grep "SHA256:" || print_warning "Could not get fingerprint (wrong password?)"
else
    print_warning "Keystore not found. Run: ./scripts/generate-keystore.sh"
fi

echo ""
echo "Step 4: Checking PWA Manifest..."

if curl -s https://airdrophunter.com/manifest.json > /dev/null 2>&1; then
    print_status 0 "PWA Manifest accessible"
else
    print_warning "PWA Manifest not accessible. Deploy PWA first."
fi

echo ""
echo "Step 5: Checking Digital Asset Links..."

if curl -s https://airdrophunter.com/.well-known/assetlinks.json > /dev/null 2>&1; then
    print_status 0 "Digital Asset Links accessible"
else
    print_warning "Digital Asset Links not accessible. Deploy assetlinks.json file."
fi

echo ""
echo "Step 6: Testing TWA Build (Dry Run)..."

if [ -d "android-app" ]; then
    print_status 0 "TWA project exists"
    
    # Test update
    cd android-app
    bubblewrap update --dryRun > /dev/null 2>&1
    print_status $? "TWA update test"
    cd ..
else
    print_warning "TWA project not initialized. Run: bubblewrap init"
fi

echo ""
echo "🎯 Build Readiness Summary:"
echo "=========================="

# Check all requirements
READY=true

# Check keystore
if [ ! -f "android.keystore" ]; then
    echo -e "${RED}❌ Keystore missing${NC}"
    READY=false
fi

# Check PWA deployment
if ! curl -s https://airdrophunter.com/manifest.json > /dev/null 2>&1; then
    echo -e "${RED}❌ PWA not deployed${NC}"
    READY=false
fi

# Check asset links
if ! curl -s https://airdrophunter.com/.well-known/assetlinks.json > /dev/null 2>&1; then
    echo -e "${RED}❌ Digital Asset Links not deployed${NC}"
    READY=false
fi

if [ "$READY" = true ]; then
    echo -e "${GREEN}🚀 Ready to build! Run: ./scripts/build-twa.sh${NC}"
else
    echo -e "${YELLOW}⚠️ Please fix the issues above before building${NC}"
fi

echo ""
echo "Next Steps:"
echo "1. Fix any issues shown above"
echo "2. Run: ./scripts/build-twa.sh"
echo "3. Test APK: adb install app-release-signed.apk"
echo "4. Submit to Google Play Store"
