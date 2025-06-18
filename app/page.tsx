"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Send, Twitter, RefreshCw, Zap, MessageCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp } from "lucide-react"
import { Footer } from "@/components/footer"
import { LazyAirdropCard } from "@/components/lazy-airdrop-card"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { useAirdropsCache } from "@/hooks/use-airdrops-cache"
import { HeaderBannerAd, InContentAd, ResponsiveAd } from "@/components/adsense-ad"
import { LoadMoreDisclaimer } from "@/components/compliance-disclaimer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function AffiliateBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // 🎯 REAL AFFILIATE DATA WITH WORKING LINKS
  const affiliateBanners = [
    {
      id: 1,
      name: "Binance",
      title: "World's #1 Crypto Exchange",
      subtitle: "Trade 350+ coins with lowest fees",
      bonus: "$100",
      bonusDetails: "Welcome Bonus",
      cta: "Claim $100 Bonus",
      bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      textColor: "text-white",
      logo: "₿",
      features: ["0% Fees", "24/7 Support", "Secure Trading"],
      // 🔥 REPLACE WITH YOUR ACTUAL BINANCE REFERRAL LINK
      url: "https://accounts.binance.com/register?ref=YOUR_BINANCE_REF_CODE",
      urgency: "Limited Time",
      socialProof: "10M+ Users",
      trustBadge: "🛡️ Secure",
    },
    {
      id: 2,
      name: "OKX",
      title: "Advanced Trading Platform",
      subtitle: "Professional tools & copy trading",
      bonus: "$50",
      bonusDetails: "New User Bonus",
      cta: "Get $50 Bonus",
      bgColor: "bg-gradient-to-r from-blue-600 to-cyan-500",
      textColor: "text-white",
      logo: "◯",
      features: ["Copy Trading", "Web3 Wallet", "DeFi Earn"],
      // 🔥 REPLACE WITH YOUR ACTUAL OKX REFERRAL LINK
      url: "https://www.okx.com/join/YOUR_OKX_REF_CODE",
      urgency: "Today Only",
      socialProof: "20M+ Traders",
      trustBadge: "⭐ 4.8/5",
    },
  ]

  // 🎯 ENHANCED CLICK HANDLER WITH TRACKING
  const handleAffiliateClick = (banner: (typeof affiliateBanners)[0]) => {
    // Import the tracking function
    import("@/lib/affiliate-tracker").then(({ trackAffiliateClick }) => {
      trackAffiliateClick(banner.name, banner.url)
    })
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % affiliateBanners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + affiliateBanners.length) % affiliateBanners.length)
  }

  const currentBanner = affiliateBanners[currentSlide]

  return (
    <div className="relative">
      {/* 🎯 ENHANCED MAIN BANNER */}
      <div
        className={`${currentBanner.bgColor} rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 ${isHovered ? "scale-[1.02] shadow-2xl" : "shadow-lg"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ✨ ANIMATED BACKGROUND PATTERN */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={`absolute -top-2 -right-2 text-6xl font-bold transition-transform duration-500 ${isHovered ? "rotate-12 scale-110" : ""}`}
          >
            {currentBanner.logo}
          </div>
          <div
            className={`absolute -bottom-2 -left-2 text-4xl font-bold opacity-50 transition-transform duration-700 ${isHovered ? "-rotate-12 scale-90" : ""}`}
          >
            {currentBanner.logo}
          </div>
        </div>

        {/* 🔥 URGENCY BANNER */}
        <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg animate-pulse">
          {currentBanner.urgency} 🔥
        </div>

        <div className="relative z-10 p-3 lg:p-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* 🎯 ENHANCED LEFT CONTENT */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                {/* 💎 ENHANCED LOGO & TITLE */}
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <div
                    className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-xl font-bold backdrop-blur-sm transition-transform duration-300 ${isHovered ? "rotate-6 scale-110" : ""}`}
                  >
                    {currentBanner.logo}
                  </div>
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                      {currentBanner.name}
                      <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{currentBanner.trustBadge}</span>
                    </h2>
                    <p className="text-white/80 text-xs lg:text-sm">{currentBanner.title}</p>
                    <p className="text-white/60 text-xs">{currentBanner.socialProof}</p>
                  </div>
                </div>

                {/* 🏆 ENHANCED FEATURES */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-1">
                  {currentBanner.features.map((feature, index) => (
                    <Badge
                      key={index}
                      className={`bg-white/20 text-white border-white/30 text-xs px-2 py-0.5 transition-all duration-300 ${isHovered ? "bg-white/30 scale-105" : ""}`}
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-white/90 mt-2 text-sm lg:text-base font-medium">{currentBanner.subtitle}</p>
            </div>

            {/* 🎯 ENHANCED RIGHT CTA */}
            <div className="flex-shrink-0 text-center">
              {/* 💰 ENHANCED BONUS DISPLAY */}
              <div
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 min-w-[140px] transition-all duration-300 ${isHovered ? "bg-white/20 scale-105" : ""}`}
              >
                <div className="text-white/80 text-xs mb-0.5">{currentBanner.bonusDetails}</div>
                <div className="text-3xl font-bold text-white animate-pulse">{currentBanner.bonus}</div>
                <div className="text-white/80 text-xs">New Users Only</div>
                <div className="text-yellow-300 text-xs font-bold mt-1">⏰ Limited Time</div>
              </div>

              {/* 🚀 ENHANCED CTA BUTTON */}
              <Button
                size="lg"
                onClick={() => handleAffiliateClick(currentBanner)}
                className={`bg-white text-gray-900 hover:bg-gray-100 font-bold px-6 py-3 shadow-xl w-full lg:w-auto text-sm transition-all duration-300 transform ${isHovered ? "scale-110 shadow-2xl" : ""} hover:scale-105`}
              >
                <span className="flex items-center gap-2">
                  {currentBanner.cta}
                  <span className="animate-bounce">🚀</span>
                </span>
              </Button>

              {/* 💎 TRUST INDICATORS */}
              <div className="text-white/70 text-xs mt-2 flex items-center justify-center gap-2">
                <span>🔒 Secure</span>
                <span>•</span>
                <span>⚡ Instant</span>
                <span>•</span>
                <span>🎁 Bonus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 ENHANCED NAVIGATION */}
      <div className="flex items-center justify-between mt-3">
        {/* 💎 ENHANCED DOTS */}
        <div className="flex gap-2">
          {affiliateBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#7cb342] w-8 shadow-lg" : "bg-gray-400 hover:bg-gray-300 w-2 hover:w-4"
              }`}
            />
          ))}
        </div>

        {/* 🎯 ENHANCED ARROW NAVIGATION */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-white w-8 h-8 p-0 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] text-gray-700 dark:text-white w-8 h-8 p-0 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 🎯 CONVERSION OPTIMIZATION FOOTER */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          💡 <strong>Pro Tip:</strong> Sign up now to secure your welcome bonus before it expires!
        </p>
      </div>
    </div>
  )
}

export default function AirdropHunter() {
  const [activeTab, setActiveTab] = useState("latest")

  // 🚀 Use cached airdrops hook
  const { airdrops, stats, loading, error, isStale, lastFetch, refresh, clearCache, cacheStats } = useAirdropsCache({
    enableBackgroundRefresh: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  })

  const filteredAirdrops = airdrops.filter((airdrop) => {
    if (activeTab === "latest") return airdrop.category === "latest"
    if (activeTab === "hottest") return airdrop.category === "hottest"
    if (activeTab === "potential") return airdrop.category === "potential"
    return true
  })

  // Error state
  if (error && airdrops.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Airdrops</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={refresh} className="bg-[#7cb342] hover:bg-[#689f38] text-white w-full" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()} className="w-full">
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white transition-colors">
      <PerformanceMonitor />

      {/* Social Media Header */}
      <div className="bg-gray-100 dark:bg-[#2a2a2a] py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex justify-center space-x-4 flex-1">
              {/* Telegram Button - Enhanced */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-gradient-to-br from-[#8bc34a] to-[#7cb342] hover:from-[#9ccc65] hover:to-[#8bc34a] text-white rounded-xl w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                    >
                      <Send className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Join our Telegram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Twitter Button - Enhanced */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-gradient-to-br from-[#8bc34a] to-[#7cb342] hover:from-[#9ccc65] hover:to-[#8bc34a] text-white rounded-xl w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                    >
                      <Twitter className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Discord Button - Enhanced (Replacing Facebook) */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-gradient-to-br from-[#8bc34a] to-[#7cb342] hover:from-[#9ccc65] hover:to-[#8bc34a] text-white rounded-xl w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                    >
                      <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Join our Discord</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Performance & Controls */}
            <div className="flex items-center gap-2">
              {/* Cache Status */}
              {isStale && (
                <Badge variant="secondary" className="text-xs bg-[#7cb342]/20 text-[#7cb342] animate-pulse">
                  <Zap className="h-3 w-3 mr-1" />
                  Refreshing...
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Banner Ad */}
      <HeaderBannerAd />

      {/* Affiliate Banner Carousel - Reduced padding */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <AffiliateBannerCarousel />
        </div>
      </section>

      {/* Airdrops Section with Tabs */}
      <section className="py-6 px-2">
        <div className="max-w-7xl mx-auto">
          {/* Stats Header */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AirdropHunter</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {loading && airdrops.length === 0
                ? "Loading airdrops..."
                : `${airdrops.length} Active Airdrops Available`}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a]">
              <TabsTrigger
                value="latest"
                className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white text-gray-600 dark:text-gray-400"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Latest ({airdrops.filter((a) => a.category === "latest").length})
              </TabsTrigger>
              <TabsTrigger
                value="hottest"
                className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white text-gray-600 dark:text-gray-400"
              >
                <Flame className="h-4 w-4 mr-2" />
                Hottest ({airdrops.filter((a) => a.category === "hottest").length})
              </TabsTrigger>
              <TabsTrigger
                value="potential"
                className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white text-gray-600 dark:text-gray-400"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Potential ({airdrops.filter((a) => a.category === "potential").length})
              </TabsTrigger>
            </TabsList>

            {/* Loading State */}
            {loading && airdrops.length === 0 && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cb342] mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading airdrops from cache...</p>
                </div>
              </div>
            )}

            {/* No Data State */}
            {!loading && airdrops.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Airdrops Found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No airdrops have been created yet. Create some in the admin panel!
                </p>
                <Button onClick={refresh} className="bg-[#7cb342] hover:bg-[#689f38] text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            )}

            {/* Tab Contents */}
            <TabsContent value="latest" className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-700 dark:text-gray-300 mb-8 uppercase tracking-wider">
                LATEST AIRDROPS ({filteredAirdrops.length})
              </h2>
              {filteredAirdrops.length === 0 && !loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No latest airdrops available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAirdrops.map((airdrop, index) => (
                    <>
                      <LazyAirdropCard key={airdrop.id} airdrop={airdrop} index={index} />
                      {index > 0 && (index + 1) % 3 === 0 && <InContentAd />}
                    </>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="hottest" className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-700 dark:text-gray-300 mb-8 uppercase tracking-wider flex items-center gap-3">
                <Flame className="h-8 w-8 text-orange-500" />
                HOTTEST AIRDROPS ({filteredAirdrops.length})
              </h2>
              {filteredAirdrops.length === 0 && !loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No hottest airdrops available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAirdrops.map((airdrop, index) => (
                    <>
                      <LazyAirdropCard key={airdrop.id} airdrop={airdrop} index={index} />
                      {index > 0 && (index + 1) % 3 === 0 && <InContentAd />}
                    </>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="potential" className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-700 dark:text-gray-300 mb-8 uppercase tracking-wider flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-blue-500" />
                POTENTIAL AIRDROPS ({filteredAirdrops.length})
              </h2>
              {filteredAirdrops.length === 0 && !loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No potential airdrops available</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAirdrops.map((airdrop, index) => (
                    <>
                      <LazyAirdropCard key={airdrop.id} airdrop={airdrop} index={index} />
                      {index > 0 && (index + 1) % 3 === 0 && <InContentAd />}
                    </>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Bottom Responsive Ad */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <ResponsiveAd />
        </div>
      </section>

      {/* Compliance Disclaimer - Before Footer */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <LoadMoreDisclaimer />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-40">
        <ThemeToggle />
      </div>
    </div>
  )
}
