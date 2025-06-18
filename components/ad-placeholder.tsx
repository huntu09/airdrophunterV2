"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface AdPlaceholderProps {
  width?: string | number
  height?: string | number
  text?: string
  className?: string
  showWarning?: boolean
}

export function AdPlaceholder({
  width = "100%",
  height = 250,
  text = "Advertisement",
  className = "",
  showWarning = false,
}: AdPlaceholderProps) {
  const [adBlockDetected, setAdBlockDetected] = useState(false)

  useEffect(() => {
    // Simple AdBlock detection
    const detectAdBlock = async () => {
      try {
        const response = await fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
          method: "HEAD",
          mode: "no-cors",
          cache: "no-store",
        })
        setAdBlockDetected(false)
      } catch (error) {
        setAdBlockDetected(true)
      }
    }

    if (showWarning) {
      detectAdBlock()
    }
  }, [showWarning])

  return (
    <Card
      className={`flex flex-col items-center justify-center border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 ${className}`}
      style={{
        width,
        height,
        minHeight: typeof height === "number" ? `${height}px` : height,
      }}
    >
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{text}</p>
      {adBlockDetected && showWarning && (
        <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 mt-1">
          <AlertTriangle className="h-3 w-3" />
          <span>Ad blocker detected</span>
        </div>
      )}
    </Card>
  )
}
