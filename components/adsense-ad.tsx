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
      <div className="w-full max-w-[728px] px-4">
        <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
        <AdSenseAd
          adSlot="1438306767"
          adFormat="auto"
          responsive={true}
          className="w-full min-h-[50px] md:min-h-[90px]"
          style={{ display: "block" }}
        />
      </div>
    </div>
  )
}

export function SidebarAd() {
  return (
    <div className="sticky top-4 hidden lg:block">
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <AdSenseAd
        adSlot="3167748455"
        adFormat="auto"
        responsive={true}
        className="w-[160px] min-h-[600px]"
        style={{ display: "block" }}
      />
    </div>
  )
}

export function InContentAd() {
  return (
    <div className="my-8 flex justify-center px-4">
      <div className="w-full max-w-[300px] text-center">
        <div className="text-xs text-gray-500 mb-2">Advertisement</div>
        <AdSenseAd
          adSlot="6691226347"
          adFormat="auto"
          responsive={true}
          className="w-full min-h-[200px] sm:min-h-[250px]"
          style={{ display: "block" }}
        />
      </div>
    </div>
  )
}

export function ResponsiveAd({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full px-4 ${className}`}>
      <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
      <div className="w-full max-w-[728px] mx-auto">
        <AdSenseAd
          adSlot="3013656049"
          adFormat="auto"
          responsive={true}
          style={{ display: "block" }}
          className="w-full min-h-[100px]"
        />
      </div>
    </div>
  )
}

export function MobileBannerAd() {
  return (
    <div className="w-full flex justify-center py-2 bg-gray-50 dark:bg-gray-900 lg:hidden">
      <div className="w-full max-w-[320px] px-4">
        <div className="text-xs text-gray-500 mb-2 text-center">Advertisement</div>
        <AdSenseAd
          adSlot="5482913674"
          adFormat="auto"
          responsive={true}
          className="w-full min-h-[50px]"
          style={{ display: "block" }}
        />
      </div>
    </div>
  )
}
