import type React from "react"
import { twaDetector } from "./twa-detection"
import { twaBridge } from "./twa-bridge"

export interface AdConfig {
  position: "header" | "sidebar" | "content" | "footer"
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper"
  className?: string
  fallback?: React.ReactNode
}

export interface AdMobConfig {
  appId: string
  bannerAdUnitId: string
  interstitialAdUnitId: string
  rewardedAdUnitId: string
}

export interface AdSenseConfig {
  publisherId: string
  adSlots: {
    header: string
    sidebar: string
    content: string
    footer: string
  }
}

export class AdManager {
  private static instance: AdManager
  private admobConfig: AdMobConfig
  private adsenseConfig: AdSenseConfig
  private initialized = false

  constructor() {
    this.admobConfig = {
      appId: process.env.NEXT_PUBLIC_ADMOB_APP_ID || "",
      bannerAdUnitId: process.env.NEXT_PUBLIC_ADMOB_BANNER_ID || "",
      interstitialAdUnitId: process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID || "",
      rewardedAdUnitId: process.env.NEXT_PUBLIC_ADMOB_REWARDED_ID || "",
    }

    this.adsenseConfig = {
      publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-0000000000000000",
      adSlots: {
        header: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || "1234567890",
        sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || "2345678901",
        content: process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT || "3456789012",
        footer: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || "4567890123",
      },
    }
  }

  static getInstance(): AdManager {
    if (!AdManager.instance) {
      AdManager.instance = new AdManager()
    }
    return AdManager.instance
  }

  async initialize(): Promise<void> {
    if (this.initialized) return

    const env = twaDetector.detectEnvironment()

    if (env.isTWA) {
      await this.initializeAdMob()
    } else {
      await this.initializeAdSense()
    }

    this.initialized = true
  }

  private async initializeAdMob(): Promise<void> {
    try {
      await twaBridge.initialize()
      console.log("✅ AdMob initialized for TWA")

      // Log initialization event
      twaBridge.logEvent("admob_initialized", {
        app_id: this.admobConfig.appId,
        platform: twaDetector.getPlatform(),
      })
    } catch (error) {
      console.error("❌ AdMob initialization failed:", error)
    }
  }

  private async initializeAdSense(): Promise<void> {
    try {
      // Validate publisher ID first
      if (
        !this.adsenseConfig.publisherId ||
        this.adsenseConfig.publisherId === "ca-pub-0000000000000000" ||
        this.adsenseConfig.publisherId.length < 10
      ) {
        console.warn("⚠️ AdSense Publisher ID not configured properly")
        return
      }

      // AdSense initialization logic
      if (typeof window !== "undefined" && !window.adsbygoogle) {
        const script = document.createElement("script")
        script.async = true
        script.crossOrigin = "anonymous"
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adsenseConfig.publisherId}`

        document.head.appendChild(script)

        // Wait for script to load
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
        })
      }

      console.log("✅ AdSense initialized for Web/PWA")
    } catch (error) {
      console.error("❌ AdSense initialization failed:", error)
    }
  }

  async showAd(config: AdConfig): Promise<boolean> {
    await this.initialize()

    const env = twaDetector.detectEnvironment()

    if (env.isTWA && twaBridge.isAvailable()) {
      return this.showAdMobAd(config)
    } else {
      return this.showAdSenseAd(config)
    }
  }

  private async showAdMobAd(config: AdConfig): Promise<boolean> {
    try {
      const adUnitId = this.getAdMobAdUnitId(config.position, config.size)

      if (config.size === "banner" || config.size === "leaderboard") {
        const success = await twaBridge.showBannerAd(adUnitId)

        if (success) {
          twaBridge.logEvent("admob_ad_shown", {
            position: config.position,
            size: config.size,
            ad_unit_id: adUnitId,
          })
        }

        return success
      }

      return false
    } catch (error) {
      console.error("Error showing AdMob ad:", error)
      return false
    }
  }

  private async showAdSenseAd(config: AdConfig): Promise<boolean> {
    try {
      // AdSense ad display logic will be handled by the component
      return true
    } catch (error) {
      console.error("Error showing AdSense ad:", error)
      return false
    }
  }

  private getAdMobAdUnitId(position: string, size: string): string {
    // For now, return banner ad unit ID for all banner-type ads
    if (size === "banner" || size === "leaderboard") {
      return this.admobConfig.bannerAdUnitId
    }

    return this.admobConfig.bannerAdUnitId
  }

  getAdSenseConfig(): AdSenseConfig {
    return this.adsenseConfig
  }

  getAdMobConfig(): AdMobConfig {
    return this.admobConfig
  }

  isAdMobAvailable(): boolean {
    return twaDetector.isTrustedWebActivity() && twaBridge.isAvailable()
  }

  isAdSenseAvailable(): boolean {
    return !twaDetector.isTrustedWebActivity()
  }
}

// Export singleton instance
export const adManager = AdManager.getInstance()
