#!/bin/bash

# Script to generate a keystore for signing Android APKs

echo "Generating keystore for AirdropHunter Android app..."

# Check if keytool is available
if ! command -v keytool &> /dev/null; then
    echo "Error: keytool not found. Please install JDK."
    exit 1
fi

# Set variables
KEYSTORE_FILE="android.keystore"
ALIAS="android"
VALIDITY=10000
KEYSIZE=2048
KEYALG="RSA"

# Check if keystore already exists
if [ -f "$KEYSTORE_FILE" ]; then
    echo "Warning: $KEYSTORE_FILE already exists."
    read -p "Do you want to overwrite it? (y/n): " OVERWRITE
    if [ "$OVERWRITE" != "y" ]; then
        echo "Aborted. Using existing keystore."
        exit 0
    fi
fi

# Generate keystore
echo "Generating new keystore..."
keytool -genkey -v \
    -keystore $KEYSTORE_FILE \
    -alias $ALIAS \
    -keyalg $KEYALG \
    -keysize $KEYSIZE \
    -validity $VALIDITY \
    -storepass android \
    -keypass android \
    -dname "CN=AirdropHunter, OU=Development, O=AirdropHunter, L=City, S=State, C=US"

# Check if generation was successful
if [ $? -eq 0 ]; then
    echo "✅ Keystore generated successfully: $KEYSTORE_FILE"
    echo "⚠️ Default password is 'android'. Change this for production!"
    
    # Generate fingerprint
    echo "Generating SHA-256 fingerprint..."
    keytool -list -v -keystore $KEYSTORE_FILE -alias $ALIAS -storepass android | grep "SHA256:"
    
    echo "✅ Copy this SHA-256 fingerprint to your assetlinks.json file"
else
    echo "❌ Failed to generate keystore."
    exit 1
fi

echo "Done! 🎉"
