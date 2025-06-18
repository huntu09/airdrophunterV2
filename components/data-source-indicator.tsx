"use client"

import { Badge } from "@/components/ui/badge"
import { Database, HardDrive, Wifi, WifiOff } from "lucide-react"

interface DataSourceIndicatorProps {
  dataSource: "database" | "mock" | "fallback" | "cache"
  className?: string
}

export function DataSourceIndicator({ dataSource, className }: DataSourceIndicatorProps) {
  const getIndicatorProps = () => {
    switch (dataSource) {
      case "database":
        return {
          icon: Database,
          label: "Live Database",
          variant: "default" as const,
          className: "bg-green-100 text-green-800 border-green-200",
        }
      case "cache":
        return {
          icon: HardDrive,
          label: "Cached Data",
          variant: "secondary" as const,
          className: "bg-blue-100 text-blue-800 border-blue-200",
        }
      case "mock":
        return {
          icon: Wifi,
          label: "Demo Data",
          variant: "outline" as const,
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        }
      case "fallback":
        return {
          icon: WifiOff,
          label: "Offline Mode",
          variant: "destructive" as const,
          className: "bg-red-100 text-red-800 border-red-200",
        }
      default:
        return {
          icon: WifiOff,
          label: "Unknown",
          variant: "outline" as const,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        }
    }
  }

  const { icon: Icon, label, className: indicatorClassName } = getIndicatorProps()

  return (
    <Badge variant="outline" className={`${indicatorClassName} ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  )
}
