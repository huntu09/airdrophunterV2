"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Heart, Coffee, X } from "lucide-react"

export function AdBlockerNotice() {
  const [isAdBlockerDetected, setIsAdBlockerDetected] = useState(false)
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    // Simple ad blocker detection
    const detectAdBlocker = () => {
      const testAd = document.createElement("div")
      testAd.innerHTML = "&nbsp;"
      testAd.className = "adsbox"
      testAd.style.position = "absolute"
      testAd.style.left = "-10000px"
      document.body.appendChild(testAd)

      setTimeout(() => {
        if (testAd.offsetHeight === 0) {
          setIsAdBlockerDetected(true)

          // Check if user has dismissed notice before
          const dismissed = localStorage.getItem("adblocker-notice-dismissed")
          if (!dismissed) {
            setShowNotice(true)
          }
        }
        document.body.removeChild(testAd)
      }, 100)
    }

    detectAdBlocker()
  }, [])

  const handleDismiss = () => {
    setShowNotice(false)
    localStorage.setItem("adblocker-notice-dismissed", "true")
  }

  const handleWhitelist = () => {
    // Open instructions for whitelisting
    window.open(
      "https://help.getadblock.com/support/solutions/articles/6000087914-how-to-whitelist-a-website",
      "_blank",
    )
  }

  if (!isAdBlockerDetected || !showNotice) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 flex-shrink-0 mt-1" />

            <div className="flex-1">
              <h3 className="font-semibold mb-2">Ad Blocker Detected</h3>
              <p className="text-sm opacity-90 mb-3">
                We noticed you're using an ad blocker. Our ads help keep AirdropHunter free for everyone!
              </p>

              <div className="space-y-2">
                <Button onClick={handleWhitelist} variant="secondary" size="sm" className="w-full text-blue-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Whitelist Our Site
                </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open("/premium", "_blank")}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-white border-white/50 hover:bg-white/10"
                  >
                    <Coffee className="w-4 h-4 mr-1" />
                    Go Premium
                  </Button>

                  <Button onClick={handleDismiss} variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
