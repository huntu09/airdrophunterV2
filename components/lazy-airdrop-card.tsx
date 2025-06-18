"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/optimized-image"
import { useLazyLoading } from "@/hooks/use-lazy-loading"
import {
  Star,
  Flame,
  BookOpen,
  Zap,
  Twitter,
  Globe,
  MessageCircle,
  Disc,
  Hexagon,
  Layers,
  Coins,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { JSX } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  isHot?: boolean
  isConfirmed?: boolean
  socialLinks?: {
    telegram?: string
    twitter?: string
    discord?: string
    website?: string
    facebook?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  networks?: string[] // ["ethereum", "binance", "solana", etc.]
}

interface LazyAirdropCardProps {
  airdrop: Airdrop
  index: number
}

// Network icons mapping
const networkIcons: Record<string, JSX.Element> = {
  ethereum: <Hexagon className="h-3.5 w-3.5 text-blue-600" fill="currentColor" />,
  binance: <Hexagon className="h-3.5 w-3.5 text-yellow-500" fill="currentColor" />,
  solana: <Disc className="h-3.5 w-3.5 text-purple-600" fill="currentColor" />,
  polygon: <Hexagon className="h-3.5 w-3.5 text-violet-600" fill="currentColor" />,
  avalanche: <Hexagon className="h-3.5 w-3.5 text-red-500" fill="currentColor" />,
  arbitrum: <Layers className="h-3.5 w-3.5 text-blue-700" fill="currentColor" />,
  optimism: <Hexagon className="h-3.5 w-3.5 text-red-600" fill="currentColor" />,
  base: <Hexagon className="h-3.5 w-3.5 text-blue-400" fill="currentColor" />,
  default: <Coins className="h-3.5 w-3.5 text-gray-500" fill="currentColor" />,
}

// Social media icons mapping
const socialIcons: Record<string, { icon: JSX.Element; color: string; label: string }> = {
  website: {
    icon: <Globe className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-gray-600 hover:text-gray-800",
    label: "Website",
  },
  twitter: {
    icon: <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-blue-500 hover:text-blue-600",
    label: "Twitter",
  },
  telegram: {
    icon: <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-blue-400 hover:text-blue-500",
    label: "Telegram",
  },
  discord: {
    icon: <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-indigo-500 hover:text-indigo-600",
    label: "Discord",
  },
  facebook: {
    icon: <Facebook className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-blue-600 hover:text-blue-700",
    label: "Facebook",
  },
  instagram: {
    icon: <Instagram className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-pink-500 hover:text-pink-600",
    label: "Instagram",
  },
  youtube: {
    icon: <Youtube className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-red-500 hover:text-red-600",
    label: "YouTube",
  },
  linkedin: {
    icon: <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />,
    color: "text-blue-700 hover:text-blue-800",
    label: "LinkedIn",
  },
}

export function LazyAirdropCard({ airdrop, index }: LazyAirdropCardProps) {
  const { elementRef, isVisible } = useLazyLoading({
    threshold: 0.1,
    rootMargin: "100px",
  })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  // Stagger animation delay based on index
  const animationDelay = `${index * 100}ms`

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hottest":
        return "border-orange-500/50 hover:border-orange-500"
      case "potential":
        return "border-blue-500/50 hover:border-blue-500"
      default:
        return "border-[#7cb342]/50 hover:border-[#7cb342]"
    }
  }

  const getRewardColor = (category: string) => {
    switch (category) {
      case "hottest":
        return "text-orange-400"
      case "potential":
        return "text-blue-500"
      default:
        return "text-[#7cb342]"
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Get network icon
  const getNetworkIcon = (network: string) => {
    const normalizedNetwork = network.toLowerCase()
    return networkIcons[normalizedNetwork] || networkIcons.default
  }

  // Get available social links
  const getAvailableSocialLinks = () => {
    if (!airdrop.socialLinks) return []

    const availableLinks: Array<{ key: string; url: string; icon: JSX.Element; color: string; label: string }> = []

    Object.entries(airdrop.socialLinks).forEach(([key, url]) => {
      if (url && url.trim() !== "" && socialIcons[key]) {
        availableLinks.push({
          key,
          url: url.trim(),
          icon: socialIcons[key].icon,
          color: socialIcons[key].color,
          label: socialIcons[key].label,
        })
      }
    })

    return availableLinks
  }

  // Check if airdrop has networks
  const hasNetworks = airdrop.networks && airdrop.networks.length > 0
  const availableSocialLinks = getAvailableSocialLinks()

  return (
    <div
      ref={elementRef}
      className={cn(
        "transform transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{
        transitionDelay: isVisible ? animationDelay : "0ms",
      }}
    >
      {isVisible ? (
        <Card
          className={cn(
            "bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a] transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
            getCategoryColor(airdrop.category),
          )}
        >
          <CardContent className="p-2 sm:p-3 md:p-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Logo and Info with better mobile layout */}
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    {/* Only show OptimizedImage when we have a valid logo */}
                    {airdrop.logo && !imageError && (
                      <OptimizedImage
                        src={airdrop.logo}
                        alt={airdrop.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                        priority={index < 3}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    )}

                    {/* Only show fallback when no logo or image failed */}
                    {(!airdrop.logo || imageError) && (
                      <AvatarFallback
                        className={cn(
                          "text-white text-xl",
                          airdrop.category === "hottest"
                            ? "bg-orange-500"
                            : airdrop.category === "potential"
                              ? "bg-blue-500"
                              : "bg-[#7cb342]",
                        )}
                      >
                        {airdrop.name[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 dark:text-white">
                      {airdrop.name}
                    </h3>
                    {airdrop.isHot && <Flame className="h-5 w-5 text-orange-500 flex-shrink-0 animate-pulse" />}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-2">
                    <Zap className="h-3 w-3 flex-shrink-0" />
                    Action: {airdrop.action}
                  </p>
                  {airdrop.isConfirmed && (
                    <Badge className="bg-[#7cb342] text-white text-xs px-2 py-1 animate-pulse">CONFIRMED</Badge>
                  )}

                  {/* Networks badges */}
                  {hasNetworks && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {airdrop.networks?.slice(0, 4).map((network, i) => (
                        <TooltipProvider key={i}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="secondary"
                                className="px-1.5 py-0.5 h-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 flex items-center gap-1.5 text-xs font-medium"
                              >
                                {getNetworkIcon(network)}
                                <span className="capitalize">{network.slice(0, 3)}</span>
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize font-medium">{network} Network</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}

                      {/* Show +X more if there are more than 4 networks */}
                      {airdrop.networks && airdrop.networks.length > 4 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant="outline"
                                className="px-2 py-1 h-6 bg-gray-50 dark:bg-gray-800 border-dashed text-xs font-medium"
                              >
                                +{airdrop.networks.length - 4}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="flex flex-col gap-1">
                                <p className="font-medium mb-1">More Networks:</p>
                                {airdrop.networks.slice(4).map((network, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    {getNetworkIcon(network)}
                                    <span className="capitalize">{network}</span>
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button with better mobile sizing */}
              <div className="flex flex-col gap-2 w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gray-100 dark:bg-[#3a3a3a] hover:bg-gray-200 dark:hover:bg-[#4a4a4a] text-gray-700 dark:text-gray-300 w-full h-10 sm:h-12 text-sm sm:text-base transition-all duration-200 hover:scale-105" // Larger height for mobile
                  onClick={() => router.push(`/airdrop/${airdrop.id}`)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Guide
                </Button>
              </div>
            </div>

            {/* Social Links with better mobile touch targets */}
            {availableSocialLinks.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-[#3a3a3a]">
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {availableSocialLinks.map((social, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 p-0 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110", // Larger touch target
                              social.color,
                            )}
                            asChild
                          >
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                              {social.icon}
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{social.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            )}

            {/* Rating and Stats */}
            <div className="mt-3 pt-4 border-t border-gray-200 dark:border-[#3a3a3a]">
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900 dark:text-white font-medium">{airdrop.rating}</span>
                    <span className="text-gray-600 dark:text-gray-400">({airdrop.totalRatings})</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Reward:{" "}
                    <span className={cn("font-medium", getRewardColor(airdrop.category))}>{airdrop.reward}</span>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-400">Starts: {airdrop.startDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Skeleton loader
        <Card className="bg-white dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
