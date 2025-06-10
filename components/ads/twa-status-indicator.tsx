"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Globe, Zap, Wifi, WifiOff } from "lucide-react"
import { twaDetector, type TWAEnvironment } from "@/lib/twa-detection"
import { twaBridge } from "@/lib/twa-bridge"

interface TWAStatusIndicatorProps {
  className?: string
  showDetails?: boolean
}

export function TWAStatusIndicator({ className = "", showDetails = true }: TWAStatusIndicatorProps) {
  const [environment, setEnvironment] = useState<TWAEnvironment | null>(null)
  const [bridgeAvailable, setBridgeAvailable] = useState(false)

  useEffect(() => {
    const checkStatus = async () => {
      const env = twaDetector.detectEnvironment()
      setEnvironment(env)

      if (env.isTWA) {
        const bridgeReady = await twaBridge.initialize()
        setBridgeAvailable(bridgeReady)
      }
    }

    checkStatus()
  }, [])

  if (!environment) {
    return (
      <Card className={`${className}`}>
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500">Detecting environment...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getEnvironmentIcon = () => {
    if (environment.isTWA) return <Smartphone className="w-4 h-4 text-green-500" />
    if (environment.isPWA) return <Zap className="w-4 h-4 text-blue-500" />
    return <Globe className="w-4 h-4 text-gray-500" />
  }

  const getEnvironmentLabel = () => {
    if (environment.isTWA) return "Trusted Web Activity"
    if (environment.isPWA) return "Progressive Web App"
    return "Web Browser"
  }

  const getStatusColor = () => {
    if (environment.isTWA && bridgeAvailable) return "bg-green-500"
    if (environment.isPWA) return "bg-blue-500"
    if (environment.isWeb) return "bg-gray-500"
    return "bg-yellow-500"
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getEnvironmentIcon()}
            <span className="font-medium text-sm">{getEnvironmentLabel()}</span>
          </div>

          <div className="flex items-center gap-2">
            {environment.isTWA && (
              <div className="flex items-center gap-1">
                {bridgeAvailable ? (
                  <Wifi className="w-3 h-3 text-green-500" />
                ) : (
                  <WifiOff className="w-3 h-3 text-red-500" />
                )}
                <span className="text-xs text-gray-500">Bridge {bridgeAvailable ? "Ready" : "Failed"}</span>
              </div>
            )}

            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {environment.platform.toUpperCase()}
              </Badge>
              {environment.isMobile && (
                <Badge variant="outline" className="text-xs">
                  Mobile
                </Badge>
              )}
              {environment.isTWA && (
                <Badge variant="outline" className="text-xs text-green-600">
                  AdMob Ready
                </Badge>
              )}
              {!environment.isTWA && (
                <Badge variant="outline" className="text-xs text-blue-600">
                  AdSense Ready
                </Badge>
              )}
            </div>

            <div className="text-xs text-gray-500 font-mono">UA: {environment.userAgent.slice(0, 50)}...</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
