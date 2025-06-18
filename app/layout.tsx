import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import { PWAInstaller } from "@/components/pwa-installer"
import Script from "next/script"
import { CookieConsent } from "@/components/cookie-consent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "AirdropHunter - Your Crypto Co-pilot",
    template: "%s | AirdropHunter",
  },
  description:
    "Discover the latest, hottest, and most potential crypto airdrops with detailed guides and community ratings. Join 50,000+ successful airdrop hunters earning passive income daily.",
  keywords: [
    "crypto airdrops",
    "free crypto",
    "airdrop hunter",
    "cryptocurrency",
    "DeFi",
    "blockchain",
    "passive income",
  ],
  authors: [{ name: "AirdropHunter Team" }],
  creator: "AirdropHunter",
  publisher: "AirdropHunter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://airdrophunter.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#22c55e" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://airdrophunter.com",
    title: "AirdropHunter - Your Crypto Co-pilot",
    description:
      "Discover the latest, hottest, and most potential crypto airdrops with detailed guides and community ratings.",
    siteName: "AirdropHunter",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AirdropHunter - Crypto Airdrop Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirdropHunter - Your Crypto Co-pilot",
    description:
      "Discover the latest, hottest, and most potential crypto airdrops with detailed guides and community ratings.",
    images: ["/twitter-image.jpg"],
    creator: "@airdrophunter",
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
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* PWA Meta Tags */}
        <meta name="application-name" content="AirdropHunter" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AirdropHunter" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Theme Color */}
        <meta name="theme-color" content="#22c55e" />
        <meta name="msapplication-TileColor" content="#22c55e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9620623978081909"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <PerformanceOptimizer
          preloadImages={["/hero-image.jpg", "/logo.png"]}
          prefetchRoutes={["/latest", "/hottest", "/potential"]}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <PWAInstaller />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
