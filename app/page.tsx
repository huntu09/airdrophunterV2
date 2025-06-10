"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Wrench, Search, Home, BarChart3, Shield, HelpCircle, Mail, User } from "lucide-react"
import "./globals.css"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { PWAInstallButton } from "@/components/pwa-install"
import { Input } from "@/components/ui/input"

// Optimized imports with lazy loading
import { OptimizedImage } from "@/components/optimized-image"
import { LazyWelcomeTour, LazyExchangeCarousel, LazyHybridAdDisplay, LazyWrapper } from "@/components/lazy-components"

// Import only types to avoid build-time import
import type { Airdrop } from "@/lib/api"

interface CryptoData {
  id: number
  name: string
  symbol: string
  quote: {
    USD: {
      price: number
      percent_change_24h: number
    }
  }
}

interface AnimatedCardProps {
  children: React.ReactNode
  delay: number
  className?: string
}

function AnimatedCard({ children, delay, className = "" }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default function AirdropsHunter() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>([])
  const [displayedAirdrops, setDisplayedAirdrops] = useState<Airdrop[]>([])
  const [loadMoreLoading, setLoadMoreLoading] = useState(false)
  const itemsPerLoad = 6
  const [hasMore, setHasMore] = useState(true)

  // Navigation items
  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Compare", href: "/compare", icon: BarChart3 },
    { name: "How to Participate", href: "/how-to-participate", icon: HelpCircle },
    { name: "Safety Guide", href: "/safety-guide", icon: Shield },
    { name: "Contact", href: "/contact-us", icon: Mail },
    { name: "Profile", href: "/profile", icon: User },
  ]

  // Fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch("/api/crypto-prices", {
          cache: "no-store", // Disable caching for real-time data
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setCryptoData(data.data.slice(0, 5))
        setError(null)
      } catch (err) {
        console.error("Error fetching crypto data:", err)
        setError("Using fallback data")
        // Enhanced fallback data with realistic fluctuations
        const now = Date.now()
        const randomFluctuation = () => (Math.random() - 0.5) * 10 // -5% to +5%

        setCryptoData([
          {
            id: 1,
            name: "Bitcoin",
            symbol: "BTC",
            quote: {
              USD: { price: 67234 + (Math.random() * 2000 - 1000), percent_change_24h: 2.4 + randomFluctuation() },
            },
          },
          {
            id: 2,
            name: "Ethereum",
            symbol: "ETH",
            quote: {
              USD: { price: 3456 + (Math.random() * 200 - 100), percent_change_24h: 1.8 + randomFluctuation() },
            },
          },
          {
            id: 3,
            name: "Solana",
            symbol: "SOL",
            quote: { USD: { price: 142 + (Math.random() * 20 - 10), percent_change_24h: -0.5 + randomFluctuation() } },
          },
          {
            id: 4,
            name: "BNB",
            symbol: "BNB",
            quote: { USD: { price: 589 + (Math.random() * 50 - 25), percent_change_24h: 3.2 + randomFluctuation() } },
          },
          {
            id: 5,
            name: "Cardano",
            symbol: "ADA",
            quote: {
              USD: { price: 0.45 + (Math.random() * 0.1 - 0.05), percent_change_24h: 1.1 + randomFluctuation() },
            },
          },
        ])
      }
    }

    fetchCryptoData()
    const interval = setInterval(fetchCryptoData, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fetch airdrops data with dynamic import
  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        setLoading(true)

        // Check if Supabase is configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.warn("Supabase not configured, using mock data")
          // Use mock data
          setAirdrops([
            {
              id: "1",
              name: "Sample Airdrop",
              slug: "sample-airdrop",
              logo_url: "/placeholder.svg?height=60&width=60",
              description: "Sample airdrop description",
              about: null,
              status: "CONFIRMED" as const,
              website_url: null,
              telegram_url: null,
              twitter_url: null,
              discord_url: null,
              total_reward: "$10,000",
              participants_count: 1000,
              deadline: null,
              is_hot: true,
              category: "DeFi",
              blockchain: "Ethereum",
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
          return
        }

        // Dynamic import AirdropAPI only when Supabase is available
        const { AirdropAPI } = await import("@/lib/api")
        const allAirdrops = await AirdropAPI.getAirdrops()
        setAirdrops(allAirdrops.slice(0, 6)) // Show latest 6
      } catch (err) {
        console.error("Error fetching airdrops:", err)
        // Fallback to empty arrays
        setAirdrops([])
      } finally {
        setLoading(false)
      }
    }

    fetchAirdrops()
  }, [])

  // Filter airdrops based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAirdrops(airdrops)
    } else {
      const filtered = airdrops.filter(
        (airdrop) =>
          airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airdrop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airdrop.blockchain.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredAirdrops(filtered)
    }
    // Reset displayed airdrops when search changes
    setDisplayedAirdrops([])
    setHasMore(true)
  }, [airdrops, searchTerm])

  // Add new effect to manage displayed airdrops
  useEffect(() => {
    if (filteredAirdrops.length > 0) {
      const initialItems = filteredAirdrops.slice(0, itemsPerLoad)
      setDisplayedAirdrops(initialItems)
      setHasMore(filteredAirdrops.length > itemsPerLoad)
    } else {
      setDisplayedAirdrops([])
      setHasMore(false)
    }
  }, [filteredAirdrops])

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`
    else if (price < 100) return `$${price.toFixed(2)}`
    else return `$${Math.round(price).toLocaleString()}`
  }

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? "+" : ""
    return `${sign}${percent.toFixed(1)}%`
  }

  const getColorClass = (percent: number) => {
    return percent >= 0 ? "text-green-500" : "text-red-500"
  }

  const loadMore = async () => {
    setLoadMoreLoading(true)

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    const currentLength = displayedAirdrops.length
    const nextItems = filteredAirdrops.slice(currentLength, currentLength + itemsPerLoad)

    setDisplayedAirdrops((prev) => [...prev, ...nextItems])
    setHasMore(currentLength + nextItems.length < filteredAirdrops.length)
    setLoadMoreLoading(false)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } relative overflow-hidden`}
    >
      {/* Welcome Tour - Lazy loaded */}
      <LazyWrapper>
        <LazyWelcomeTour />
      </LazyWrapper>

      {/* Navigation Header */}
      <AnimatedCard delay={100}>
        <header
          className={`sticky top-0 z-50 ${theme === "dark" ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-sm border-b ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AH</span>
                </div>
                <span className="font-bold text-xl">AirdropHunter</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6">
                {navigationItems.slice(0, 4).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      theme === "dark"
                        ? "hover:bg-gray-800 text-gray-300 hover:text-white"
                        : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                <PWAInstallButton />
              </div>
            </div>
          </div>
        </header>
      </AnimatedCard>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle absolute top-20 left-10 text-orange-500/20 animate-float">₿</div>
        <div className="floating-particle absolute top-40 right-20 text-blue-500/20 animate-float-delayed">Ξ</div>
        <div className="floating-particle absolute top-60 left-1/4 text-green-500/20 animate-float">◊</div>
        <div className="floating-particle absolute bottom-40 right-1/3 text-purple-500/20 animate-float-delayed">⬢</div>
        <div className="floating-particle absolute bottom-20 left-1/2 text-yellow-500/20 animate-float">⟐</div>
      </div>

      {/* Enhanced Crypto Price Ticker */}
      <div
        className="overflow-hidden py-3 mb-4 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loading ? (
          <div className="flex justify-center items-center py-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm">Loading crypto prices...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-2">
            <span className="text-sm text-red-500">Using fallback data</span>
          </div>
        ) : (
          <div className={`flex whitespace-nowrap ${isPaused ? "animate-none" : "animate-scroll"}`}>
            <div className="flex items-center gap-8 px-4">
              {cryptoData.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                >
                  <span className="font-semibold text-orange-500">{crypto.symbol}</span>
                  <span className={getColorClass(crypto.quote.USD.percent_change_24h)}>
                    {formatPrice(crypto.quote.USD.price)}
                  </span>
                  <span className={`text-sm ${getColorClass(crypto.quote.USD.percent_change_24h)}`}>
                    {formatPercentage(crypto.quote.USD.percent_change_24h)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Header Ad - Lazy loaded */}
      <AnimatedCard delay={300}>
        <div className="px-4 mb-6">
          <LazyWrapper fallback={<div className="h-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}>
            <LazyHybridAdDisplay
              position="header"
              size="leaderboard"
              fallback={<LazyExchangeCarousel theme={theme} />}
            />
          </LazyWrapper>
        </div>
      </AnimatedCard>

      {/* Search Bar */}
      <AnimatedCard delay={500}>
        <div className="px-4 mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} w-5 h-5`}
              />
              <Input
                placeholder="Search airdrops by name, category, or blockchain..."
                className={`pl-12 py-3 text-lg ${theme === "dark" ? "bg-gray-800 border-gray-700 focus:border-green-500" : "bg-white border-gray-300 focus:border-green-500"} transition-colors duration-300`}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {searchTerm && (
              <div className="mt-2 text-center">
                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Found {filteredAirdrops.length} airdrop{filteredAirdrops.length !== 1 ? "s" : ""} for "{searchTerm}"
                </span>
                {filteredAirdrops.length > 0 && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-sm text-green-500 hover:text-green-400 underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </AnimatedCard>

      {/* Latest Airdrops Section */}
      <div id="airdrops-section" className="px-4">
        <AnimatedCard delay={600}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {searchTerm ? `SEARCH RESULTS` : `LATEST AIRDROPS`}
            </h2>
            {filteredAirdrops.length > 0 && (
              <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Showing {displayedAirdrops.length} of {filteredAirdrops.length} airdrops
              </span>
            )}
          </div>
        </AnimatedCard>

        {filteredAirdrops.length === 0 ? (
          <AnimatedCard delay={800}>
            <div className="text-center py-12">
              <div className={`text-6xl mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>🔍</div>
              <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                No airdrops found
              </h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {searchTerm
                  ? `No airdrops match "${searchTerm}". Try a different search term.`
                  : "No airdrops available at the moment."}
              </p>
            </div>
          </AnimatedCard>
        ) : (
          <div className="space-y-4">
            {displayedAirdrops.map((airdrop, index) => (
              <React.Fragment key={`airdrop-${airdrop.id}`}>
                <AnimatedCard delay={800 + index * 100}>
                  <Link href={`/airdrop/${airdrop.slug}`}>
                    <Card
                      className={`${
                        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                      } transition-all duration-300 hover:shadow-xl cursor-pointer group hover:scale-[1.02] hover:border-green-500/50 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                              <OptimizedImage
                                src={airdrop.logo_url || "/placeholder.svg"}
                                alt={`${airdrop.name} logo`}
                                width={60}
                                height={60}
                                className="w-full h-full rounded-full"
                                index={index}
                                type="logo"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold mb-2 group-hover:text-green-500 transition-colors duration-300">
                                {airdrop.name}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-400">
                                <Wrench className="w-4 h-4" />
                                <span>
                                  {airdrop.category} • {airdrop.blockchain}
                                </span>
                              </div>
                            </div>
                          </div>
                          {airdrop.is_hot && (
                            <Flame className="w-6 h-6 text-red-500 animate-pulse group-hover:animate-bounce" />
                          )}
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <Badge
                            className={`font-semibold px-4 py-2 animate-pulse group-hover:animate-none group-hover:scale-105 transition-transform duration-300 ${
                              airdrop.status === "CONFIRMED"
                                ? "bg-green-600 hover:bg-green-700"
                                : airdrop.status === "UPCOMING"
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : "bg-gray-600 hover:bg-gray-700"
                            } text-white`}
                          >
                            {airdrop.status}
                          </Badge>
                          {airdrop.total_reward && (
                            <span className="text-sm text-gray-500">Reward: {airdrop.total_reward}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
                {/* Content Ad - after every 6th airdrop - Lazy loaded */}
                {(index + 1) % 6 === 0 && index < displayedAirdrops.length - 1 && (
                  <AnimatedCard key={`ad-after-${airdrop.id}`} delay={900 + index * 100}>
                    <div className="px-4 mb-4">
                      <LazyWrapper
                        fallback={<div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />}
                      >
                        <LazyHybridAdDisplay
                          position="content"
                          size="rectangle"
                          fallback={
                            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
                              <CardContent className="p-6 text-center">
                                <h3 className="text-lg font-semibold mb-2">🚀 Sponsored Content</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                  Discover premium crypto tools and services
                                </p>
                              </CardContent>
                            </Card>
                          }
                        />
                      </LazyWrapper>
                    </div>
                  </AnimatedCard>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {hasMore && displayedAirdrops.length > 0 && (
          <AnimatedCard delay={1200}>
            <div className="mt-8 flex justify-center">
              <Button
                onClick={loadMore}
                disabled={loadMoreLoading}
                className={`px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500"
                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                } text-white shadow-lg hover:shadow-xl`}
              >
                {loadMoreLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Load More Airdrops</span>
                    <span className="text-sm opacity-75">
                      ({filteredAirdrops.length - displayedAirdrops.length} remaining)
                    </span>
                  </div>
                )}
              </Button>
            </div>
          </AnimatedCard>
        )}
      </div>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Enhanced Theme Toggle */}
      <div className="fixed bottom-6 right-6">
        <div
          className={`flex rounded-full p-1 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
        >
          <Button
            variant={theme === "light" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme("light")}
            className="rounded-full px-4 transition-all duration-300"
          >
            Light
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme("dark")}
            className="rounded-full px-4 transition-all duration-300"
          >
            Dark
          </Button>
        </div>
      </div>
    </div>
  )
}
