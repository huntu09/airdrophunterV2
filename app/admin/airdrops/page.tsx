"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  Flame,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Calendar,
  Zap,
  Upload,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { OptimizedImage } from "@/components/optimized-image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useMediaQuery } from "@/hooks/use-mobile"

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
}

interface MobileOptimizedTableProps {
  airdrops: Airdrop[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const MobileOptimizedTable: React.FC<MobileOptimizedTableProps> = ({ airdrops, onView, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {airdrops.map((airdrop) => (
        <Card key={airdrop.id} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                {airdrop.logo ? (
                  <OptimizedImage
                    src={airdrop.logo}
                    alt={airdrop.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <AvatarFallback className="bg-[#7cb342] text-white text-xs">{airdrop.name[0]}</AvatarFallback>
                )}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[120px]">
                    {airdrop.name}
                  </p>
                  {airdrop.isHot && <Flame className="h-3 w-3 text-orange-500 flex-shrink-0" />}
                  {airdrop.isConfirmed && <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{airdrop.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-semibold">Action:</span> {airdrop.action}
              </div>
              <div>
                <span className="font-semibold">Category:</span> {airdrop.category}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {airdrop.status}
              </div>
              <div>
                <span className="font-semibold">Difficulty:</span> {airdrop.difficulty}
              </div>
              <div>
                <span className="font-semibold">Reward:</span> {airdrop.reward}
              </div>
              <div>
                <span className="font-semibold">Networks:</span> {airdrop.networks?.join(", ") || "None"}
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-2">
              <Button size="sm" variant="ghost" onClick={() => onView(airdrop.id)}>
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onEdit(airdrop.id)}>
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(airdrop.id)}>
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function AirdropsManagement() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedAirdrops, setSelectedAirdrops] = useState<string[]>([])
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    confirmed: 0,
    hot: 0,
    latest: 0,
    hottest: 0,
    potential: 0,
  })
  const { toast } = useToast()
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [totalItems, setTotalItems] = useState(0)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  // Upload states
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>("")

  // Complete form data matching database schema
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    logo: "",
    description: "",
    action: "",
    category: "",
    status: "",
    difficulty: "",
    reward: "",
    startDate: "",

    // Social Links - Extended with more platforms
    website: "",
    telegram: "",
    twitter: "",
    discord: "",
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",

    // About Project
    overview: "",
    tokenomics: "",
    roadmap: "",

    // Steps (up to 6 steps)
    step1: "",
    step2: "",
    step3: "",
    step4: "",
    step5: "",
    step6: "",

    // Requirements (up to 5 requirements)
    req1: "",
    req2: "",
    req3: "",
    req4: "",
    req5: "",

    // Flags
    isHot: false,
    isConfirmed: false,
    networks: [] as string[],
  })

  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Fetch airdrops
  const fetchAirdrops = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        category: filterCategory,
        status: filterStatus,
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      })

      console.log("🔄 Fetching airdrops with params:", Object.fromEntries(params))

      const response = await fetch(`/api/admin/airdrops?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("📊 Fetch response:", data)

      if (data.success) {
        setAirdrops(data.data)
        setStats(data.stats)
        setTotalItems(data.pagination.total)
        console.log("✅ Data loaded successfully:", data.data.length, "items")
      } else {
        console.error("❌ API Error:", data.error)
        toast({
          title: "Error",
          description: data.error || "Failed to fetch airdrops",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("💥 Fetch error:", error)
      toast({
        title: "Network Error",
        description: `Failed to fetch data: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAirdrops()
  }, [searchTerm, filterCategory, filterStatus, currentPage, itemsPerPage])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAirdrops(airdrops.map((a) => a.id))
    } else {
      setSelectedAirdrops([])
    }
  }

  const handleSelectAirdrop = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAirdrops((prev) => [...prev, id])
    } else {
      setSelectedAirdrops((prev) => prev.filter((aid) => aid !== id))
    }
  }

  // Fixed bulk action handler
  const handleBulkAction = async (action: string) => {
    if (selectedAirdrops.length === 0) {
      toast({
        title: "No Selection",
        description: "Please select airdrops first",
        variant: "destructive",
      })
      return
    }

    try {
      setActionLoading(true)
      console.log(`🔄 Performing bulk action: ${action} on items:`, selectedAirdrops)

      const response = await fetch("/api/admin/airdrops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          ids: selectedAirdrops,
        }),
      })

      const data = await response.json()
      console.log("📊 Bulk action response:", data)

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        })
        setSelectedAirdrops([])
        await fetchAirdrops() // Refresh data
      } else {
        console.error("❌ Bulk action failed:", data.error)
        toast({
          title: "Error",
          description: data.error || `Failed to ${action} airdrops`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("💥 Bulk action error:", error)
      toast({
        title: "Network Error",
        description: `Failed to ${action} airdrops: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setActionLoading(false)
    }
  }

  // Fixed delete handler
  const handleDelete = async (id: string) => {
    console.log("🗑️ Delete requested for ID:", id)
    setItemToDelete(id)
    setSelectedAirdrops([id])
    setDeleteConfirmOpen(true)
  }

  // Confirm delete handler
  const confirmDelete = async () => {
    if (!itemToDelete) return

    try {
      setActionLoading(true)
      console.log("🗑️ Confirming delete for:", itemToDelete)

      await handleBulkAction("delete")
      setDeleteConfirmOpen(false)
      setItemToDelete(null)
    } catch (error) {
      console.error("💥 Delete confirmation error:", error)
    } finally {
      setActionLoading(false)
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hottest":
        return <Flame className="h-4 w-4 text-orange-500" />
      case "potential":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      default:
        return <Calendar className="h-4 w-4 text-[#7cb342]" />
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

  // Enhanced form submission handler
  const handleCreateAirdrop = async () => {
    try {
      setLoading(true)
      setValidationErrors({})

      // Basic validation
      if (
        !formData.name ||
        !formData.description ||
        !formData.action ||
        !formData.category ||
        !formData.status ||
        !formData.difficulty
      ) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (Name, Description, Action, Category, Status, Difficulty)",
          variant: "destructive",
        })
        return
      }

      console.log("📝 Creating airdrop with form data:", formData)

      const response = await fetch("/api/admin/airdrops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("📊 Create response:", data)

      if (data.success) {
        toast({
          title: "Success",
          description: "Airdrop created successfully!",
        })
        setIsAddDialogOpen(false)
        resetForm()
        await fetchAirdrops()
      } else {
        if (data.details) {
          setValidationErrors(data.details)
        }
        toast({
          title: "Error",
          description: data.error || "Failed to create airdrop",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("💥 Create error:", error)
      toast({
        title: "Network Error",
        description: `Failed to create airdrop: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
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
      step1: "",
      step2: "",
      step3: "",
      step4: "",
      step5: "",
      step6: "",
      req1: "",
      req2: "",
      req3: "",
      req4: "",
      req5: "",
      isHot: false,
      isConfirmed: false,
      networks: [] as string[],
    })
    setValidationErrors({})
    setLogoPreview("")
  }

  // Enhanced logo upload handler
  const handleLogoUpload = async (file: File) => {
    try {
      setUploadingLogo(true)
      console.log("📤 Starting logo upload:", file.name, file.size, file.type)

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
      console.log("📊 Upload response:", data)

      if (data.success) {
        const uploadedUrl = data.data.url
        setFormData((prev) => ({ ...prev, logo: uploadedUrl }))
        setLogoPreview(uploadedUrl)
        toast({
          title: "Success",
          description: "Logo uploaded successfully!",
        })
      } else {
        console.error("❌ Upload failed:", data.error)
        toast({
          title: "Upload Error",
          description: data.error || "Failed to upload logo",
          variant: "destructive",
        })
        setFormData((prev) => ({ ...prev, logo: "" }))
      }
    } catch (error) {
      console.error("💥 Upload error:", error)
      toast({
        title: "Upload Error",
        description: "Failed to upload logo",
        variant: "destructive",
      })
      setFormData((prev) => ({ ...prev, logo: "" }))
    } finally {
      setUploadingLogo(false)
    }
  }

  // Simple pagination handlers
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchAirdrops()
      }, 30000) // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Airdrops Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all airdrops and their details</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="flex gap-2 flex-1">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="flex-1 sm:flex-none h-10 text-xs sm:text-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-1 sm:mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Auto Refresh</span>
              <span className="sm:hidden">Auto</span>
            </Button>
            <Button
              variant="outline"
              onClick={fetchAirdrops}
              disabled={loading}
              className="flex-1 sm:flex-none h-10 text-xs sm:text-sm"
            >
              <RefreshCw className={`h-4 w-4 mr-1 sm:mr-2 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
              <span className="sm:hidden">Refresh</span>
            </Button>
          </div>

          <Button
            className="bg-[#7cb342] hover:bg-[#689f38] text-white h-10 text-xs sm:text-sm"
            onClick={() => {
              setIsAddDialogOpen(true)
            }}
          >
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            Add Airdrop
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Confirm Delete
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this airdrop? This action cannot be undone and will permanently remove the
              airdrop from the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={actionLoading}>
              {actionLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Add Airdrop Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[95vh] w-[95vw] sm:w-full overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl sm:text-2xl">Add New Airdrop</DialogTitle>
            <DialogDescription className="text-base">
              Create a new airdrop entry. Fill in all the required information.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="steps">Steps</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-medium">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Lendasat"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className={cn("h-12 text-base", validationErrors.name ? "border-red-500" : "")}
                  />
                  {validationErrors.name && <p className="text-sm text-red-500">{validationErrors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="action" className="text-base font-medium">
                    Action *
                  </Label>
                  <Input
                    id="action"
                    placeholder="e.g., Borrow or lend, Bridge and interact"
                    value={formData.action}
                    onChange={(e) => setFormData((prev) => ({ ...prev, action: e.target.value }))}
                    className={cn("h-12 text-base", validationErrors.action ? "border-red-500" : "")}
                  />
                  {validationErrors.action && <p className="text-sm text-red-500">{validationErrors.action}</p>}
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
                  className={validationErrors.description ? "border-red-500" : ""}
                />
                {validationErrors.description && <p className="text-sm text-red-500">{validationErrors.description}</p>}
              </div>

              {/* Enhanced Logo Upload Section */}
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

                    {formData.logo && (
                      <div className="w-full">
                        <Label className="text-xs text-gray-500">Logo URL:</Label>
                        <Input value={formData.logo} readOnly className="text-xs bg-gray-50 dark:bg-gray-800" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className={validationErrors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="hottest">Hottest</SelectItem>
                      <SelectItem value="potential">Potential</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.category && <p className="text-sm text-red-500">{validationErrors.category}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className={validationErrors.status ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.status && <p className="text-sm text-red-500">{validationErrors.status}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger className={validationErrors.difficulty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.difficulty && <p className="text-sm text-red-500">{validationErrors.difficulty}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward">Reward</Label>
                  <Input
                    id="reward"
                    placeholder="$50-500 TOKEN"
                    value={formData.reward}
                    onChange={(e) => setFormData((prev) => ({ ...prev, reward: e.target.value }))}
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
                  />
                </div>
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
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isConfirmed: checked as boolean }))}
                  />
                  <Label htmlFor="isConfirmed">Mark as Confirmed ✅</Label>
                </div>
              </div>

              {/* Blockchain Networks Section */}
              <div className="space-y-2 mt-4">
                <Label>Blockchain Networks</Label>
                <div className="flex flex-wrap gap-2">
                  {["ethereum", "binance", "solana", "polygon", "avalanche", "arbitrum", "optimism", "base"].map(
                    (network) => (
                      <div key={network} className="flex items-center space-x-2">
                        <Checkbox
                          id={`network-${network}`}
                          checked={formData.networks.includes(network)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData((prev) => ({ ...prev, networks: [...prev.networks, network] }))
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                networks: prev.networks.filter((n) => n !== network),
                              }))
                            }
                          }}
                        />
                        <Label htmlFor={`network-${network}`} className="capitalize">
                          {network}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Social Links Tab - Extended */}
            <TabsContent value="social" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://project.io"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    placeholder="https://twitter.com/project"
                    value={formData.twitter}
                    onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    placeholder="https://t.me/project"
                    value={formData.telegram}
                    onChange={(e) => setFormData((prev) => ({ ...prev, telegram: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discord">Discord</Label>
                  <Input
                    id="discord"
                    placeholder="https://discord.gg/project"
                    value={formData.discord}
                    onChange={(e) => setFormData((prev) => ({ ...prev, discord: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    placeholder="https://facebook.com/project"
                    value={formData.facebook}
                    onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/project"
                    value={formData.instagram}
                    onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input
                    id="youtube"
                    placeholder="https://youtube.com/project"
                    value={formData.youtube}
                    onChange={(e) => setFormData((prev) => ({ ...prev, youtube: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/company/project"
                    value={formData.linkedin}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* About Project Tab */}
            <TabsContent value="about" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="overview">Overview</Label>
                  <Textarea
                    id="overview"
                    placeholder="Detailed overview of the project, its mission, and technology..."
                    rows={4}
                    value={formData.overview}
                    onChange={(e) => setFormData((prev) => ({ ...prev, overview: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tokenomics">Tokenomics</Label>
                  <Textarea
                    id="tokenomics"
                    placeholder="Token distribution, supply, allocation details..."
                    rows={3}
                    value={formData.tokenomics}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tokenomics: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roadmap">Roadmap</Label>
                  <Textarea
                    id="roadmap"
                    placeholder="Project roadmap and future plans..."
                    rows={3}
                    value={formData.roadmap}
                    onChange={(e) => setFormData((prev) => ({ ...prev, roadmap: e.target.value }))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Steps Tab */}
            <TabsContent value="steps" className="space-y-4">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="space-y-2">
                    <Label htmlFor={`step${step}`}>Step {step}</Label>
                    <Input
                      id={`step${step}`}
                      placeholder={`Step ${step} description...`}
                      value={formData[`step${step}` as keyof typeof formData] as string}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [`step${step}`]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" className="space-y-4">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((req) => (
                  <div key={req} className="space-y-2">
                    <Label htmlFor={`req${req}`}>Requirement {req}</Label>
                    <Input
                      id={`req${req}`}
                      placeholder={`Requirement ${req} description...`}
                      value={formData[`req${req}` as keyof typeof formData] as string}
                      onChange={(e) => setFormData((prev) => ({ ...prev, [`req${req}`]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#7cb342] hover:bg-[#689f38] text-white"
              onClick={handleCreateAirdrop}
              disabled={loading || uploadingLogo}
            >
              {loading ? "Creating..." : uploadingLogo ? "Uploading..." : "Create Airdrop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <Card key={i} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
              <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12 mb-2"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-8"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Confirmed</p>
              <p className="text-2xl font-bold text-blue-600">{stats.confirmed}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hot 🔥</p>
              <p className="text-2xl font-bold text-orange-600">{stats.hot}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Latest</p>
              <p className="text-2xl font-bold text-[#7cb342]">{stats.latest}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hottest</p>
              <p className="text-2xl font-bold text-orange-600">{stats.hottest}</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
            <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Potential</p>
              <p className="text-2xl font-bold text-blue-600">{stats.potential}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search airdrops by name, description, or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="hottest">Hottest</SelectItem>
                <SelectItem value="potential">Potential</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedAirdrops.length > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {selectedAirdrops.length} airdrops selected
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("activate")}
                  disabled={actionLoading}
                >
                  {actionLoading ? <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> : null}
                  Activate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("mark-hot")}
                  disabled={actionLoading}
                >
                  {actionLoading ? <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> : null}
                  Mark Hot
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("confirm")}
                  disabled={actionLoading}
                >
                  {actionLoading ? <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> : null}
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setDeleteConfirmOpen(true)
                  }}
                  disabled={actionLoading}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  {actionLoading ? (
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <Trash2 className="h-3 w-3 mr-1" />
                  )}
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Airdrops Table */}
      <Card className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Airdrops ({totalItems})</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {isMobile ? (
                <MobileOptimizedTable
                  airdrops={airdrops}
                  onView={(id) => window.open(`/airdrop/${id}`, "_blank")}
                  onEdit={(id) => window.open(`/admin/airdrops/${id}`, "_blank")}
                  onDelete={handleDelete}
                />
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0 relative">
                  <div className="inline-block min-w-full align-middle">
                    <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-[#1a1a1a] to-transparent pointer-events-none z-10"></div>

                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <Table className="min-w-[800px] sm:min-w-full">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12 sticky left-0 bg-white dark:bg-[#1a1a1a] z-10">
                              <Checkbox
                                checked={selectedAirdrops.length === airdrops.length && airdrops.length > 0}
                                onCheckedChange={handleSelectAll}
                              />
                            </TableHead>
                            <TableHead className="min-w-[200px] sticky left-12 bg-white dark:bg-[#1a1a1a] z-10">
                              Project
                            </TableHead>
                            <TableHead className="min-w-[150px]">Action</TableHead>
                            <TableHead className="min-w-[100px]">Category</TableHead>
                            <TableHead className="min-w-[100px]">Status</TableHead>
                            <TableHead className="min-w-[100px]">Difficulty</TableHead>
                            <TableHead className="min-w-[100px]">Rating</TableHead>
                            <TableHead className="min-w-[120px]">Reward</TableHead>
                            <TableHead className="min-w-[120px]">Networks</TableHead>
                            <TableHead className="min-w-[120px]">Social Links</TableHead>
                            <TableHead className="min-w-[100px]">Created</TableHead>
                            <TableHead className="w-12">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {airdrops.map((airdrop) => (
                            <TableRow key={airdrop.id}>
                              <TableCell className="sticky left-0 bg-white dark:bg-[#1a1a1a] z-10">
                                <Checkbox
                                  checked={selectedAirdrops.includes(airdrop.id)}
                                  onCheckedChange={(checked) => handleSelectAirdrop(airdrop.id, checked as boolean)}
                                />
                              </TableCell>
                              <TableCell className="sticky left-12 bg-white dark:bg-[#1a1a1a] z-10">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                                    {airdrop.logo ? (
                                      <OptimizedImage
                                        src={airdrop.logo}
                                        alt={airdrop.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                      />
                                    ) : (
                                      <AvatarFallback className="bg-[#7cb342] text-white text-xs">
                                        {airdrop.name[0]}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium text-gray-900 dark:text-white text-sm truncate max-w-[120px]">
                                        {airdrop.name}
                                      </p>
                                      {airdrop.isHot && <Flame className="h-3 w-3 text-orange-500 flex-shrink-0" />}
                                      {airdrop.isConfirmed && (
                                        <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                                      {airdrop.description}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Zap className="h-3 w-3 text-gray-400 flex-shrink-0" />
                                  <span className="text-sm truncate max-w-[120px]" title={airdrop.action}>
                                    {airdrop.action}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getCategoryIcon(airdrop.category)}
                                  <span className="capitalize text-sm">{airdrop.category}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(airdrop.status)} variant="secondary">
                                  {airdrop.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={getDifficultyColor(airdrop.difficulty)} variant="secondary">
                                  {airdrop.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{airdrop.rating}</span>
                                  <span className="text-xs text-gray-500">({airdrop.totalRatings})</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <span
                                  className="font-medium text-[#7cb342] text-sm truncate max-w-[100px]"
                                  title={airdrop.reward}
                                >
                                  {airdrop.reward}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {airdrop.networks?.slice(0, 2).map((network, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {network.slice(0, 3)}
                                    </Badge>
                                  ))}
                                  {airdrop.networks && airdrop.networks.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{airdrop.networks.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  {airdrop.socialLinks?.website && (
                                    <Badge variant="outline" className="text-xs">
                                      Web
                                    </Badge>
                                  )}
                                  {airdrop.socialLinks?.twitter && (
                                    <Badge variant="outline" className="text-xs">
                                      X
                                    </Badge>
                                  )}
                                  {airdrop.socialLinks?.telegram && (
                                    <Badge variant="outline" className="text-xs">
                                      TG
                                    </Badge>
                                  )}
                                  {airdrop.socialLinks?.discord && (
                                    <Badge variant="outline" className="text-xs">
                                      DC
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {new Date(airdrop.createdAt).toLocaleDateString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => window.open(`/airdrop/${airdrop.id}`, "_blank")}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => window.open(`/admin/airdrops/${airdrop.id}`, "_blank")}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(airdrop.id)}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)}{" "}
                    of {totalItems} results
                  </div>
                  <div className="flex gap-2 order-1 sm:order-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">Previous</span>
                    </Button>

                    <div className="hidden sm:flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        )
                      })}
                    </div>

                    <div className="sm:hidden flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      {currentPage} / {totalPages}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3"
                    >
                      <span className="hidden sm:inline mr-1">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
