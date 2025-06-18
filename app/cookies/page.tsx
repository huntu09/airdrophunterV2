"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Cookie, Settings, Eye, BarChart3, Shield, ArrowRight, Home, Calendar, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CookiePolicyPage() {
  const lastUpdated = "December 17, 2024"

  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    functional: true,
    advertising: false,
  })

  const cookieTypes = [
    {
      id: "essential",
      title: "Essential Cookies",
      description: "Required for the website to function properly",
      icon: Shield,
      color: "text-green-500",
      required: true,
      examples: ["Session management", "Security tokens", "Load balancing", "Basic functionality"],
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      description: "Help us understand how visitors use our website",
      icon: BarChart3,
      color: "text-blue-500",
      required: false,
      examples: ["Page views and traffic", "User behavior patterns", "Performance metrics", "Error tracking"],
    },
    {
      id: "functional",
      title: "Functional Cookies",
      description: "Remember your preferences and settings",
      icon: Settings,
      color: "text-purple-500",
      required: false,
      examples: ["Theme preferences", "Language settings", "Layout customizations", "Notification preferences"],
    },
    {
      id: "advertising",
      title: "Advertising Cookies",
      description: "Used to deliver relevant advertisements",
      icon: Eye,
      color: "text-orange-500",
      required: false,
      examples: ["Ad personalization", "Conversion tracking", "Retargeting", "Partner integrations"],
    },
  ]

  const handlePreferenceChange = (cookieType, enabled) => {
    if (cookieType === "essential") return // Cannot disable essential cookies

    setCookiePreferences((prev) => ({
      ...prev,
      [cookieType]: enabled,
    }))
  }

  const savePreferences = () => {
    // In a real app, this would save to localStorage and update cookie consent
    console.log("Saving cookie preferences:", cookiePreferences)
    alert("Cookie preferences saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#3a3a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#7cb342] transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </Link>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-900 dark:text-white">Cookie Policy</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Cookie className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cookie Policy</h1>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-gray-600 dark:text-gray-400">How we use cookies and tracking technologies</p>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Updated {lastUpdated}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They help websites
              remember information about your visit, which can make it easier to visit the site again and make the site
              more useful to you.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AirdropHunter uses cookies and similar technologies to enhance your browsing experience, analyze site
              traffic, and provide personalized content. This policy explains what cookies we use and why.
            </p>

            <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                <strong>Your Control:</strong> You can control and manage cookies through your browser settings or using
                our cookie preference center below.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Cookie Preference Center */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#7cb342]" />
              Cookie Preference Center
            </CardTitle>
            <CardDescription>Manage your cookie preferences. Changes will take effect immediately.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {cookieTypes.map((cookieType) => (
              <div key={cookieType.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      <cookieType.icon className={`h-5 w-5 ${cookieType.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {cookieType.title}
                        {cookieType.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cookieType.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={cookiePreferences[cookieType.id]}
                    onCheckedChange={(checked) => handlePreferenceChange(cookieType.id, checked)}
                    disabled={cookieType.required}
                  />
                </div>

                <div className="ml-13">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Examples:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cookieType.examples.map((example, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded px-2 py-1"
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <Button onClick={savePreferences} className="bg-[#7cb342] hover:bg-[#689f38]">
                Save Preferences
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCookiePreferences({
                    essential: true,
                    analytics: false,
                    functional: false,
                    advertising: false,
                  })
                }
              >
                Reject All (Except Essential)
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCookiePreferences({
                    essential: true,
                    analytics: true,
                    functional: true,
                    advertising: true,
                  })
                }
              >
                Accept All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Cookie Information */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Detailed Cookie Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Cookie Name</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Purpose</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Duration</th>
                    <th className="text-left py-3 px-2 font-semibold text-gray-900 dark:text-white">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-2 font-mono text-xs">session_id</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">Maintains user session</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">Session</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        Essential
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-mono text-xs">theme_preference</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">Remembers dark/light mode</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">1 year</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        Functional
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-mono text-xs">_ga</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">Google Analytics tracking</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">2 years</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        Analytics
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 font-mono text-xs">cookie_consent</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">Stores cookie preferences</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">1 year</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        Essential
                      </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Cookies */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use third-party services that may set their own cookies. These services help us provide better
              functionality and analyze our website performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Helps us understand website usage and improve user experience.
                </p>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#7cb342] hover:underline"
                >
                  Google Privacy Policy →
                </a>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cloudflare</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Provides security, performance optimization, and DDoS protection.
                </p>
                <a
                  href="https://www.cloudflare.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#7cb342] hover:underline"
                >
                  Cloudflare Privacy Policy →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Browser Controls */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Browser Cookie Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Most web browsers allow you to control cookies through their settings. Here's how to manage cookies in
              popular browsers:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Chrome", link: "https://support.google.com/chrome/answer/95647" },
                {
                  name: "Firefox",
                  link: "https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop",
                },
                {
                  name: "Safari",
                  link: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac",
                },
                {
                  name: "Edge",
                  link: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
                },
              ].map((browser) => (
                <a
                  key={browser.name}
                  href={browser.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">{browser.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cookie settings guide</p>
                </a>
              ))}
            </div>

            <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
              <Cookie className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                <strong>Note:</strong> Disabling cookies may affect website functionality. Some features may not work
                properly without certain cookies enabled.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Contact & Updates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Questions About Cookies?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                If you have questions about our use of cookies or this policy:
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> privacy@airdrophunter.com
                </p>
                <p>
                  <strong>Subject:</strong> Cookie Policy Inquiry
                </p>
                <p>
                  <strong>Response Time:</strong> Within 48 hours
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                We may update this Cookie Policy to reflect changes in our practices or for legal reasons.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Updates posted on this page</li>
                <li>• Email notifications for major changes</li>
                <li>• Continued use implies acceptance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
