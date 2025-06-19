"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Download,
  TrendingUp,
  Settings,
  Zap,
  Users,
  Eye,
  RefreshCw,
  AlertCircle,
  Star,
  Activity,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AirdropDialog } from "@/components/airdrop-dialog"

interface StatsData {
  totalAirdrops: number
  activeAirdrops: number
  confirmedAirdrops: number
  potentialAirdrops: number
  totalUsers: number
  totalParticipants: number
  averageRating: number
  conversionRate: number
  growth: {
    airdrops: number
    users: number
    participants: number
    rating: number
  }
  lastUpdated: string
}

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalAirdrops: 0,
    activeAirdrops: 0,
    confirmedAirdrops: 0,
    potentialAirdrops: 0,
    totalUsers: 0,
    totalParticipants: 0,
    averageRating: 0,
    conversionRate: 0,
    growth: {
      airdrops: 0,
      users: 0,
      participants: 0,
      rating: 0,
    },
    lastUpdated: new Date().toISOString(),
  })

  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [error, setError] = useState(null)

  const router = useRouter()
  const { toast } = useToast()

  // Fetch stats data
  const fetchStats = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) setIsRefreshing(true)

        const response = await fetch("/api/admin/stats", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success) {
          setStats(result.data)
          setError(null)
          setLastRefresh(new Date())
          console.log("✅ Stats updated successfully")
        } else {
          throw new Error(result.error || "Failed to fetch stats")
        }
      } catch (error) {
        console.error("💥 Error fetching stats:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch stats")
        toast({
          title: "Error",
          description: "Failed to fetch dashboard statistics",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [toast],
  )

  // Fetch recent activity
  const fetchRecentActivity = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/activity", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setRecentActivity(result.activities)
        console.log("✅ Activity updated successfully")
      } else {
        throw new Error(result.error || "Failed to fetch activity")
      }
    } catch (error) {
      console.error("💥 Error fetching activity:", error)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchStats(true)
    fetchRecentActivity()
  }, [fetchStats, fetchRecentActivity])

  // Auto-refresh functionality
  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchStats(false)
        fetchRecentActivity()
      }, 30000) // Refresh every 30 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [autoRefresh, fetchStats, fetchRecentActivity])

  const handleManualRefresh = () => {
    fetchStats(true)
    fetchRecentActivity()
    toast({
      title: "Refreshed",
      description: "Dashboard data has been updated",
    })
  }

  const handleExportData = () => {
    // Create CSV data
    const csvData = [
      ["Metric", "Value", "Growth"],
      ["Total Airdrops", stats.totalAirdrops.toString(), `${stats.growth.airdrops}%`],
      ["Active Airdrops", stats.activeAirdrops.toString(), "-"],
      ["Total Users", stats.totalUsers.toString(), `${stats.growth.users}%`],
      ["Total Participants", stats.totalParticipants.toString(), `${stats.growth.participants}%`],
      ["Average Rating", stats.averageRating.toString(), `${stats.growth.rating}%`],
      ["Conversion Rate", `${stats.conversionRate}%`, "-"],
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `admin-stats-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Data Exported!",
      description: "Your dashboard data has been exported to CSV.",
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "airdrop":
        return <Plus className="h-4 w-4 text-green-600" />
      case "rating":
        return <Star className="h-4 w-4 text-yellow-600" />
      case "user":
        return <Users className="h-4 w-4 text-blue-600" />
      case "system":
        return <Activity className="h-4 w-4 text-purple-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-orange-600" />
    }
  }

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case "airdrop":
        return "bg-green-100 dark:bg-green-900/20"
      case "rating":
        return "bg-yellow-100 dark:bg-yellow-900/20"
      case "user":
        return "bg-blue-100 dark:bg-blue-900/20"
      case "system":
        return "bg-purple-100 dark:bg-purple-900/20"
      default:
        return "bg-orange-100 dark:bg-orange-900/20"
    }
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-[#7cb342]" />
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Welcome back, Admin! Here's what's happening.
          </p>
          {lastRefresh && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {lastRefresh.toLocaleTimeString()}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto Refresh {autoRefresh ? "ON" : "OFF"}
          </Button>
          <Button
            className="bg-[#7cb342] hover:bg-[#689f38] text-white w-full sm:w-auto"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Airdrop
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Quick Actions - Mobile Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Button
          className="bg-[#7cb342] hover:bg-[#689f38] text-white h-16 sm:h-20 flex flex-col items-center justify-center p-3"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
          <span className="text-xs sm:text-sm font-medium">Add Airdrop</span>
        </Button>

        <Button
          variant="outline"
          className="h-16 sm:h-20 flex flex-col items-center justify-center p-3 border-gray-200 dark:border-[#3a3a3a]"
          onClick={handleExportData}
        >
          <Download className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
          <span className="text-xs sm:text-sm font-medium">Export Data</span>
        </Button>

        <Button
          variant="outline"
          className="h-16 sm:h-20 flex flex-col items-center justify-center p-3 border-gray-200 dark:border-[#3a3a3a]"
          onClick={() => router.push("/admin/analytics")}
        >
          <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
          <span className="text-xs sm:text-sm font-medium">Analytics</span>
        </Button>

        <Button
          variant="outline"
          className="h-16 sm:h-20 flex flex-col items-center justify-center p-3 border-gray-200 dark:border-[#3a3a3a]"
          onClick={() => router.push("/admin/settings")}
        >
          <Settings className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
          <span className="text-xs sm:text-sm font-medium">Settings</span>
        </Button>
      </div>

      {/* Stats Cards - Mobile Optimized with Real Data */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                  Total Airdrops
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAirdrops}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />+{stats.growth.airdrops}% from last month
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 flex-shrink-0">
                <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />+{stats.growth.users}% from last month
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-green-100 dark:bg-green-900/20 flex-shrink-0">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Participants</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalParticipants.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />+{stats.growth.participants}% from last month
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-purple-100 dark:bg-purple-900/20 flex-shrink-0">
                <Eye className="h-4 w-4 sm:h-6 sm:w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Avg Rating</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.averageRating.toFixed(1)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />+{stats.growth.rating}% from last month
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex-shrink-0">
                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6">
        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Airdrops</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeAirdrops}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.confirmedAirdrops}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Mobile Optimized with Real Data */}
      <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
            Recent Activity
            {autoRefresh && (
              <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                Live
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="space-y-3 px-4 sm:px-0">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-[#2a2a2a] min-w-[300px] sm:min-w-0"
                    >
                      <div className={`p-2 rounded-full flex-shrink-0 ${getActivityBgColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.action}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No recent activity</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AirdropDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
    </div>
  )
}
