import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PWAInstall } from "@/components/pwa-install"
import { ConsentBanner } from "@/components/ads/consent-banner"
import { AdBlockerNotice } from "@/components/ads/ad-blocker-notice"
import { WelcomeTour } from "@/components/welcome-tour"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://airdropshunter.cloud"),
  title: {
    default: "AirdropHunter - #1 Platform for Free Crypto Airdrops & Tokens",
    template: "%s | AirdropHunter - Free Crypto Airdrops",
  },
  description:
    "🚀 Discover the latest cryptocurrency airdrops, DeFi tokens, and NFT drops. Join 500K+ users earning free crypto daily. Verified airdrops, step-by-step guides, and real-time alerts.",
  keywords: [
    "crypto airdrops",
    "free cryptocurrency",
    "airdrop hunter",
    "free tokens",
    "DeFi airdrops",
    "NFT drops",
    "blockchain airdrops",
    "crypto rewards",
    "free crypto coins",
    "airdrop alerts",
    "cryptocurrency giveaways",
    "token distribution",
    "crypto bounties",
    "free bitcoin",
    "free ethereum",
    "solana airdrops",
    "polygon airdrops",
    "binance smart chain airdrops",
    "avalanche airdrops",
    "cardano airdrops",
    "polkadot airdrops",
    "crypto farming",
    "yield farming",
    "liquidity mining",
    "staking rewards",
    "testnet rewards",
    "mainnet launch",
    "token launch",
    "IDO",
    "ICO",
    "crypto news",
    "blockchain projects",
    "web3 airdrops",
    "metaverse tokens",
  ],
  authors: [{ name: "AirdropHunter Team", url: "https://airdropshunter.cloud/about" }],
  creator: "AirdropHunter",
  publisher: "AirdropHunter",
  category: "Finance",
  classification: "Cryptocurrency Platform",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID", "zh_CN", "ja_JP", "ko_KR"],
    url: "https://airdrophunter.com",
    siteName: "AirdropHunter",
    title: "AirdropHunter - #1 Platform for Free Crypto Airdrops & Tokens",
    description:
      "🚀 Discover the latest cryptocurrency airdrops, DeFi tokens, and NFT drops. Join 500K+ users earning free crypto daily. Verified airdrops, step-by-step guides, and real-time alerts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AirdropHunter - Free Crypto Airdrops Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@airdrophunter",
    creator: "@airdrophunter",
    title: "AirdropHunter - #1 Platform for Free Crypto Airdrops",
    description:
      "🚀 Discover verified crypto airdrops, DeFi tokens & NFT drops. Join 500K+ users earning free crypto daily!",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://airdrophunter.com",
    languages: {
      "en-US": "https://airdrophunter.com",
      "id-ID": "https://airdrophunter.com/id",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "SxHIi6hXiY6FWIpRW4uRRjPCfv4h2bsFuSVoFmpJ_PQ",
    yandex: "your-yandex-verification-code",
  },
  appleWebApp: {
    capable: true,
    title: "AirdropHunter",
    statusBarStyle: "black-translucent",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#3b82f6",
    "application-name": "AirdropHunter",
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="AirdropHunter" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AirdropHunter" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* AdSense Auto Ads */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-9620623978081909"}`}
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6DSR6F8CKT"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-6DSR6F8CKT');
    `,
  }}
/>


        {/* Simple PWA Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
// Simple Service Worker Registration (No Blob URL)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    try {
      console.log('🚀 Registering Service Worker...');
      
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      
      console.log('✅ Service Worker registered successfully!');
      console.log('📍 Scope:', registration.scope);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        console.log('🔄 Service Worker update found!');
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🆕 New content available!');
              showUpdateNotification();
            }
          });
        }
      });
      
      // Check for updates every 5 minutes
      setInterval(() => {
        registration.update();
      }, 5 * 60 * 1000);
      
    } catch (error) {
      console.warn('⚠️ Service Worker registration failed:', error);
      // Don't throw error, just log warning
    }
  });
  
  // Show update notification
  function showUpdateNotification() {
    const updateBanner = document.createElement('div');
    updateBanner.innerHTML = \`
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        color: white;
        padding: 12px;
        text-align: center;
        z-index: 9999;
        font-family: system-ui;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <span>🚀 New version available!</span>
        <button onclick="window.location.reload()" style="
          background: white;
          color: #3b82f6;
          border: none;
          padding: 6px 16px;
          margin-left: 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
        ">Update Now</button>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.5);
          padding: 6px 16px;
          margin-left: 8px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        ">Later</button>
      </div>
    \`;
    
    document.body.appendChild(updateBanner);
  }
  
} else {
  console.log('❌ Service Worker not supported');
}

// PWA Install Prompt
let deferredPrompt;
let isInstalled = false;

// Check if already installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  isInstalled = true;
}

// Listen for install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('💾 Install prompt available');
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button after 3 seconds
  setTimeout(() => {
    if (!isInstalled && deferredPrompt) {
      showInstallPrompt();
    }
  }, 3000);
});

// Listen for app installed
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installed successfully');
  isInstalled = true;
  hideInstallPrompt();
});

// Show install prompt
function showInstallPrompt() {
  const installBanner = document.createElement('div');
  installBanner.id = 'pwa-install-banner';
  installBanner.innerHTML = \`
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      z-index: 9999;
      font-family: system-ui;
      max-width: 320px;
      animation: slideIn 0.3s ease-out;
    ">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <span style="font-size: 20px; margin-right: 8px;">📱</span>
        <strong>Install AirdropHunter</strong>
      </div>
      <p style="margin: 0 0 12px 0; font-size: 14px; opacity: 0.9;">
        Get the app for faster access and offline features!
      </p>
      <div style="display: flex; gap: 8px;">
        <button onclick="installPWA()" style="
          background: white;
          color: #059669;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          flex: 1;
        ">Install</button>
        <button onclick="hideInstallPrompt()" style="
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.5);
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        ">Later</button>
      </div>
    </div>
    <style>
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  \`;
  
  document.body.appendChild(installBanner);
}

// Install PWA
async function installPWA() {
  if (!deferredPrompt) return;
  
  try {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log('🎯 Install prompt result:', outcome);
    
    if (outcome === 'accepted') {
      console.log('✅ User accepted the install prompt');
    }
    
    deferredPrompt = null;
    hideInstallPrompt();
  } catch (error) {
    console.error('❌ Install prompt failed:', error);
  }
}

// Hide install prompt
function hideInstallPrompt() {
  const banner = document.getElementById('pwa-install-banner');
  if (banner) {
    banner.remove();
  }
}

// Make functions global
window.installPWA = installPWA;
window.hideInstallPrompt = hideInstallPrompt;
            `,
          }}
        />
        <meta name="google-adsense-account" content="ca-pub-9620623978081909">
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <PWAInstall />
          <ConsentBanner />
          <AdBlockerNotice />
          <WelcomeTour />
        </ThemeProvider>
      </body>
    </html>
  )
}
