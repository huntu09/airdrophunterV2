"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { OptimizedImage } from "@/components/optimized-image"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  status: string
  role: string
  joinDate: string
  lastActive: string
  airdropsJoined: number
  totalEarnings: string
}

interface MobileOptimizedTableProps {
  users: User[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function MobileOptimizedTable({ users, onView, onEdit, onDelete }: MobileOptimizedTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case "banned":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "vip":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "premium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "user":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {users.map((user) => (
        <Card key={user.id} className="bg-white dark:bg-[#1a1a1a] border-gray-200 dark:border-[#3a3a3a]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <OptimizedImage src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                <AvatarFallback className="bg-[#7cb342] text-white text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{user.name}</p>
                  <Badge className={getStatusColor(user.status)} variant="secondary">
                    {user.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div>
                <span className="font-semibold">Role:</span>{" "}
                <Badge className={getRoleColor(user.role)} variant="secondary">
                  {user.role.toUpperCase()}
                </Badge>
              </div>
              <div>
                <span className="font-semibold">Joined:</span> {user.joinDate}
              </div>
              <div>
                <span className="font-semibold">Last Active:</span> {user.lastActive}
              </div>
              <div>
                <span className="font-semibold">Airdrops:</span> {user.airdropsJoined}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Earnings:</span>{" "}
                <span className="font-medium text-green-600">{user.totalEarnings}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => onView(user.id)}>
                View
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onEdit(user.id)}>
                Edit
              </Button>
              <Button size="sm" variant="destructive" onClick={() => onDelete(user.id)}>
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
