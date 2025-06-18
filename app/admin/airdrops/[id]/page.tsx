"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Save,
  Trash2,
  Star,
  Users,
  Calendar,
  Globe,
  MessageCircle,
  Twitter,
  Hash,
  CheckCircle,
  AlertCircle,
  Flame,
  Edit,
} from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { validateAirdrop } from "@/lib/validation"

interface AirdropDetail {
  id: string
  name: string
  logo: string
  description: string
  action: string
  category: "latest" | "hottest" | "potential"
  rating: number
  totalRatings: number
  status: "active" | "confirmed" | "upcoming" | "ended"
  reward: string
  startDate: string
  difficulty: "Easy" | "Medium" | "Hard"
  socialLinks: {
    telegram?: string
    twitter?: string
    discord?: string
    website?: string
  }
  about: {
    overview: string
    tokenomics: string
    roadmap: string
  }
  steps: string[]
  requirements: string[]
  isHot?: boolean
  isConfirmed?: boolean
  participants: number
  createdAt: string
  updatedAt: string
}

export default function AirdropDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [airdrop, setAirdrop] = useState<AirdropDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchAirdropDetail()
  }, [params.id])

  const fetchAirdropDetail = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/airdrops/${params.id}`)
      const data = await response.json()

      if (data.success) {
        setAirdrop(data.data)
      } else {
        showAlert("error", "Failed to fetch airdrop details")
      }
    } catch (error) {
      console.error("Fetch error:", error)
      showAlert("error", "Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message })
    setTimeout(() => setAlert(null), 5000)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setValidationErrors({})

      // Collect form data
      const formElement = document.querySelector("form") as HTMLFormElement
      if (!formElement) {
        showAlert("error", "Form not found")
        return
      }

      const formData = new FormData(formElement)
      const updateData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        action: formData.get("action") as string,
        category: formData.get("category") as string,
        status: formData.get("status") as string,
        difficulty: formData.get("difficulty") as string,
        reward: formData.get("reward") as string,
        startDate: formData.get("startDate") as string,
        socialLinks: {
          website: (formData.get("website") as string) || "",
          telegram: (formData.get("telegram") as string) || "",
          twitter: (formData.get("twitter") as string) || "",
          discord: (formData.get("discord") as string) || "",
        },
        about: {
          overview: (formData.get("overview") as string) || "",
          tokenomics: (formData.get("tokenomics") as string) || "",
          roadmap: (formData.get("roadmap") as string) || "",
        },
        steps: [
          formData.get("step1"),
          formData.get("step2"),
          formData.get("step3"),
          formData.get("step4"),
          formData.get("step5"),
          formData.get("step6"),
        ].filter(Boolean) as string[],
        requirements: [
          formData.get("req1"),
          formData.get("req2"),
          formData.get("req3"),
          formData.get("req4"),
          formData.get("req5"),
        ].filter(Boolean) as string[],
        isHot: formData.get("isHot") === "on",
        isConfirmed: formData.get("isConfirmed") === "on",
      }

      // Validate data
      const validation = validateAirdrop(updateData)
      if (!validation.success) {
        setValidationErrors(validation.errors || {})
        showAlert("error", "Please fix the validation errors")
        return
      }

      const response = await fetch(`/api/admin/airdrops/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      })

      const data = await response.json()

      if (data.success) {
        showAlert("success", "Airdrop updated successfully!")
        setEditing(false)
        fetchAirdropDetail()
      } else {
        if (data.details) {
          setValidationErrors(data.details)
        }
        showAlert("error", data.error || "Failed to update airdrop")
      }
    } catch (error) {
      console.error("Update error:", error)
      showAlert("error", "Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    const confirmMessage = `Are you sure you want to delete "${airdrop?.name}"? This action cannot be undone.`

    if (!confirm(confirmMessage)) {
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`/api/admin/airdrops/${params.id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        showAlert("success", "Airdrop deleted successfully!")
        setTimeout(() => {
          router.push("/admin/airdrops")
        }, 1000)
      } else {
        showAlert("error", data.error || "Failed to delete airdrop")
      }
    } catch (error) {
      console.error("Delete error:", error)
      showAlert("error", "Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7cb342]"></div>
      </div>
    )
  }

  if (!airdrop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Airdrop not found</h2>
        <Button onClick={() => router.push("/admin/airdrops")} className="mt-4">
          Back to Airdrops
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Alert */}
      {alert && (
        <Alert className={alert.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          {alert.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={alert.type === "success" ? "text-green-800" : "text-red-800"}>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/admin/airdrops")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Airdrop Details</h1>
            <p className="text-gray-600 dark:text-gray-400">View and edit airdrop information</p>
          </div>
        </div>

        <div className="flex gap-2">
          {editing ? (
            <>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-[#7cb342] hover:bg-[#689f38] text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <OptimizedImage
                    src={airdrop.logo}
                    alt={airdrop.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <AvatarFallback className="bg-[#7cb342] text-white text-xl">{airdrop.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  {editing ? (
                    <div>
                      <Input name="name" defaultValue={airdrop.name} className="text-xl font-bold" />
                      {validationErrors.name && <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{airdrop.name}</h2>
                      {airdrop.isHot && <Flame className="h-5 w-5 text-orange-500" />}
                      {airdrop.isConfirmed && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          CONFIRMED
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Action</Label>
                  {editing ? (
                    <div>
                      <Input name="action" defaultValue={airdrop.action} />
                      {validationErrors.action && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.action}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{airdrop.action}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  {editing ? (
                    <div>
                      <Select name="category" defaultValue={airdrop.category}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">Latest</SelectItem>
                          <SelectItem value="hottest">Hottest</SelectItem>
                          <SelectItem value="potential">Potential</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.category && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.category}</p>
                      )}
                    </div>
                  ) : (
                    <Badge className="capitalize">{airdrop.category}</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                {editing ? (
                  <div>
                    <Textarea name="description" defaultValue={airdrop.description} rows={3} />
                    {validationErrors.description && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{airdrop.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Overview</Label>
                {editing ? (
                  <div>
                    <Textarea name="overview" defaultValue={airdrop.about.overview} rows={4} />
                    {validationErrors["about.overview"] && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors["about.overview"]}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{airdrop.about.overview}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Tokenomics</Label>
                {editing ? (
                  <div>
                    <Textarea name="tokenomics" defaultValue={airdrop.about.tokenomics} rows={3} />
                    {validationErrors["about.tokenomics"] && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors["about.tokenomics"]}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{airdrop.about.tokenomics}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Roadmap</Label>
                {editing ? (
                  <div>
                    <Textarea name="roadmap" defaultValue={airdrop.about.roadmap} rows={3} />
                    {validationErrors["about.roadmap"] && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors["about.roadmap"]}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{airdrop.about.roadmap}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Steps to Participate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {airdrop.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#7cb342] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    {editing ? (
                      <div>
                        <Input name={`step${index + 1}`} defaultValue={step} className="flex-1" />
                        {validationErrors[`steps[${index}]`] && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors[`steps[${index}]`]}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{step}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {airdrop.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle className="h-4 w-4 text-[#7cb342] mt-0.5 flex-shrink-0" />
                    {editing ? (
                      <div>
                        <Input name={`req${index + 1}`} defaultValue={requirement} className="flex-1" />
                        {validationErrors[`requirements[${index}]`] && (
                          <p className="text-red-500 text-sm mt-1">{validationErrors[`requirements[${index}]`]}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">{requirement}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Links */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Participants</span>
                </div>
                <span className="font-medium">{airdrop.participants.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Rating</span>
                </div>
                <span className="font-medium">
                  {airdrop.rating} ({airdrop.totalRatings})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Start Date</span>
                </div>
                <span className="font-medium">{airdrop.startDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status & Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Status & Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                {editing ? (
                  <div>
                    <Select name="status" defaultValue={airdrop.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ended">Ended</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.status && <p className="text-red-500 text-sm mt-1">{validationErrors.status}</p>}
                  </div>
                ) : (
                  <Badge
                    className={`${
                      airdrop.status === "active"
                        ? "bg-green-100 text-green-800"
                        : airdrop.status === "confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : airdrop.status === "upcoming"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {airdrop.status}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                {editing ? (
                  <div>
                    <Select name="difficulty" defaultValue={airdrop.difficulty}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.difficulty && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.difficulty}</p>
                    )}
                  </div>
                ) : (
                  <Badge
                    className={`${
                      airdrop.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : airdrop.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {airdrop.difficulty}
                  </Badge>
                )}
              </div>
              <div className="space-y-2">
                <Label>Reward</Label>
                {editing ? (
                  <div>
                    <Input name="reward" defaultValue={airdrop.reward} />
                    {validationErrors.reward && <p className="text-red-500 text-sm mt-1">{validationErrors.reward}</p>}
                  </div>
                ) : (
                  <p className="text-sm font-medium text-[#7cb342]">{airdrop.reward}</p>
                )}
              </div>
              {editing && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isHot" name="isHot" defaultChecked={airdrop.isHot} />
                    <Label htmlFor="isHot">Mark as Hot 🔥</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isConfirmed" name="isConfirmed" defaultChecked={airdrop.isConfirmed} />
                    <Label htmlFor="isConfirmed">Mark as Confirmed ✅</Label>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {airdrop.socialLinks.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  {editing ? (
                    <div>
                      <Input name="website" defaultValue={airdrop.socialLinks.website} className="flex-1" />
                      {validationErrors["socialLinks.website"] && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors["socialLinks.website"]}</p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={airdrop.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex-1"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
              {airdrop.socialLinks.telegram && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                  {editing ? (
                    <div>
                      <Input name="telegram" defaultValue={airdrop.socialLinks.telegram} className="flex-1" />
                      {validationErrors["socialLinks.telegram"] && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors["socialLinks.telegram"]}</p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={airdrop.socialLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex-1"
                    >
                      Telegram
                    </a>
                  )}
                </div>
              )}
              {airdrop.socialLinks.twitter && (
                <div className="flex items-center gap-3">
                  <Twitter className="h-4 w-4 text-gray-500" />
                  {editing ? (
                    <div>
                      <Input name="twitter" defaultValue={airdrop.socialLinks.twitter} className="flex-1" />
                      {validationErrors["socialLinks.twitter"] && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors["socialLinks.twitter"]}</p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={airdrop.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex-1"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              )}
              {airdrop.socialLinks.discord && (
                <div className="flex items-center gap-3">
                  <Hash className="h-4 w-4 text-gray-500" />
                  {editing ? (
                    <div>
                      <Input name="discord" defaultValue={airdrop.socialLinks.discord} className="flex-1" />
                      {validationErrors["socialLinks.discord"] && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors["socialLinks.discord"]}</p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={airdrop.socialLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline flex-1"
                    >
                      Discord
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
