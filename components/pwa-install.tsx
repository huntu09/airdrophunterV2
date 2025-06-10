"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Bell, Share2 } from "lucide-react"
import { pwaManager } from "@/lib/pwa"

export function PWAInstall() {
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    // Check PWA status
    const checkPWAStatus = () => {
      setIsInstalled(pwaManager.isAppInstalled())
      setCanInstall(pwaManager.canInstall())

      // Show banner if can install and not dismissed
      const dismissed = localStorage.getItem("pwa-banner-dismissed")
      if (pwaManager.canInstall() && !dismissed) {
        setTimeout(() => setShowBanner(true), 3000) // Show after 3 seconds
      }
    }

    checkPWAStatus()

    // Check notification permission
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }

    // Listen for install events
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setCanInstall(false)
      setShowBanner(false)
    }

    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    const success = await pwaManager.promptInstall()
    if (success) {
      setShowBanner(false)
    }
  }

  const handleEnableNotifications = async () => {
    const success = await pwaManager.requestNotificationPermission()
    setNotificationsEnabled(success)
  }

  const handleShare = async () => {
    const shared = await pwaManager.shareContent({
      title: "AirdropHunter - Free Crypto Airdrops",
      text: "Discover the latest cryptocurrency airdrops and earn free tokens!",
      url: window.location.origin,
    })

    if (!shared) {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin)
        alert("Link copied to clipboard!")
      } catch (error) {
        console.error("Share failed:", error)
      }
    }
  }

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem("pwa-banner-dismissed", "true")
  }

  if (isInstalled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">App Installed! 🎉</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">Enjoy the full experience</p>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            {!notificationsEnabled && (
              <Button size="sm" variant="outline" onClick={handleEnableNotifications} className="flex-1">
                <Bell className="w-4 h-4 mr-1" />
                Notifications
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!showBanner || !canInstall) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg p-4 max-w-sm">
        <button onClick={dismissBanner} className="absolute top-2 right-2 text-white/80 hover:text-white">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Install AirdropHunter</h3>
            <p className="text-sm text-white/90">Get the app for faster access & offline support</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleInstall} className="flex-1 bg-white text-blue-600 hover:bg-white/90" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Install App
          </Button>
          <Button onClick={dismissBanner} variant="ghost" className="text-white hover:bg-white/20" size="sm">
            Later
          </Button>
        </div>

        <div className="flex items-center justify-center mt-2 text-xs text-white/80">
          ⚡ Offline access • 🔔 Push notifications • 📱 Native experience
        </div>
      </div>
    </div>
  )
}

// Install button for header/navbar
export function PWAInstallButton() {
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    const checkCanInstall = () => {
      setCanInstall(pwaManager.canInstall())
    }

    checkCanInstall()

    // Check periodically
    const interval = setInterval(checkCanInstall, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!canInstall) return null

  return (
    <Button
      id="pwa-install-button"
      onClick={() => pwaManager.promptInstall()}
      variant="outline"
      size="sm"
      className="hidden md:flex"
    >
      <Download className="w-4 h-4 mr-2" />
      Install App
    </Button>
  )
}
