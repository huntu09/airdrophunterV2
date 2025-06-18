"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, Eye, MousePointer, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock data
const analyticsData = {
  overview: [
    {
      title: "Total Page Views",
      value: "89,432",
      change: "+15.3%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Unique Visitors",
      value: "23,567",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Click-through Rate",
      value: "12.4%",
      change: "+2.1%",
      trend: "up",
      icon: MousePointer,
    },
    {
      title: "Revenue",
      value: "$24,567",
      change: "-2.1%",
      trend: "down",
      icon: DollarSign,
    },
  ],
  topAirdrops: [
    {
      name: "MEXC Exchange",
      views: 15432,
      clicks: 2341,
      ctr: "15.2%",
      participants: 5432,
    },
    {
      name: "LayerZero",
      views: 12876,
      clicks: 1987,
      ctr: "15.4%",
      participants: 8901,
    },
    {
      name: "Scroll Protocol",
      views: 9876,
      clicks: 1234,
      ctr: "12.5%",
      participants: 2567,
    },
    {
      name: "Lendasat",
      views: 8765,
      clicks: 987,
      ctr: "11.3%",
      participants: 1234,
    },
  ],
  trafficSources: [
    { source: "Direct", visitors: 12543, percentage: 45.2 },
    { source: "Social Media", visitors: 8976, percentage: 32.4 },
    { source: "Search Engines", visitors: 4321, percentage: 15.6 },
    { source: "Referrals", visitors: 1876, percentage: 6.8 },
  ],
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Track performance and user engagement</p>
        </div>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((stat, index) => (
          <Card key={index} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-gray-100 dark:bg-[#2a2a2a]">
                  <stat.icon className="h-6 w-6 text-[#7cb342]" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Airdrops */}
        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#7cb342]" />
              Top Performing Airdrops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Airdrop</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Participants</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.topAirdrops.map((airdrop, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{airdrop.name}</TableCell>
                      <TableCell>{airdrop.views.toLocaleString()}</TableCell>
                      <TableCell>{airdrop.clicks.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          {airdrop.ctr}
                        </Badge>
                      </TableCell>
                      <TableCell>{airdrop.participants.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#7cb342]" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trafficSources.map((source, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{source.source}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {source.visitors.toLocaleString()} visitors
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{source.percentage}%</div>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-[#7cb342] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            User Engagement Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Interactive Chart</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Real-time analytics visualization will be implemented here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7cb342] mb-2">18.7%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Users who joined airdrops after visiting</p>
              <div className="mt-4 flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">4m 32s</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average time spent on site</p>
              <div className="mt-4 flex items-center justify-center">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+12s</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">24.3%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Users who left after one page</p>
              <div className="mt-4 flex items-center justify-center">
                <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">-1.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
