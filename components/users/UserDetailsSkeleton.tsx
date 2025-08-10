import { Skeleton } from "@/components/ui/skeleton"

export function UserDetailsSkeleton() {
  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-1/4" />
    </div>
  )
}
