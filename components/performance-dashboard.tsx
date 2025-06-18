"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Database,
  Zap,
  Clock,
  HardDrive,
  Wifi,
  RefreshCw,
  Trash2,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { cacheManager } from "@/lib/cache-manager"

interface PerformanceMetrics {
  loadTime: number
  cacheHitRate: number
  memoryUsage: number
  networkRequests: number
  imageLoadTime: number
  bundleSize: number
}

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    cacheHitRate: 0,
    memoryUsage: 0,
    networkRequests: 0,
    imageLoadTime: 0,
    bundleSize: 0,
  })
  const [cacheStats, setCacheStats] = useState<any>({})
  const [webVitals, setWebVitals] = useState<any>({})

  // 📊 Collect performance metrics
  useEffect(() => {
    const collectMetrics = () => {
      // Performance timing
      if (typeof window !== "undefined" && window.performance) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart

        setMetrics((prev) => ({
          ...prev,
          loadTime: Math.round(loadTime),
        }))

        // Memory usage (if available)
        if ("memory" in performance) {
          const memory = (performance as any).memory
          setMetrics((prev) => ({
            ...prev,
            memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          }))
        }

        // Network requests
        const resources = performance.getEntriesByType("resource")
        setMetrics((prev) => ({
          ...prev,
          networkRequests: resources.length,
        }))
      }

      // Cache stats
      setCacheStats(cacheManager.getCacheStats())
    }

    collectMetrics()

    // Update every 5 seconds
    const interval = setInterval(collectMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  // 🧹 Clear all cache
  const handleClearCache = () => {
    cacheManager.clearAllCache()
    setCacheStats({})
    window.location.reload()
  }

  // 🔄 Force refresh
  const handleForceRefresh = () => {
    cacheManager.clearAllCache()
    window.location.reload()
  }

  const getPerformanceScore = () => {
    const { loadTime, cacheHitRate, memoryUsage } = metrics
    let score = 100

    // Deduct points for slow load time
    if (loadTime > 3000) score -= 30
    else if (loadTime > 2000) score -= 20
    else if (loadTime > 1000) score -= 10

    // Deduct points for low cache hit rate
    if (cacheHitRate < 50) score -= 20
    else if (cacheHitRate < 70) score -= 10

    // Deduct points for high memory usage
    if (memoryUsage > 100) score -= 20
    else if (memoryUsage > 50) score -= 10

    return Math.max(0, score)
  }

  const performanceScore = getPerformanceScore()

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Performance Score</p>
                <p className="text-2xl font-bold">{performanceScore}</p>
              </div>
            </div>
            <Progress value={performanceScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Load Time</p>
                <p className="text-2xl font-bold">{metrics.loadTime}ms</p>
              </div>
            </div>
            <Badge
              variant={metrics.loadTime < 1000 ? "default" : metrics.loadTime < 3000 ? "secondary" : "destructive"}
            >
              {metrics.loadTime < 1000 ? "Excellent" : metrics.loadTime < 3000 ? "Good" : "Needs Work"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</p>
                <p className="text-2xl font-bold">{metrics.memoryUsage}MB</p>
              </div>
            </div>
            <Badge
              variant={metrics.memoryUsage < 50 ? "default" : metrics.memoryUsage < 100 ? "secondary" : "destructive"}
            >
              {metrics.memoryUsage < 50 ? "Low" : metrics.memoryUsage < 100 ? "Medium" : "High"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Network Requests</p>
                <p className="text-2xl font-bold">{metrics.networkRequests}</p>
              </div>
            </div>
            <Badge
              variant={
                metrics.networkRequests < 20 ? "default" : metrics.networkRequests < 50 ? "secondary" : "destructive"
              }
            >
              {metrics.networkRequests < 20 ? "Optimal" : metrics.networkRequests < 50 ? "Good" : "Too Many"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="cache" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cache">Cache Status</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="cache" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Cache Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cache Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(cacheStats).map(([key, value]: [string, any]) => {
                  if (typeof value === "object" && value !== null) {
                    return (
                      <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium capitalize">{key}</h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <p>Size: {value.size}</p>
                          <p>Age: {value.age}</p>
                          <p>Expires: {value.expires}</p>
                        </div>
                      </div>
                    )
                  }
                  return null
                })}
              </div>

              {/* Cache Actions */}
              <div className="flex gap-2">
                <Button onClick={handleClearCache} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
                <Button onClick={handleForceRefresh} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Force Refresh
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Image Lazy Loading</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Data Caching</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Background Refresh</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Service Worker</span>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Cache Hit Rate</p>
                    <p className="text-lg font-semibold">{metrics.cacheHitRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Bundle Size</p>
                    <p className="text-lg font-semibold">{metrics.bundleSize}KB</p>
                  </div>
                </div>

                {performanceScore < 70 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">
                      Performance could be improved. Consider clearing cache or optimizing images.
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
