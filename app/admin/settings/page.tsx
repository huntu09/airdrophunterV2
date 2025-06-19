"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Globe,
  Bell,
  Shield,
  Database,
  Mail,
  Palette,
  Save,
  RefreshCw,
  CheckCircle,
  UploadIcon,
  Upload,
  Download,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
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

  const [envVars, setEnvVars] = useState<Record<string, any>>({})
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({})
  const [backupLoading, setBackupLoading] = useState(false)
  const [restoreLoading, setRestoreLoading] = useState(false)
  const [envLoading, setEnvLoading] = useState(false)

  // Load settings from API
  const loadSettings = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/settings")
      const result = await response.json()
      if (result.success) {
        setSettings(result.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      })
    }
  }, [])

  // Load environment variables
  const loadEnvVars = useCallback(async () => {
    try {
      setEnvLoading(true)
      const response = await fetch("/api/admin/env")
      const result = await response.json()
      if (result.success) {
        setEnvVars(result.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load environment variables",
        variant: "destructive",
      })
    } finally {
      setEnvLoading(false)
    }
  }, [])

  // Create backup
  const createBackup = async () => {
    try {
      setBackupLoading(true)
      const response = await fetch("/api/admin/backup")
      const result = await response.json()

      if (result.success) {
        // Download backup file
        const dataStr = JSON.stringify(result.data, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `airdrophunter-backup-${new Date().toISOString().split("T")[0]}.json`
        link.click()
        URL.revokeObjectURL(url)

        toast({
          title: "Backup created!",
          description: "Backup file has been downloaded",
        })
      }
    } catch (error) {
      toast({
        title: "Backup failed",
        description: "Failed to create backup",
        variant: "destructive",
      })
    } finally {
      setBackupLoading(false)
    }
  }

  // Restore backup
  const restoreBackup = async (file: File) => {
    try {
      setRestoreLoading(true)
      const fileContent = await file.text()
      const backupData = JSON.parse(fileContent)

      const response = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backupData }),
      })

      const result = await response.json()
      if (result.success) {
        toast({
          title: "Backup restored!",
          description: "Data has been restored successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Restore failed",
        description: "Failed to restore backup",
        variant: "destructive",
      })
    } finally {
      setRestoreLoading(false)
    }
  }

  // Update environment variable
  const updateEnvVar = async (key: string, value: string) => {
    try {
      const response = await fetch("/api/admin/env", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value, action: "update" }),
      })

      const result = await response.json()
      if (result.success) {
        toast({
          title: "Environment variable updated!",
          description: result.message,
        })
        loadEnvVars()
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update environment variable",
        variant: "destructive",
      })
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      const result = await response.json()
      if (result.success) {
        setSaved(true)
        toast({
          title: "Settings saved!",
          description: "Your settings have been updated successfully.",
        })
        setTimeout(() => setSaved(false), 3000)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleFileUpload = async (file: File, type: string) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "File uploaded!",
        description: `${type} has been uploaded successfully.`,
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadSettings()
    loadEnvVars()
  }, [loadSettings, loadEnvVars])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your application settings and preferences</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#7cb342] hover:bg-[#689f38] text-white w-full sm:w-auto"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : saved ? (
            <CheckCircle className="h-4 w-4 mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
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
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 bg-gray-100 dark:bg-[#2a2a2a]">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white"
          >
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Database className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Database</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Palette className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="environment" className="data-[state=active]:bg-[#7cb342] data-[state=active]:text-white">
            <Key className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Environment</span>
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

              {/* File Upload Section */}
              <div className="space-y-4">
                <Label>Site Assets</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Site Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("logo-upload")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, "logo")
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById("favicon-upload")?.click()}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Favicon
                      </Button>
                      <input
                        id="favicon-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, "favicon")
                        }}
                      />
                    </div>
                  </div>
                </div>
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
                <Button variant="outline" className="w-full" onClick={createBackup} disabled={backupLoading}>
                  {backupLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  {backupLoading ? "Creating Backup..." : "Create & Download Backup"}
                </Button>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById("restore-upload")?.click()}
                    disabled={restoreLoading}
                  >
                    {restoreLoading ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <UploadIcon className="h-4 w-4 mr-2" />
                    )}
                    {restoreLoading ? "Restoring..." : "Restore from Backup"}
                  </Button>
                  <input
                    id="restore-upload"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        if (
                          confirm("Are you sure you want to restore from backup? This will overwrite existing data.")
                        ) {
                          restoreBackup(file)
                        }
                      }
                    }}
                  />
                </div>

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
                  {/* Live Preview */}
                  <div className="mt-4 p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                    <Button style={{ backgroundColor: settings.themeColor }} className="text-white">
                      Sample Button
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Color Presets</Label>
                  <div className="flex gap-2">
                    {["#7cb342", "#3b82f6", "#ef4444", "#8b5cf6", "#f59e0b"].map((color) => (
                      <button
                        key={color}
                        onClick={() => handleSettingChange("themeColor", color)}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Environment Variables Settings */}
        <TabsContent value="environment">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-[#7cb342]" />
                Environment Variables
              </CardTitle>
              <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 dark:text-yellow-400">
                  Changes to environment variables require application restart to take effect.
                </AlertDescription>
              </Alert>
            </CardHeader>
            <CardContent className="space-y-4">
              {envLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                Object.entries(envVars).map(([key, config]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={key} className="flex items-center gap-2">
                        {key}
                        {config.isSensitive && (
                          <Badge variant="secondary" className="text-xs">
                            Sensitive
                          </Badge>
                        )}
                        {!config.isSet && (
                          <Badge variant="destructive" className="text-xs">
                            Not Set
                          </Badge>
                        )}
                      </Label>
                      {config.isSensitive && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setShowSensitive((prev) => ({
                              ...prev,
                              [key]: !prev[key],
                            }))
                          }
                        >
                          {showSensitive[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      )}
                    </div>
                    <Input
                      id={key}
                      type={config.isSensitive && !showSensitive[key] ? "password" : "text"}
                      value={config.value || ""}
                      onChange={(e) => {
                        const newValue = e.target.value
                        setEnvVars((prev) => ({
                          ...prev,
                          [key]: { ...prev[key], value: newValue },
                        }))
                      }}
                      onBlur={(e) => {
                        if (e.target.value !== config.value) {
                          updateEnvVar(key, e.target.value)
                        }
                      }}
                      className="bg-gray-50 dark:bg-[#2a2a2a]"
                      placeholder={config.description}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">{config.description}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
