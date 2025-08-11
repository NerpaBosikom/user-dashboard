"use client"

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RotateCw } from "lucide-react"

interface ErrorCardProps {
  error: Error
  onRetry?: () => void
}

export function ErrorCard({ error, onRetry }: ErrorCardProps) {
  return (
    <div className="mx-auto max-w-md p-4">
      <Alert variant="destructive" className="border-red-500 bg-red-50">
        <div className="flex flex-col space-y-3">
          <AlertTitle className="flex items-center gap-2 text-red-800 font-semibold">
            <span>⚠️ Error loading content</span>
          </AlertTitle>
          
          <AlertDescription className="text-red-700">
            {error.message}
          </AlertDescription>
          
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-2 self-end border-red-300 text-red-800 hover:bg-red-100"
            >
              <RotateCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          )}
        </div>
      </Alert>
    </div>
  )
}