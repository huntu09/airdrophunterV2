"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Users, Award, Globe, Send, Twitter, LinkIcon } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { AirdropAPI, type Airdrop, type AirdropStep } from "@/lib/api"
import { CommentsSection } from "@/components/comments-section"

// Optimized imports
import { OptimizedImage } from "@/components/optimized-image"

interface LoadingSpinnerProps {
  theme: "dark" | "light"
}

function LoadingSpinner({ theme }: LoadingSpinnerProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-orange-200 dark:border-orange-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-red-500 animate-spin animation-delay-150"></div>
        </div>
        <p className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Loading airdrop details...
        </p>
      </div>
    </div>
  )
}

// Simple and reliable URL formatting function
function formatTextWithLinks(text: string) {
  if (!text) return text

  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g

  // Check if there are any URLs
  if (!urlRegex.test(text)) {
    return text
  }

  // Split by URLs and map to JSX
  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      // This is a URL
      let icon = <LinkIcon className="inline-block w-4 h-4 mr-1" />

      // Determine icon based on URL
      if (part.includes("twitter.com") || part.includes("x.com")) {
        icon = <Twitter className="inline-block w-4 h-4 mr-1 text-[#1DA1F2]" />
      } else if (part.includes("t.me") || part.includes("telegram")) {
        icon = <Send className="inline-block w-4 h-4 mr-1 text-[#0088cc]" />
      } else if (part.includes("facebook.com") || part.includes("fb.com")) {
        icon = <div className="inline-block w-4 h-4 mr-1 text-[#1877F2] font-bold">f</div>
      }

      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 hover:underline transition-colors"
        >
          {icon}
          {part.length > 30 ? `${part.substring(0, 30)}...` : part}
          <ExternalLink className="inline-block w-3 h-3 ml-1" />
        </a>
      )
    } else {
      // This is regular text
      return <span key={index}>{part}</span>
    }
  })
}

export default function AirdropDetailPage({ params }: { params: { slug: string } }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [airdrop, setAirdrop] = useState<(Airdrop & { steps: AirdropStep[] }) | null>(null)
  const [otherAirdrops, setOtherAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [airdropData, allAirdrops] = await Promise.all([
          AirdropAPI.getAirdropBySlug(params.slug),
          AirdropAPI.getAirdrops(),
        ])

        setAirdrop(airdropData)
        setOtherAirdrops(allAirdrops.filter((a) => a.slug !== params.slug).slice(0, 4))
      } catch (err) {
        console.error("Error fetching airdrop:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.slug])

  if (loading) {
    return <LoadingSpinner theme={theme} />
  }

  if (!airdrop) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="text-center">
          <p className="text-xl">Airdrop not found</p>
          <Link href="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header with Back Button */}
      <div
        className={`sticky top-0 z-40 ${
          theme === "dark" ? "bg-gray-800/95" : "bg-white/95"
        } backdrop-blur-sm border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/">
            <Button
              variant="ghost"
              className={`group ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } transition-all duration-300 hover:scale-105`}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative bg-gradient-to-br from-orange-400 to-red-500 p-1.5 rounded-full group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/25">
                    🏠
                  </div>
                </div>
                <span className="font-medium">Back to Airdrops</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-6">
            <OptimizedImage
              src={airdrop.logo_url || "/placeholder.svg"}
              alt={airdrop.name}
              width={140}
              height={140}
              className="rounded-2xl shadow-lg"
              priority={true}
              type="banner"
            />

            <div className="absolute -top-2 -right-2">
              <Badge
                className={`text-xs px-2 py-1 ${
                  airdrop.status === "CONFIRMED"
                    ? "bg-green-600 hover:bg-green-700"
                    : airdrop.status === "UPCOMING"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-600 hover:bg-gray-700"
                } text-white font-medium animate-pulse`}
              >
                {airdrop.status}
              </Badge>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
            {airdrop.name}
          </h1>
          <p
            className={`text-lg md:text-xl mb-4 text-center max-w-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
          >
            {airdrop.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            {airdrop.total_reward && (
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-yellow-500" />
                <span>Reward: {airdrop.total_reward}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{airdrop.participants_count.toLocaleString()} participants</span>
            </div>
            {airdrop.deadline && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>Ends: {new Date(airdrop.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* About Project */}
        <Card
          className={`mb-8 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-shadow duration-300`}
        >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-gray-900 dark:text-gray-100">About Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`leading-relaxed text-sm md:text-base mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
            >
              {airdrop.about}
            </p>
            <div className="flex flex-wrap gap-4">
              {airdrop.website_url && (
                <a
                  href={airdrop.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:scale-105 transform"
                >
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Website</span>
                </a>
              )}
              {airdrop.telegram_url && (
                <a
                  href={airdrop.telegram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] hover:text-[#006ba6] transition-all duration-200 hover:scale-105 transform"
                >
                  <Send className="w-5 h-5" />
                  <span className="font-medium">Telegram</span>
                </a>
              )}
              {airdrop.twitter_url && (
                <a
                  href={airdrop.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] hover:text-[#1a91da] transition-all duration-200 hover:scale-105 transform"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="font-medium">Twitter</span>
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Step by Step */}
        {airdrop.steps && airdrop.steps.length > 0 && (
          <Card
            className={`mb-8 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-shadow duration-300`}
          >
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-gray-900 dark:text-gray-100">Step by Step Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {airdrop.steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex gap-4 p-4 rounded-lg border ${
                      theme === "dark" ? "border-gray-700 bg-gray-700/30" : "border-gray-200 bg-gray-50"
                    } hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {step.step_number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2 text-sm md:text-base text-gray-900 dark:text-gray-100">
                        {step.title}
                        {!step.is_required && <span className="text-gray-500 ml-2">(Optional)</span>}
                      </h4>
                      <div className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        {formatTextWithLinks(step.description)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Airdrops */}
        {otherAirdrops.length > 0 && (
          <Card
            className={`mb-8 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} hover:shadow-lg transition-shadow duration-300`}
          >
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-gray-900 dark:text-gray-100">Other Airdrops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherAirdrops.map((otherAirdrop, index) => (
                  <Link key={otherAirdrop.id} href={`/airdrop/${otherAirdrop.slug}`}>
                    <div
                      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer ${
                        theme === "dark"
                          ? "border-gray-700 bg-gray-700/30 hover:bg-gray-700/50"
                          : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <OptimizedImage
                            src={otherAirdrop.logo_url || "/placeholder.svg"}
                            alt={otherAirdrop.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                            index={index}
                            type="thumbnail"
                          />
                          <div>
                            <h4 className="font-semibold text-sm md:text-base text-gray-900 dark:text-gray-100">
                              {otherAirdrop.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                otherAirdrop.status === "CONFIRMED"
                                  ? "border-green-500 text-green-500"
                                  : otherAirdrop.status === "UPCOMING"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-gray-500 text-gray-500"
                              }`}
                            >
                              {otherAirdrop.status}
                            </Badge>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Comments Section */}
        <CommentsSection airdropId={airdrop.id} theme={theme} />
      </div>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-30">
        <div
          className={`flex rounded-full p-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <Button
            variant={theme === "light" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme("light")}
            className="rounded-full px-4 text-xs md:text-sm transition-all duration-300"
          >
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="rounded-full px-4 text-xs md:text-sm transition-all duration-300"
          >
            Dark
          </Button>
        </div>
      </div>
    </div>
  )
}
