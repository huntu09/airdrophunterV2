"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Settings, X } from "lucide-react"

declare global {
  interface Window {
    gtag: any
  }
}

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("ads-consent")
    if (!consent) {
      setShowBanner(true)
    } else {
      // Initialize ads if consent given
      initializeAds(JSON.parse(consent))
    }
  }, [])

  const initializeAds = (consent: any) => {
    if (consent.analytics) {
      // Initialize Google Analytics
      if (typeof window.gtag !== "undefined") {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        })
      }
    }

    if (consent.ads) {
      // Initialize AdSense
      if (typeof window.gtag !== "undefined") {
        window.gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        })
      }
    }
  }

  const handleAcceptAll = () => {
    const consent = {
      analytics: true,
      ads: true,
      functional: true,
      timestamp: Date.now(),
    }

    localStorage.setItem("ads-consent", JSON.stringify(consent))
    initializeAds(consent)
    setShowBanner(false)

    // Track consent
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "consent_granted", {
        consent_type: "all",
      })
    }
  }

  const handleRejectAll = () => {
    const consent = {
      analytics: false,
      ads: false,
      functional: true, // Always allow functional
      timestamp: Date.now(),
    }

    localStorage.setItem("ads-consent", JSON.stringify(consent))
    setShowBanner(false)

    // Track consent
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "consent_denied", {
        consent_type: "all",
      })
    }
  }

  const handleCustomize = () => {
    setShowSettings(true)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-2xl">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Cookie & Privacy Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies and similar technologies to provide the best experience on our website. This includes
                  analytics to understand how you use our site and ads to support our free content.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleAcceptAll} className="bg-green-600 hover:bg-green-700">
                    Accept All
                  </Button>
                  <Button onClick={handleRejectAll} variant="outline">
                    Reject All
                  </Button>
                  <Button onClick={handleCustomize} variant="ghost">
                    <Settings className="w-4 h-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </div>

              <Button onClick={() => setShowBanner(false)} variant="ghost" size="sm" className="flex-shrink-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Privacy Preferences</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Functional Cookies</p>
                    <p className="text-sm text-gray-500">Required for basic site functionality</p>
                  </div>
                  <div className="text-green-500 font-medium">Always On</div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Cookies</p>
                    <p className="text-sm text-gray-500">Help us improve our website</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Toggle
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Advertising Cookies</p>
                    <p className="text-sm text-gray-500">Support free content with relevant ads</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Toggle
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Save Preferences
                </Button>
                <Button onClick={() => setShowSettings(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
