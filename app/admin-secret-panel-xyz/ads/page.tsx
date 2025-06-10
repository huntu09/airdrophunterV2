"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Eye, MousePointer, TrendingUp, Settings, Plus, Edit, Trash2, BarChart3 } from "lucide-react"

interface AdSlot {
  id: string
  name: string
  slot_id: string
  position: string
  size: string
  is_active: boolean
  impressions: number
  clicks: number
  ctr: number
  revenue: number
}

export default function AdsManagement() {
  const [adSlots, setAdSlots] = useState<AdSlot[]>([
    {
      id: "1",
      name: "Header Leaderboard",
      slot_id: "1234567890",
      position: "header",
      size: "leaderboard",
      is_active: true,
      impressions: 15420,
      clicks: 234,
      ctr: 1.52,
      revenue: 45.67,
    },
    {
      id: "2",
      name: "Content Rectangle",
      slot_id: "0987654321",
      position: "content",
      size: "rectangle",
      is_active: true,
      impressions: 8930,
      clicks: 156,
      ctr: 1.75,
      revenue: 28.34,
    },
    {
      id: "3",
      name: "Sidebar Banner",
      slot_id: "1122334455",
      position: "sidebar",
      size: "banner",
      is_active: false,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      revenue: 0,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSlot, setEditingSlot] = useState<AdSlot | null>(null)

  const totalRevenue = adSlots.reduce((sum, slot) => sum + slot.revenue, 0)
  const totalImpressions = adSlots.reduce((sum, slot) => sum + slot.impressions, 0)
  const totalClicks = adSlots.reduce((sum, slot) => sum + slot.clicks, 0)
  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AdSense Management</h1>
          <p className="text-gray-400">Monitor and manage your Google AdSense integration</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-500">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Impressions</p>
                  <p className="text-2xl font-bold text-blue-500">{totalImpressions.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Clicks</p>
                  <p className="text-2xl font-bold text-purple-500">{totalClicks.toLocaleString()}</p>
                </div>
                <MousePointer className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average CTR</p>
                  <p className="text-2xl font-bold text-orange-500">{averageCTR.toFixed(2)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="slots" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="slots">Ad Slots</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="slots">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Ad Slots Management</CardTitle>
                  <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Ad Slot
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adSlots.map((slot) => (
                    <Card key={slot.id} className="bg-gray-700 border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-white">{slot.name}</h3>
                              <Badge className={slot.is_active ? "bg-green-600" : "bg-gray-600"}>
                                {slot.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Slot ID</p>
                                <p className="text-white font-mono">{slot.slot_id}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Position</p>
                                <p className="text-white capitalize">{slot.position}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Impressions</p>
                                <p className="text-white">{slot.impressions.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">CTR</p>
                                <p className="text-white">{slot.ctr.toFixed(2)}%</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Revenue</p>
                                <p className="text-green-500 font-semibold">${slot.revenue.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setEditingSlot(slot)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-500">Detailed analytics will be available once AdSense is fully integrated</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  AdSense Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="publisher-id" className="text-gray-300">
                    Publisher ID
                  </Label>
                  <Input
                    id="publisher-id"
                    value={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || "ca-pub-0000000000000000"}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="ca-pub-xxxxxxxxxxxxxxxx"
                  />
                  <p className="text-sm text-gray-400 mt-1">Your Google AdSense Publisher ID</p>
                </div>

                <div>
                  <Label className="text-gray-300">Auto Ads</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">Enable Auto Ads</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Let Google automatically place ads on your site</p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
