# Bubblewrap Setup Guide for AirdropHunter

This guide will walk you through the process of building your AirdropHunter PWA into an Android APK using Bubblewrap and deploying it to Google Play Store.

## Prerequisites

1. **Node.js** - Version 14 or higher
2. **JDK** - Version 8 or higher
3. **Android SDK** - Install Android Studio or the command line tools
4. **Bubblewrap CLI** - Install via npm
5. **Google Play Developer Account** - $25 one-time fee
6. **Domain with HTTPS** - Your PWA must be hosted on a secure domain

## Step 1: Install Bubblewrap CLI

\`\`\`bash
npm install -g @bubblewrap/cli
\`\`\`

## Step 2: Generate Keystore

If you don't already have a keystore, generate one:

\`\`\`bash
keytool -genkey -v -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

Remember the password you set - you'll need it later!

## Step 3: Initialize Bubblewrap Project

\`\`\`bash
bubblewrap init --manifest https://airdrophunter.com/manifest.json
\`\`\`

## Step 4: Update Digital Asset Links

1. Generate the Digital Asset Links file:

\`\`\`bash
bubblewrap fingerprint
\`\`\`

2. Copy the SHA-256 fingerprint and update the `public/.well-known/assetlinks.json` file with this fingerprint.

3. Deploy the updated file to your server at `https://airdrophunter.com/.well-known/assetlinks.json`

## Step 5: Configure AdMob

1. Make sure your AdMob IDs are correctly set in the `twa-manifest.json` file.
2. Verify that the TWA bridge implementation is working correctly.

## Step 6: Build the APK

\`\`\`bash
bubblewrap build
\`\`\`

This will generate an APK file in the current directory.

## Step 7: Test the APK

1. Install the APK on a test device:

\`\`\`bash
adb install app-release-signed.apk
\`\`\`

2. Test all functionality, especially:
   - AdMob integration
   - Deep linking
   - Offline functionality
   - Push notifications

## Step 8: Prepare for Google Play Store

1. Create app icons in all required sizes
2. Prepare screenshots for different device sizes
3. Write compelling app description, privacy policy, etc.
4. Create a promotional graphic (1024x500px)

## Step 9: Upload to Google Play Console

1. Log in to Google Play Console
2. Create a new application
3. Fill in all required metadata
4. Upload the signed APK
5. Submit for review

## Step 10: App Bundle (Optional but Recommended)

For production releases, it's better to use Android App Bundle:

\`\`\`bash
bubblewrap build --android-app-bundle
\`\`\`

## Troubleshooting

### Common Issues:

1. **Digital Asset Links Verification Failed**
   - Make sure the assetlinks.json file is accessible at `https://airdrophunter.com/.well-known/assetlinks.json`
   - Verify the SHA-256 fingerprint matches your keystore

2. **AdMob Not Working**
   - Check that AdMob IDs are correctly set in the TWA manifest
   - Verify the TWA bridge implementation

3. **App Crashes on Launch**
   - Check that your PWA works perfectly in Chrome
   - Verify the manifest URLs are correct
   - Test with Chrome Custom Tabs first

## Resources

- [Bubblewrap Documentation](https://github.com/GoogleChromeLabs/bubblewrap/tree/main/packages/cli)
- [PWA Builder](https://www.pwabuilder.com/) - Alternative to Bubblewrap with GUI
- [TWA Quick Start Guide](https://developers.google.com/web/android/trusted-web-activity/quick-start)
- [Digital Asset Links Generator](https://developers.google.com/digital-asset-links/tools/generator)
