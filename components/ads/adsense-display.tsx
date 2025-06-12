"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

interface AdSenseDisplayProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  adLayout?: string
  adLayoutKey?: string
  style?: React.CSSProperties
  className?: string
  fallback?: React.ReactNode
  position: "header" | "sidebar" | "content" | "footer"
  size: "banner" | "rectangle" | "leaderboard" | "skyscraper"
}

declare global {
  interface Window {
    adsbygoogle: any[]
    gtag: any
  }
}

export function AdSenseDisplay({
  adSlot,
  adFormat = "auto",
  adLayout,
  adLayoutKey,
  style,
  className = "",
  fallback,
  position,
  size,
}: AdSenseDisplayProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const [adError, setAdError] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  // AdSense Publisher ID - akan diambil dari environment variable
  const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  const [isAdSenseReady, setIsAdSenseReady] = useState(false)

  useEffect(() => {
    if (PUBLISHER_ID && PUBLISHER_ID !== "ca-pub-0000000000000000" && PUBLISHER_ID.length >= 10) {
      setIsAdSenseReady(true)
    } else {
      setIsAdSenseReady(false)
    }
  }, [PUBLISHER_ID])

  // Jika belum ada publisher ID yang valid, jangan render ads
  if (!PUBLISHER_ID || PUBLISHER_ID === "ca-pub-0000000000000000" || PUBLISHER_ID.length < 10) {
    return (
      <div className={`ad-placeholder ${className}`}>
        {fallback || (
          <Card className="border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
            <CardContent className="p-4 text-center">
              <EyeOff className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">AdSense not configured</p>
              <p className="text-xs text-gray-400 mt-1">Set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID in environment</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  useEffect(() => {
    const loadAdSense = async () => {
      try {
        // Check if AdSense script already loaded
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
          const script = document.createElement("script")
          script.async = true
          script.crossOrigin = "anonymous"
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`

          script.onerror = () => {
            console.log("AdSense script failed to load - likely ad blocker")
            setAdError(true)
          }

          document.head.appendChild(script)
        }

        // Initialize ad after script loads
        const initAd = () => {
          try {
            if (window.adsbygoogle && adRef.current) {
              // Push ad to AdSense queue
              ;(window.adsbygoogle = window.adsbygoogle || []).push({})
              setAdLoaded(true)

              // Track ad impression
              if (typeof window.gtag !== "undefined") {
                window.gtag("event", "ad_impression", {
                  ad_position: position,
                  ad_size: size,
                  ad_slot: adSlot,
                })
              }
            }
          } catch (error) {
            console.error("AdSense initialization error:", error)
            setAdError(true)
          }
        }

        // Wait for script to load then initialize
        if (window.adsbygoogle) {
          initAd()
        } else {
          const checkAdSense = setInterval(() => {
            if (window.adsbygoogle) {
              clearInterval(checkAdSense)
              initAd()
            }
          }, 100)

          // Timeout after 5 seconds
          setTimeout(() => {
            clearInterval(checkAdSense)
            if (!window.adsbygoogle) {
              setAdError(true)
            }
          }, 5000)
        }
      } catch (error) {
        console.error("AdSense loading error:", error)
        setAdError(true)
      }
    }

    if (isAdSenseReady) {
      loadAdSense()
    }
  }, [adSlot, position, size, isAdSenseReady])

  const getAdDimensions = () => {
    switch (size) {
      case "banner":
        return { width: "728px", height: "90px" }
      case "rectangle":
        return { width: "300px", height: "250px" }
      case "leaderboard":
        return { width: "970px", height: "250px" }
      case "skyscraper":
        return { width: "160px", height: "600px" }
      default:
        return { width: "100%", height: "auto" }
    }
  }

  const adDimensions = getAdDimensions()

  // Show fallback if ad error or ad blocker detected
  if (adError) {
    return (
      <div className={`ad-fallback ${className}`}>
        {fallback || (
          <Card className="border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
            <CardContent className="p-4 text-center">
              <EyeOff className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Ad blocked or failed to load</p>
              <p className="text-xs text-gray-400 mt-1">Consider supporting us by disabling your ad blocker</p>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      {/* Loading placeholder */}
      {!adLoaded && (
        <Card className="border-dashed border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
          <CardContent className="p-4 text-center" style={adDimensions}>
            <div className="animate-pulse">
              <Eye className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading ad...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AdSense Ad */}
      <div ref={adRef} className={`adsense-ad ${!adLoaded ? "hidden" : ""}`} style={{ minHeight: adDimensions.height }}>
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            ...adDimensions,
          }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-ad-layout={adLayout}
          data-ad-layout-key={adLayoutKey}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
