// F1 2026 Dashboard — Live Data UI Components
// Shared loading skeletons and data freshness indicators

import { Wifi, WifiOff, RefreshCw } from "lucide-react";

// ─── Data Freshness Badge ─────────────────────────────────────────────────────
interface DataFreshnessBadgeProps {
  isLive: boolean;
  updatedAt: string | null;
  isLoading: boolean;
}

export function DataFreshnessBadge({ isLive, updatedAt, isLoading }: DataFreshnessBadgeProps) {
  if (isLoading) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-gray-100 text-gray-400 text-xs f1-mono">
        <RefreshCw size={10} className="animate-spin" />
        FETCHING LIVE DATA...
      </span>
    );
  }

  if (isLive && updatedAt) {
    const time = new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-green-50 text-green-600 text-xs f1-mono border border-green-200">
        <Wifi size={10} />
        LIVE · Updated {time}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-amber-50 text-amber-600 text-xs f1-mono border border-amber-200">
      <WifiOff size={10} />
      CACHED DATA
    </span>
  );
}

// ─── Driver Standings Skeleton ────────────────────────────────────────────────
export function DriverSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden animate-pulse">
      <div className="h-10 bg-gray-800/10 mb-0.5" />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50">
          <div className="w-8 h-8 rounded-sm bg-gray-200" />
          <div className="w-1 h-8 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-gray-200 rounded w-32" />
            <div className="h-2 bg-gray-100 rounded w-16" />
          </div>
          <div className="w-24 h-3 bg-gray-200 rounded hidden sm:block" />
          <div className="w-12 h-3 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Constructor Standings Skeleton ──────────────────────────────────────────
export function ConstructorSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-sm p-4 flex items-center gap-4">
          <div className="w-8 h-8 rounded-sm bg-gray-200" />
          <div className="w-1 h-10 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-28" />
            <div className="h-2 bg-gray-100 rounded w-48" />
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Race Results Skeleton ────────────────────────────────────────────────────
export function RaceResultSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-100 rounded-sm">
          <div className="w-6 h-6 rounded-sm bg-gray-200" />
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-2 bg-gray-100 rounded w-16" />
          </div>
          <div className="w-10 h-3 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Generic Section Loading State ───────────────────────────────────────────
export function SectionLoader({ label = "Loading live data..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
      <RefreshCw size={24} className="animate-spin text-[#E8002D]" />
      <span className="text-xs f1-mono uppercase tracking-widest">{label}</span>
    </div>
  );
}
