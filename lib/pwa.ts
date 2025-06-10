// PWA Installation and Notification utilities - Simplified for inline SW

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface Window {
    gtag: any
    installPWA: () => Promise<void>
    hideInstallPrompt: () => void
  }
}

class PWAManager {
  private isInstalled = false

  constructor() {
    // Only initialize in browser
    if (typeof window !== "undefined") {
      this.init()
    }
  }

  private init() {
    // Check if already installed
    this.isInstalled = this.checkIfInstalled()

    console.log("🚀 PWA Manager initialized")
    console.log("📱 Is installed:", this.isInstalled)
  }

  // Check if app is installed
  private checkIfInstalled(): boolean {
    // Check if running in standalone mode
    if (typeof window !== "undefined") {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return true
      }

      // Check if running in PWA mode on iOS
      if ((window.navigator as any).standalone === true) {
        return true
      }
    }

    return false
  }

  // Request notification permission
  public async requestNotificationPermission(): Promise<boolean> {
    if (!("Notification" in window)) {
      console.log("❌ Notifications not supported")
      return false
    }

    try {
      const permission = await Notification.requestPermission()

      if (permission === "granted") {
        console.log("✅ Notification permission granted")
        this.showNotificationSuccess()
        return true
      } else {
        console.log("❌ Notification permission denied")
        return false
      }
    } catch (error) {
      console.error("❌ Notification permission request failed:", error)
      return false
    }
  }

  // Show notification success message
  private showNotificationSuccess(): void {
    const notification = document.createElement("div")
    notification.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #10b981;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: system-ui;
        font-size: 14px;
        max-width: 300px;
        animation: slideInLeft 0.3s ease-out;
      ">
        🔔 Notifications enabled! You'll get alerts for new airdrops.
      </div>
      <style>
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `

    document.body.appendChild(notification)

    // Remove after 4 seconds
    setTimeout(() => {
      notification.remove()
    }, 4000)
  }

  // Share content using Web Share API
  public async shareContent(data: ShareData): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share(data)
        console.log("✅ Content shared successfully")
        return true
      } catch (error) {
        console.error("❌ Share failed:", error)
        return false
      }
    } else {
      console.log("❌ Web Share API not supported")
      // Fallback to clipboard
      return this.copyToClipboard(data.url || data.text || "")
    }
  }

  // Fallback copy to clipboard
  private async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text)
      console.log("✅ Copied to clipboard")
      this.showCopySuccess()
      return true
    } catch (error) {
      console.error("❌ Copy to clipboard failed:", error)
      return false
    }
  }

  // Show copy success message
  private showCopySuccess(): void {
    const notification = document.createElement("div")
    notification.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-family: system-ui;
        font-size: 14px;
        animation: slideIn 0.3s ease-out;
      ">
        📋 Copied to clipboard!
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `

    document.body.appendChild(notification)

    // Remove after 2 seconds
    setTimeout(() => {
      notification.remove()
    }, 2000)
  }

  // Check if Service Worker is registered
  public async isServiceWorkerRegistered(): Promise<boolean> {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration()
      return !!registration
    }
    return false
  }

  // Get cache info
  public async getCacheInfo(): Promise<{ caches: string[]; totalSize: number }> {
    if ("caches" in window) {
      try {
        const cacheNames = await caches.keys()
        let totalSize = 0

        for (const cacheName of cacheNames) {
          const cache = await caches.open(cacheName)
          const requests = await cache.keys()

          for (const request of requests) {
            const response = await cache.match(request)
            if (response) {
              const blob = await response.blob()
              totalSize += blob.size
            }
          }
        }

        return {
          caches: cacheNames,
          totalSize: Math.round(totalSize / 1024), // KB
        }
      } catch (error) {
        console.error("❌ Failed to get cache info:", error)
        return { caches: [], totalSize: 0 }
      }
    }
    return { caches: [], totalSize: 0 }
  }

  // Clear all caches
  public async clearAllCaches(): Promise<boolean> {
    if ("caches" in window) {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
        console.log("✅ All caches cleared")
        return true
      } catch (error) {
        console.error("❌ Failed to clear caches:", error)
        return false
      }
    }
    return false
  }

  // Public methods
  public isAppInstalled(): boolean {
    return this.isInstalled
  }

  public canInstall(): boolean {
    return typeof window !== "undefined" && "beforeinstallprompt" in window
  }

  // Get installation status
  public getInstallationInfo() {
    return {
      isInstalled: this.isInstalled,
      canInstall: this.canInstall(),
      supportsServiceWorker: "serviceWorker" in navigator,
      supportsNotifications: "Notification" in window,
      supportsShare: "share" in navigator,
    }
  }
}

// Initialize PWA Manager
export const pwaManager = new PWAManager()

// Export types
export type { BeforeInstallPromptEvent }
