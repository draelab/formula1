// F1 2026 Dashboard — Circuit Profile Modal
// Full track layout, circuit stats, history, and race result/prediction

import { Race, CircuitWinner } from "@/lib/f1Data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Trophy, Timer, MapPin, Mountain, Ruler, CornerDownRight, Flag, Zap } from "lucide-react";

interface CircuitProfileModalProps {
  race: Race | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  races?: Race[];
  onRaceChange?: (race: Race) => void;
}

export default function CircuitProfileModal({
  race,
  open,
  onOpenChange,
  races,
  onRaceChange,
}: CircuitProfileModalProps) {
  const currentIndex = race && races ? races.findIndex((r) => r.round === race.round) : -1;
  const hasPrev = races && currentIndex > 0;
  const hasNext = races && currentIndex >= 0 && currentIndex < races.length - 1;

  const isCompleted = race?.status === "completed";
  const isNext = race?.status === "next";
  const typeLabel = race?.circuitType === "street" ? "STREET" : race?.circuitType === "hybrid" ? "HYBRID" : "PERMANENT";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-6xl max-h-[85vh] overflow-y-auto p-0 gap-0 bg-background border-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{race?.name ?? "Circuit"} — Circuit Profile</DialogTitle>

        {/* Navigation buttons */}
        <div className="sticky top-0 left-0 right-0 h-0 z-50 pointer-events-none" style={{ top: 'calc(50vh - 60px)' }}>
          {hasPrev && (
            <button
              onClick={() => onRaceChange?.(races![currentIndex - 1])}
              aria-label="Previous race"
              className="absolute left-3 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onRaceChange?.(races![currentIndex + 1])}
              aria-label="Next race"
              className="absolute right-3 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {!race ? null : (<>

        {/* Header band */}
        <div className="relative overflow-hidden bg-card">
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close circuit profile"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            ✕
          </button>

          {/* Track layout image — primary focus */}
          <div className="flex flex-col items-center p-6 pb-16">
            {race.trackImage && (
              <div className="w-full max-w-2xl mx-auto flex items-center justify-center">
                <img
                  src={race.trackImage}
                  alt={`${race.circuit} layout`}
                  className="w-full h-auto object-contain opacity-90"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-transparent to-transparent h-40 pointer-events-none" />

          {/* Race info overlay — bottom-left */}
          <div className="absolute bottom-0 left-0 p-6 z-[1]">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="f1-display text-3xl md:text-4xl font-black uppercase leading-none text-white">
                {race.name}
              </h2>
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
            <div className="text-white/70 text-sm f1-mono mb-1">{race.circuit}</div>
            <div className="flex items-center gap-3 text-sm text-white/80 flex-wrap">
              <span className="text-white/50 text-[13px] f1-mono uppercase tracking-widest">
                Round {race.round} · {race.date}
              </span>
              <span className="flex items-center gap-1">
                <span className="text-lg">{race.flag}</span>
                {race.location}, {race.country}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">{race.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground f1-mono flex-wrap">
              {race.circuitType && (
                <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-sm uppercase">{typeLabel}</span>
              )}
              {race.altitude !== undefined && (
                <span className="flex items-center gap-1">
                  <Mountain size={12} /> {race.altitude}m altitude
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
            <h3 className="f1-display text-sm font-black text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
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
                <div key={label} className="bg-card rounded-sm p-3 border border-border text-center">
                  <Icon size={14} className="mx-auto mb-1 text-muted-foreground" />
                  <div className="font-black f1-stat-number text-lg text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground f1-mono">{label}</div>
                </div>
              ))}
            </div>

            {race.lapRecord && (
              <div className="mt-2 bg-card rounded-sm p-3 border border-border flex items-center gap-2">
                <Timer size={14} className="text-[#E8002D] shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground f1-mono">Lap Record</div>
                  <div className="text-sm font-bold f1-mono text-foreground">
                    {race.lapRecord} — {race.lapRecordHolder} ({race.lapRecordYear})
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Track History */}
          <div>
            <h3 className="f1-display text-sm font-black text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E8002D] inline-block" />
              Track History
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Past Winners */}
              <div>
                <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest mb-2">Recent Winners</div>
                {race.pastWinners && race.pastWinners.length > 0 ? (
                  <div className="space-y-1">
                    {race.pastWinners.map((w: CircuitWinner, i: number) => (
                      <div key={w.year} className="flex items-center gap-2 bg-card rounded-sm p-2 border border-border">
                        <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold f1-mono rounded-sm ${
                          i === 0 ? "bg-yellow-400 text-[#1A1A2E]" :
                          i === 1 ? "bg-muted text-foreground" :
                          i === 2 ? "bg-amber-600 text-white" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {w.year.toString().slice(-2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-foreground truncate">{w.driver}</div>
                          <div className="text-sm text-muted-foreground f1-mono truncate">{w.team}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground f1-mono">No historical data available (new circuit)</p>
                )}
              </div>

              {/* Circuit Facts */}
              <div>
                <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest mb-2">Circuit Facts</div>
                <div className="space-y-2">
                  {race.yearBuilt && (
                    <div className="bg-card rounded-sm p-3">
                      <div className="text-muted-foreground text-xs f1-mono uppercase">Year Built</div>
                      <div className="text-card-foreground font-black f1-stat-number text-lg">{race.yearBuilt}</div>
                    </div>
                  )}
                  {race.numberOfGrandsPrix !== undefined && (
                    <div className="bg-card rounded-sm p-3">
                      <div className="text-muted-foreground text-xs f1-mono uppercase">Total Grands Prix</div>
                      <div className="text-card-foreground font-black f1-stat-number text-lg">{race.numberOfGrandsPrix || "Debut"}</div>
                    </div>
                  )}
                </div>

                {race.notableFacts && race.notableFacts.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {race.notableFacts.map((fact, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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
              <h3 className="f1-display text-sm font-black text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[#E8002D] inline-block" />
                {isCompleted ? "Race Result" : isNext ? "Race Preview" : "Prediction"}
              </h3>

              {isCompleted ? (
                <div className="bg-card rounded-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm f1-mono">Winner</span>
                    <span className="text-yellow-400 font-bold text-sm flex items-center gap-1">
                      <Trophy size={12} /> {race.winner}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm f1-mono">Team</span>
                    <span className="text-card-foreground text-sm">{race.winnerTeam}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm f1-mono">Pole Position</span>
                    <span className="text-card-foreground text-sm">{race.polePosition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm f1-mono">Fastest Lap</span>
                    <span className="text-[#E8002D] text-sm">{race.fastestLap}</span>
                  </div>
                </div>
              ) : race.prediction ? (
                <div className="bg-card rounded-sm p-4">
                  <div className="text-muted-foreground text-[13px] f1-mono uppercase tracking-widest mb-1">Prediction</div>
                  <p className="text-card-foreground text-sm leading-relaxed">{race.prediction}</p>
                  {race.predictionFavorite && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-muted-foreground text-sm f1-mono">Favourite:</span>
                      <span className="text-[#E8002D] text-sm font-bold f1-display">{race.predictionFavorite}</span>
                      {race.predictionOdds && <span className="text-muted-foreground text-sm f1-mono">({race.predictionOdds})</span>}
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
