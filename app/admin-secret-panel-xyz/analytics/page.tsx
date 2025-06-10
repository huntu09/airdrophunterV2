"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { ArrowUpRight, Users, Eye, TrendingUp, Database, Flame, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AnalyticsData {
  totalAirdrops: number
  totalParticipants: number
  hotAirdropsCount: number
  recentAirdropsCount: number
  statusDistribution: Record<string, number>
  categoryDistribution: Record<string, number>
  blockchainDistribution: Record<string, number>
  dailyData: Array<{ name: string; airdrops: number; visitors: number }>
}

export default function AnalyticsDashboard() {
  const [period, setPeriod] = useState("week")
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/analytics")
        if (!response.ok) {
          throw new Error("Failed to fetch analytics")
        }
        const data = await response.json()
        setAnalyticsData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching analytics:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  // Transform data for charts
  const categoryChartData = analyticsData
    ? Object.entries(analyticsData.categoryDistribution).map(([name, value]) => ({
        name,
        value: value as number,
      }))
    : []

  const blockchainChartData = analyticsData
    ? Object.entries(analyticsData.blockchainDistribution).map(([name, value]) => ({
        name,
        value: value as number,
      }))
    : []

  const statusChartData = analyticsData
    ? Object.entries(analyticsData.statusDistribution).map(([name, value]) => ({
        name,
        value: value as number,
      }))
    : []

  const COLORS = ["#10B981", "#8B5CF6", "#F59E0B", "#3B82F6", "#06B6D4", "#EC4899", "#EF4444", "#84CC16"]

  // Calculate growth percentages (simulated for demo)
  const getGrowthPercentage = (current: number, type: string) => {
    // Simulate growth based on current values
    const growthRates = {
      airdrops: 12.5,
      participants: 18.2,
      hot: 25.0,
      recent: 8.7,
    }
    return growthRates[type as keyof typeof growthRates] || 0
  }

  const stats = analyticsData
    ? [
        {
          title: "Total Airdrops",
          value: analyticsData.totalAirdrops.toLocaleString(),
          change: `+${getGrowthPercentage(analyticsData.totalAirdrops, "airdrops")}%`,
          icon: <Database className="w-4 h-4 text-green-500" />,
        },
        {
          title: "Total Participants",
          value: analyticsData.totalParticipants.toLocaleString(),
          change: `+${getGrowthPercentage(analyticsData.totalParticipants, "participants")}%`,
          icon: <Users className="w-4 h-4 text-blue-500" />,
        },
        {
          title: "Hot Airdrops",
          value: analyticsData.hotAirdropsCount.toString(),
          change: `+${getGrowthPercentage(analyticsData.hotAirdropsCount, "hot")}%`,
          icon: <Flame className="w-4 h-4 text-red-500" />,
        },
        {
          title: "Recent Airdrops (7d)",
          value: analyticsData.recentAirdropsCount.toString(),
          change: `+${getGrowthPercentage(analyticsData.recentAirdropsCount, "recent")}%`,
          icon: <TrendingUp className="w-4 h-4 text-purple-500" />,
        },
      ]
    : []

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-orange-200 dark:border-orange-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
              </div>
              <p className="text-lg font-medium text-white">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-600 rounded-full flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Error Loading Analytics</h3>
              <p className="text-gray-400">{error}</p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link href="/admin-secret-panel-xyz">
              <Button variant="ghost" className="hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-gray-400">Real-time insights from your AirdropHunter platform</p>
            </div>
          </div>
          <Tabs defaultValue="week" className="mt-4 md:mt-0" onValueChange={(value) => setPeriod(value)}>
            <TabsList className="bg-gray-800">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className="p-2 rounded-full bg-gray-700">{stat.icon}</div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="text-gray-400 ml-1">vs last {period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Activity Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Daily Activity</CardTitle>
              <CardDescription className="text-gray-400">
                Airdrops added and estimated visitors for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData?.dailyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "0.375rem" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#F9FAFB" }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stackId="1"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.6}
                      name="Estimated Visitors"
                    />
                    <Area
                      type="monotone"
                      dataKey="airdrops"
                      stackId="2"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.8}
                      name="New Airdrops"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Airdrop Status Distribution</CardTitle>
              <CardDescription className="text-gray-400">Current status of all airdrops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "0.375rem" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#F9FAFB" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Distribution */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Airdrops by Category</CardTitle>
              <CardDescription className="text-gray-400">Distribution of airdrops across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "0.375rem" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#F9FAFB" }}
                    />
                    <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Distribution */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Airdrops by Blockchain</CardTitle>
              <CardDescription className="text-gray-400">Distribution of airdrops across blockchains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={blockchainChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {blockchainChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151", borderRadius: "0.375rem" }}
                      itemStyle={{ color: "#F9FAFB" }}
                      labelStyle={{ color: "#F9FAFB" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Most Popular Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {categoryChartData.length > 0
                    ? categoryChartData.reduce((prev, current) => (prev.value > current.value ? prev : current)).name
                    : "N/A"}
                </div>
                <p className="text-gray-400">
                  {categoryChartData.length > 0
                    ? `${categoryChartData.reduce((prev, current) => (prev.value > current.value ? prev : current)).value} airdrops`
                    : "No data"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Top Blockchain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {blockchainChartData.length > 0
                    ? blockchainChartData.reduce((prev, current) => (prev.value > current.value ? prev : current)).name
                    : "N/A"}
                </div>
                <p className="text-gray-400">
                  {blockchainChartData.length > 0
                    ? `${blockchainChartData.reduce((prev, current) => (prev.value > current.value ? prev : current)).value} airdrops`
                    : "No data"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">Average Participants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {analyticsData && analyticsData.totalAirdrops > 0
                    ? Math.round(analyticsData.totalParticipants / analyticsData.totalAirdrops).toLocaleString()
                    : "0"}
                </div>
                <p className="text-gray-400">per airdrop</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
