export default function BlogCardSkeleton() {
  return (
    <div className="bg-gray-800/50 rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-700/50" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="h-5 w-24 bg-gray-700/50 rounded" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-700/50 rounded w-3/4" />
          <div className="h-6 bg-gray-700/50 rounded w-1/2" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded w-5/6" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4">
          <div className="h-4 w-32 bg-gray-700/50 rounded" />
          <div className="h-4 w-20 bg-gray-700/50 rounded" />
        </div>
      </div>
    </div>
  );
}
