import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "../ui/skeleton"

export function UserCardSkeleton() {
  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-8 w-20 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </CardContent>
    </Card>
  )
}
