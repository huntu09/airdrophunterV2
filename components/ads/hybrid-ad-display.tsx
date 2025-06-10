"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Smartphone, Globe, Zap } from "lucide-react"
import { twaDetector } from "@/lib/twa-detection"
import { adManager } from "@/lib/ad-manager"

interface HybridAdDisplayProps {
  position: "header" | "sidebar" | "content" | "footer"
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper"
  className?: string
  fallback?: React.ReactNode
  showDebugInfo?: boolean
}

export function HybridAdDisplay({
  position,
  size,
  className = "",
  fallback,
  showDebugInfo = process.env.NODE_ENV === "development",
}: HybridAdDisplayProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const [adError, setAdError] = useState(false)
  const [environment, setEnvironment] = useState<any>(null)
  const [adType, setAdType] = useState<"admob" | "adsense" | "none">("none")

  useEffect(() => {
    const initializeAd = async () => {
      try {
        // Detect environment
        const env = twaDetector.detectEnvironment()
        setEnvironment(env)

        // Initialize ad manager
        await adManager.initialize()

        // Determine ad type
        if (env.isTWA && adManager.isAdMobAvailable()) {
          setAdType("admob")
          await loadAdMobAd()
        } else {
          setAdType("adsense")
          await loadAdSenseAd()
        }
      } catch (error) {
        console.error("Ad initialization error:", error)
        setAdError(true)
      }
    }

    initializeAd()
  }, [position, size])

  const loadAdMobAd = async () => {
    try {
      const success = await adManager.showAd({
        position,
        size,
        className,
      })

      if (success) {
        setAdLoaded(true)
        console.log("✅ AdMob ad loaded successfully")
      } else {
        throw new Error("AdMob ad failed to load")
      }
    } catch (error) {
      console.error("AdMob loading error:", error)
      // Fallback to AdSense
      setAdType("adsense")
      await loadAdSenseAd()
    }
  }

  const loadAdSenseAd = async () => {
    try {
      // AdSense loading logic
      if (typeof window !== "undefined" && window.adsbygoogle) {
        const config = adManager.getAdSenseConfig()

        // Push ad to AdSense queue
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
        setAdLoaded(true)
        console.log("✅ AdSense ad loaded successfully")

        // Track ad impression
        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "ad_impression", {
            ad_position: position,
            ad_size: size,
            ad_type: "adsense",
          })
        }
      } else {
        throw new Error("AdSense not available")
      }
    } catch (error) {
      console.error("AdSense loading error:", error)
      setAdError(true)
    }
  }

  const getAdDimensions = () => {
    switch (size) {
      case "banner":
        return { width: "320px", height: "50px" }
      case "rectangle":
        return { width: "300px", height: "250px" }
      case "leaderboard":
        return { width: "728px", height: "90px" }
      case "skyscraper":
        return { width: "160px", height: "600px" }
      default:
        return { width: "100%", height: "auto" }
    }
  }

  const adDimensions = getAdDimensions()

  // Show fallback if ad error
  if (adError) {
    return (
      <div className={`ad-fallback ${className}`}>
        {fallback || (
          <Card className="border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
            <CardContent className="p-4 text-center">
              <EyeOff className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Ad failed to load</p>
              {showDebugInfo && (
                <p className="text-xs text-gray-400 mt-1">
                  Environment: {environment?.isTWA ? "TWA" : environment?.isPWA ? "PWA" : "Web"}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className={`hybrid-ad-container ${className}`}>
      {/* Debug Info */}
      {showDebugInfo && environment && (
        <div className="mb-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
          <div className="flex items-center gap-2 mb-1">
            {environment.isTWA && <Smartphone className="w-3 h-3 text-green-500" />}
            {environment.isPWA && <Zap className="w-3 h-3 text-blue-500" />}
            {environment.isWeb && <Globe className="w-3 h-3 text-gray-500" />}
            <span className="font-medium">
              {environment.isTWA ? "TWA" : environment.isPWA ? "PWA" : "Web"}• {adType.toUpperCase()}
            </span>
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Platform: {environment.platform} | Mobile: {environment.isMobile ? "Yes" : "No"}
          </div>
        </div>
      )}

      {/* Loading placeholder */}
      {!adLoaded && (
        <Card className="border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
          <CardContent className="p-4 text-center" style={adDimensions}>
            <div className="animate-pulse">
              <Eye className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading {adType === "admob" ? "AdMob" : "AdSense"} ad...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Container */}
      <div ref={adRef} className={`hybrid-ad ${!adLoaded ? "hidden" : ""}`} style={{ minHeight: adDimensions.height }}>
        {adType === "admob" ? (
          // AdMob ad container (will be populated by native bridge)
          <div id={`admob-ad-${position}-${size}`} className="admob-ad-container" style={adDimensions} />
        ) : (
          // AdSense ad
          <ins
            className="adsbygoogle"
            style={{
              display: "block",
              ...adDimensions,
            }}
            data-ad-client={adManager.getAdSenseConfig().publisherId}
            data-ad-slot={adManager.getAdSenseConfig().adSlots[position]}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </div>
  )
}
