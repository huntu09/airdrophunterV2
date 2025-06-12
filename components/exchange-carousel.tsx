"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Exchange {
  id: string
  name: string
  logo: string
  description: string
  affiliateLink: string
  bonus: string
  color: string
}

const exchanges: Exchange[] = [
  {
    id: "binance",
    name: "Binance",
    logo: "/binance.svg",
    description: "World's largest crypto exchange with lowest fees",
    affiliateLink: "https://www.bybitglobal.com/invite?ref=PQVOOA",
    bonus: "Up to 20% Commission Rebate",
    color: "from-yellow-600 via-yellow-700 to-yellow-800",
  },
  {
    id: "bybit",
    name: "Bybit",
    logo: "/bybit.svg",
    description: "Advanced trading platform for derivatives",
    affiliateLink: "https://www.bybit.com/register?affiliate_id=YOUR_REF_CODE",
    bonus: "Up to $30,000 Bonus",
    color: "from-orange-600 via-orange-700 to-orange-800",
  },
  {
    id: "okx",
    name: "OKX",
    logo: "/okex.svg",
    description: "Leading crypto exchange and Web3 ecosystem",
    affiliateLink: "https://www.okx.com/join/YOUR_REF_CODE",
    bonus: "Up to $10,000 Welcome Bonus",
    color: "from-blue-600 via-blue-700 to-blue-800",
  },
  {
    id: "bitget",
    name: "Bitget",
    logo: "/placeholder.svg?height=60&width=60&text=BG",
    description: "Social trading and copy trading platform",
    affiliateLink: "https://www.bitget.com/expressly?channelCode=YOUR_REF_CODE",
    bonus: "Up to $5,000 Trading Bonus",
    color: "from-green-600 via-green-700 to-green-800",
  },
]

interface ExchangeCarouselProps {
  theme: "dark" | "light"
}

export function ExchangeCarousel({ theme }: ExchangeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % exchanges.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % exchanges.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + exchanges.length) % exchanges.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentExchange = exchanges[currentIndex]

  return (
    <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      <Card
        className={`bg-gradient-to-br ${currentExchange.color} border-none text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]`}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

        <CardContent className="p-4 text-center relative z-10">
          <div className="mb-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Image
                  src={currentExchange.logo || "/placeholder.svg"}
                  alt={`${currentExchange.name} logo`}
                  width={20}
                  height={20}
                  className="rounded"
                />
              </div>
              <h3 className="text-lg font-bold">{currentExchange.name}</h3>
            </div>
            <p className="text-xs opacity-90 mb-2">{currentExchange.bonus}</p>
          </div>

          <p className="text-white/90 mb-4 leading-relaxed text-sm">{currentExchange.description}</p>

          <a href={currentExchange.affiliateLink} target="_blank" rel="noopener noreferrer" className="inline-block">
            <Button
              className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg backdrop-blur-sm border border-white/20 text-sm"
              size="default"
            >
              <span>TRADE NOW</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </CardContent>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </Card>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {exchanges.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-white scale-125"
                : `${theme === "dark" ? "bg-gray-600" : "bg-gray-400"} hover:bg-gray-500`
            }`}
          />
        ))}
      </div>
    </div>
  )
}
