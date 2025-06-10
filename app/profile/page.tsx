"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Footer } from "@/components/footer"
import {
  Settings,
  Bell,
  Shield,
  Bookmark,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Edit,
  Save,
  ArrowLeft,
  Upload,
  Trash2,
  LogOut,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProfilePage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    username: "alexj",
    email: "alex@example.com",
    bio: "Crypto enthusiast and airdrop hunter. Always looking for the next big opportunity in the blockchain space.",
    avatar: "/placeholder.svg?height=100&width=100",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j...",
    joinedDate: "January 2023",
    notificationSettings: {
      newAirdrops: true,
      statusChanges: true,
      deadlineReminders: true,
      marketingEmails: false,
    },
  })

  // Mock saved airdrops
  const [savedAirdrops, setSavedAirdrops] = useState([
    {
      id: "1",
      name: "LayerZero",
      logo: "/placeholder.svg?height=40&width=40",
      status: "CONFIRMED",
      deadline: "Dec 31, 2024",
    },
    {
      id: "2",
      name: "Blast",
      logo: "/placeholder.svg?height=40&width=40",
      status: "CONFIRMED",
      deadline: "Dec 25, 2024",
    },
    {
      id: "3",
      name: "Eigenlayer",
      logo: "/placeholder.svg?height=40&width=40",
      status: "CONFIRMED",
      deadline: "Dec 20, 2024",
    },
  ])

  // Mock activity history
  const [activityHistory, setActivityHistory] = useState([
    {
      id: "1",
      type: "completed",
      airdrop: "LayerZero",
      date: "2 days ago",
      description: "Completed all steps for LayerZero airdrop",
    },
    {
      id: "2",
      type: "saved",
      airdrop: "Blast",
      date: "1 week ago",
      description: "Saved Blast airdrop to your list",
    },
    {
      id: "3",
      type: "reminder",
      airdrop: "Eigenlayer",
      date: "2 weeks ago",
      description: "Set a reminder for Eigenlayer deadline",
    },
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In a real app, you would save the profile data to your backend here
    console.log("Saving profile:", userData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (setting: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: checked,
      },
    }))
  }

  const removeSavedAirdrop = (id: string) => {
    setSavedAirdrops((prev) => prev.filter((airdrop) => airdrop.id !== id))
  }

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-orange-200 dark:border-orange-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
          </div>
          <p className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Loading profile...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div
        className={`sticky top-0 z-40 ${theme === "dark" ? "bg-gray-800/95" : "bg-white/95"} backdrop-blur-sm border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"} transition-colors duration-200`}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className={`${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 border-4 border-green-500">
                      <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                      <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-green-600 hover:bg-green-700"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="sr-only">Upload avatar</span>
                      </Button>
                    )}
                  </div>

                  <h2 className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {userData.name}
                  </h2>
                  <p className={`text-sm mb-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    @{userData.username}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="outline" className={theme === "dark" ? "border-gray-600" : "border-gray-300"}>
                      Crypto Enthusiast
                    </Badge>
                    <Badge variant="outline" className={theme === "dark" ? "border-gray-600" : "border-gray-300"}>
                      Airdrop Hunter
                    </Badge>
                  </div>

                  <div className={`text-sm mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {userData.bio}
                  </div>

                  <div
                    className={`w-full p-3 rounded-lg mb-4 text-sm ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                  >
                    <p className={`font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Wallet Address
                    </p>
                    <p className={`truncate ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                      {userData.walletAddress}
                    </p>
                  </div>

                  <div className="w-full flex justify-between text-sm mb-6">
                    <div>
                      <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Joined</p>
                      <p className="font-medium">{userData.joinedDate}</p>
                    </div>
                    <div>
                      <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Airdrops</p>
                      <p className="font-medium">12 Completed</p>
                    </div>
                    <div>
                      <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Saved</p>
                      <p className="font-medium">{savedAirdrops.length}</p>
                    </div>
                  </div>

                  {!isEditing ? (
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2 w-full">
                      <Button
                        variant="outline"
                        className={`flex-1 ${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleSaveProfile}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    className={`w-full mt-4 ${theme === "dark" ? "hover:bg-gray-700 text-red-400" : "hover:bg-gray-100 text-red-600"}`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="saved" className="w-full">
              <TabsList className={`grid grid-cols-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
                <TabsTrigger value="saved">
                  <Bookmark className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Saved</span>
                </TabsTrigger>
                <TabsTrigger value="activity">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Activity</span>
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
              </TabsList>

              {/* Saved Airdrops Tab */}
              <TabsContent value="saved">
                <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>Saved Airdrops</CardTitle>
                    <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                      Airdrops you've saved to track later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {savedAirdrops.length === 0 ? (
                      <div className="text-center py-8">
                        <Bookmark
                          className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                        />
                        <h3 className={`text-lg font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          No saved airdrops
                        </h3>
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          You haven't saved any airdrops yet
                        </p>
                        <Button className="mt-4 bg-green-600 hover:bg-green-700">Explore Airdrops</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedAirdrops.map((airdrop) => (
                          <div
                            key={airdrop.id}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              theme === "dark"
                                ? "border-gray-700 hover:bg-gray-700/50"
                                : "border-gray-200 hover:bg-gray-50"
                            } transition-colors`}
                          >
                            <div className="flex items-center gap-4">
                              <Image
                                src={airdrop.logo || "/placeholder.svg"}
                                alt={airdrop.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                  {airdrop.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    className={
                                      airdrop.status === "CONFIRMED"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-blue-600 hover:bg-blue-700"
                                    }
                                  >
                                    {airdrop.status}
                                  </Badge>
                                  <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                    Deadline: {airdrop.deadline}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link href={`/airdrop/${airdrop.id}`}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={
                                    theme === "dark"
                                      ? "border-gray-700 hover:bg-gray-700"
                                      : "border-gray-300 hover:bg-gray-100"
                                  }
                                >
                                  View
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="ghost"
                                className={`text-red-500 ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                                onClick={() => removeSavedAirdrop(airdrop.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      Activity History
                    </CardTitle>
                    <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                      Your recent activity on AirdropHunter
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {activityHistory.map((activity) => (
                        <div key={activity.id} className="relative pl-6 pb-6 border-l border-gray-700">
                          <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center">
                            {activity.type === "completed" && (
                              <div className="bg-green-600 rounded-full p-1">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              </div>
                            )}
                            {activity.type === "saved" && (
                              <div className="bg-blue-600 rounded-full p-1">
                                <Bookmark className="w-4 h-4 text-white" />
                              </div>
                            )}
                            {activity.type === "reminder" && (
                              <div className="bg-orange-600 rounded-full p-1">
                                <Bell className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                              {activity.airdrop}
                            </h4>
                            <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                              {activity.description}
                            </p>
                            <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      Profile Settings
                    </CardTitle>
                    <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                      Manage your account settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Personal Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={userData.name}
                              onChange={handleInputChange}
                              className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="username" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                              Username
                            </Label>
                            <Input
                              id="username"
                              name="username"
                              value={userData.username}
                              onChange={handleInputChange}
                              className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio" className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={userData.bio}
                            onChange={handleInputChange}
                            className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                            disabled={!isEditing}
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="walletAddress"
                            className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                          >
                            Wallet Address
                          </Label>
                          <Input
                            id="walletAddress"
                            name="walletAddress"
                            value={userData.walletAddress}
                            onChange={handleInputChange}
                            className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Notification Settings
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="newAirdrops"
                                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                              >
                                New Airdrops
                              </Label>
                              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Get notified when new airdrops are added
                              </p>
                            </div>
                            <Switch
                              id="newAirdrops"
                              checked={userData.notificationSettings.newAirdrops}
                              onCheckedChange={(checked) => handleNotificationChange("newAirdrops", checked)}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="statusChanges"
                                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                              >
                                Status Changes
                              </Label>
                              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Get notified when an airdrop's status changes
                              </p>
                            </div>
                            <Switch
                              id="statusChanges"
                              checked={userData.notificationSettings.statusChanges}
                              onCheckedChange={(checked) => handleNotificationChange("statusChanges", checked)}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="deadlineReminders"
                                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                              >
                                Deadline Reminders
                              </Label>
                              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Get reminders before airdrop deadlines
                              </p>
                            </div>
                            <Switch
                              id="deadlineReminders"
                              checked={userData.notificationSettings.deadlineReminders}
                              onCheckedChange={(checked) => handleNotificationChange("deadlineReminders", checked)}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label
                                htmlFor="marketingEmails"
                                className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                              >
                                Marketing Emails
                              </Label>
                              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                Receive marketing and promotional emails
                              </p>
                            </div>
                            <Switch
                              id="marketingEmails"
                              checked={userData.notificationSettings.marketingEmails}
                              onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security">
                <Card className={`${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
                  <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      Security Settings
                    </CardTitle>
                    <CardDescription className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
                      Manage your account security and privacy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Change Password
                        </h3>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="currentPassword"
                              className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                            >
                              Current Password
                            </Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="newPassword"
                              className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                            >
                              New Password
                            </Label>
                            <Input
                              id="newPassword"
                              type="password"
                              className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="confirmPassword"
                              className={theme === "dark" ? "text-gray-300" : "text-gray-700"}
                            >
                              Confirm New Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              className={`${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
                              disabled={!isEditing}
                            />
                          </div>

                          <Button className="bg-green-600 hover:bg-green-700" disabled={!isEditing}>
                            Update Password
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Two-Factor Authentication
                        </h3>

                        <div
                          className={`p-4 rounded-lg border ${theme === "dark" ? "border-gray-700 bg-gray-700/30" : "border-gray-200 bg-gray-50"}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                Two-Factor Authentication (2FA)
                              </h4>
                              <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className={
                                theme === "dark"
                                  ? "border-gray-600 hover:bg-gray-700"
                                  : "border-gray-300 hover:bg-gray-100"
                              }
                              disabled={!isEditing}
                            >
                              Enable 2FA
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Connected Accounts
                        </h3>

                        <div
                          className={`p-4 rounded-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                              >
                                <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                              </div>
                              <div>
                                <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                  Twitter
                                </h4>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                  Not connected
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className={
                                theme === "dark"
                                  ? "border-gray-600 hover:bg-gray-700"
                                  : "border-gray-300 hover:bg-gray-100"
                              }
                              disabled={!isEditing}
                            >
                              Connect
                            </Button>
                          </div>
                        </div>

                        <div
                          className={`p-4 rounded-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
                              >
                                <svg
                                  className="w-5 h-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
                                    fill="#0088cc"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h4 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                  Telegram
                                </h4>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                  Not connected
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className={
                                theme === "dark"
                                  ? "border-gray-600 hover:bg-gray-700"
                                  : "border-gray-300 hover:bg-gray-100"
                              }
                              disabled={!isEditing}
                            >
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          Danger Zone
                        </h3>

                        <div
                          className={`p-4 rounded-lg border border-red-300 ${theme === "dark" ? "bg-red-900/20" : "bg-red-50"}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className={`font-medium ${theme === "dark" ? "text-red-300" : "text-red-600"}`}>
                                Delete Account
                              </h4>
                              <p className={`text-sm mt-1 ${theme === "dark" ? "text-red-200" : "text-red-500"}`}>
                                Permanently delete your account and all data
                              </p>
                            </div>
                            <Button variant="destructive" disabled={!isEditing}>
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer theme={theme} />
    </div>
  )
}
