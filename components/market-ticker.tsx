"use client"

import { useState, useEffect } from "react"
import { MarketDataService, type CoinData } from "@/lib/market-data"

export function MarketTicker() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MarketDataService.fetchMarketData()
        setCoins(data)
      } catch (error) {
        console.error("Market ticker error:", error)
      } finally {
        setLoading(false)
      }
    }

    // Initial fetch
    fetchData()

    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleCoinClick = (coin: CoinData) => {
    // Track affiliate click
    if (typeof window !== "undefined") {
      // Simple click tracking
      console.log(`Clicked on ${coin.symbol}`)

      // Open affiliate link (replace with your actual affiliate URLs)
      const affiliateUrl =
        coin.symbol === "BTC" || coin.symbol === "ETH"
          ? "https://accounts.binance.com/register?ref=YOUR_BINANCE_REF_CODE"
          : "https://www.okx.com/join/YOUR_OKX_REF_CODE"

      window.open(affiliateUrl, "_blank", "noopener,noreferrer")
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="py-2">
          <div className="flex animate-pulse space-x-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2 whitespace-nowrap">
                <div className="w-8 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
      <div className="py-2" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        <div className={`flex space-x-8 ${isPaused ? "" : "animate-scroll"}`}>
          {/* Duplicate the coins array for seamless loop */}
          {[...coins, ...coins].map((coin, index) => (
            <button
              key={`${coin.id}-${index}`}
              onClick={() => handleCoinClick(coin)}
              className="flex items-center space-x-2 whitespace-nowrap hover:bg-white/50 dark:hover:bg-gray-800/50 px-2 py-1 rounded transition-all duration-200 hover:scale-105 cursor-pointer group"
            >
              {/* Coin Icon */}
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-[#7cb342]">
                {coin.symbol === "BTC" && "₿"}
                {coin.symbol === "ETH" && "Ξ"}
                {coin.symbol === "BNB" && "🔶"}
                {coin.symbol === "SOL" && "◎"}
                {coin.symbol === "MATIC" && "🔷"}
                {coin.symbol === "ADA" && "♠"}
                {coin.symbol === "DOT" && "●"}
                {coin.symbol === "AVAX" && "🔺"}
              </span>

              {/* Coin Symbol */}
              <span className="font-bold text-gray-900 dark:text-white group-hover:text-[#7cb342]">{coin.symbol}</span>

              {/* Price */}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {MarketDataService.formatPrice(coin.current_price)}
              </span>

              {/* Change */}
              <span
                className={`text-sm font-medium ${MarketDataService.getChangeColor(coin.price_change_percentage_24h)}`}
              >
                {MarketDataService.formatChange(coin.price_change_percentage_24h)}
              </span>

              {/* Separator */}
              <span className="text-gray-400 dark:text-gray-600">|</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
