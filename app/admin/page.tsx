"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Download, TrendingUp, Settings, Zap, Users, Eye, DollarSign, RefreshCw, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AirdropDialog } from "@/components/airdrop-dialog"

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalAirdrops: 0,
    activeUsers: 0,
    pageViews: 0,
  })
  const [recentActivity, setRecentActivity] = useState([
    {
      type: "airdrop",
      action: "New Airdrop Created",
      description: "Airdrop for early adopters",
      time: "5 minutes ago",
    },
    { type: "user", action: "New User Sign-Up", description: "A new user joined the platform", time: "12 minutes ago" },
    {
      type: "alert",
      action: "High Traffic Alert",
      description: "Experiencing unusually high traffic",
      time: "30 minutes ago",
    },
  ])
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching initial stats
    const fetchInitialStats = async () => {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setStats({
        totalAirdrops: 15,
        activeUsers: 2345,
        pageViews: 123456,
      })
    }

    fetchInitialStats()

    // Simulate auto-refreshing stats
    let intervalId: NodeJS.Timeout
    if (autoRefresh) {
      intervalId = setInterval(async () => {
        // Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        setStats((prevStats) => ({
          totalAirdrops: prevStats.totalAirdrops + 1,
          activeUsers: prevStats.activeUsers + 10,
          pageViews: prevStats.pageViews + 100,
        }))
      }, 5000)
    }

    return () => clearInterval(intervalId)
  }, [autoRefresh])

  const handleExportData = () => {
    // Simulate exporting data
    toast({
      title: "Data Exported!",
      description: "Your data has been successfully exported.",
    })
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
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className="w-full sm:w-auto"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto Refresh
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

      {/* Stats Cards - Mobile Optimized */}
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
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last month
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
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Active Users</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +8.2% from last month
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
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Page Views</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.pageViews}</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +15.3% from last month
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
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">$24,500</p>
                <p className="text-xs text-green-600 mt-1">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +22.1% from last month
                </p>
              </div>
              <div className="p-2 sm:p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex-shrink-0">
                <DollarSign className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Mobile Optimized with Horizontal Scroll */}
      <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a] mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <div className="space-y-3 px-4 sm:px-0">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-[#2a2a2a] min-w-[300px] sm:min-w-0"
                  >
                    <div
                      className={`p-2 rounded-full flex-shrink-0 ${
                        activity.type === "airdrop"
                          ? "bg-green-100 dark:bg-green-900/20"
                          : activity.type === "user"
                            ? "bg-blue-100 dark:bg-blue-900/20"
                            : "bg-orange-100 dark:bg-orange-900/20"
                      }`}
                    >
                      {activity.type === "airdrop" ? (
                        <Plus className="h-4 w-4 text-green-600" />
                      ) : activity.type === "user" ? (
                        <Users className="h-4 w-4 text-blue-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.action}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AirdropDialog open={isAddDialogOpen} setOpen={setIsAddDialogOpen} />
    </div>
  )
}
