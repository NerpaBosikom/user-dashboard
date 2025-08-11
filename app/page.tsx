"use client"

import { Suspense, useState, useEffect } from "react"
import { HomePageContent } from "@/components/users/HomePageContent"
import { UserCardSkeleton } from "@/components/users/UserCardSkeleton"
import { ErrorBoundary } from "@/components/users/ErrorBoundary"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="space-y-6">
          <div className="h-16 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }>
        <HomePageContent />
      </Suspense>
    </ErrorBoundary>
  )
}