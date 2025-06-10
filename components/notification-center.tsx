"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Calendar, Award, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "success" | "warning"
  title: string
  message: string
  time: string
  isRead: boolean
}

interface NotificationCenterProps {
  theme: "dark" | "light"
}

export function NotificationCenter({ theme }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Sample notifications - in a real app, these would come from an API
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        type: "success",
        title: "New Airdrop Added",
        message: "LayerZero airdrop has been added. Check it out now!",
        time: "10 minutes ago",
        isRead: false,
      },
      {
        id: "2",
        type: "info",
        title: "Reminder",
        message: "Blast airdrop deadline is approaching in 2 days.",
        time: "1 hour ago",
        isRead: false,
      },
      {
        id: "3",
        type: "warning",
        title: "Airdrop Ended",
        message: "The Zora airdrop has ended. Check back for results soon.",
        time: "3 hours ago",
        isRead: false,
      },
      {
        id: "4",
        type: "success",
        title: "Airdrop Confirmed",
        message: "Eigenlayer airdrop is now confirmed! Complete tasks to qualify.",
        time: "1 day ago",
        isRead: true,
      },
      {
        id: "5",
        type: "info",
        title: "New Feature",
        message: "We've added advanced filtering to help you find airdrops faster.",
        time: "2 days ago",
        isRead: true,
      },
    ]

    setNotifications(sampleNotifications)
    setUnreadCount(sampleNotifications.filter((n) => !n.isRead).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Award className="w-5 h-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
        >
          <Bell className={`w-5 h-5 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`w-80 p-0 ${theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        align="end"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className={`text-xs ${theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList
            className={`grid grid-cols-3 w-full rounded-none ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
          >
            <TabsTrigger
              value="all"
              className={`text-xs ${theme === "dark" ? "data-[state=active]:bg-gray-700" : "data-[state=active]:bg-white"}`}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className={`text-xs ${theme === "dark" ? "data-[state=active]:bg-gray-700" : "data-[state=active]:bg-white"}`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger
              value="important"
              className={`text-xs ${theme === "dark" ? "data-[state=active]:bg-gray-700" : "data-[state=active]:bg-white"}`}
            >
              Important
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  No notifications yet
                </p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex gap-3 p-3 border-b last:border-0 transition-colors",
                      notification.isRead
                        ? theme === "dark"
                          ? "border-gray-700"
                          : "border-gray-200"
                        : theme === "dark"
                          ? "bg-gray-700/30 border-gray-700"
                          : "bg-blue-50 border-gray-200",
                      theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50",
                    )}
                  >
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="w-3 h-3" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                      </div>
                      <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="unread" className="max-h-[300px] overflow-y-auto">
            {notifications.filter((n) => !n.isRead).length === 0 ? (
              <div className="py-8 text-center">
                <Check className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`} />
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  No unread notifications
                </p>
              </div>
            ) : (
              <div>
                {notifications
                  .filter((notification) => !notification.isRead)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex gap-3 p-3 border-b last:border-0 transition-colors",
                        theme === "dark"
                          ? "bg-gray-700/30 border-gray-700 hover:bg-gray-700/50"
                          : "bg-blue-50 border-gray-200 hover:bg-blue-100",
                      )}
                    >
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 rounded-full"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="w-3 h-3" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        </div>
                        <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="important" className="max-h-[300px] overflow-y-auto">
            {notifications.filter((n) => n.type === "warning").length === 0 ? (
              <div className="py-8 text-center">
                <AlertTriangle
                  className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}
                />
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  No important notifications
                </p>
              </div>
            ) : (
              <div>
                {notifications
                  .filter((notification) => notification.type === "warning")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex gap-3 p-3 border-b last:border-0 transition-colors",
                        notification.isRead
                          ? theme === "dark"
                            ? "border-gray-700"
                            : "border-gray-200"
                          : theme === "dark"
                            ? "bg-gray-700/30 border-gray-700"
                            : "bg-orange-50 border-gray-200",
                        theme === "dark" ? "hover:bg-gray-700/50" : "hover:bg-gray-50",
                      )}
                    >
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-3 h-3" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className={`p-2 text-center border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <Button
            variant="ghost"
            size="sm"
            className={`text-xs w-full ${theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"}`}
            onClick={() => setIsOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
