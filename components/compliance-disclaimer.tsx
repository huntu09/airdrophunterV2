"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AlertTriangle, Shield, Info, ChevronDown, ChevronUp, Eye } from "lucide-react"

export function ComplianceDisclaimer() {
  return (
    <div className="space-y-4 mb-8">
      {/* Main Disclaimer */}
      <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          <strong>Investment Risk Warning:</strong> Cryptocurrency investments carry significant risk of loss. This
          website provides educational information only and does not constitute financial advice. Always conduct your
          own research (DYOR) before participating in any airdrop or investment.
        </AlertDescription>
      </Alert>

      {/* Educational Purpose */}
      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Educational Content:</strong> All information on AirdropHunter is for educational and informational
          purposes only. We do not guarantee the accuracy, completeness, or timeliness of any information.
        </AlertDescription>
      </Alert>

      {/* No Financial Advice */}
      <Alert className="border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/20">
        <Shield className="h-4 w-4 text-gray-600" />
        <AlertDescription className="text-gray-800 dark:text-gray-200">
          <strong>Not Financial Advice:</strong> Nothing on this website should be considered as financial, investment,
          legal, or tax advice. Consult with qualified professionals before making any investment decisions.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function CompactComplianceDisclaimer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto font-normal text-left hover:bg-transparent"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  Important Risk & Compliance Information
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Educational content only • Not financial advice • High risk investments
                </div>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-4">
          {/* Investment Risk Warning */}
          <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Investment Risk Warning</h4>
                <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                  Cryptocurrency investments carry significant risk of loss. This website provides educational
                  information only and does not constitute financial advice. Always conduct your own research (DYOR)
                  before participating in any airdrop or investment.
                </p>
              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Educational Content</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                  All information on AirdropHunter is for educational and informational purposes only. We do not
                  guarantee the accuracy, completeness, or timeliness of any information.
                </p>
              </div>
            </div>
          </div>

          {/* Not Financial Advice */}
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Not Financial Advice</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Nothing on this website should be considered as financial, investment, legal, or tax advice. Consult
                  with qualified professionals before making any investment decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Disclaimers */}
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Additional Information</h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 leading-relaxed">
                  <li>• Airdrop participation may require personal information and wallet connections</li>
                  <li>• Past performance does not guarantee future results</li>
                  <li>• Cryptocurrency markets are highly volatile and unpredictable</li>
                  <li>• Only invest what you can afford to lose completely</li>
                  <li>• This website may contain affiliate links for which we receive compensation</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export function InlineDisclaimer() {
  return (
    <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border">
      <p className="mb-1">
        <strong>Disclaimer:</strong> This information is for educational purposes only. Cryptocurrency investments are
        highly volatile and risky.
      </p>
      <p>Always do your own research and never invest more than you can afford to lose.</p>
    </div>
  )
}

export function LoadMoreDisclaimer() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-8">
      {/* Always Visible Summary */}
      <div className="flex items-start gap-3 mb-3">
        <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">⚠️ High Risk Investment Warning</h4>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            Cryptocurrency investments are extremely risky. This is educational content only, not financial advice.
          </p>
        </div>
      </div>

      {/* Load More Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMore(!showMore)}
        className="w-full border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/20"
      >
        {showMore ? (
          <>
            <ChevronUp className="h-4 w-4 mr-2" />
            Show Less Legal Information
          </>
        ) : (
          <>
            <ChevronDown className="h-4 w-4 mr-2" />
            Read Full Legal Disclaimers
          </>
        )}
      </Button>

      {/* Expandable Content */}
      {showMore && (
        <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-700 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Educational Content */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-600" />
                <h5 className="font-medium text-blue-800 dark:text-blue-200">Educational Purpose</h5>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                All information is for educational purposes only. We do not guarantee accuracy or completeness of any
                information provided.
              </p>
            </div>

            {/* Not Financial Advice */}
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-gray-600" />
                <h5 className="font-medium text-gray-800 dark:text-gray-200">Not Financial Advice</h5>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                Nothing here should be considered financial, investment, legal, or tax advice. Consult qualified
                professionals.
              </p>
            </div>
          </div>

          {/* Additional Terms */}
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Important Terms:</h5>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Always conduct your own research (DYOR) before any investment</li>
              <li>• Cryptocurrency markets are highly volatile and unpredictable</li>
              <li>• Only invest what you can afford to lose completely</li>
              <li>• Past performance does not guarantee future results</li>
              <li>• This website may contain affiliate links</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
