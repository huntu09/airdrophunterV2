"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/optimized-image"
import {
  ArrowLeft,
  Star,
  Flame,
  Share2,
  ExternalLink,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  BookOpen,
  AlertTriangle,
  Send,
  Twitter,
  Globe,
  MessageCircle,
  Check,
  RefreshCw,
} from "lucide-react"
import { TextWithLinks } from "@/lib/link-parser"
import { HeaderBannerAd, InContentAd, ResponsiveAd } from "@/components/adsense-ad"

interface Airdrop {
  id: string
  name: string
  logo: string
  description: string
  action: string
  category: "latest" | "hottest" | "potential"
  rating: number
  totalRatings: number
  status: "active" | "confirmed" | "upcoming" | "ended"
  reward: string
  startDate: string
  difficulty: "Easy" | "Medium" | "Hard"
  socialLinks: {
    telegram?: string
    twitter?: string
    discord?: string
    website?: string
  }
  about: {
    overview: string
    tokenomics: string
    roadmap: string
  }
  steps: string[]
  requirements: string[]
  isHot?: boolean
  isConfirmed?: boolean
  participants: number
  createdAt: string
  updatedAt: string
}

export default function AirdropDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [airdrop, setAirdrop] = useState<Airdrop | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Fetch airdrop data from API
  const fetchAirdrop = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching airdrop with ID:", params.id)

      const response = await fetch(`/api/airdrops/${params.id}`)
      const data = await response.json()

      console.log("API Response:", data)

      if (data.success) {
        setAirdrop(data.data)
      } else {
        setError(data.error || "Airdrop not found")
      }
    } catch (error) {
      console.error("Error fetching airdrop:", error)
      setError("Failed to load airdrop")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchAirdrop()
    }
  }, [params.id])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({
        title: `${airdrop?.name} Airdrop`,
        text: airdrop?.description,
        url: url,
      })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hottest":
        return "from-orange-500 to-red-500"
      case "potential":
        return "from-blue-500 to-purple-500"
      default:
        return "from-[#7cb342] to-green-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "confirmed":
        return "bg-blue-500"
      case "upcoming":
        return "bg-yellow-500"
      case "ended":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cb342] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading airdrop details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !airdrop) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{error || "Airdrop Not Found"}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The airdrop you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button onClick={fetchAirdrop} className="bg-[#7cb342] hover:bg-[#689f38] text-white">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border-b border-gray-200 dark:border-[#3a3a3a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Airdrops
            </Button>
            <Button
              variant="ghost"
              onClick={handleShare}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              {copied ? <Check className="h-5 w-5 mr-2" /> : <Share2 className="h-5 w-5 mr-2" />}
              {copied ? "Copied!" : "Share"}
            </Button>
          </div>
        </div>
      </div>

      {/* Header Banner Ad */}
      <HeaderBannerAd />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
          <div className={`h-32 bg-gradient-to-r ${getCategoryColor(airdrop.category)} relative`}>
            <div className="absolute inset-0 bg-black/20" />
            {/* Pindahkan badges ke top-right agar tidak tertutup logo */}
            <div className="absolute top-4 right-6 flex items-center gap-3">
              {airdrop.isHot && <Flame className="h-6 w-6 text-white animate-pulse" />}
              {airdrop.isConfirmed && <Badge className="bg-white/20 text-white border-white/30">CONFIRMED</Badge>}
              <Badge className={`${getStatusColor(airdrop.status)} text-white`}>{airdrop.status.toUpperCase()}</Badge>
            </div>
          </div>

          <CardContent className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* Logo */}
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-[#2a2a2a] shadow-lg">
                  {airdrop.logo && (
                    <OptimizedImage
                      src={airdrop.logo}
                      alt={airdrop.name}
                      width={96}
                      height={96}
                      className="rounded-full"
                      priority
                    />
                  )}
                  {!airdrop.logo && (
                    <AvatarFallback className="bg-[#7cb342] text-white text-2xl">{airdrop.name[0]}</AvatarFallback>
                  )}
                </Avatar>
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">{airdrop.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{airdrop.description}</p>

                {/* Social Links - Icon Only with Brand Colors */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {airdrop.socialLinks.website && (
                    <a
                      href={airdrop.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Globe className="h-6 w-6 text-white" />
                    </a>
                  )}
                  {airdrop.socialLinks.twitter && (
                    <a
                      href={airdrop.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1DA1F2] to-[#0d8bd9] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Twitter className="h-6 w-6 text-white" />
                    </a>
                  )}
                  {airdrop.socialLinks.telegram && (
                    <a
                      href={airdrop.socialLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0088cc] to-[#006bb3] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Send className="h-6 w-6 text-white" />
                    </a>
                  )}
                  {airdrop.socialLinks.discord && (
                    <a
                      href={airdrop.socialLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="h-6 w-6 text-white" />
                    </a>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#3a3a3a] rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{airdrop.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{airdrop.totalRatings} ratings</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#3a3a3a] rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="h-4 w-4 text-[#7cb342]" />
                      <span className="font-semibold text-sm">{airdrop.reward}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Reward</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#3a3a3a] rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold text-sm">{airdrop.startDate}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Start Date</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#3a3a3a] rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span className="font-semibold text-sm">{airdrop.difficulty}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Difficulty</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Project */}
        {(airdrop.about.overview || airdrop.about.tokenomics || airdrop.about.roadmap) && (
          <Card className="mb-8 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-[#7cb342]" />
                About Project
              </h2>

              <div className="space-y-6">
                {airdrop.about.overview && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Overview</h3>
                    <TextWithLinks className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {airdrop.about.overview}
                    </TextWithLinks>
                  </div>
                )}

                {airdrop.about.tokenomics && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      Tokenomics
                    </h3>
                    <TextWithLinks className="text-gray-700 dark:text-gray-300 text-sm">
                      {airdrop.about.tokenomics}
                    </TextWithLinks>
                  </div>
                )}

                {airdrop.about.roadmap && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      Roadmap
                    </h3>
                    <TextWithLinks className="text-gray-700 dark:text-gray-300 text-sm">
                      {airdrop.about.roadmap}
                    </TextWithLinks>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* In-Content Ad */}
        <InContentAd />

        {/* Responsive Ad */}
        <ResponsiveAd className="mb-8" />

        {/* Step by Step Guide */}
        {airdrop.steps.length > 0 && (
          <Card className="mb-8 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-[#7cb342]" />
                Step-by-Step Guide
              </h2>

              <div className="space-y-4">
                {airdrop.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-[#3a3a3a] rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#7cb342] text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <TextWithLinks className="text-gray-700 dark:text-gray-300 leading-relaxed">{step}</TextWithLinks>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              {airdrop.requirements.length > 0 && (
                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {airdrop.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-blue-800 dark:text-blue-200">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <TextWithLinks className="text-sm">{req}</TextWithLinks>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pre-CTA Responsive Ad */}
        <ResponsiveAd className="mb-8" />

        {/* Important Notes */}
        <Card className="mb-8 bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              Important Notes
            </h2>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm leading-relaxed">
                ⚠️ <strong>Risk Warning:</strong> Cryptocurrency investments carry significant risk. Always do your own
                research (DYOR) before participating in any airdrop. Only invest what you can afford to lose and never
                share your private keys with anyone.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-yellow-200 dark:border-yellow-800">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 bg-[#7cb342] hover:bg-[#689f38] text-white font-semibold py-3" size="lg">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Start Airdrop Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 dark:border-[#3a3a3a]"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
