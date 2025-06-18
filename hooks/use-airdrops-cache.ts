"use client"

import { useState, useEffect, useCallback } from "react"
import { cacheManager } from "@/lib/cache-manager"

interface UseAirdropsCacheOptions {
  enableBackgroundRefresh?: boolean
  staleTime?: number
  cacheTime?: number
}

interface UseAirdropsCacheReturn {
  airdrops: any[]
  stats: any
  loading: boolean
  error: string | null
  isStale: boolean
  lastFetch: number | null
  refresh: () => Promise<void>
  clearCache: () => void
  loadMore: () => Promise<void>
  hasMore: boolean
  cacheStats: any
  dataSource: string
}

// Ultimate fallback data
const EMERGENCY_AIRDROPS = [
  {
    id: "1",
    name: "LayerZero Airdrop",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Cross-chain protocol with potential airdrop for early users",
    action: "Bridge tokens across different chains",
    category: "latest",
    rating: 4.5,
    totalRatings: 1250,
    status: "active",
    reward: "TBA",
    startDate: "2024-01-15",
    difficulty: "Medium",
    isHot: true,
    isConfirmed: false,
    participants: 45000,
    networks: ["Ethereum", "Arbitrum", "Optimism"],
  },
  {
    id: "2",
    name: "zkSync Era Airdrop",
    logo: "/placeholder.svg?height=40&width=40",
    description: "Layer 2 scaling solution with confirmed airdrop for users",
    action: "Use zkSync Era for transactions",
    category: "hottest",
    rating: 4.8,
    totalRatings: 2100,
    status: "active",
    reward: "ZK Tokens",
    startDate: "2024-01-10",
    difficulty: "Easy",
    isHot: true,
    isConfirmed: true,
    participants: 78000,
    networks: ["zkSync Era"],
  },
]

const EMERGENCY_STATS = {
  total: 2,
  active: 2,
  confirmed: 1,
  potential: 1,
}

export function useAirdropsCache(options: UseAirdropsCacheOptions = {}): UseAirdropsCacheReturn {
  const { enableBackgroundRefresh = true, staleTime = 2.5 * 60 * 1000 } = options

  const [airdrops, setAirdrops] = useState<any[]>(EMERGENCY_AIRDROPS)
  const [stats, setStats] = useState<any>(EMERGENCY_STATS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isStale, setIsStale] = useState(false)
  const [lastFetch, setLastFetch] = useState<number | null>(null)
  const [dataSource, setDataSource] = useState<string>("emergency")
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)

  // 📡 Robust fetch with multiple fallback layers
  const fetchAirdrops = useCallback(async (isBackgroundRefresh = false) => {
    try {
      if (!isBackgroundRefresh) {
        setLoading(true)
        setError(null)
      }

      console.log(`🔄 ${isBackgroundRefresh ? "Background" : "Initial"} fetch starting... (SAFE MODE)`)

      // Create abort controller with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log("⏰ Request timeout, aborting...")
        controller.abort()
      }, 10000) // 10 second timeout

      let response: Response
      try {
        response = await fetch("/api/airdrops?limit=12", {
          signal: controller.signal,
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        throw new Error(`Fetch failed: ${fetchError.message}`)
      }

      clearTimeout(timeoutId)

      console.log(`📡 Response status: ${response.status}`)
      console.log(`📡 Response ok: ${response.ok}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      // Check content type
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Invalid content type: ${contentType}`)
      }

      // Get response as text first for debugging
      let responseText: string
      try {
        responseText = await response.text()
      } catch (textError: any) {
        throw new Error(`Failed to read response: ${textError.message}`)
      }

      console.log(`📡 Response length: ${responseText.length}`)
      console.log(`📡 Response preview: ${responseText.substring(0, 100)}...`)

      // Parse JSON safely
      let data: any
      try {
        data = JSON.parse(responseText)
      } catch (parseError: any) {
        console.error("💥 JSON Parse Error:", parseError)
        console.error("💥 Response text:", responseText.substring(0, 500))
        throw new Error(`JSON parse failed: ${parseError.message}`)
      }

      // Validate response structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid response structure")
      }

      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ Successfully fetched ${data.data.length} airdrops`)
        console.log(`📊 Data source: ${data.dataSource || "unknown"}`)

        // Update state
        setAirdrops(data.data)
        setStats(data.stats || EMERGENCY_STATS)
        setLastFetch(Date.now())
        setIsStale(false)
        setDataSource(data.dataSource || "api")
        setError(null)
        setHasMore(data.data.length === 12)

        // Cache the data
        try {
          cacheManager.setAirdropsCache(data.data, data.stats || EMERGENCY_STATS)
        } catch (cacheError) {
          console.warn("Cache save failed:", cacheError)
        }

        if (!isBackgroundRefresh) {
          setLoading(false)
        }
      } else {
        throw new Error(data.error || "Invalid API response format")
      }
    } catch (err: any) {
      console.error("💥 Fetch error:", err.message)

      // Use emergency fallback data
      console.log("🚨 Using emergency fallback data...")
      setAirdrops(EMERGENCY_AIRDROPS)
      setStats(EMERGENCY_STATS)
      setLastFetch(Date.now())
      setDataSource("emergency_fallback")
      setError(`API Error: ${err.message}`)
      setHasMore(false)

      if (!isBackgroundRefresh) {
        setLoading(false)
      }
    }
  }, [])

  // 🔄 Manual refresh
  const refresh = useCallback(async () => {
    await fetchAirdrops(false)
  }, [fetchAirdrops])

  // 🗑️ Clear cache
  const clearCache = useCallback(() => {
    try {
      cacheManager.clearAllCache()
    } catch (error) {
      console.warn("Cache clear failed:", error)
    }
    setAirdrops(EMERGENCY_AIRDROPS)
    setStats(EMERGENCY_STATS)
    setLastFetch(null)
    setIsStale(true)
    setDataSource("emergency")
    setHasMore(false)
  }, [])

  // 📊 Get cache stats
  const getCacheStats = useCallback(() => {
    try {
      return cacheManager.getCacheStats()
    } catch (error) {
      console.warn("Cache stats failed:", error)
      return {}
    }
  }, [])

  const loadMore = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log("⏰ Request timeout, aborting...")
        controller.abort()
      }, 10000)

      let response: Response
      try {
        response = await fetch(`/api/airdrops?limit=12&offset=${offset + 12}`, {
          signal: controller.signal,
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      } catch (fetchError: any) {
        clearTimeout(timeoutId)
        throw new Error(`Fetch failed: ${fetchError.message}`)
      }

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Invalid content type: ${contentType}`)
      }

      let responseText: string
      try {
        responseText = await response.text()
      } catch (textError: any) {
        throw new Error(`Failed to read response: ${textError.message}`)
      }

      let data: any
      try {
        data = JSON.parse(responseText)
      } catch (parseError: any) {
        console.error("💥 JSON Parse Error:", parseError)
        console.error("💥 Response text:", responseText.substring(0, 500))
        throw new Error(`JSON parse failed: ${parseError.message}`)
      }

      if (data.success && Array.isArray(data.data)) {
        setAirdrops((prevAirdrops: any[]) => [...prevAirdrops, ...data.data])
        setOffset(offset + 12)
        setHasMore(data.data.length === 12)
        setError(null)
      } else {
        throw new Error(data.error || "Invalid API response format")
      }
    } catch (err: any) {
      console.error("💥 Fetch error:", err.message)
      setError(`API Error: ${err.message}`)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [offset])

  // 🚀 Initialize data
  useEffect(() => {
    const initializeData = async () => {
      console.log("🚀 Initializing airdrops data... (SAFE MODE)")

      // Try cache first
      try {
        const cached = cacheManager.getAirdropsCache()
        if (cached && cached.airdrops && cached.airdrops.length > 0) {
          console.log(`💾 Using cached data (${cached.airdrops.length} airdrops)`)
          setAirdrops(cached.airdrops)
          setStats(cached.stats || EMERGENCY_STATS)
          setLastFetch(cached.lastFetch)
          setDataSource("cache")
          setLoading(false)

          // Check if cache is stale
          const isStaleCache = cacheManager.isCacheStale("airdrophunter_airdrops", staleTime)
          setIsStale(isStaleCache)

          // Background refresh if stale
          if (isStaleCache && enableBackgroundRefresh) {
            console.log("🔄 Cache is stale, refreshing in background...")
            setTimeout(() => fetchAirdrops(true), 1000) // Delay to avoid blocking UI
          }
          return
        }
      } catch (cacheError) {
        console.warn("Cache read failed:", cacheError)
      }

      // No cache, fetch from API
      console.log("📡 No cache found, fetching from API...")
      await fetchAirdrops(false)
    }

    initializeData()
  }, [fetchAirdrops, enableBackgroundRefresh, staleTime])

  return {
    airdrops,
    stats,
    loading,
    error,
    isStale,
    lastFetch,
    refresh,
    clearCache,
    loadMore,
    hasMore,
    cacheStats: getCacheStats(),
    dataSource,
  }
}
