"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Search, Plus, Edit, Trash2, FolderOpen, Loader2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  airdrop_count: number
  created_at: string
  updated_at: string
}

const CATEGORY_COLORS = [
  { name: "Green", value: "#7cb342" },
  { name: "Blue", value: "#2196f3" },
  { name: "Purple", value: "#9c27b0" },
  { name: "Orange", value: "#ff9800" },
  { name: "Red", value: "#f44336" },
  { name: "Teal", value: "#009688" },
  { name: "Pink", value: "#e91e63" },
  { name: "Indigo", value: "#3f51b5" },
]

const CATEGORY_ICONS = ["folder", "coins", "gamepad", "palette", "shield", "zap", "star", "heart"]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#7cb342",
    icon: "folder",
  })
  const [submitting, setSubmitting] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const { toast } = useToast()

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchQuery,
      })

      const response = await fetch(`/api/admin/categories?${params}`)
      const result = await response.json()

      if (result.success) {
        setCategories(result.data)
        setPagination(result.pagination)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch categories",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Fetch categories error:", error)
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [pagination.page, searchQuery])

  const handleCreateCategory = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Category created successfully",
        })
        setShowCreateDialog(false)
        setFormData({ name: "", description: "", color: "#7cb342", icon: "folder" })
        fetchCategories()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create category",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Create category error:", error)
      toast({
        title: "Error",
        description: "Failed to create category",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditCategory = async () => {
    if (!editingCategory || !formData.name.trim()) return

    try {
      setSubmitting(true)
      const response = await fetch(`/api/admin/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Category updated successfully",
        })
        setShowEditDialog(false)
        setEditingCategory(null)
        fetchCategories()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update category",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Update category error:", error)
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return

    try {
      setSubmitting(true)
      const response = await fetch(`/api/admin/categories/${deletingCategory.id}`, {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Category deleted successfully",
        })
        setShowDeleteDialog(false)
        setDeletingCategory(null)
        fetchCategories()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete category",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Delete category error:", error)
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedCategories.length === 0) return

    try {
      setSubmitting(true)
      const response = await fetch("/api/admin/categories/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          ids: selectedCategories,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        setSelectedCategories([])
        fetchCategories()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete categories",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Bulk delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete categories",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon,
    })
    setShowEditDialog(true)
  }

  const openDeleteDialog = (category: Category) => {
    setDeletingCategory(category)
    setShowDeleteDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage airdrop categories and organization</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-[#7cb342] hover:bg-[#6ba037]">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedCategories.length > 0 && (
          <Button variant="destructive" onClick={handleBulkDelete} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            Delete Selected ({selectedCategories.length})
          </Button>
        )}
      </div>

      {/* Categories Table */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#3a3a3a]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-[#7cb342]" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedCategories.length === categories.length && categories.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories(categories.map((c) => c.id))
                      } else {
                        setSelectedCategories([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Airdrops</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category.id])
                        } else {
                          setSelectedCategories(selectedCategories.filter((id) => id !== category.id))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: category.color }}
                      >
                        <FolderOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                      {category.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{category.airdrop_count} airdrops</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(category.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(category)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} categories
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Create Category Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>Add a new category to organize your airdrops better.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., DeFi, Gaming, NFT"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this category"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: color.value }} />
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory} disabled={submitting} className="bg-[#7cb342] hover:bg-[#6ba037]">
              {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the category information.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., DeFi, Gaming, NFT"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this category"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-color">Color</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_COLORS.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: color.value }} />
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCategory} disabled={submitting} className="bg-[#7cb342] hover:bg-[#6ba037]">
              {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Edit className="h-4 w-4 mr-2" />}
              Update Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingCategory?.name}"? This action cannot be undone.
              {deletingCategory?.airdrop_count > 0 && (
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-yellow-800 dark:text-yellow-200">
                  Warning: This category has {deletingCategory.airdrop_count} airdrops associated with it.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-red-600 hover:bg-red-700"
              disabled={submitting}
            >
              {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
