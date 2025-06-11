"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Airdrop } from "@/lib/api"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Search,
  LayoutDashboard,
  ListPlus,
  Settings,
  ChevronDown,
  Calendar,
  Users,
  Award,
  Flame,
  AlertCircle,
  CheckCircle2,
  Clock,
  ImageIcon,
  Move,
  BarChart3,
  Bot,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import TelegramSettings from "@/components/telegram-settings"
import type { TelegramSettings as TelegramSettingsType } from "@/lib/telegram-bot"

interface StepFormData {
  id?: string
  step_number: number
  title: string
  description: string
  is_required: boolean
}

export default function AdminPanel() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [steps, setSteps] = useState<StepFormData[]>([])
  const [formData, setFormData] = useState<Partial<Airdrop>>({
    name: "",
    slug: "",
    description: "",
    about: "",
    status: "UPCOMING",
    website_url: "",
    telegram_url: "",
    twitter_url: "",
    total_reward: "",
    participants_count: 0,
    is_hot: false,
    category: "DeFi",
    blockchain: "Ethereum",
  })
  const [telegramSettings, setTelegramSettings] = useState<TelegramSettingsType | null>(null)

  useEffect(() => {
    fetchAirdrops()
  }, [])

  const fetchAirdrops = async () => {
    try {
      setLoading(true)

      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn("Supabase not configured, using empty data")
        setAirdrops([])
        return
      }

      // Dynamic import to prevent build-time execution
      const { AirdropAPI } = await import("@/lib/api")
      const data = await AirdropAPI.getAirdrops()
      setAirdrops(data)
    } catch (error) {
      console.error("Error fetching airdrops:", error)
      setAirdrops([])
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addStep = () => {
    const newStep: StepFormData = {
      step_number: steps.length + 1,
      title: "",
      description: "",
      is_required: true,
    }
    setSteps([...steps, newStep])
  }

  const updateStep = (index: number, field: keyof StepFormData, value: any) => {
    const updatedSteps = [...steps]
    updatedSteps[index] = { ...updatedSteps[index], [field]: value }
    setSteps(updatedSteps)
  }

  const removeStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index)
    // Reorder step numbers
    const reorderedSteps = updatedSteps.map((step, i) => ({
      ...step,
      step_number: i + 1,
    }))
    setSteps(reorderedSteps)
  }

  const moveStep = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === steps.length - 1)) {
      return
    }

    const newSteps = [...steps]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap steps
    ;[newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]]

    // Update step numbers
    newSteps[index].step_number = index + 1
    newSteps[targetIndex].step_number = targetIndex + 1

    setSteps(newSteps)
  }

  const autoPostToTelegram = async (airdrop: Airdrop) => {
    if (!telegramSettings || !telegramSettings.autoPost) return

    // Check if should post based on settings
    if (telegramSettings.postOnlyConfirmed && airdrop.status !== "CONFIRMED") {
      console.log("Skipping Telegram post - not confirmed status")
      return
    }

    try {
      console.log("🚀 Auto-posting to Telegram...", airdrop.name)

      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "post_airdrop",
          botToken: telegramSettings.botToken,
          channelId: telegramSettings.channelId,
          airdrop: airdrop,
          websiteUrl: window.location.origin,
        }),
      })

      const result = await response.json()
      if (result.success) {
        console.log("✅ Successfully posted to Telegram!")
      } else {
        console.error("❌ Failed to post to Telegram:", result.error)
      }
    } catch (error) {
      console.error("❌ Telegram auto-post error:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let logoUrl = formData.logo_url

      // Handle logo upload (in real app, upload to Supabase Storage)
      if (logoFile) {
        // For demo, we'll use the preview URL
        logoUrl = logoPreview
      }

      const airdropData = {
        ...formData,
        logo_url: logoUrl,
      }

      let airdropId: string

      const { AirdropAPI } = await import("@/lib/api")

      if (editingId) {
        const updatedAirdrop = await AirdropAPI.updateAirdrop(editingId, airdropData)
        airdropId = updatedAirdrop.id
        // Auto-post to Telegram for updates only if it's a status change to CONFIRMED
        if (formData.status === "CONFIRMED") {
          await autoPostToTelegram(updatedAirdrop)
        }
        await AirdropAPI.deleteStepsForAirdrop(airdropId)
      } else {
        const newAirdrop = await AirdropAPI.createAirdrop(airdropData)
        airdropId = newAirdrop.id
        // Auto-post to Telegram for new airdrops
        await autoPostToTelegram(newAirdrop)
      }

      // Save steps (only non-empty ones)
      const validSteps = steps.filter((step) => step.title.trim() !== "")

      for (let i = 0; i < validSteps.length; i++) {
        const step = validSteps[i]
        await AirdropAPI.addStep({
          airdrop_id: airdropId,
          step_number: i + 1, // Ensure sequential numbering
          title: step.title,
          description: step.description,
          is_required: step.is_required,
        })
      }

      await fetchAirdrops()
      resetForm()
    } catch (error) {
      console.error("Error saving airdrop:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this airdrop?")) {
      try {
        const { AirdropAPI } = await import("@/lib/api")
        await AirdropAPI.deleteAirdrop(id)
        await fetchAirdrops()
      } catch (error) {
        console.error("Error deleting airdrop:", error)
      }
    }
  }

  const handleEdit = async (airdrop: Airdrop) => {
    setFormData(airdrop)
    setEditingId(airdrop.id)
    setLogoPreview(airdrop.logo_url)

    // Load existing steps
    try {
      const { AirdropAPI } = await import("@/lib/api")
      const airdropWithSteps = await AirdropAPI.getAirdropBySlug(airdrop.slug)
      if (airdropWithSteps.steps && airdropWithSteps.steps.length > 0) {
        const formattedSteps: StepFormData[] = airdropWithSteps.steps.map((step, index) => ({
          id: step.id,
          step_number: index + 1, // Ensure sequential numbering
          title: step.title,
          description: step.description,
          is_required: step.is_required,
        }))
        setSteps(formattedSteps)
      } else {
        setSteps([])
      }
    } catch (error) {
      console.error("Error loading steps:", error)
      setSteps([])
    }

    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      about: "",
      status: "UPCOMING",
      website_url: "",
      telegram_url: "",
      twitter_url: "",
      total_reward: "",
      participants_count: 0,
      is_hot: false,
      category: "DeFi",
      blockchain: "Ethereum",
    })
    setEditingId(null)
    setShowAddForm(false)
    setLogoFile(null)
    setLogoPreview(null)
    setSteps([])
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const filteredAirdrops = airdrops
    .filter((airdrop) => {
      if (searchTerm) {
        return (
          airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airdrop.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airdrop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          airdrop.blockchain.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
      return true
    })
    .filter((airdrop) => {
      if (activeTab === "all") return true
      if (activeTab === "confirmed") return airdrop.status === "CONFIRMED"
      if (activeTab === "upcoming") return airdrop.status === "UPCOMING"
      if (activeTab === "ended") return airdrop.status === "ENDED"
      if (activeTab === "hot") return airdrop.is_hot
      return true
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "UPCOMING":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "ENDED":
        return <AlertCircle className="w-4 h-4 text-gray-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">AirdropHunter</h1>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Link href="/admin-secret-panel-xyz/analytics">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <div className="relative">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">A</span>
                  </div>
                  <span className="hidden md:inline text-sm text-gray-300">Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Admin Navigation */}
        <div className="mb-8">
          <Tabs defaultValue="airdrops" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-gray-700">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="airdrops" className="data-[state=active]:bg-gray-700">
                <ListPlus className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Airdrops</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-gray-700">
                <Award className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Categories</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-gray-700">
                <Users className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700">
                <Settings className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
              <TabsTrigger value="telegram" className="data-[state=active]:bg-gray-700">
                <Bot className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Telegram</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="airdrops" className="mt-0">
              {/* Search and Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search airdrops..."
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
                    <div className="flex gap-2 min-w-max px-1">
                      <Button
                        variant={activeTab === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("all")}
                        className={`whitespace-nowrap ${activeTab === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      >
                        All
                      </Button>
                      <Button
                        variant={activeTab === "confirmed" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("confirmed")}
                        className={`whitespace-nowrap ${activeTab === "confirmed" ? "bg-green-600 hover:bg-green-700" : ""}`}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Confirmed
                      </Button>
                      <Button
                        variant={activeTab === "upcoming" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("upcoming")}
                        className={`whitespace-nowrap ${activeTab === "upcoming" ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Upcoming
                      </Button>
                      <Button
                        variant={activeTab === "ended" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("ended")}
                        className={`whitespace-nowrap ${activeTab === "ended" ? "bg-gray-600 hover:bg-gray-700" : ""}`}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Ended
                      </Button>
                      <Button
                        variant={activeTab === "hot" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveTab("hot")}
                        className={`whitespace-nowrap ${activeTab === "hot" ? "bg-red-600 hover:bg-red-700" : ""}`}
                      >
                        <Flame className="w-4 h-4 mr-1" />
                        Hot
                      </Button>
                    </div>
                  </div>

                  {/* Scroll indicators */}
                  <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none opacity-50"></div>
                  <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none opacity-50"></div>
                </div>
              </div>

              {/* Add/Edit Form */}
              {showAddForm && (
                <Card className="bg-gray-800 border-gray-700 mb-8 shadow-lg">
                  <CardHeader className="border-b border-gray-700">
                    <CardTitle className="text-white flex items-center">
                      {editingId ? (
                        <>
                          <Edit className="w-5 h-5 mr-2 text-blue-400" />
                          Edit Airdrop: {formData.name}
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2 text-green-400" />
                          Add New Airdrop
                        </>
                      )}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {editingId
                        ? "Update the details of this airdrop"
                        : "Fill in the details to create a new airdrop listing"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Logo Upload Section */}
                      <div className="space-y-4">
                        <Label className="text-gray-300 text-lg font-semibold">Logo Upload</Label>
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <div className="flex-shrink-0">
                            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-600 bg-gray-700/50 flex items-center justify-center overflow-hidden">
                              {logoPreview ? (
                                <Image
                                  src={logoPreview || "/placeholder.svg"}
                                  alt="Logo preview"
                                  width={128}
                                  height={128}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="text-center">
                                  <ImageIcon className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                                  <p className="text-xs text-gray-500">No logo</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <div>
                              <Label htmlFor="logo" className="text-gray-300">
                                Choose Logo File
                              </Label>
                              <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="bg-gray-700 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3"
                              />
                            </div>
                            <div className="text-sm text-gray-400">
                              <p>• Recommended size: 512x512px</p>
                              <p>• Supported formats: PNG, JPG, SVG</p>
                              <p>• Maximum file size: 2MB</p>
                            </div>
                            {logoPreview && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setLogoFile(null)
                                  setLogoPreview(null)
                                }}
                              >
                                <X className="w-4 h-4 mr-2" />
                                Remove Logo
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name" className="text-gray-300">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => {
                                const name = e.target.value
                                setFormData({
                                  ...formData,
                                  name,
                                  slug: generateSlug(name),
                                })
                              }}
                              className="bg-gray-700 border-gray-600 text-white"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="slug" className="text-gray-300">
                              Slug
                            </Label>
                            <Input
                              id="slug"
                              value={formData.slug}
                              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                              className="bg-gray-700 border-gray-600 text-white"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="description" className="text-gray-300">
                              Short Description
                            </Label>
                            <Input
                              id="description"
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="bg-gray-700 border-gray-600 text-white"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="about" className="text-gray-300">
                              About
                            </Label>
                            <Textarea
                              id="about"
                              value={formData.about}
                              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                              className="bg-gray-700 border-gray-600 text-white"
                              rows={4}
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="status" className="text-gray-300">
                                Status
                              </Label>
                              <Select
                                value={formData.status}
                                onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                              >
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="UPCOMING">UPCOMING</SelectItem>
                                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                                  <SelectItem value="ENDED">ENDED</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="category" className="text-gray-300">
                                Category
                              </Label>
                              <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                              >
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="DeFi">DeFi</SelectItem>
                                  <SelectItem value="NFT">NFT</SelectItem>
                                  <SelectItem value="Gaming">Gaming</SelectItem>
                                  <SelectItem value="Layer 1">Layer 1</SelectItem>
                                  <SelectItem value="Layer 2">Layer 2</SelectItem>
                                  <SelectItem value="AI">AI</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="blockchain" className="text-gray-300">
                              Blockchain
                            </Label>
                            <Select
                              value={formData.blockchain}
                              onValueChange={(value) => setFormData({ ...formData, blockchain: value })}
                            >
                              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ethereum">Ethereum</SelectItem>
                                <SelectItem value="Solana">Solana</SelectItem>
                                <SelectItem value="Polygon">Polygon</SelectItem>
                                <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                                <SelectItem value="Optimism">Optimism</SelectItem>
                                <SelectItem value="Cosmos">Cosmos</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="total_reward" className="text-gray-300">
                                Total Reward
                              </Label>
                              <Input
                                id="total_reward"
                                value={formData.total_reward}
                                onChange={(e) => setFormData({ ...formData, total_reward: e.target.value })}
                                className="bg-gray-700 border-gray-600 text-white"
                                placeholder="e.g., $TOKEN Token"
                              />
                            </div>
                            <div>
                              <Label htmlFor="participants_count" className="text-gray-300">
                                Participants
                              </Label>
                              <Input
                                id="participants_count"
                                type="number"
                                value={formData.participants_count}
                                onChange={(e) =>
                                  setFormData({ ...formData, participants_count: Number.parseInt(e.target.value) || 0 })
                                }
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label htmlFor="website_url" className="text-gray-300">
                                Website URL
                              </Label>
                              <Input
                                id="website_url"
                                value={formData.website_url}
                                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div>
                              <Label htmlFor="telegram_url" className="text-gray-300">
                                Telegram URL
                              </Label>
                              <Input
                                id="telegram_url"
                                value={formData.telegram_url}
                                onChange={(e) => setFormData({ ...formData, telegram_url: e.target.value })}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div>
                              <Label htmlFor="twitter_url" className="text-gray-300">
                                Twitter URL
                              </Label>
                              <Input
                                id="twitter_url"
                                value={formData.twitter_url}
                                onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 pt-2">
                            <Switch
                              id="is_hot"
                              checked={formData.is_hot}
                              onCheckedChange={(checked) => setFormData({ ...formData, is_hot: checked })}
                            />
                            <Label htmlFor="is_hot" className="text-gray-300 cursor-pointer">
                              Mark as Hot/Trending
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Step-by-Step Guide Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-300 text-lg font-semibold">Step-by-Step Guide</Label>
                          <Button type="button" onClick={addStep} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Step
                          </Button>
                        </div>

                        {steps.length === 0 ? (
                          <div className="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                            <ListPlus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <p className="text-gray-400 mb-4">No steps added yet</p>
                            <Button type="button" onClick={addStep} variant="outline">
                              <Plus className="w-4 h-4 mr-2" />
                              Add First Step
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {steps.map((step, index) => (
                              <Card key={`step-${index}`} className="bg-gray-700 border-gray-600">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-center gap-2 pt-2">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                      </div>
                                      <div className="flex flex-col gap-1">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => moveStep(index, "up")}
                                          disabled={index === 0}
                                          className="h-6 w-6 p-0"
                                        >
                                          <Move className="w-3 h-3 rotate-180" />
                                        </Button>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => moveStep(index, "down")}
                                          disabled={index === steps.length - 1}
                                          className="h-6 w-6 p-0"
                                        >
                                          <Move className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                      <div>
                                        <Label className="text-gray-300 text-sm">Step Title</Label>
                                        <Input
                                          value={step.title}
                                          onChange={(e) => updateStep(index, "title", e.target.value)}
                                          className="bg-gray-600 border-gray-500 text-white"
                                          placeholder="e.g., Connect Your Wallet"
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-gray-300 text-sm">Step Description</Label>
                                        <Textarea
                                          value={step.description}
                                          onChange={(e) => updateStep(index, "description", e.target.value)}
                                          className="bg-gray-600 border-gray-500 text-white"
                                          rows={2}
                                          placeholder="Detailed instructions for this step..."
                                        />
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          <Switch
                                            checked={step.is_required}
                                            onCheckedChange={(checked) => updateStep(index, "is_required", checked)}
                                          />
                                          <Label className="text-gray-300 text-sm cursor-pointer">Required Step</Label>
                                        </div>
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="sm"
                                          onClick={() => removeStep(index)}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 pt-2 border-t border-gray-700">
                        <Button type="submit" className="bg-green-600 hover:bg-green-700">
                          <Save className="w-4 h-4 mr-2" />
                          {editingId ? "Update Airdrop" : "Create Airdrop"}
                        </Button>
                        <Button type="button" onClick={resetForm} variant="outline">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Action Button */}
              {!showAddForm && (
                <div className="mb-6">
                  <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Airdrop
                  </Button>
                </div>
              )}

              {/* Airdrops List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-full flex justify-center py-12">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-gray-700 animate-spin"></div>
                      <p className="mt-4 text-gray-400">Loading airdrops...</p>
                    </div>
                  </div>
                ) : filteredAirdrops.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <AlertCircle className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-300">No airdrops found</h3>
                    <p className="text-gray-500 mt-2">
                      {searchTerm ? "Try a different search term" : "Add your first airdrop to get started"}
                    </p>
                  </div>
                ) : (
                  filteredAirdrops.map((airdrop) => (
                    <Card
                      key={airdrop.id}
                      className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg overflow-hidden"
                    >
                      <div className="relative">
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <Badge
                            className={`${
                              airdrop.status === "CONFIRMED"
                                ? "bg-green-600"
                                : airdrop.status === "UPCOMING"
                                  ? "bg-blue-600"
                                  : "bg-gray-600"
                            } text-white font-medium px-2 py-1`}
                          >
                            <div className="flex items-center gap-1">
                              {getStatusIcon(airdrop.status)}
                              {airdrop.status}
                            </div>
                          </Badge>
                        </div>

                        {/* Hot Badge */}
                        {airdrop.is_hot && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-red-600 text-white font-medium px-2 py-1">
                              <div className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                HOT
                              </div>
                            </Badge>
                          </div>
                        )}

                        {/* Banner Image */}
                        <div className="h-32 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gray-700 border-4 border-gray-800 flex items-center justify-center overflow-hidden">
                            <Image
                              src={airdrop.logo_url || "/placeholder.svg"}
                              alt={airdrop.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      <CardContent className="pt-4">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white mb-1">{airdrop.name}</h3>
                          <p className="text-sm text-gray-400 line-clamp-2">{airdrop.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Award className="w-3 h-3 text-yellow-500" />
                            <span>{airdrop.category}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Users className="w-3 h-3 text-blue-500" />
                            <span>{airdrop.participants_count.toLocaleString()} users</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3 h-3 text-green-500" />
                            <span>{new Date(airdrop.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span>{airdrop.blockchain}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 border-gray-600 hover:bg-gray-700"
                              onClick={() => window.open(`/airdrop/${airdrop.slug}`, "_blank")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2 border-gray-600 hover:bg-gray-700"
                              onClick={() => handleEdit(airdrop)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 px-2"
                            onClick={() => handleDelete(airdrop.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Other tabs remain the same */}
            <TabsContent value="dashboard" className="mt-0">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Dashboard</CardTitle>
                  <CardDescription className="text-gray-400">
                    Overview of your airdrops and platform statistics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Dashboard content will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="mt-0">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Categories</CardTitle>
                  <CardDescription className="text-gray-400">Manage your airdrop categories.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Categories management will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Users</CardTitle>
                  <CardDescription className="text-gray-400">Manage your users and permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">User management will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Settings</CardTitle>
                  <CardDescription className="text-gray-400">Manage your application settings.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Settings will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="telegram" className="mt-0">
              <TelegramSettings onSettingsChange={setTelegramSettings} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© 2025 AirdropHunter Admin Panel. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Help
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Privacy
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Terms
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
