"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/optimized-image"
import { useToast } from "@/hooks/use-toast"
import {
  Star,
  Flame,
  CheckCircle,
  ExternalLink,
  Calendar,
  Users,
  Zap,
  Upload,
  ImageIcon,
  RefreshCw,
  X,
} from "lucide-react"

interface Airdrop {
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
    facebook?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  steps: string[]
  requirements: string[]
  isHot?: boolean
  isConfirmed?: boolean
  participants: number
  createdAt: string
  updatedAt: string
  networks: string[]
  overview?: string
  tokenomics?: string
  roadmap?: string
}

interface AirdropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  airdrop?: Airdrop | null
  mode?: "view" | "edit" | "create"
  onSave?: (airdrop: Partial<Airdrop>) => Promise<void>
}

export function AirdropDialog({ open, onOpenChange, airdrop, mode = "view", onSave }: AirdropDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    action: "",
    category: "",
    status: "",
    difficulty: "",
    reward: "",
    startDate: "",
    website: "",
    telegram: "",
    twitter: "",
    discord: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    overview: "",
    tokenomics: "",
    roadmap: "",
    isHot: false,
    isConfirmed: false,
    networks: [] as string[],
    steps: [] as string[],
    requirements: [] as string[],
  })

  // Initialize form data when airdrop changes
  useEffect(() => {
    if (airdrop && mode !== "create") {
      setFormData({
        name: airdrop.name || "",
        logo: airdrop.logo || "",
        description: airdrop.description || "",
        action: airdrop.action || "",
        category: airdrop.category || "",
        status: airdrop.status || "",
        difficulty: airdrop.difficulty || "",
        reward: airdrop.reward || "",
        startDate: airdrop.startDate || "",
        website: airdrop.socialLinks?.website || "",
        telegram: airdrop.socialLinks?.telegram || "",
        twitter: airdrop.socialLinks?.twitter || "",
        discord: airdrop.socialLinks?.discord || "",
        facebook: airdrop.socialLinks?.facebook || "",
        instagram: airdrop.socialLinks?.instagram || "",
        youtube: airdrop.socialLinks?.youtube || "",
        linkedin: airdrop.socialLinks?.linkedin || "",
        overview: airdrop.overview || "",
        tokenomics: airdrop.tokenomics || "",
        roadmap: airdrop.roadmap || "",
        isHot: airdrop.isHot || false,
        isConfirmed: airdrop.isConfirmed || false,
        networks: airdrop.networks || [],
        steps: airdrop.steps || [],
        requirements: airdrop.requirements || [],
      })
      setLogoPreview(airdrop.logo || "")
    } else if (mode === "create") {
      // Reset form for create mode
      setFormData({
        name: "",
        logo: "",
        description: "",
        action: "",
        category: "",
        status: "",
        difficulty: "",
        reward: "",
        startDate: "",
        website: "",
        telegram: "",
        twitter: "",
        discord: "",
        facebook: "",
        instagram: "",
        youtube: "",
        linkedin: "",
        overview: "",
        tokenomics: "",
        roadmap: "",
        isHot: false,
        isConfirmed: false,
        networks: [],
        steps: [],
        requirements: [],
      })
      setLogoPreview("")
    }
  }, [airdrop, mode])

  const handleSave = async () => {
    if (!onSave) return

    try {
      setLoading(true)
      await onSave(formData)
      toast({
        title: "Success",
        description: `Airdrop ${mode === "create" ? "created" : "updated"} successfully!`,
      })
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode === "create" ? "create" : "update"} airdrop`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogoUpload = async (file: File) => {
    try {
      setUploadingLogo(true)

      // Create preview immediately
      const previewUrl = URL.createObjectURL(file)
      setLogoPreview(previewUrl)

      const formDataUpload = new FormData()
      formDataUpload.append("file", file)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      })

      const data = await response.json()

      if (data.success) {
        const uploadedUrl = data.data.url
        setFormData((prev) => ({ ...prev, logo: uploadedUrl }))
        setLogoPreview(uploadedUrl)
        toast({
          title: "Success",
          description: "Logo uploaded successfully!",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to upload logo",
          variant: "destructive",
        })
        setFormData((prev) => ({ ...prev, logo: "" }))
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      })
      setFormData((prev) => ({ ...prev, logo: "" }))
    } finally {
      setUploadingLogo(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "ended":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[95vh] w-[95vw] sm:w-full overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            {mode === "create" && "Create New Airdrop"}
            {mode === "edit" && "Edit Airdrop"}
            {mode === "view" && (
              <>
                <Avatar className="h-8 w-8">
                  {airdrop?.logo ? (
                    <OptimizedImage
                      src={airdrop.logo}
                      alt={airdrop.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="bg-[#7cb342] text-white">{airdrop?.name?.[0] || "A"}</AvatarFallback>
                  )}
                </Avatar>
                {airdrop?.name}
                {airdrop?.isHot && <Flame className="h-4 w-4 text-orange-500" />}
                {airdrop?.isConfirmed && <CheckCircle className="h-4 w-4 text-green-500" />}
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-base">
            {mode === "create" && "Create a new airdrop entry with all required information."}
            {mode === "edit" && "Edit the airdrop information below."}
            {mode === "view" && airdrop?.description}
          </DialogDescription>
        </DialogHeader>

        {mode === "view" && airdrop ? (
          // View Mode - Display airdrop information
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(airdrop.status)}>{airdrop.status}</Badge>
                  <Badge className={getDifficultyColor(airdrop.difficulty)}>{airdrop.difficulty}</Badge>
                  <Badge variant="outline" className="capitalize">
                    {airdrop.category}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Action:</span>
                    <span>{airdrop.action}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">Rating:</span>
                    <span>
                      {airdrop.rating} ({airdrop.totalRatings} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Start Date:</span>
                    <span>{new Date(airdrop.startDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">Participants:</span>
                    <span>{airdrop.participants.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-medium text-[#7cb342] text-lg">{airdrop.reward}</span>
                </div>

                {airdrop.networks && airdrop.networks.length > 0 && (
                  <div>
                    <span className="font-medium">Networks:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {airdrop.networks.map((network, i) => (
                        <Badge key={i} variant="outline" className="text-xs capitalize">
                          {network}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {Object.values(airdrop.socialLinks || {}).some((link) => link) && (
              <div>
                <h3 className="font-medium mb-2">Social Links</h3>
                <div className="flex flex-wrap gap-2">
                  {airdrop.socialLinks?.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={airdrop.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Website
                      </a>
                    </Button>
                  )}
                  {airdrop.socialLinks?.twitter && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={airdrop.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {airdrop.socialLinks?.telegram && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={airdrop.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Telegram
                      </a>
                    </Button>
                  )}
                  {airdrop.socialLinks?.discord && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={airdrop.socialLinks.discord} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Discord
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Steps and Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {airdrop.steps && airdrop.steps.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Steps</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {airdrop.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {airdrop.requirements && airdrop.requirements.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {airdrop.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Edit/Create Mode - Form
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="steps">Steps</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Lendasat"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="action">Action *</Label>
                  <Input
                    id="action"
                    placeholder="e.g., Borrow or lend, Bridge and interact"
                    value={formData.action}
                    onChange={(e) => setFormData((prev) => ({ ...prev, action: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the airdrop project"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  readOnly={isReadOnly}
                />
              </div>

              {!isReadOnly && (
                <div className="space-y-4">
                  <Label>Logo Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {logoPreview ? (
                        <div className="relative">
                          <img
                            src={logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => {
                              setLogoPreview("")
                              setFormData((prev) => ({ ...prev, logo: "" }))
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}

                      <div className="text-center">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={uploadingLogo}
                          onClick={() => document.getElementById("logo-upload")?.click()}
                          className="mb-2"
                        >
                          {uploadingLogo ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Choose Logo
                            </>
                          )}
                        </Button>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>

                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleLogoUpload(file)
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="hottest">Hottest</SelectItem>
                      <SelectItem value="potential">Potential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward">Reward</Label>
                  <Input
                    id="reward"
                    placeholder="$50-500 TOKEN"
                    value={formData.reward}
                    onChange={(e) => setFormData((prev) => ({ ...prev, reward: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>

                {!isReadOnly && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isHot"
                        checked={formData.isHot}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isHot: checked as boolean }))}
                      />
                      <Label htmlFor="isHot">Mark as Hot 🔥</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isConfirmed"
                        checked={formData.isConfirmed}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, isConfirmed: checked as boolean }))
                        }
                      />
                      <Label htmlFor="isConfirmed">Mark as Confirmed ✅</Label>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["website", "twitter", "telegram", "discord", "facebook", "instagram", "youtube", "linkedin"].map(
                  (platform) => (
                    <div key={platform} className="space-y-2">
                      <Label htmlFor={platform} className="capitalize">
                        {platform}
                      </Label>
                      <Input
                        id={platform}
                        placeholder={`https://${platform}.com/project`}
                        value={formData[platform as keyof typeof formData] as string}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [platform]: e.target.value }))}
                        readOnly={isReadOnly}
                      />
                    </div>
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="overview">Overview</Label>
                  <Textarea
                    id="overview"
                    placeholder="Detailed overview of the project..."
                    rows={4}
                    value={formData.overview}
                    onChange={(e) => setFormData((prev) => ({ ...prev, overview: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenomics">Tokenomics</Label>
                  <Textarea
                    id="tokenomics"
                    placeholder="Token distribution details..."
                    rows={3}
                    value={formData.tokenomics}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tokenomics: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roadmap">Roadmap</Label>
                  <Textarea
                    id="roadmap"
                    placeholder="Project roadmap..."
                    rows={3}
                    value={formData.roadmap}
                    onChange={(e) => setFormData((prev) => ({ ...prev, roadmap: e.target.value }))}
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium">Steps</h3>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`step${index + 1}`}>Step {index + 1}</Label>
                      <Input
                        id={`step${index + 1}`}
                        placeholder={`Step ${index + 1} description...`}
                        value={formData.steps[index] || ""}
                        onChange={(e) => {
                          const newSteps = [...formData.steps]
                          newSteps[index] = e.target.value
                          setFormData((prev) => ({ ...prev, steps: newSteps }))
                        }}
                        readOnly={isReadOnly}
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Requirements</h3>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`req${index + 1}`}>Requirement {index + 1}</Label>
                      <Input
                        id={`req${index + 1}`}
                        placeholder={`Requirement ${index + 1} description...`}
                        value={formData.requirements[index] || ""}
                        onChange={(e) => {
                          const newReqs = [...formData.requirements]
                          newReqs[index] = e.target.value
                          setFormData((prev) => ({ ...prev, requirements: newReqs }))
                        }}
                        readOnly={isReadOnly}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {mode === "view" ? "Close" : "Cancel"}
          </Button>
          {mode !== "view" && (
            <Button
              className="bg-[#7cb342] hover:bg-[#689f38] text-white"
              onClick={handleSave}
              disabled={loading || uploadingLogo}
            >
              {loading
                ? "Saving..."
                : uploadingLogo
                  ? "Uploading..."
                  : mode === "create"
                    ? "Create Airdrop"
                    : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
