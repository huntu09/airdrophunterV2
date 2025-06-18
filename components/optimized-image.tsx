"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  // 🔧 Enhanced error handling for Supabase URLs
  const handleError = () => {
    console.log("🔍 IMAGE ERROR - Failed to load:", {
      src,
      alt,
      isSupabase: src.includes("supabase.co"),
    })
    setImageError(true)
    setImageLoading(false)
    onError?.()
  }

  const handleLoad = () => {
    console.log("🔍 IMAGE SUCCESS - Loaded:", {
      src,
      alt,
      isSupabase: src.includes("supabase.co"),
    })
    setImageLoading(false)
    onLoad?.()
  }

  return (
    <div className="relative">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(className, imageLoading && "opacity-50")}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={src.includes("supabase.co")}
      />

      {/* Loading state */}
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200/50 dark:bg-gray-700/50 animate-pulse rounded-full flex items-center justify-center">
          <span className="text-xs opacity-60">📷</span>
        </div>
      )}
    </div>
  )
}
