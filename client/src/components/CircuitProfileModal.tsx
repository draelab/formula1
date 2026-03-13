// F1 2026 Dashboard — Circuit Profile Modal
// Full track layout, circuit stats, history, and race result/prediction

import { Race, CircuitWinner } from "@/lib/f1Data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Timer, MapPin, Calendar, Mountain, Ruler, CornerDownRight, Flag, Zap } from "lucide-react";

interface CircuitProfileModalProps {
  race: Race | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CircuitProfileModal({
  race,
  open,
  onOpenChange,
}: CircuitProfileModalProps) {
  const isCompleted = race?.status === "completed";
  const isNext = race?.status === "next";
  const typeLabel = race?.circuitType === "street" ? "STREET" : race?.circuitType === "hybrid" ? "HYBRID" : "PERMANENT";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl max-h-[85vh] overflow-y-auto p-0 gap-0 bg-[#F8F7F4] border-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{race?.name ?? "Circuit"} — Circuit Profile</DialogTitle>
        {!race ? null : (<>

        {/* Header band */}
        <div className="relative overflow-hidden bg-[#1A1A2E]">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close circuit profile"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            ✕
          </button>

          <div className="flex items-end gap-6 p-6">
            {/* Track layout image */}
            {race.trackImage && (
              <div className="w-48 h-36 md:w-64 md:h-44 flex-shrink-0 flex items-center justify-center">
                <img
                  src={race.trackImage}
                  alt={`${race.circuit} layout`}
                  className="w-full h-full object-contain opacity-90"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Race info */}
            <div className="flex-1 pb-2 text-white">
              <div className="text-white/50 text-xs f1-mono uppercase tracking-widest mb-1">
                Round {race.round} · {race.date}
              </div>
              <h2 className="f1-display text-3xl md:text-4xl font-black uppercase leading-none mb-2">
                {race.name}
              </h2>
              <div className="text-white/70 text-sm f1-mono mb-2">{race.circuit}</div>
              <div className="flex items-center gap-4 text-sm text-white/80 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="text-lg">{race.flag}</span>
                  {race.location}, {race.country}
                </span>
                {race.isSprint && (
                  <span className="bg-yellow-400 text-[#1A1A2E] px-2 py-0.5 text-xs font-bold f1-mono rounded-sm flex items-center gap-1">
                    <Zap size={10} /> SPRINT
                  </span>
                )}
                {isNext && (
                  <span className="bg-[#E8002D] text-white px-2 py-0.5 text-xs font-bold f1-mono rounded-sm">
                    NEXT RACE
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Description */}
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">{race.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 f1-mono flex-wrap">
              {race.circuitType && (
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm uppercase">{typeLabel}</span>
              )}
              {race.altitude !== undefined && (
                <span className="flex items-center gap-1">
                  <Mountain size={12} /> {race.altitude}m altitude
                </span>
              )}
              {race.firstGrandPrix && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> First GP: {race.firstGrandPrix}
                </span>
              )}
              {race.numberOfGrandsPrix !== undefined && race.numberOfGrandsPrix > 0 && (
                <span className="flex items-center gap-1">
                  <Flag size={12} /> {race.numberOfGrandsPrix} GPs held
                </span>
              )}
            </div>
          </div>

          {/* Circuit Stats */}
          <div>
            <h3 className="f1-display text-sm font-black text-[#1A1A2E] uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E8002D] inline-block" />
              Circuit Statistics
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: "LENGTH", value: race.circuitLength ? `${race.circuitLength} km` : "—", icon: Ruler },
                { label: "TURNS", value: race.turns || "—", icon: CornerDownRight },
                { label: "DISTANCE", value: race.raceDistance ? `${race.raceDistance} km` : "—", icon: MapPin },
                { label: "LAPS", value: race.laps || "—", icon: Flag },
                { label: "DRS ZONES", value: race.drsZones || "—", icon: Zap },
                { label: "ALTITUDE", value: race.altitude !== undefined ? `${race.altitude}m` : "—", icon: Mountain },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white rounded-sm p-3 border border-gray-100 text-center">
                  <Icon size={14} className="mx-auto mb-1 text-gray-300" />
                  <div className="font-black f1-stat-number text-lg text-[#1A1A2E]">{value}</div>
                  <div className="text-[10px] text-gray-400 f1-mono">{label}</div>
                </div>
              ))}
            </div>

            {race.lapRecord && race.lapRecord !== "N/A (new circuit)" && (
              <div className="mt-2 bg-white rounded-sm p-3 border border-gray-100 flex items-center gap-2">
                <Timer size={14} className="text-[#E8002D] shrink-0" />
                <div>
                  <div className="text-xs text-gray-400 f1-mono">Lap Record</div>
                  <div className="text-sm font-bold f1-mono text-[#1A1A2E]">
                    {race.lapRecord} — {race.lapRecordHolder} ({race.lapRecordYear})
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Track History */}
          <div>
            <h3 className="f1-display text-sm font-black text-[#1A1A2E] uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E8002D] inline-block" />
              Track History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Past Winners */}
              <div>
                <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">Recent Winners</div>
                {race.pastWinners && race.pastWinners.length > 0 ? (
                  <div className="space-y-1">
                    {race.pastWinners.map((w: CircuitWinner, i: number) => (
                      <div key={w.year} className="flex items-center gap-2 bg-white rounded-sm p-2 border border-gray-100">
                        <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold f1-mono rounded-sm ${
                          i === 0 ? "bg-yellow-400 text-[#1A1A2E]" :
                          i === 1 ? "bg-gray-300 text-[#1A1A2E]" :
                          i === 2 ? "bg-amber-600 text-white" :
                          "bg-gray-100 text-gray-500"
                        }`}>
                          {w.year.toString().slice(-2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-[#1A1A2E] truncate">{w.driver}</div>
                          <div className="text-xs text-gray-400 f1-mono truncate">{w.team}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 f1-mono">No historical data available (new circuit)</p>
                )}
              </div>

              {/* Circuit Facts */}
              <div>
                <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">Circuit Facts</div>
                <div className="space-y-2">
                  {race.yearBuilt && (
                    <div className="bg-[#1A1A2E] rounded-sm p-3">
                      <div className="text-white/40 text-[10px] f1-mono uppercase">Year Built</div>
                      <div className="text-white font-black f1-stat-number text-lg">{race.yearBuilt}</div>
                    </div>
                  )}
                  {race.firstGrandPrix && (
                    <div className="bg-[#1A1A2E] rounded-sm p-3">
                      <div className="text-white/40 text-[10px] f1-mono uppercase">First Grand Prix</div>
                      <div className="text-white font-black f1-stat-number text-lg">{race.firstGrandPrix}</div>
                    </div>
                  )}
                  {race.numberOfGrandsPrix !== undefined && (
                    <div className="bg-[#1A1A2E] rounded-sm p-3">
                      <div className="text-white/40 text-[10px] f1-mono uppercase">Total Grands Prix</div>
                      <div className="text-white font-black f1-stat-number text-lg">{race.numberOfGrandsPrix || "Debut"}</div>
                    </div>
                  )}
                </div>

                {race.notableFacts && race.notableFacts.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {race.notableFacts.map((fact, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-[#E8002D] mt-0.5 shrink-0">·</span>
                        <span className="leading-relaxed">{fact}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Race Result or Prediction */}
          {(isCompleted || race.prediction) && (
            <div>
              <h3 className="f1-display text-sm font-black text-[#1A1A2E] uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#E8002D] inline-block" />
                {isCompleted ? "Race Result" : isNext ? "Race Preview" : "Prediction"}
              </h3>

              {isCompleted ? (
                <div className="bg-[#1A1A2E] rounded-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs f1-mono">Winner</span>
                    <span className="text-yellow-400 font-bold text-sm flex items-center gap-1">
                      <Trophy size={12} /> {race.winner}
                    </span>
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
              ) : race.prediction ? (
                <div className="bg-[#1A1A2E] rounded-sm p-4">
                  <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Prediction</div>
                  <p className="text-white/80 text-xs leading-relaxed">{race.prediction}</p>
                  {race.predictionFavorite && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-white/40 text-xs f1-mono">Favourite:</span>
                      <span className="text-[#E8002D] text-sm font-bold f1-display">{race.predictionFavorite}</span>
                      {race.predictionOdds && <span className="text-white/40 text-xs f1-mono">({race.predictionOdds})</span>}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
        </>)}
      </DialogContent>
    </Dialog>
  );
}
