// F1 2026 Dashboard — Race Calendar Section
// Design: Timeline layout with completed/upcoming status indicators

import { useState } from "react";
import { RACES_2026 } from "@/lib/f1Data";
import { CheckCircle, Clock, Zap, MapPin, Timer, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const CIRCUIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-circuit-abstract-3WGaeLDJCs6BJEEFCT6Lq9.webp";

export default function RacesSection() {
  const [expanded, setExpanded] = useState<number | null>(2); // Default open next race
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming">("all");

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
              <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest">2026 Season</div>
              <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Race Calendar</h2>
            </div>
          </div>
          <p className="text-gray-500 text-sm ml-4 mt-1">24 Grands Prix across 5 continents</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-sm p-1">
          {(["all", "completed", "upcoming"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors f1-mono capitalize ${filter === f ? "bg-[#1A1A2E] text-white" : "text-gray-500 hover:text-gray-700"}`}
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
              <div className="text-white/50 text-xs f1-mono uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Race List */}
      <div className="space-y-2">
        {filtered.map((race) => {
          const isExpanded = expanded === race.round;
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
                onClick={() => setExpanded(isExpanded ? null : race.round)}
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
                  <div className="text-xs text-gray-400 f1-mono">{race.circuit}</div>
                </div>

                {/* Date */}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="text-sm text-gray-600 f1-mono">{race.date}</div>
                  {isCompleted && race.winner && (
                    <div className="text-xs text-green-600 font-medium">🏆 {race.winner}</div>
                  )}
                </div>

                {/* Expand */}
                <div className="shrink-0 ml-2">
                  {isExpanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-300" />}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-gray-100 px-4 pb-4 pt-3 bg-gray-50/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Circuit Info */}
                    <div>
                      <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">Circuit Details</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Length", value: race.circuitLength ? `${race.circuitLength} km` : "—" },
                          { label: "Turns", value: race.turns || "—" },
                          { label: "Race Distance", value: race.raceDistance ? `${race.raceDistance} km` : "—" },
                          { label: "Laps", value: race.laps || "—" },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-white rounded-sm p-2 border border-gray-100">
                            <div className="text-xs text-gray-400 f1-mono">{label}</div>
                            <div className="font-semibold text-sm text-[#1A1A2E] f1-mono">{value}</div>
                          </div>
                        ))}
                      </div>

                      {race.lapRecord && race.lapRecord !== "N/A (new circuit)" && (
                        <div className="mt-2 bg-white rounded-sm p-2 border border-gray-100 flex items-center gap-2">
                          <Timer size={12} className="text-[#E8002D] shrink-0" />
                          <div>
                            <div className="text-xs text-gray-400 f1-mono">Lap Record</div>
                            <div className="text-sm font-bold f1-mono text-[#1A1A2E]">{race.lapRecord} — {race.lapRecordHolder} ({race.lapRecordYear})</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Race Result or Description */}
                    <div>
                      {isCompleted ? (
                        <div>
                          <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">Race Result</div>
                          <div className="bg-[#1A1A2E] rounded-sm p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-xs f1-mono">Winner</span>
                              <span className="text-yellow-400 font-bold text-sm">🏆 {race.winner}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-xs f1-mono">Team</span>
                              <span className="text-white text-sm">{race.winnerTeam}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-xs f1-mono">Pole Position</span>
                              <span className="text-white text-sm">{race.polePosition}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-white/60 text-xs f1-mono">Fastest Lap</span>
                              <span className="text-[#E8002D] text-sm">{race.fastestLap}</span>
                            </div>
                          </div>
                          {race.description && (
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{race.description}</p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">
                            {isNext ? "Race Preview" : "Circuit Overview"}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{race.description}</p>
                          {race.prediction && (
                            <div className="mt-3 bg-[#1A1A2E] rounded-sm p-3">
                              <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Prediction</div>
                              <p className="text-white/80 text-xs leading-relaxed">{race.prediction}</p>
                              {race.predictionFavorite && (
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="text-white/40 text-xs f1-mono">Favourite:</span>
                                  <span className="text-[#E8002D] text-sm font-bold f1-display">{race.predictionFavorite}</span>
                                  {race.predictionOdds && <span className="text-white/40 text-xs f1-mono">({race.predictionOdds})</span>}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
