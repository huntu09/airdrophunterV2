"use client"

interface CacheItem {
  data: any
  timestamp: number
  expiry: number
}

interface CacheStats {
  totalItems: number
  totalSize: number
  oldestItem: number | null
  newestItem: number | null
}

class CacheManager {
  private isClient = typeof window !== "undefined"

  // Safe localStorage operations
  private getItem(key: string): string | null {
    if (!this.isClient) return null
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn("localStorage getItem failed:", error)
      return null
    }
  }

  private setItem(key: string, value: string): void {
    if (!this.isClient) return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn("localStorage setItem failed:", error)
    }
  }

  private removeItem(key: string): void {
    if (!this.isClient) return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn("localStorage removeItem failed:", error)
    }
  }

  private getAllKeys(): string[] {
    if (!this.isClient) return []
    try {
      const keys: string[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) keys.push(key)
      }
      return keys
    } catch (error) {
      console.warn("localStorage getAllKeys failed:", error)
      return []
    }
  }

  // Set cache with expiry
  setCache(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    const cacheItem: CacheItem = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl,
    }

    this.setItem(key, JSON.stringify(cacheItem))
  }

  // Get cache if not expired
  getCache(key: string): any | null {
    const cached = this.getItem(key)
    if (!cached) return null

    try {
      const cacheItem: CacheItem = JSON.parse(cached)

      // Check if expired
      if (Date.now() > cacheItem.expiry) {
        this.removeItem(key)
        return null
      }

      return cacheItem.data
    } catch (error) {
      console.warn("Cache parse error:", error)
      this.removeItem(key)
      return null
    }
  }

  // Check if cache is stale (but not expired)
  isCacheStale(key: string, staleTime: number): boolean {
    const cached = this.getItem(key)
    if (!cached) return true

    try {
      const cacheItem: CacheItem = JSON.parse(cached)
      return Date.now() - cacheItem.timestamp > staleTime
    } catch (error) {
      return true
    }
  }

  // Clear specific cache
  clearCache(key: string): void {
    this.removeItem(key)
  }

  // Clear all cache
  clearAllCache(): void {
    if (!this.isClient) return
    try {
      const keys = this.getAllKeys()
      keys.forEach((key) => {
        if (key.startsWith("airdrophunter_")) {
          this.removeItem(key)
        }
      })
    } catch (error) {
      console.warn("clearAllCache failed:", error)
    }
  }

  // Get cache statistics
  getCacheStats(): CacheStats {
    if (!this.isClient) {
      return {
        totalItems: 0,
        totalSize: 0,
        oldestItem: null,
        newestItem: null,
      }
    }

    try {
      const keys = this.getAllKeys()
      const cacheKeys = keys.filter((key) => key.startsWith("airdrophunter_"))

      let totalSize = 0
      let oldestItem: number | null = null
      let newestItem: number | null = null

      cacheKeys.forEach((key) => {
        const cached = this.getItem(key)
        if (cached) {
          totalSize += cached.length
          try {
            const cacheItem: CacheItem = JSON.parse(cached)
            if (oldestItem === null || cacheItem.timestamp < oldestItem) {
              oldestItem = cacheItem.timestamp
            }
            if (newestItem === null || cacheItem.timestamp > newestItem) {
              newestItem = cacheItem.timestamp
            }
          } catch (error) {
            // Ignore parse errors for stats
          }
        }
      })

      return {
        totalItems: cacheKeys.length,
        totalSize,
        oldestItem,
        newestItem,
      }
    } catch (error) {
      console.warn("getCacheStats failed:", error)
      return {
        totalItems: 0,
        totalSize: 0,
        oldestItem: null,
        newestItem: null,
      }
    }
  }

  // Airdrops specific cache methods
  setAirdropsCache(airdrops: any[], stats: any): void {
    this.setCache("airdrophunter_airdrops", { airdrops, stats, lastFetch: Date.now() })
  }

  getAirdropsCache(): { airdrops: any[]; stats: any; lastFetch: number } | null {
    return this.getCache("airdrophunter_airdrops")
  }
}

export const cacheManager = new CacheManager()
