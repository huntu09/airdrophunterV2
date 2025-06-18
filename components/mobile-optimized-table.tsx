"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/optimized-image"
import { Star, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Airdrop {
  id: string
  name: string
  logo: string
  description: string
  action: string
  category: string
  status: string
  difficulty: string
  rating: number
  totalRatings: number
  reward: string
  networks?: string[]
  createdAt: string
}

interface MobileOptimizedTableProps {
  airdrops: Airdrop[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function MobileOptimizedTable({ airdrops, onView, onEdit, onDelete }: MobileOptimizedTableProps) {
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

  return (
    <div className="lg:hidden space-y-4">
      {airdrops.map((airdrop) => (
        <Card key={airdrop.id} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4">
            {/* Header with logo and actions */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  {airdrop.logo ? (
                    <OptimizedImage
                      src={airdrop.logo}
                      alt={airdrop.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <AvatarFallback className="bg-[#7cb342] text-white text-lg">{airdrop.name[0]}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate">{airdrop.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{airdrop.description}</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 p-0 flex-shrink-0">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onView(airdrop.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(airdrop.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => onDelete(airdrop.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Action and Category */}
            <div className="mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="font-medium">Action:</span> {airdrop.action}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(airdrop.status)} variant="secondary">
                  {airdrop.status}
                </Badge>
                <Badge className={getDifficultyColor(airdrop.difficulty)} variant="secondary">
                  {airdrop.difficulty}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {airdrop.category}
                </Badge>
              </div>
            </div>

            {/* Networks */}
            {airdrop.networks && airdrop.networks.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {airdrop.networks.slice(0, 3).map((network, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {network.slice(0, 3)}
                    </Badge>
                  ))}
                  {airdrop.networks.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{airdrop.networks.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{airdrop.rating}</span>
                <span className="text-gray-500">({airdrop.totalRatings})</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-[#7cb342]">{airdrop.reward}</div>
                <div className="text-xs text-gray-500">{new Date(airdrop.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
