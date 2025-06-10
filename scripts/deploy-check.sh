#!/bin/bash

# Script untuk check deployment readiness

echo "🌐 Checking Deployment Readiness"
echo "==============================="

DOMAIN="https://airdrophunter.com"

# Function to check URL
check_url() {
    local url=$1
    local description=$2
    
    if curl -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200"; then
        echo "✅ $description - OK"
        return 0
    else
        echo "❌ $description - FAILED"
        return 1
    fi
}

# Function to check JSON validity
check_json() {
    local url=$1
    local description=$2
    
    local response=$(curl -s "$url")
    if echo "$response" | python -m json.tool > /dev/null 2>&1; then
        echo "✅ $description - Valid JSON"
        return 0
    else
        echo "❌ $description - Invalid JSON"
        return 1
    fi
}

echo "Checking PWA Files..."

# Check main domain
check_url "$DOMAIN" "Main domain"

# Check manifest
check_url "$DOMAIN/manifest.json" "Web Manifest"
check_json "$DOMAIN/manifest.json" "Web Manifest JSON"

# Check service worker
check_url "$DOMAIN/service-worker.js" "Service Worker"

# Check icons
check_url "$DOMAIN/icon-192.png" "Icon 192x192"
check_url "$DOMAIN/icon-512.png" "Icon 512x512"

# Check digital asset links
check_url "$DOMAIN/.well-known/assetlinks.json" "Digital Asset Links"
check_json "$DOMAIN/.well-known/assetlinks.json" "Digital Asset Links JSON"

echo ""
echo "Checking PWA Features..."

# Check if PWA is installable (basic check)
if curl -s "$DOMAIN/manifest.json" | grep -q "start_url"; then
    echo "✅ PWA has start_url"
else
    echo "❌ PWA missing start_url"
fi

if curl -s "$DOMAIN/manifest.json" | grep -q "display"; then
    echo "✅ PWA has display mode"
else
    echo "❌ PWA missing display mode"
fi

echo ""
echo "Checking HTTPS and Security..."

# Check HTTPS
if curl -s -I "$DOMAIN" | grep -q "HTTP/2 200\|HTTP/1.1 200"; then
    echo "✅ HTTPS working"
else
    echo "❌ HTTPS not working"
fi

# Check security headers
if curl -s -I "$DOMAIN" | grep -q "Content-Security-Policy\|X-Frame-Options"; then
    echo "✅ Security headers present"
else
    echo "⚠️ Consider adding security headers"
fi

echo ""
echo "🎯 Deployment Status Summary"
echo "==========================="

# Final check
if check_url "$DOMAIN" "Final connectivity test" && \
   check_url "$DOMAIN/manifest.json" "Final manifest test" && \
   check_url "$DOMAIN/.well-known/assetlinks.json" "Final asset links test"; then
    echo ""
    echo "🚀 Deployment is ready for TWA build!"
    echo "Next step: Run ./scripts/build-twa.sh"
else
    echo ""
    echo "❌ Deployment has issues. Please fix before building TWA."
fi
