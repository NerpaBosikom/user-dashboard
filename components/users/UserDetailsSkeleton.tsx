import { Skeleton } from "@/components/ui/skeleton"

export function UserDetailsSkeleton() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
        <Skeleton className="h-8 w-1/2 rounded-lg" />
        <Skeleton className="h-5 w-1/4 mt-2 rounded-lg" />
      </div>
      <div className="p-6 space-y-5">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-1/4 rounded-lg" />
              <Skeleton className="h-5 w-3/4 rounded-lg" />
            </div>
          </div>
        ))}
        <div className="flex justify-between pt-4 border-t border-gray-200 gap-3">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </div>
    </div>
  )
}