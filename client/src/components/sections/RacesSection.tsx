// F1 2026 Dashboard — Races Section
// Design: Timeline layout with completed/upcoming status indicators

import { useState } from "react";
import { Race, RACES_2026 } from "@/lib/f1Data";
import { CheckCircle, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import CircuitProfileModal from "@/components/CircuitProfileModal";

const CIRCUIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-circuit-abstract-3WGaeLDJCs6BJEEFCT6Lq9.webp";

export default function RacesSection() {
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all");
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = RACES_2026.filter(r => {
    if (filter === "completed") return r.status === "completed";
    if (filter === "upcoming") return r.status === "upcoming" || r.status === "next";
    return true;
  });

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#E8002D]" />
            <div>
              <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">2026 Season</div>
              <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Races</h2>
            </div>
          </div>
          <p className="text-gray-500 text-sm ml-4 mt-1">24 Grands Prix across 5 continents</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-sm p-1">
          {(["all", "completed", "upcoming"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors f1-mono capitalize ${filter === f ? "bg-[#1A1A2E] text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Season Banner */}
      <div className="relative rounded-sm overflow-hidden h-36 mb-6">
        <img src={CIRCUIT_IMG} alt="Circuit" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1A1A2E]/70 flex items-center px-6 gap-8">
          {[
            { label: "Total Races", value: "24" },
            { label: "Sprint Weekends", value: "6" },
            { label: "Continents", value: "5" },
            { label: "New Circuits", value: "1" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="text-white f1-stat-number text-3xl font-black">{value}</div>
              <div className="text-white/50 text-[13px] f1-mono uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Race List */}
      <div className="space-y-2">
        {filtered.map((race) => {
          const isCompleted = race.status === "completed";
          const isNext = race.status === "next";

          return (
            <div
              key={race.round}
              className={cn(
                "bg-white border rounded-sm overflow-hidden shadow-sm transition-all duration-200",
                isNext ? "border-[#E8002D]/40 shadow-md" : "border-gray-100",
                isCompleted ? "opacity-90" : ""
              )}
            >
              {/* Race Row */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setSelectedRace(race);
                  setModalOpen(true);
                }}
              >
                {/* Round number */}
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center text-sm font-black f1-display shrink-0 rounded-sm",
                  isCompleted ? "bg-green-500 text-white" :
                  isNext ? "bg-[#E8002D] text-white" :
                  "bg-gray-100 text-gray-500"
                )}>
                  {race.round}
                </div>

                {/* Status icon */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle size={14} className="text-green-500" />
                  ) : isNext ? (
                    <div className="w-2 h-2 bg-[#E8002D] rounded-full animate-pulse" />
                  ) : (
                    <Clock size={14} className="text-gray-300" />
                  )}
                </div>

                {/* Flag */}
                <div className="text-xl shrink-0">{race.flag}</div>

                {/* Race Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#1A1A2E] truncate">{race.name}</span>
                    {race.isSprint && (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5 rounded-sm f1-mono font-medium flex items-center gap-1 shrink-0">
                        <Zap size={10} /> SPRINT
                      </span>
                    )}
                    {isNext && (
                      <span className="bg-[#E8002D]/10 text-[#E8002D] text-xs px-1.5 py-0.5 rounded-sm f1-mono font-medium shrink-0">
                        NEXT
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 f1-mono">{race.circuit}</div>
                </div>

                {/* Date */}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="text-sm text-gray-600 f1-mono">{race.date}</div>
                  {isCompleted && race.winner && (
                    <div className="text-sm text-green-600 font-medium">🏆 {race.winner}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CircuitProfileModal
        race={selectedRace}
        open={modalOpen}
        onOpenChange={setModalOpen}
        races={RACES_2026}
        onRaceChange={(r) => setSelectedRace(r)}
      />
    </div>
  );
}
