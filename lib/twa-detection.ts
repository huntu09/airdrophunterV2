export interface TWAEnvironment {
  isTWA: boolean
  isPWA: boolean
  isWeb: boolean
  isMobile: boolean
  platform: "android" | "ios" | "desktop"
  userAgent: string
}

export class TWADetector {
  private static instance: TWADetector
  private environment: TWAEnvironment | null = null

  static getInstance(): TWADetector {
    if (!TWADetector.instance) {
      TWADetector.instance = new TWADetector()
    }
    return TWADetector.instance
  }

  detectEnvironment(): TWAEnvironment {
    if (this.environment) {
      return this.environment
    }

    const userAgent = typeof window !== "undefined" ? window.navigator.userAgent : ""
    const isStandalone = typeof window !== "undefined" ? window.matchMedia("(display-mode: standalone)").matches : false

    // TWA Detection
    const isTWA =
      isStandalone &&
      (userAgent.includes("wv") || // WebView
        (userAgent.includes("Version/") && userAgent.includes("Chrome/")) ||
        (typeof window !== "undefined" && (window as any).TWABridge !== undefined))

    // PWA Detection
    const isPWA = isStandalone && !isTWA

    // Mobile Detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

    // Platform Detection
    let platform: "android" | "ios" | "desktop" = "desktop"
    if (/Android/i.test(userAgent)) platform = "android"
    else if (/iPhone|iPad|iPod/i.test(userAgent)) platform = "ios"

    this.environment = {
      isTWA,
      isPWA,
      isWeb: !isTWA && !isPWA,
      isMobile,
      platform,
      userAgent,
    }

    // Debug logging
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("🔍 TWA Detection Result:", this.environment)
    }

    return this.environment
  }

  isTrustedWebActivity(): boolean {
    return this.detectEnvironment().isTWA
  }

  isProgressiveWebApp(): boolean {
    return this.detectEnvironment().isPWA
  }

  isMobileDevice(): boolean {
    return this.detectEnvironment().isMobile
  }

  getPlatform(): "android" | "ios" | "desktop" {
    return this.detectEnvironment().platform
  }
}

// Export singleton instance
export const twaDetector = TWADetector.getInstance()
