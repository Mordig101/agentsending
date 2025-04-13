import { Skeleton } from "@/components/ui/skeleton"

export default function ApiDocsLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-6 w-6 mr-2" />
        <Skeleton className="h-8 w-64" />
      </div>

      <Skeleton className="h-20 w-full mb-6" />

      <div className="mb-4">
        <Skeleton className="h-10 w-96" />
      </div>

      <Skeleton className="h-[600px] w-full" />
    </div>
  )
}
