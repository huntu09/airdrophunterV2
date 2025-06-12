"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Calendar, Award, Info, Clock, TrendingUp, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"

interface Notification {
  id: string
  type: "NEW" | "DEADLINE" | "CLAIM" | "UPDATE" | "HOT"
  title: string
  message: string
  airdrop_id?: string
  is_read: boolean
  created_at: string
}

interface NotificationBellProps {
  className?: string
}

export function NotificationBell({ className }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const ITEMS_PER_PAGE = 10

  // Fetch airdrop slug by ID
  const getAirdropSlug = async (airdropId: string): Promise<string | null> => {
    try {
      const response = await fetch(`/api/airdrops/${airdropId}`)
      if (response.ok) {
        const airdrop = await response.json()
        return airdrop.slug
      }
    } catch (error) {
      console.error("Error fetching airdrop slug:", error)
    }
    return null
  }

  // Fetch notifications
  const fetchNotifications = async (pageNum = 1, append = false) => {
    try {
      setLoadingMore(pageNum > 1)
      const response = await fetch(`/api/notifications?limit=${ITEMS_PER_PAGE}&page=${pageNum}`)
      if (response.ok) {
        const data = await response.json()

        if (append) {
          setNotifications((prev) => [...prev, ...(data.notifications || [])])
        } else {
          setNotifications(data.notifications || [])
        }

        setUnreadCount(data.unreadCount || 0)
        setHasMore(data.notifications && data.notifications.length === ITEMS_PER_PAGE)
      } else {
        console.error("Failed to fetch notifications:", response.status)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setIsLoading(false)
      setLoadingMore(false)
    }
  }

  // Load more notifications
  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    const nextPage = page + 1
    await fetchNotifications(nextPage, true)
    setPage(nextPage)
  }

  // Calculate dropdown position
  const calculatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      setDropdownPosition({
        top: rect.bottom + scrollY + 8,
        right: window.innerWidth - rect.right,
      })
    }
  }

  // Handle bell click
  const handleBellClick = () => {
    if (!isOpen) {
      calculatePosition()
    }
    setIsOpen(!isOpen)
  }

  // Handle notification click
  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read first
    if (!notification.is_read) {
      await markAsRead(notification.id)
    }

    // Navigate to airdrop page if airdrop_id exists and notification is automatic
    if (notification.airdrop_id && (notification.type === "NEW" || notification.type === "HOT")) {
      setIsOpen(false)

      // Get the airdrop slug first
      const slug = await getAirdropSlug(notification.airdrop_id)
      if (slug) {
        router.push(`/airdrop/${slug}`)
      } else {
        console.error("Could not find airdrop slug for ID:", notification.airdrop_id)
        // Fallback: try to navigate with ID anyway
        router.push(`/airdrop/${notification.airdrop_id}`)
      }
    }
  }

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: "POST",
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, is_read: true } : notif)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/notifications/mark-all-read", {
        method: "PUT",
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, is_read: true })))
        setUnreadCount(0)
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  // Get notification icon and color
  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "NEW":
        return {
          icon: <Award className="w-4 h-4" />,
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
        }
      case "DEADLINE":
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "text-orange-500",
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
        }
      case "CLAIM":
        return {
          icon: <Award className="w-4 h-4" />,
          color: "text-purple-500",
          bg: "bg-purple-500/10",
          border: "border-purple-500/20",
        }
      case "UPDATE":
        return {
          icon: <Info className="w-4 h-4" />,
          color: "text-blue-500",
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
        }
      case "HOT":
        return {
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-red-500",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
        }
      default:
        return {
          icon: <Info className="w-4 h-4" />,
          color: "text-gray-500",
          bg: "bg-gray-500/10",
          border: "border-gray-500/20",
        }
    }
  }

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  // Convert URLs in text to clickable links
  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  // Check if notification is clickable (automatic)
  const isClickableNotification = (notification: Notification) => {
    return notification.airdrop_id && (notification.type === "NEW" || notification.type === "HOT")
  }

  useEffect(() => {
    setMounted(true)
    fetchNotifications()

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => fetchNotifications(1, false), 30000)

    // Handle scroll and resize
    const handleScrollResize = () => {
      if (isOpen) {
        calculatePosition()
      }
    }

    window.addEventListener("scroll", handleScrollResize)
    window.addEventListener("resize", handleScrollResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScrollResize)
      window.removeEventListener("resize", handleScrollResize)
    }
  }, [isOpen])

  // Dropdown component
  const DropdownContent = () => (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100]"
        onClick={() => setIsOpen(false)}
        style={{ backgroundColor: "transparent" }}
      />

      {/* Dropdown */}
      <div
        className="fixed w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-lg z-[101] max-h-96 overflow-hidden"
        style={{
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto bg-white dark:bg-gray-800">
          {isLoading && page === 1 ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => {
                const style = getNotificationStyle(notification.type)
                const isClickable = isClickableNotification(notification)

                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "flex gap-3 p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 transition-colors",
                      !notification.is_read && "bg-blue-50/50 dark:bg-blue-900/10",
                      isClickable ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50" : "",
                    )}
                    onClick={() => isClickable && handleNotificationClick(notification)}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                        style.bg,
                        style.border,
                        "border",
                      )}
                    >
                      <span className={style.color}>{style.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4
                          className={cn(
                            "text-sm font-medium truncate",
                            notification.is_read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white",
                          )}
                        >
                          {notification.title}
                        </h4>
                        {!notification.is_read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {linkifyText(notification.message)}
                      </p>

                      <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatRelativeTime(notification.created_at)}
                        {isClickable && <span className="ml-2 text-blue-500 text-xs">• Click to view</span>}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Load More Button */}
              {hasMore && (
                <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs w-full flex items-center justify-center gap-1 text-gray-600 hover:text-gray-700 dark:text-gray-400"
                    onClick={loadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-1"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load more <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-600 hover:text-gray-700 dark:text-gray-400 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </>
  )

  return (
    <>
      {/* Bell Button */}
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className={cn("relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200", className)}
        onClick={handleBellClick}
      >
        <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Portal Dropdown */}
      {mounted && isOpen && createPortal(<DropdownContent />, document.body)}
    </>
  )
}
