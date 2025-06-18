"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Info, Shield } from "lucide-react"

export function ContentGuidelines() {
  return (
    <Card className="border-0 shadow-lg mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" />
          Content Guidelines & Compliance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              What We Provide
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Educational information about airdrops</li>
              <li>• Step-by-step participation guides</li>
              <li>• Security tips and best practices</li>
              <li>• Community-driven content</li>
              <li>• Research and analysis</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              What We Don't Provide
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Financial or investment advice</li>
              <li>• Guaranteed returns or profits</li>
              <li>• Investment recommendations</li>
              <li>• Trading signals or tips</li>
              <li>• Portfolio management services</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Our Mission</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                AirdropHunter aims to educate the crypto community about airdrop opportunities while promoting safe and
                responsible participation in the blockchain ecosystem.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Educational Content
          </Badge>
          <Badge variant="outline" className="text-xs">
            Community Driven
          </Badge>
          <Badge variant="outline" className="text-xs">
            Security Focused
          </Badge>
          <Badge variant="outline" className="text-xs">
            No Financial Advice
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
