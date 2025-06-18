"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MousePointer, DollarSign, Users } from "lucide-react"

export function AffiliateDashboard() {
  const [stats, setStats] = useState({
    totalClicks: 0,
    platformStats: {} as Record<string, number>,
    recentClicks: [] as any[],
  })

  useEffect(() => {
    // Load affiliate stats
    import("@/lib/affiliate-tracker").then(({ getAffiliateStats }) => {
      setStats(getAffiliateStats())
    })
  }, [])

  const estimatedRevenue = stats.totalClicks * 25 // $25 average per click

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Clicks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <MousePointer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClicks}</div>
          <p className="text-xs text-muted-foreground">Affiliate link clicks</p>
        </CardContent>
      </Card>

      {/* Estimated Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Est. Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${estimatedRevenue}</div>
          <p className="text-xs text-muted-foreground">Potential earnings</p>
        </CardContent>
      </Card>

      {/* Top Platform */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Platform</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Object.keys(stats.platformStats).length > 0
              ? Object.entries(stats.platformStats).sort(([, a], [, b]) => b - a)[0][0]
              : "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">Most clicked platform</p>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalClicks > 0 ? "2.5%" : "0%"}</div>
          <p className="text-xs text-muted-foreground">Visitor to click ratio</p>
        </CardContent>
      </Card>
    </div>
  )
}
