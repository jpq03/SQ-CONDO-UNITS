'use client';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-transparent border border-neutral-200/50 dark:border-[#333333] p-3 animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-video md:aspect-[4/3] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-200/40 dark:border-[#333333]/50">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skeleton-shimmer" />
      </div>

      {/* Text skeleton */}
      <div className="mt-5 mb-2 px-1 space-y-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
            <div className="h-2 bg-neutral-100 dark:bg-neutral-900 rounded w-1/2" />
          </div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-24" />
        </div>
      </div>

      <style jsx>{`
        .skeleton-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
