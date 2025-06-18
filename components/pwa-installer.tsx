"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X, Smartphone, Bell, BellOff } from "lucide-react"
import { pushNotificationManager } from "@/lib/push-notifications"
import { useToast } from "@/hooks/use-toast"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    initializePWA()
  }, [])

  const initializePWA = async () => {
    // Initialize push notifications
    await pushNotificationManager.initialize()

    // Check if already subscribed
    const subscribed = await pushNotificationManager.isSubscribed()
    setIsSubscribed(subscribed)
    setNotificationsEnabled(Notification.permission === "granted")

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    // Check if already installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      toast({
        title: "🎉 App Installed!",
        description: "AirdropHunter is now installed on your device",
      })
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Check if running as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem("pwa-install-dismissed")
    if (dismissed) {
      const dismissedTime = Number.parseInt(dismissed)
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      if (dismissedTime > weekAgo) {
        setShowInstallPrompt(false)
      }
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      toast({
        title: "🚀 Installing App...",
        description: "AirdropHunter is being installed",
      })
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      // Enable notifications
      const permission = await pushNotificationManager.requestPermission()

      if (permission === "granted") {
        const subscription = await pushNotificationManager.subscribe()
        if (subscription) {
          setNotificationsEnabled(true)
          setIsSubscribed(true)
          toast({
            title: "🔔 Notifications Enabled!",
            description: "You'll receive alerts for new airdrops",
          })
        }
      } else {
        toast({
          title: "❌ Permission Denied",
          description: "Enable notifications in browser settings",
          variant: "destructive",
        })
      }
    } else {
      // Disable notifications
      const success = await pushNotificationManager.unsubscribe()
      if (success) {
        setNotificationsEnabled(false)
        setIsSubscribed(false)
        toast({
          title: "🔕 Notifications Disabled",
          description: "You won't receive push notifications",
        })
      }
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    localStorage.setItem("pwa-install-dismissed", Date.now().toString())
  }

  if (!showInstallPrompt || (isInstalled && isSubscribed)) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-[9999] mx-auto max-w-sm border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 pointer-events-auto">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
            <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 dark:text-green-100">
              {!isInstalled ? "Install AirdropHunter" : "Enable Notifications"}
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              {!isInstalled ? "Get faster access and offline browsing" : "Get instant alerts for new airdrops"}
            </p>
            <div className="mt-3 flex gap-2">
              {!isInstalled && showInstallPrompt && (
                <Button size="sm" onClick={handleInstallClick} className="bg-green-600 hover:bg-green-700">
                  <Download className="mr-1 h-4 w-4" />
                  Install
                </Button>
              )}

              {isInstalled && (
                <Button
                  size="sm"
                  onClick={handleNotificationToggle}
                  className={notificationsEnabled ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
                >
                  {notificationsEnabled ? (
                    <>
                      <BellOff className="mr-1 h-4 w-4" />
                      Disable
                    </>
                  ) : (
                    <>
                      <Bell className="mr-1 h-4 w-4" />
                      Enable
                    </>
                  )}
                </Button>
              )}

              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-green-700 hover:text-green-800 dark:text-green-300 pointer-events-auto"
                type="button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
