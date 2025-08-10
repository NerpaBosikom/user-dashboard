"use client"

import { Suspense } from "react"
import { HomePageContent } from "@/components/users/HomePageContent"
import { UserCardSkeleton } from "@/components/users/UserCardSkeleton"

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        <div className="h-16 bg-gray-100 rounded-lg animate-pulse mb-6"></div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  )
}