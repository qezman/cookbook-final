export function SkeletonCard () {
    return (
      <div className="animate-pulse border rounded-lg bg-white p-4">
         <div className="bg-gray-300 h-48 w-full mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }