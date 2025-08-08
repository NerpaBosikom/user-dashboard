"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function ErrorCard({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Произошла ошибка</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}
