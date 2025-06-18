"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Cookie, X, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      setHasConsented(true)
    }
  }, [])

  const handleAccept = (acceptAll = false) => {
    // Save consent to localStorage
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        analytics: acceptAll,
        advertising: acceptAll,
        timestamp: new Date().toISOString(),
      }),
    )
    setShowConsent(false)
    setHasConsented(true)

    // Enable Google Analytics and AdSense if accepted all
    if (acceptAll && typeof window !== "undefined") {
      // Enable analytics
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "granted",
        })
      }
    }
  }

  const handleReject = () => {
    // Save minimal consent to localStorage
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        analytics: false,
        advertising: false,
        timestamp: new Date().toISOString(),
      }),
    )
    setShowConsent(false)
    setHasConsented(true)

    // Disable Google Analytics and AdSense
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      })
    }
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
        <div className="p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#7cb342]/20 p-2 rounded-full">
                <Cookie className="h-5 w-5 text-[#7cb342]" />
              </div>
              <h3 className="text-lg font-semibold">Cookie Consent</h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowConsent(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
            traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>

          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="mb-4 text-sm text-[#7cb342]">
                {showDetails ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-1" />
                    Cookie Details
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Necessary Cookies</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      These cookies are essential for the website to function properly and cannot be disabled.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-purple-500 mt-0.5"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Analytics Cookies</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      These cookies help us understand how visitors interact with our website, helping us improve our
                      services.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-orange-500 mt-0.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6" />
                    <path d="m9 9 6 6" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Advertising Cookies</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      These cookies are used to provide relevant ads and marketing campaigns. They are also used to
                      limit the number of times you see an ad.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex flex-col sm:flex-row gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleReject}>
              Reject All
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAccept(false)}>
              Accept Necessary
            </Button>
            <Button className="bg-[#7cb342] hover:bg-[#689f38] text-white" size="sm" onClick={() => handleAccept(true)}>
              Accept All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
