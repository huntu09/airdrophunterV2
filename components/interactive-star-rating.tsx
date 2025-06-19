"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface InteractiveStarRatingProps {
  airdropId: string
  initialRating?: number
  totalRatings?: number
  size?: "sm" | "md" | "lg"
  readonly?: boolean
  showStats?: boolean
  className?: string
}

interface RatingStats {
  averageRating: number
  totalRatings: number
  distribution: Record<number, number>
}

export function InteractiveStarRating({
  airdropId,
  initialRating = 0,
  totalRatings = 0,
  size = "md",
  readonly = false,
  showStats = true,
  className,
}: InteractiveStarRatingProps) {
  const [currentRating, setCurrentRating] = useState(initialRating)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [hoverRating, setHoverRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stats, setStats] = useState<RatingStats>({
    averageRating: initialRating,
    totalRatings: totalRatings,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  })

  // Size configurations
  const sizeConfig = {
    sm: { star: "h-4 w-4", text: "text-sm", gap: "gap-1" },
    md: { star: "h-5 w-5", text: "text-base", gap: "gap-1.5" },
    lg: { star: "h-6 w-6", text: "text-lg", gap: "gap-2" },
  }

  const config = sizeConfig[size]

  // Load user's existing rating and stats
  useEffect(() => {
    const loadRatingData = async () => {
      if (readonly) return

      setIsLoading(true)
      try {
        const response = await fetch(`/api/airdrops/${airdropId}/rating`)
        if (response.ok) {
          const data = await response.json()
          setUserRating(data.userRating)
          setStats(data.stats)
          setCurrentRating(data.stats.averageRating)
        }
      } catch (error) {
        console.error("Failed to load rating data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRatingData()
  }, [airdropId, readonly])

  const handleStarClick = async (rating: number) => {
    if (readonly || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/airdrops/${airdropId}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      })

      const data = await response.json()

      if (response.ok) {
        setUserRating(rating)
        setStats(data.stats)
        setCurrentRating(data.stats.averageRating)
        toast.success(`Thank you! You rated this ${rating} star${rating > 1 ? "s" : ""}.`)
      } else {
        toast.error(data.error || "Failed to submit rating")
      }
    } catch (error) {
      console.error("Failed to submit rating:", error)
      toast.error("Failed to submit rating. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStarHover = (rating: number) => {
    if (readonly || isSubmitting) return
    setHoverRating(rating)
  }

  const handleMouseLeave = () => {
    if (readonly || isSubmitting) return
    setHoverRating(0)
  }

  const displayRating = hoverRating || currentRating
  const showUserRating = userRating !== null

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Stars */}
      <div className={cn("flex items-center", config.gap)} onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayRating
          const isUserRated = showUserRating && star <= (userRating || 0)
          const isHovered = star <= hoverRating

          return (
            <Button
              key={star}
              variant="ghost"
              size="sm"
              className={cn(
                "p-0 h-auto hover:bg-transparent transition-all duration-200",
                !readonly && !isSubmitting && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default",
                isSubmitting && "cursor-wait opacity-50",
              )}
              disabled={readonly || isSubmitting}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
            >
              <Star
                className={cn(
                  config.star,
                  "transition-all duration-200",
                  isFilled && "fill-yellow-400 text-yellow-400",
                  !isFilled && "text-gray-300 dark:text-gray-600",
                  isUserRated && "fill-yellow-500 text-yellow-500",
                  isHovered && !readonly && "fill-yellow-300 text-yellow-300 scale-110",
                )}
              />
            </Button>
          )
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="ml-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
          </div>
        )}
      </div>

      {/* Stats - Mobile Optimized */}
      {showStats && (
        <div className="flex flex-col gap-1">
          <div className={cn("flex items-center gap-2", config.text, "text-gray-600 dark:text-gray-400")}>
            <span className="font-medium text-gray-900 dark:text-white">{stats.averageRating.toFixed(1)}</span>
            <span>({stats.totalRatings})</span>
          </div>

          {showUserRating && (
            <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">You: {userRating}★</div>
          )}
        </div>
      )}

      {/* Hover feedback */}
      {hoverRating > 0 && !readonly && (
        <div className={cn("text-xs text-gray-500 dark:text-gray-400")}>
          Click to rate {hoverRating} star{hoverRating > 1 ? "s" : ""}
        </div>
      )}
    </div>
  )
}
