# 📱 Step-by-Step Guide: Build AirdropHunter APK dengan Bubblewrap

## 🎯 Overview
Panduan lengkap untuk mengubah PWA AirdropHunter menjadi APK Android dan upload ke Google Play Store.

---

## 📋 FASE 1: PERSIAPAN AWAL

### Step 1: Install Prerequisites
\`\`\`bash
# 1. Install Node.js (jika belum ada)
# Download dari https://nodejs.org/

# 2. Install JDK 8 atau lebih tinggi
# Download dari https://adoptopenjdk.net/

# 3. Install Android Studio atau Android SDK
# Download dari https://developer.android.com/studio

# 4. Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# 5. Verify installations
node --version
java -version
bubblewrap --version
\`\`\`

### Step 2: Setup Environment Variables
\`\`\`bash
# Set ANDROID_HOME (sesuaikan path)
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Untuk Windows (Command Prompt):
# set ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
# set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
\`\`\`

---

## 🌐 FASE 2: DEPLOY PWA KE PRODUCTION

### Step 3: Deploy ke Domain Production
\`\`\`bash
# 1. Build production PWA
npm run build

# 2. Deploy ke hosting (contoh Vercel)
vercel --prod

# 3. Pastikan domain accessible:
# https://airdrophunter.com
# https://airdrophunter.com/manifest.json
# https://airdrophunter.com/.well-known/assetlinks.json
\`\`\`

### Step 4: Test PWA di Browser
\`\`\`bash
# 1. Buka Chrome DevTools
# 2. Go to Application tab
# 3. Check Manifest section
# 4. Test "Add to Home Screen"
# 5. Test offline functionality
\`\`\`

---

## 🔐 FASE 3: GENERATE KEYSTORE

### Step 5: Generate Android Keystore
\`\`\`bash
# Option 1: Menggunakan script yang sudah disediakan
chmod +x scripts/generate-keystore.sh
./scripts/generate-keystore.sh

# Option 2: Manual command
keytool -genkey -v -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000
\`\`\`

**⚠️ PENTING: Simpan password keystore dengan aman! Anda akan membutuhkannya untuk update app di masa depan.**

### Step 6: Get SHA-256 Fingerprint
\`\`\`bash
# Get fingerprint dari keystore
keytool -list -v -keystore android.keystore -alias android

# Copy SHA-256 fingerprint (contoh):
# SHA256: A1:B2:C3:D4:E5:F6:G7:H8:I9:J0:K1:L2:M3:N4:O5:P6:Q7:R8:S9:T0:U1:V2:W3:X4:Y5:Z6:A7:B8:C9:D0
\`\`\`

---

## 🔗 FASE 4: SETUP DIGITAL ASSET LINKS

### Step 7: Update Asset Links
\`\`\`bash
# 1. Edit file public/.well-known/assetlinks.json
# 2. Replace "SHA256_FINGERPRINT_WILL_BE_GENERATED_DURING_BUILD" 
#    dengan SHA-256 fingerprint dari Step 6
# 3. Deploy ulang ke production
\`\`\`

### Step 8: Verify Asset Links
\`\`\`bash
# Test di browser:
# https://airdrophunter.com/.well-known/assetlinks.json

# Atau gunakan Google tool:
# https://developers.google.com/digital-asset-links/tools/generator
\`\`\`

---

## 🏗️ FASE 5: BUILD APK DENGAN BUBBLEWRAP

### Step 9: Initialize Bubblewrap Project
\`\`\`bash
# Navigate ke root project
cd /path/to/airdrophunter4

# Initialize TWA project
bubblewrap init --manifest https://airdrophunter.com/manifest.json
\`\`\`

**Jawab pertanyaan setup:**
- Package name: `com.airdrophunter.app`
- App name: `AirdropHunter`
- Display mode: `standalone`
- Orientation: `default`
- Theme color: `#3b82f6`
- Background color: `#ffffff`
- Start URL: `/`
- Icon URL: `https://airdrophunter.com/icon-512.png`

### Step 10: Configure TWA Manifest
\`\`\`bash
# File twa-manifest.json sudah dikonfigurasi otomatis
# Verify konfigurasi AdMob sudah benar
cat twa-manifest.json | grep -A 10 "adMobConfiguration"
\`\`\`

### Step 11: Build APK
\`\`\`bash
# Option 1: Menggunakan script yang sudah disediakan
chmod +x scripts/build-twa.sh
./scripts/build-twa.sh

# Option 2: Manual build
bubblewrap build
\`\`\`

**Output yang diharapkan:**
\`\`\`
✅ Build successful!
📱 APK location: ./app-release-signed.apk
📦 Bundle location: ./app-release-bundle.aab
\`\`\`

---

## 🧪 FASE 6: TESTING APK

### Step 12: Install APK di Device
\`\`\`bash
# 1. Enable Developer Options di Android device
# 2. Enable USB Debugging
# 3. Connect device ke computer

# Install APK
adb devices  # Verify device connected
adb install app-release-signed.apk
\`\`\`

### Step 13: Test Functionality
**Checklist Testing:**
- [ ] App launches successfully
- [ ] All pages load correctly
- [ ] AdMob ads display properly
- [ ] Offline functionality works
- [ ] Deep links work (test dengan browser)
- [ ] Push notifications work
- [ ] App shortcuts work
- [ ] Share functionality works

---

## 🏪 FASE 7: GOOGLE PLAY STORE SUBMISSION

### Step 14: Prepare Store Assets
\`\`\`bash
# 1. App icons (sudah ada di public/)
# 2. Screenshots (ambil dari berbagai device sizes)
# 3. Feature graphic (1024x500px)
# 4. App description
# 5. Privacy policy URL
# 6. Terms of service URL
\`\`\`

### Step 15: Create Google Play Console Account
1. Go to https://play.google.com/console
2. Pay $25 one-time developer fee
3. Complete developer profile

### Step 16: Create New App
1. Click "Create app"
2. Fill app details:
   - App name: `AirdropHunter`
   - Default language: `English (United States)`
   - App or game: `App`
   - Free or paid: `Free`

### Step 17: Upload App Bundle
\`\`\`bash
# Upload app-release-bundle.aab (bukan .apk)
# Google Play Store prefer App Bundle format
\`\`\`

### Step 18: Complete Store Listing
**Required Information:**
- App description (short & full)
- Screenshots (phone, tablet, TV jika applicable)
- Feature graphic
- App icon (high-res 512x512)
- Privacy policy URL
- App category: `Tools` atau `Finance`
- Content rating questionnaire
- Target audience
- App content (ads declaration)

### Step 19: Setup App Signing
- Choose "Google Play App Signing"
- Upload your keystore atau let Google generate

### Step 20: Release Management
1. Create release in "Production" track
2. Upload app-release-bundle.aab
3. Add release notes
4. Review and rollout

---

## 🚀 FASE 8: FINAL SUBMISSION

### Step 21: Pre-launch Report
- Google akan test app otomatis
- Review crash reports
- Fix issues jika ada

### Step 22: Submit for Review
1. Complete all required sections
2. Click "Submit for review"
3. Wait 1-3 days for approval

### Step 23: Monitor Release
- Check Google Play Console dashboard
- Monitor crash reports
- Respond to user reviews
- Track download metrics

---

## 🔄 MAINTENANCE & UPDATES

### Update Process:
\`\`\`bash
# 1. Update PWA code
# 2. Deploy ke production
# 3. Update version di twa-manifest.json
# 4. Build new APK/Bundle
# 5. Upload ke Google Play Console
# 6. Submit update
\`\`\`

---

## 🆘 TROUBLESHOOTING

### Common Issues:

**1. Digital Asset Links Verification Failed**
\`\`\`bash
# Check file accessibility
curl https://airdrophunter.com/.well-known/assetlinks.json

# Verify SHA-256 fingerprint matches
keytool -list -v -keystore android.keystore -alias android
\`\`\`

**2. Build Failed**
\`\`\`bash
# Check Android SDK path
echo $ANDROID_HOME

# Update Bubblewrap
npm update -g @bubblewrap/cli

# Clean and rebuild
rm -rf android-app
bubblewrap init --manifest https://airdrophunter.com/manifest.json
\`\`\`

**3. AdMob Not Working**
- Verify AdMob IDs di environment variables
- Check TWA bridge implementation
- Test di production environment

**4. App Crashes**
- Check PWA works perfectly di Chrome
- Verify manifest URLs
- Check console errors di Chrome DevTools

---

## 📞 SUPPORT RESOURCES

- [Bubblewrap GitHub](https://github.com/GoogleChromeLabs/bubblewrap)
- [TWA Documentation](https://developers.google.com/web/android/trusted-web-activity)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [PWA Builder](https://www.pwabuilder.com/) - Alternative tool

---

**🎉 Selamat! Anda sekarang memiliki panduan lengkap untuk build dan publish AirdropHunter ke Google Play Store!**
