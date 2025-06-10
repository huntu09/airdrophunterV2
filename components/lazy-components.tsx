"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { Suspense, lazy } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Loading components
export function ComponentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-gray-800 border-gray-700 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-8 w-24" />
    </div>
  )
}

export function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="container mx-auto space-y-6">
        <Skeleton className="h-16 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Lazy loaded components with proper loading states
export const LazyWelcomeTour = lazy(() =>
  import("@/components/welcome-tour").then((module) => ({
    default: module.WelcomeTour,
  })),
)

export const LazyExchangeCarousel = dynamic(
  () => import("@/components/exchange-carousel").then((mod) => ({ default: mod.ExchangeCarousel })),
  {
    loading: () => (
      <div className="flex items-center justify-center py-8">
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-12 rounded" />
          ))}
        </div>
      </div>
    ),
    ssr: false,
  },
)

export const LazyHybridAdDisplay = dynamic(
  () => import("@/components/ads/hybrid-ad-display").then((mod) => ({ default: mod.HybridAdDisplay })),
  {
    loading: () => <Skeleton className="h-32 w-full rounded-lg" />,
    ssr: false,
  },
)

export const LazyAdminPanel = dynamic(() => import("@/app/admin-secret-panel-xyz/page"), {
  loading: () => <AdminSkeleton />,
  ssr: false,
})

export const LazySearchFilter = dynamic(() => import("@/components/search-filter"), {
  loading: () => <Skeleton className="h-12 w-full rounded-lg" />,
  ssr: false,
})

// Wrapper component for Suspense
export function LazyWrapper({
  children,
  fallback = <ComponentSkeleton />,
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
