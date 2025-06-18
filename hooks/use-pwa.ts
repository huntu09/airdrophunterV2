"use client"

import { useState, useEffect } from "react"

interface PWAStatus {
  isInstalled: boolean
  isOnline: boolean
  canInstall: boolean
  isStandalone: boolean
}

export function usePWA(): PWAStatus {
  const [status, setStatus] = useState<PWAStatus>({
    isInstalled: false,
    isOnline: true,
    canInstall: false,
    isStandalone: false,
  })

  useEffect(() => {
    // Check if running as PWA
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true

    // Check online status
    const updateOnlineStatus = () => {
      setStatus((prev) => ({ ...prev, isOnline: navigator.onLine }))
    }

    // Check if can install
    const handleBeforeInstallPrompt = () => {
      setStatus((prev) => ({ ...prev, canInstall: true }))
    }

    const handleAppInstalled = () => {
      setStatus((prev) => ({
        ...prev,
        isInstalled: true,
        canInstall: false,
      }))
    }

    // Set initial status
    setStatus({
      isInstalled: isStandalone,
      isOnline: navigator.onLine,
      canInstall: false,
      isStandalone,
    })

    // Add event listeners
    window.addEventListener("online", updateOnlineStatus)
    window.addEventListener("offline", updateOnlineStatus)
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  return status
}
