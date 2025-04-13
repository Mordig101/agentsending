import { Loader2 } from "lucide-react"

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-xl font-medium">Loading Testing Environment...</h2>
        <p className="text-gray-500 mt-2">Please wait while we set up the testing tools.</p>
      </div>
    </div>
  )
}
