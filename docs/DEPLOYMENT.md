# Deployment Guide

## 🌐 PWA Deployment (Vercel)

### Automatic Deployment
- Push ke `main` branch → Auto deploy ke Vercel
- Preview deployments untuk PR

### Manual Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

## 📱 TWA Deployment (Google Play Store)

### Step 1: Build TWA
\`\`\`bash
# Via GitHub Actions (Recommended)
git tag v1.0.0
git push origin v1.0.0

# Manual build
npm run build:twa
\`\`\`

### Step 2: Google Play Console Setup

1. **Create App**
   - Go to Google Play Console
   - Create new app
   - Fill basic information

2. **Upload AAB**
   - Download AAB from GitHub Releases
   - Upload to Internal Testing first
   - Test thoroughly

3. **App Information**
   - App name: AirdropHunter
   - Description: Crypto airdrops platform
   - Category: Finance
   - Content rating: Everyone

4. **Store Listing**
   - Screenshots (required)
   - Feature graphic
   - App icon
   - Privacy policy URL

5. **Release**
   - Internal Testing → Closed Testing → Open Testing → Production

### Step 3: Screenshots & Assets

Required screenshots:
- Phone: 1080x1920 (minimum 2 screenshots)
- Tablet: 1200x1920 (optional)
- Feature graphic: 1024x500

Generate screenshots:
\`\`\`bash
# Use browser dev tools
# Capture different screens:
# - Home page
# - Airdrop details  
# - Profile page
# - Settings
\`\`\`

## 🔧 Environment Configuration

### Production Environment Variables
\`\`\`env
# Supabase (Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# APIs
CMC_API_KEY=your-coinmarketcap-key

# AdSense (Web/PWA)
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-your-publisher-id

# AdMob (TWA)
NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-your-app-id~your-app-id
NEXT_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-your-publisher-id/your-banner-id
NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-your-publisher-id/your-interstitial-id
NEXT_PUBLIC_ADMOB_REWARDED_ID=ca-app-pub-your-publisher-id/your-rewarded-id

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
\`\`\`

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

1. **Code Push** → Trigger build
2. **PWA Build** → Generate static files  
3. **TWA Build** → Generate APK/AAB
4. **Deploy PWA** → Vercel deployment
5. **Release** → GitHub releases with APK/AAB

### Branch Strategy
- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches

### Release Process
\`\`\`bash
# Create release
git checkout main
git tag v1.0.1
git push origin v1.0.1

# GitHub Actions will:
# 1. Build PWA
# 2. Generate TWA
# 3. Create GitHub release
# 4. Deploy to Vercel
\`\`\`

## 📊 Monitoring & Analytics

### PWA Monitoring
- Vercel Analytics
- Google Analytics 4
- Web Vitals
- Service Worker status

### TWA Monitoring  
- Google Play Console
- Firebase Analytics (if integrated)
- Crash reporting
- User engagement metrics

### Performance Monitoring
\`\`\`javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
\`\`\`

## 🔒 Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables secured
- ✅ API keys not exposed
- ✅ CSP headers configured
- ✅ Keystore secured
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS configured

## 🐛 Troubleshooting

### Common Issues

1. **Build Failed**
   \`\`\`bash
   # Check logs
   npm run build
   
   # Clear cache
   rm -rf .next
   npm run build
   \`\`\`

2. **TWA Build Failed**
   \`\`\`bash
   # Check manifest
   curl https://your-domain.com/manifest.json
   
   # Validate PWA
   npx lighthouse https://your-domain.com --view
   \`\`\`

3. **Deployment Failed**
   \`\`\`bash
   # Check Vercel logs
   vercel logs
   
   # Redeploy
   vercel --prod --force
   \`\`\`

### Debug Commands
\`\`\`bash
# Test PWA locally
npm run dev

# Test production build
npm run build && npm run start

# Validate manifest
npx pwa-asset-generator --help

# Check TWA
bubblewrap doctor
