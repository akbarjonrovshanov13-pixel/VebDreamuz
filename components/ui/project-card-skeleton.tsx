export default function ProjectCardSkeleton() {
  return (
    <div className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-white/5 hover:border-primary-500/30 transition-all animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-64 bg-gray-700/50" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Category */}
        <div className="h-5 w-32 bg-gray-700/50 rounded" />

        {/* Title */}
        <div className="h-7 bg-gray-700/50 rounded w-2/3" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded w-4/5" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-gray-700/50 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
