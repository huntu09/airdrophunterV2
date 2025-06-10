# TWA (Trusted Web Activity) Setup Guide

## 🚀 Automated Build Process

Project ini sudah dikonfigurasi untuk auto-build TWA menggunakan GitHub Actions.

### Prerequisites

1. **GitHub Secrets** yang harus diset:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY  
   CMC_API_KEY
   NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
   NEXT_PUBLIC_ADMOB_APP_ID
   NEXT_PUBLIC_ADMOB_BANNER_ID
   NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID
   NEXT_PUBLIC_ADMOB_REWARDED_ID
   VERCEL_TOKEN (optional, untuk auto-deploy)
   VERCEL_ORG_ID (optional)
   VERCEL_PROJECT_ID (optional)
   \`\`\`

2. **Domain** harus sudah live dan accessible
3. **Manifest.json** harus valid dan accessible

### Build Process

#### Automatic Build (Recommended)
- Push ke branch `main` atau `master` → Auto build TWA
- Create tag `v1.0.0` → Auto build + release
- Manual trigger via GitHub Actions

#### Manual Build (Local)
\`\`\`bash
# Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# Build PWA first
npm run build

# Initialize TWA
npm run twa:init

# Build TWA
npm run twa:build

# Install to device (optional)
npm run twa:install
\`\`\`

### Output Files

GitHub Actions akan menghasilkan:
- **Debug APK** - untuk testing
- **Release APK** - untuk distribusi manual  
- **Release AAB** - untuk Google Play Store
- **Auto Release** - jika menggunakan tags

### Google Play Store Upload

1. Download **AAB file** dari GitHub Releases
2. Upload ke Google Play Console
3. Fill app information dan screenshots
4. Submit for review

### Troubleshooting

#### Common Issues:
1. **Manifest not found** - Pastikan domain sudah live
2. **Build failed** - Check GitHub Actions logs
3. **Signing error** - Keystore akan auto-generated
4. **PWA validation** - Manifest harus valid

#### Debug Commands:
\`\`\`bash
# Check manifest
curl https://airdrophunter.com/manifest.json

# Validate PWA
npx pwa-asset-generator --help

# Test TWA locally
bubblewrap doctor
\`\`\`

### Performance Tips

1. **Optimize PWA** sebelum build TWA
2. **Minimize bundle size** 
3. **Enable caching** dengan Service Worker
4. **Optimize images** dan assets

### Security

1. **Keystore** di-generate otomatis untuk development
2. **Production keystore** sebaiknya disimpan secure
3. **Environment variables** jangan di-commit
4. **HTTPS** wajib untuk TWA

## 📱 Features Enabled

- ✅ Auto PWA → TWA conversion
- ✅ GitHub Actions automation
- ✅ Version management
- ✅ Release automation  
- ✅ AdMob integration ready
- ✅ Notification support
- ✅ Shortcuts support
- ✅ Splash screen
- ✅ Theme colors
- ✅ Offline support

## 🔧 Customization

Edit `twa-manifest.json` untuk:
- Package name
- App name
- Colors
- Icons
- Shortcuts
- Features

## 📊 Monitoring

- GitHub Actions untuk build status
- Vercel untuk PWA deployment
- Google Play Console untuk app metrics
