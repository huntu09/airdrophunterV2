export interface TWABridge {
  // AdMob Methods
  showBannerAd: (adUnitId: string) => Promise<boolean>
  hideBannerAd: () => Promise<boolean>
  showInterstitialAd: (adUnitId: string) => Promise<boolean>
  showRewardedAd: (adUnitId: string) => Promise<boolean>

  // Analytics
  logEvent: (eventName: string, parameters: Record<string, any>) => void

  // App Info
  getAppVersion: () => string
  isAdMobAvailable: () => boolean
}

export interface LegacyTWABridge {
  showAdMobBanner: (adUnitId: string) => void
  hideAdMobBanner: () => void
  showAdMobInterstitial: (adUnitId: string) => void
  logAnalyticsEvent: (event: string, params: string) => void
}

declare global {
  interface Window {
    TWABridge?: TWABridge
    AndroidBridge?: LegacyTWABridge
    webkit?: {
      messageHandlers?: {
        TWABridge?: {
          postMessage: (message: any) => void
        }
      }
    }
  }
}

export class TWABridgeManager {
  private static instance: TWABridgeManager
  private bridge: TWABridge | null = null
  private legacyBridge: LegacyTWABridge | null = null
  private initialized = false

  static getInstance(): TWABridgeManager {
    if (!TWABridgeManager.instance) {
      TWABridgeManager.instance = new TWABridgeManager()
    }
    return TWABridgeManager.instance
  }

  async initialize(): Promise<boolean> {
    if (this.initialized) return true
    if (typeof window === "undefined") return false

    // Modern TWA Bridge
    if (window.TWABridge) {
      this.bridge = window.TWABridge
      this.initialized = true
      console.log("✅ Modern TWA Bridge initialized")
      return true
    }

    // Legacy Android Bridge
    if (window.AndroidBridge) {
      this.legacyBridge = window.AndroidBridge
      this.initialized = true
      console.log("✅ Legacy TWA Bridge initialized")
      return true
    }

    // iOS WebKit Bridge
    if (window.webkit?.messageHandlers?.TWABridge) {
      // Create bridge wrapper for iOS
      this.bridge = this.createiOSBridge()
      this.initialized = true
      console.log("✅ iOS TWA Bridge initialized")
      return true
    }

    // Wait for bridge to be available (with timeout)
    return new Promise((resolve) => {
      let attempts = 0
      const maxAttempts = 50 // 5 seconds

      const checkBridge = () => {
        attempts++

        if (window.TWABridge || window.AndroidBridge) {
          this.bridge = window.TWABridge || null
          this.legacyBridge = window.AndroidBridge || null
          this.initialized = true
          console.log("✅ TWA Bridge found after waiting")
          resolve(true)
          return
        }

        if (attempts >= maxAttempts) {
          console.log("❌ TWA Bridge not found after timeout")
          resolve(false)
          return
        }

        setTimeout(checkBridge, 100)
      }

      checkBridge()
    })
  }

  private createiOSBridge(): TWABridge {
    return {
      showBannerAd: async (adUnitId: string) => {
        window.webkit?.messageHandlers?.TWABridge?.postMessage({
          action: "showBannerAd",
          adUnitId,
        })
        return true
      },
      hideBannerAd: async () => {
        window.webkit?.messageHandlers?.TWABridge?.postMessage({
          action: "hideBannerAd",
        })
        return true
      },
      showInterstitialAd: async (adUnitId: string) => {
        window.webkit?.messageHandlers?.TWABridge?.postMessage({
          action: "showInterstitialAd",
          adUnitId,
        })
        return true
      },
      showRewardedAd: async (adUnitId: string) => {
        window.webkit?.messageHandlers?.TWABridge?.postMessage({
          action: "showRewardedAd",
          adUnitId,
        })
        return true
      },
      logEvent: (eventName: string, parameters: Record<string, any>) => {
        window.webkit?.messageHandlers?.TWABridge?.postMessage({
          action: "logEvent",
          eventName,
          parameters,
        })
      },
      getAppVersion: () => "1.0.0",
      isAdMobAvailable: () => true,
    }
  }

  async showBannerAd(adUnitId: string): Promise<boolean> {
    if (!(await this.initialize())) return false

    try {
      if (this.bridge) {
        return await this.bridge.showBannerAd(adUnitId)
      } else if (this.legacyBridge) {
        this.legacyBridge.showAdMobBanner(adUnitId)
        return true
      }
    } catch (error) {
      console.error("Error showing banner ad:", error)
    }

    return false
  }

  async hideBannerAd(): Promise<boolean> {
    if (!(await this.initialize())) return false

    try {
      if (this.bridge) {
        return await this.bridge.hideBannerAd()
      } else if (this.legacyBridge) {
        this.legacyBridge.hideAdMobBanner()
        return true
      }
    } catch (error) {
      console.error("Error hiding banner ad:", error)
    }

    return false
  }

  async showInterstitialAd(adUnitId: string): Promise<boolean> {
    if (!(await this.initialize())) return false

    try {
      if (this.bridge) {
        return await this.bridge.showInterstitialAd(adUnitId)
      } else if (this.legacyBridge) {
        this.legacyBridge.showAdMobInterstitial(adUnitId)
        return true
      }
    } catch (error) {
      console.error("Error showing interstitial ad:", error)
    }

    return false
  }

  logEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.initialized) return

    try {
      if (this.bridge) {
        this.bridge.logEvent(eventName, parameters)
      } else if (this.legacyBridge) {
        this.legacyBridge.logAnalyticsEvent(eventName, JSON.stringify(parameters))
      }
    } catch (error) {
      console.error("Error logging event:", error)
    }
  }

  isAvailable(): boolean {
    return this.initialized && (this.bridge !== null || this.legacyBridge !== null)
  }
}

// Export singleton instance
export const twaBridge = TWABridgeManager.getInstance()
