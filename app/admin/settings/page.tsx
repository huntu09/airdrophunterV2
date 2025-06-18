"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Globe, Bell, Shield, Database, Mail, Palette, Save, RefreshCw, CheckCircle } from "lucide-react"

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    siteName: "AirdropHunter",
    siteDescription: "Your ultimate crypto co-pilot for discovering profitable airdrops",
    siteUrl: "https://airdrophunter.com",
    adminEmail: "admin@airdrophunter.com",
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    autoApproveAirdrops: false,
    maxAirdropsPerPage: 10,
    emailNotifications: true,
    smsNotifications: false,
    themeColor: "#7cb342",
  })

  const handleSave = async () => {
    // Mock save - replace with real API call
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your application settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-[#7cb342] hover:bg-[#689f38] text-white">
          {saved ? <CheckCircle className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {saved && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-400">
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100 dark:bg-[#2a2a2a]">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            Database
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Palette className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#7cb342]" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    className="bg-gray-50 dark:bg-[#2a2a2a]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.siteUrl}
                    onChange={(e) => handleSettingChange("siteUrl", e.target.value)}
                    className="bg-gray-50 dark:bg-[#2a2a2a]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  className="bg-gray-50 dark:bg-[#2a2a2a]"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleSettingChange("adminEmail", e.target.value)}
                  className="bg-gray-50 dark:bg-[#2a2a2a]"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enable to show maintenance page to visitors
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-approve Airdrops</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically approve new airdrop submissions
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoApproveAirdrops}
                    onCheckedChange={(checked) => handleSettingChange("autoApproveAirdrops", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#7cb342]" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange("smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Notifications</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Enable system-wide notifications</p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#7cb342]" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Add an extra layer of security</p>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Not Enabled
                    </Badge>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Enable 2FA
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Session Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage active sessions</p>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      1 Active Session
                    </Badge>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      View Sessions
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Reset All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Settings */}
        <TabsContent value="database">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-[#7cb342]" />
                Database Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-4 text-center">
                    <Database className="h-8 w-8 text-[#7cb342] mx-auto mb-2" />
                    <h4 className="font-medium">Database Status</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 mt-2">
                      Connected
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-4 text-center">
                    <RefreshCw className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-medium">Last Backup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">2 hours ago</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#3a3a3a]">
                  <CardContent className="p-4 text-center">
                    <Mail className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-medium">Records</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">12,543 total</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Create Backup
                </Button>
                <Button variant="outline" className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Optimize Database
                </Button>
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Clear Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#7cb342]" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="themeColor">Primary Theme Color</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="themeColor"
                      type="color"
                      value={settings.themeColor}
                      onChange={(e) => handleSettingChange("themeColor", e.target.value)}
                      className="w-20 h-10 p-1 bg-gray-50 dark:bg-[#2a2a2a]"
                    />
                    <Input
                      value={settings.themeColor}
                      onChange={(e) => handleSettingChange("themeColor", e.target.value)}
                      className="bg-gray-50 dark:bg-[#2a2a2a]"
                      placeholder="#7cb342"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color Presets</Label>
                  <div className="flex gap-2">
                    {["#7cb342", "#3b82f6", "#ef4444", "#8b5cf6", "#f59e0b"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleSettingChange("themeColor", color)}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
