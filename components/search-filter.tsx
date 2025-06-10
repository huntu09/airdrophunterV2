"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  Flame,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SearchFilterProps {
  onSearch: (filters: FilterOptions) => void
  categories: string[]
  blockchains: string[]
  theme: "dark" | "light"
}

export interface FilterOptions {
  searchTerm: string
  status: string[]
  categories: string[]
  blockchains: string[]
  isHot: boolean
  minParticipants: number
  sortBy: string
  sortOrder: "asc" | "desc"
}

export function SearchFilter({ onSearch, categories, blockchains, theme }: SearchFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: "",
    status: [],
    categories: [],
    blockchains: [],
    isHot: false,
    minParticipants: 0,
    sortBy: "created_at",
    sortOrder: "desc",
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  useEffect(() => {
    // Count active filters
    let count = 0
    if (filters.status.length > 0) count++
    if (filters.categories.length > 0) count++
    if (filters.blockchains.length > 0) count++
    if (filters.isHot) count++
    if (filters.minParticipants > 0) count++
    if (filters.sortBy !== "created_at" || filters.sortOrder !== "desc") count++

    setActiveFiltersCount(count)
  }, [filters])

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleReset = () => {
    setFilters({
      searchTerm: "",
      status: [],
      categories: [],
      blockchains: [],
      isHot: false,
      minParticipants: 0,
      sortBy: "created_at",
      sortOrder: "desc",
    })
    onSearch({
      searchTerm: "",
      status: [],
      categories: [],
      blockchains: [],
      isHot: false,
      minParticipants: 0,
      sortBy: "created_at",
      sortOrder: "desc",
    })
  }

  const toggleStatus = (status: string) => {
    if (filters.status.includes(status)) {
      setFilters({
        ...filters,
        status: filters.status.filter((s) => s !== status),
      })
    } else {
      setFilters({
        ...filters,
        status: [...filters.status, status],
      })
    }
  }

  const toggleCategory = (category: string) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      })
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      })
    }
  }

  const toggleBlockchain = (blockchain: string) => {
    if (filters.blockchains.includes(blockchain)) {
      setFilters({
        ...filters,
        blockchains: filters.blockchains.filter((b) => b !== blockchain),
      })
    } else {
      setFilters({
        ...filters,
        blockchains: [...filters.blockchains, blockchain],
      })
    }
  }

  return (
    <div className={`w-full mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"} w-4 h-4`}
          />
          <Input
            placeholder="Search airdrops..."
            className={`pl-10 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        <div className="flex gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`${theme === "dark" ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : "border-gray-300 bg-white hover:bg-gray-100"} flex items-center gap-2`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden md:inline">Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1 bg-green-600 hover:bg-green-700 text-white">{activeFiltersCount}</Badge>
                )}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={`w-80 md:w-96 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              align="end"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Filter Airdrops</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className={`text-xs ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  >
                    Reset All
                  </Button>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Status</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1 h-8",
                        filters.status.includes("CONFIRMED")
                          ? "bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700"
                          : `${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`,
                      )}
                      onClick={() => toggleStatus("CONFIRMED")}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Confirmed
                      {filters.status.includes("CONFIRMED") && <Check className="w-3 h-3 ml-1" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1 h-8",
                        filters.status.includes("UPCOMING")
                          ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                          : `${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`,
                      )}
                      onClick={() => toggleStatus("UPCOMING")}
                    >
                      <Clock className="w-3 h-3" />
                      Upcoming
                      {filters.status.includes("UPCOMING") && <Check className="w-3 h-3 ml-1" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "flex items-center gap-1 h-8",
                        filters.status.includes("ENDED")
                          ? "bg-gray-600 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-700"
                          : `${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`,
                      )}
                      onClick={() => toggleStatus("ENDED")}
                    >
                      <AlertCircle className="w-3 h-3" />
                      Ended
                      {filters.status.includes("ENDED") && <Check className="w-3 h-3 ml-1" />}
                    </Button>
                  </div>
                </div>

                {/* Categories Filter */}
                <div className="space-y-2">
                  <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Categories
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        size="sm"
                        variant="outline"
                        className={cn(
                          "h-8",
                          filters.categories.includes(category)
                            ? "bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:border-purple-700"
                            : `${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`,
                        )}
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                        {filters.categories.includes(category) && <Check className="w-3 h-3 ml-1" />}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Blockchains Filter */}
                <div className="space-y-2">
                  <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Blockchains
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {blockchains.map((blockchain) => (
                      <Button
                        key={blockchain}
                        size="sm"
                        variant="outline"
                        className={cn(
                          "h-8",
                          filters.blockchains.includes(blockchain)
                            ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                            : `${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`,
                        )}
                        onClick={() => toggleBlockchain(blockchain)}
                      >
                        {blockchain}
                        {filters.blockchains.includes(blockchain) && <Check className="w-3 h-3 ml-1" />}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Hot Filter */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame
                      className={`w-4 h-4 ${filters.isHot ? "text-red-500" : theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Hot Airdrops Only
                    </Label>
                  </div>
                  <Switch
                    checked={filters.isHot}
                    onCheckedChange={(checked) => setFilters({ ...filters, isHot: checked })}
                  />
                </div>

                {/* Min Participants */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Min Participants: {filters.minParticipants.toLocaleString()}
                    </Label>
                    {filters.minParticipants > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 p-0 text-xs text-gray-500 hover:text-gray-700"
                        onClick={() => setFilters({ ...filters, minParticipants: 0 })}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <Slider
                    defaultValue={[0]}
                    max={100000}
                    step={1000}
                    value={[filters.minParticipants]}
                    onValueChange={(value) => setFilters({ ...filters, minParticipants: value[0] })}
                    className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}
                  />
                </div>

                {/* Sort Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Sort By</Label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                      <SelectTrigger
                        className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                      >
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent
                        className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                      >
                        <SelectItem value="created_at">Date Added</SelectItem>
                        <SelectItem value="participants_count">Participants</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Order</Label>
                    <Select
                      value={filters.sortOrder}
                      onValueChange={(value: "asc" | "desc") => setFilters({ ...filters, sortOrder: value })}
                    >
                      <SelectTrigger
                        className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                      >
                        <SelectValue placeholder="Order" />
                      </SelectTrigger>
                      <SelectContent
                        className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                      >
                        <SelectItem value="desc">Descending</SelectItem>
                        <SelectItem value="asc">Ascending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className={`${theme === "dark" ? "border-gray-700 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      handleSearch()
                      setIsOpen(false)
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.status.length > 0 &&
            filters.status.map((status) => (
              <Badge
                key={status}
                variant="outline"
                className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} flex items-center gap-1`}
              >
                {status === "CONFIRMED" && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                {status === "UPCOMING" && <Clock className="w-3 h-3 text-blue-500" />}
                {status === "ENDED" && <AlertCircle className="w-3 h-3 text-gray-500" />}
                {status}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleStatus(status)} />
              </Badge>
            ))}

          {filters.categories.length > 0 &&
            filters.categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} flex items-center gap-1`}
              >
                {category}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleCategory(category)} />
              </Badge>
            ))}

          {filters.blockchains.length > 0 &&
            filters.blockchains.map((blockchain) => (
              <Badge
                key={blockchain}
                variant="outline"
                className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} flex items-center gap-1`}
              >
                {blockchain}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleBlockchain(blockchain)} />
              </Badge>
            ))}

          {filters.isHot && (
            <Badge
              variant="outline"
              className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} flex items-center gap-1`}
            >
              <Flame className="w-3 h-3 text-red-500" />
              Hot Only
              <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => setFilters({ ...filters, isHot: false })} />
            </Badge>
          )}

          {filters.minParticipants > 0 && (
            <Badge
              variant="outline"
              className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} flex items-center gap-1`}
            >
              <Users className="w-3 h-3 text-blue-500" />
              Min {filters.minParticipants.toLocaleString()} participants
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => setFilters({ ...filters, minParticipants: 0 })}
              />
            </Badge>
          )}

          {(filters.sortBy !== "created_at" || filters.sortOrder !== "desc") && (
            <Badge
              variant="outline"
              className={`${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-gray-100 border-gray-300"} flex items-center gap-1`}
            >
              <Calendar className="w-3 h-3 text-purple-500" />
              Sort:{" "}
              {filters.sortBy === "created_at"
                ? "Date"
                : filters.sortBy === "participants_count"
                  ? "Participants"
                  : filters.sortBy === "name"
                    ? "Name"
                    : "Deadline"}
              ({filters.sortOrder === "desc" ? "Desc" : "Asc"})
              <X
                className="w-3 h-3 ml-1 cursor-pointer"
                onClick={() => setFilters({ ...filters, sortBy: "created_at", sortOrder: "desc" })}
              />
            </Badge>
          )}

          {activeFiltersCount > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className={`text-xs h-6 px-2 ${theme === "dark" ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
