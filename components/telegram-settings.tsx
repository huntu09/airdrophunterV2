"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Bot, MessageCircle, TestTube, CheckCircle2, AlertCircle, Loader2, Save, Trash2, Send } from "lucide-react"
import { TelegramSettingsManager, type TelegramSettings as TelegramSettingsType } from "@/lib/telegram-bot"

interface TelegramSettingsProps {
  onSettingsChange?: (settings: TelegramSettingsType | null) => void
}

export default function TelegramSettings({ onSettingsChange }: TelegramSettingsProps) {
  const [settings, setSettings] = useState<TelegramSettingsType>({
    botToken: "",
    channelId: "",
    autoPost: false,
    postOnlyConfirmed: true,
    includeImage: true,
    customTemplate: "",
  })

  const [testing, setTesting] = useState(false)
  const [testResults, setTestResults] = useState<{
    botTest?: { success: boolean; error?: string; botInfo?: any }
    channelTest?: { success: boolean; error?: string; channelInfo?: any }
  }>({})

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load settings on mount
  useEffect(() => {
    const savedSettings = TelegramSettingsManager.getSettings()
    if (savedSettings) {
      setSettings(savedSettings)
      onSettingsChange?.(savedSettings)
    }
  }, [onSettingsChange])

  const handleInputChange = (field: keyof TelegramSettingsType, value: any) => {
    const newSettings = { ...settings, [field]: value }
    setSettings(newSettings)
    setTestResults({}) // Clear test results when settings change
  }

  const testBotConnection = async () => {
    if (!settings.botToken) {
      setTestResults({ botTest: { success: false, error: "Bot token is required" } })
      return
    }

    setTesting(true)
    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_connection",
          botToken: settings.botToken,
        }),
      })

      const result = await response.json()
      setTestResults((prev) => ({ ...prev, botTest: result }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        botTest: { success: false, error: "Network error" },
      }))
    } finally {
      setTesting(false)
    }
  }

  const testChannelAccess = async () => {
    if (!settings.botToken || !settings.channelId) {
      setTestResults((prev) => ({
        ...prev,
        channelTest: { success: false, error: "Bot token and channel ID are required" },
      }))
      return
    }

    setTesting(true)
    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test_channel",
          botToken: settings.botToken,
          channelId: settings.channelId,
        }),
      })

      const result = await response.json()
      setTestResults((prev) => ({ ...prev, channelTest: result }))
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        channelTest: { success: false, error: "Network error" },
      }))
    } finally {
      setTesting(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      // Save to localStorage
      TelegramSettingsManager.saveSettings(settings)
      onSettingsChange?.(settings)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  const clearSettings = () => {
    const defaultSettings = {
      botToken: "",
      channelId: "",
      autoPost: false,
      postOnlyConfirmed: true,
      includeImage: true,
      customTemplate: "",
    }
    setSettings(defaultSettings)
    setTestResults({})
    TelegramSettingsManager.clearSettings()
    onSettingsChange?.(null)
  }

  const sendTestMessage = async () => {
    if (!settings.botToken || !settings.channelId) return

    setTesting(true)
    try {
      const testAirdrop = {
        name: "Test Airdrop",
        slug: "test-airdrop",
        description: "This is a test message from AirdropHunter admin panel",
        category: "DeFi",
        blockchain: "Ethereum",
        status: "CONFIRMED",
        total_reward: "$10,000 TEST",
        participants_count: 1000,
        is_hot: true,
        website_url: "https://example.com",
        twitter_url: "https://twitter.com/example",
        telegram_url: "https://t.me/example",
        logo_url: "/placeholder.svg?height=200&width=200",
      }

      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "post_airdrop",
          botToken: settings.botToken,
          channelId: settings.channelId,
          airdrop: testAirdrop,
          websiteUrl: window.location.origin,
        }),
      })

      const result = await response.json()
      if (result.success) {
        alert("✅ Test message sent successfully!")
      } else {
        alert(`❌ Failed to send test message: ${result.error}`)
      }
    } catch (error) {
      alert("❌ Network error occurred")
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-white flex items-center">
          <Bot className="w-5 h-5 mr-2 text-blue-400" />
          Telegram Auto-Post Settings
        </CardTitle>
        <CardDescription className="text-gray-400">
          Configure automatic posting to your Telegram channel when new airdrops are created
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Bot Configuration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-gray-300 text-lg font-semibold">Bot Configuration</Label>
            <Badge variant={testResults.botTest?.success ? "default" : "secondary"} className="bg-blue-600">
              <Bot className="w-3 h-3 mr-1" />
              {testResults.botTest?.success ? "Connected" : "Not Connected"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="botToken" className="text-gray-300">
                Bot Token
              </Label>
              <Input
                id="botToken"
                type="password"
                value={settings.botToken}
                onChange={(e) => handleInputChange("botToken", e.target.value)}
                placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-400">Get from @BotFather on Telegram</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="channelId" className="text-gray-300">
                Channel ID
              </Label>
              <Input
                id="channelId"
                value={settings.channelId}
                onChange={(e) => handleInputChange("channelId", e.target.value)}
                placeholder="@yourchannel or -1001234567890"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-400">Channel username (@channel) or ID (-100...)</p>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={testBotConnection} disabled={testing || !settings.botToken} variant="outline" size="sm">
              {testing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <TestTube className="w-4 h-4 mr-2" />}
              Test Bot
            </Button>
            <Button
              onClick={testChannelAccess}
              disabled={testing || !settings.botToken || !settings.channelId}
              variant="outline"
              size="sm"
            >
              {testing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <MessageCircle className="w-4 h-4 mr-2" />}
              Test Channel
            </Button>
            <Button
              onClick={sendTestMessage}
              disabled={testing || !settings.botToken || !settings.channelId}
              variant="outline"
              size="sm"
            >
              {testing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              Send Test Message
            </Button>
          </div>

          {/* Test Results */}
          {testResults.botTest && (
            <Alert
              className={
                testResults.botTest.success ? "border-green-600 bg-green-900/20" : "border-red-600 bg-red-900/20"
              }
            >
              {testResults.botTest.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <AlertDescription className="text-gray-300">
                {testResults.botTest.success ? (
                  <>
                    <strong>Bot Connected!</strong>
                    {testResults.botTest.botInfo && <span> - @{testResults.botTest.botInfo.username}</span>}
                  </>
                ) : (
                  <>
                    <strong>Bot Error:</strong> {testResults.botTest.error}
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}

          {testResults.channelTest && (
            <Alert
              className={
                testResults.channelTest.success ? "border-green-600 bg-green-900/20" : "border-red-600 bg-red-900/20"
              }
            >
              {testResults.channelTest.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <AlertDescription className="text-gray-300">
                {testResults.channelTest.success ? (
                  <>
                    <strong>Channel Access OK!</strong>
                    {testResults.channelTest.channelInfo && <span> - {testResults.channelTest.channelInfo.title}</span>}
                  </>
                ) : (
                  <>
                    <strong>Channel Error:</strong> {testResults.channelTest.error}
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Auto-Post Settings */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <Label className="text-gray-300 text-lg font-semibold">Auto-Post Settings</Label>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Enable Auto-Post</Label>
                <p className="text-sm text-gray-400">Automatically post new airdrops to Telegram</p>
              </div>
              <Switch
                checked={settings.autoPost}
                onCheckedChange={(checked) => handleInputChange("autoPost", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Post Only Confirmed</Label>
                <p className="text-sm text-gray-400">Only post airdrops with "CONFIRMED" status</p>
              </div>
              <Switch
                checked={settings.postOnlyConfirmed}
                onCheckedChange={(checked) => handleInputChange("postOnlyConfirmed", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-gray-300">Include Images</Label>
                <p className="text-sm text-gray-400">Send airdrop logo as photo with caption</p>
              </div>
              <Switch
                checked={settings.includeImage}
                onCheckedChange={(checked) => handleInputChange("includeImage", checked)}
              />
            </div>
          </div>
        </div>

        {/* Custom Template */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <Label className="text-gray-300 text-lg font-semibold">Custom Message Template (Optional)</Label>
          <Textarea
            value={settings.customTemplate}
            onChange={(e) => handleInputChange("customTemplate", e.target.value)}
            placeholder="Leave empty to use default template..."
            className="bg-gray-700 border-gray-600 text-white"
            rows={4}
          />
          <p className="text-xs text-gray-400">
            Available variables: {"{name}"}, {"{description}"}, {"{category}"}, {"{blockchain}"}, {"{reward}"},{" "}
            {"{status}"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-700">
          <Button onClick={clearSettings} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Settings
          </Button>

          <div className="flex gap-2">
            <Button onClick={saveSettings} disabled={saving} className="bg-green-600 hover:bg-green-700">
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : saved ? (
                <CheckCircle2 className="w-4 h-4 mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saved ? "Saved!" : "Save Settings"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
