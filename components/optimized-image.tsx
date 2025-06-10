"use client"

import Image from "next/image"
import { useState } from "react"
import { generateBlurDataURL, getImageSizes, shouldPrioritizeImage } from "@/lib/image-utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  index?: number
  type?: "logo" | "banner" | "thumbnail"
  fallback?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority,
  index = 0,
  type = "logo",
  fallback = "/placeholder.svg",
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const imageSrc = imageError ? fallback : src || fallback
  const shouldPriority = priority ?? shouldPrioritizeImage(index, index < 6)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        priority={shouldPriority}
        placeholder="blur"
        blurDataURL={generateBlurDataURL(width, height)}
        sizes={getImageSizes(type)}
        className={`object-cover transition-all duration-300 ${
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"
        } hover:scale-110`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImageError(true)
          setIsLoading(false)
        }}
        quality={85}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
