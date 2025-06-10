"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Smartphone, QrCode, Apple, Download } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MobileAppBannerProps {
  theme: "dark" | "light"
}

export function MobileAppBanner({ theme }: MobileAppBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Check if the banner has been dismissed before
  useEffect(() => {
    const dismissed = localStorage.getItem("app_banner_dismissed")
    if (!dismissed) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const dismissBanner = () => {
    setIsVisible(false)
    localStorage.setItem("app_banner_dismissed", "true")
  }

  const toggleQR = () => {
    setShowQR(!showQR)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500",
        showQR ? "translate-y-0" : "translate-y-0",
        theme === "dark" ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200",
        "shadow-lg",
      )}
    >
      <div className="max-w-4xl mx-auto">
        {showQR ? (
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={toggleQR}>
              <X className="w-4 h-4" />
            </Button>

            <h3 className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Download Our Mobile App
            </h3>

            <div className="bg-white p-4 rounded-lg mb-4">
              <div className="w-40 h-40 relative">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="QR Code"
                  width={160}
                  height={160}
                  className="rounded-md"
                />
              </div>
            </div>

            <p className={`text-sm mb-4 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Scan this QR code with your phone camera to download the AirdropHunter app
            </p>

            <div className="flex gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white">
                <Apple className="w-5 h-5 mr-2" />
                App Store
              </Button>
              <Button className="bg-[#3DDC84] hover:bg-[#32B970] text-white">
                <Download className="w-5 h-5 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <Smartphone className={`w-10 h-10 ${theme === "dark" ? "text-green-500" : "text-green-600"}`} />
              </div>
              <div>
                <h3 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  AirdropHunter Mobile App
                </h3>
                <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Get real-time notifications for new airdrops
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}
                onClick={toggleQR}
              >
                <QrCode className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">QR Code</span>
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                onClick={dismissBanner}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
