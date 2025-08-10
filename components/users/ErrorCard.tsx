"use client"

import { Alert } from "@/components/ui/alert"

interface ErrorCardProps {
  error: Error
  onRetry?: () => void
}

export function ErrorCard({ error, onRetry }: ErrorCardProps) {
  return (
    <Alert variant="destructive">
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold">Error loading users</h3>
        <p>{error.message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="text-sm underline text-primary"
          >
            Try again
          </button>
        )}
      </div>
    </Alert>
  )
}