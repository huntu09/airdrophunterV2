"use client"

import type React from "react"

import { useEffect } from "react"

interface AdSenseAdProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  adLayout?: string
  adLayoutKey?: string
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
}

export function AdSenseAd({
  adSlot,
  adFormat = "auto",
  adLayout,
  adLayoutKey,
  style = { display: "block" },
  className = "",
  responsive = true,
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error("AdSense error:", error)
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9620623978081909" // Replace with your AdSense ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}

// Predefined ad components for common placements
export function HeaderBannerAd() {
  return (
    <div className="w-full flex justify-center py-4 bg-gray-50 dark:bg-gray-900">
      <AdSenseAd
        adSlot="1438306767"
        adFormat="horizontal"
        className="max-w-[728px] h-[90px]"
        style={{ display: "block", width: "728px", height: "90px" }}
      />
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="sticky top-4">
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <AdSenseAd
        adSlot="3167748455"
        adFormat="vertical"
        className="w-[160px] h-[600px]"
        style={{ display: "block", width: "160px", height: "600px" }}
      />
    </div>
  )
}

export function InContentAd() {
  return (
    <div className="my-8 flex justify-center">
      <div className="text-center">
        <div className="text-xs text-gray-500 mb-2">Advertisement</div>
        <AdSenseAd
          adSlot="6691226347"
          adFormat="rectangle"
          className="w-[300px] h-[250px]"
          style={{ display: "block", width: "300px", height: "250px" }}
        />
      </div>
    </div>
  )
}

export function ResponsiveAd({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <AdSenseAd adSlot="3013656049" adFormat="auto" responsive={true} style={{ display: "block" }} />
    </div>
  )
}
