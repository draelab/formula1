// F1 2026 Dashboard — Constructor Profile Modal
// Full team profile with car, drivers, performance radar, and technical analysis

import { useState, useMemo, useEffect } from "react";
import { CONSTRUCTORS_2026, CAR_SPECS_2026, DRIVERS_2026, TEAM_COLORS, TEAM_CAR_IMAGES, TEAM_LOGOS } from "@/lib/f1Data";
import { useRaceResults } from "@/hooks/useF1LiveData";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight, Trophy, Gauge, Hash, Zap, Settings, ChevronDown, CheckCircle, XCircle } from "lucide-react";

interface ConstructorProfileModalProps {
  teamName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teamNames?: string[];
  onTeamChange?: (teamName: string) => void;
}

const RADAR_DATA_2026: Record<string, number[]> = {
  "Mercedes":        [96, 91, 88, 90, 92, 86],
  "Ferrari":         [89, 93, 91, 88, 84, 89],
  "McLaren":         [89, 88, 92, 87, 86, 93],
  "Red Bull Racing": [83, 90, 86, 85, 85, 94],
  "Haas":            [88, 73, 76, 82, 78, 74],
  "Racing Bulls":    [83, 75, 78, 80, 76, 71],
  "Audi":            [74, 71, 73, 72, 72, 76],
  "Alpine":          [88, 74, 76, 79, 74, 78],
  "Williams":        [88, 75, 77, 80, 75, 80],
  "Cadillac":        [88, 66, 68, 68, 66, 75],
  "Aston Martin":    [84, 72, 75, 76, 73, 82],
};

const getRadarData = (team: string) => {
  const vals = RADAR_DATA_2026[team] ?? [70, 70, 70, 70, 70, 70];
  return [
    { subject: "Power", A: vals[0] },
    { subject: "Aero", A: vals[1] },
    { subject: "Mech. Grip", A: vals[2] },
    { subject: "Reliability", A: vals[3] },
    { subject: "Strategy", A: vals[4] },
    { subject: "Driver", A: vals[5] },
  ];
};

export default function ConstructorProfileModal({
  teamName,
  open,
  onOpenChange,
  teamNames,
  onTeamChange,
}: ConstructorProfileModalProps) {
  const [techOpen, setTechOpen] = useState(false);
  useEffect(() => { setTechOpen(false); }, [teamName]);
  const { races, isLoading: racesLoading } = useRaceResults();

  const currentIndex = teamName && teamNames ? teamNames.indexOf(teamName) : -1;
  const hasPrev = teamNames && currentIndex > 0;
  const hasNext = teamNames && currentIndex >= 0 && currentIndex < teamNames.length - 1;

  const constructorData = teamName ? CONSTRUCTORS_2026.find((c) => c.name === teamName) : null;
  const carSpec = teamName ? CAR_SPECS_2026.find((c) => c.team === teamName) : null;
  const teamDrivers = teamName ? DRIVERS_2026.filter((d) => d.team === teamName) : [];
  const teamColor = teamName ? TEAM_COLORS[teamName] || "#888" : "#888";
  const carImage = teamName ? TEAM_CAR_IMAGES[teamName] : undefined;
  const teamLogo = teamName ? TEAM_LOGOS[teamName] : undefined;

  const latestRaceResult = useMemo(() => {
    if (!teamName || races.length === 0) return null;
    const lastRace = races[races.length - 1];
    if (!lastRace?.results?.length) return null;
    const teamResults = lastRace.results
      .filter((r: any) => r.team === teamName)
      .sort((a: any, b: any) => Number(a.position) - Number(b.position));
    if (teamResults.length === 0) return null;
    return { race: lastRace, teamResults };
  }, [races, teamName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-6xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background border-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{teamName} — Constructor Profile</DialogTitle>

        {/* Navigation buttons */}
        <div className="sticky top-0 left-0 right-0 h-0 z-50 pointer-events-none" style={{ top: 'calc(50vh - 60px)' }}>
          {hasPrev && (
            <button
              onClick={() => onTeamChange?.(teamNames![currentIndex - 1])}
              aria-label="Previous team"
              className="absolute left-3 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onTeamChange?.(teamNames![currentIndex + 1])}
              aria-label="Next team"
              className="absolute right-3 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {!teamName ? null : (<>

        {/* Header band — team color background */}
        <div className="relative overflow-hidden" style={{ backgroundColor: teamColor }}>
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close constructor profile"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            ✕
          </button>

          {/* Car image — large and centered */}
          <div className="flex items-center justify-center px-6 pt-6 pb-10">
            <div className="h-56 md:h-72 w-full flex items-center justify-center">
              {carImage && (
                <img
                  src={carImage}
                  alt={`${teamName} car`}
                  className="h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </div>
          </div>

          {/* Team name overlay — bottom left */}
          <div className="absolute bottom-0 left-0 p-4">
            <h2 className="f1-display text-2xl md:text-3xl font-black uppercase leading-none text-white drop-shadow-lg">
              {teamName}
            </h2>
            <div className="text-white/70 text-sm f1-mono mt-1 drop-shadow">
              {constructorData?.chassis} · {constructorData?.powerUnit}
            </div>
          </div>

          {/* Team logo overlay — bottom right */}
          {teamLogo && (
            <div className="absolute bottom-3 right-4">
              <img
                src={teamLogo}
                alt={`${teamName} logo`}
                className="h-10 md:h-12 object-contain opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Identity & Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left column — team identity */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-white font-black f1-stat-number text-lg"
                  style={{ backgroundColor: teamColor }}
                >
                  P{constructorData?.position}
                </div>
                <div>
                  <div className="f1-display text-2xl font-black uppercase text-foreground">{teamName}</div>
                  <div className="text-sm text-muted-foreground f1-mono">{constructorData?.chassis} · {constructorData?.powerUnit}</div>
                </div>
              </div>

              {carSpec?.activeAero && (
                <div className="inline-flex items-center gap-1 bg-yellow-400 text-[#1A1A2E] px-2 py-0.5 text-xs font-bold f1-mono rounded-sm mb-3">
                  <Zap size={10} /> ACTIVE AERO
                </div>
              )}

              {carSpec?.keyFeatures && carSpec.keyFeatures.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                  {carSpec.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: teamColor }} />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right column — 2026 Drivers */}
            <div>
              <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest mb-2">2026 Drivers</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {teamDrivers.map((driver) => (
                  <div key={driver.number} className="bg-card border border-border rounded-sm p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-8 h-8 rounded-sm flex items-center justify-center font-black f1-stat-number text-sm"
                        style={{ backgroundColor: `${teamColor}20`, color: teamColor }}
                      >
                        {driver.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground">{driver.name}</div>
                        <div className="text-sm text-muted-foreground f1-mono">
                          {driver.nationality} {driver.flag} · {driver.points} pts
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "POSITION", value: constructorData?.position ?? "—", icon: Hash },
              { label: "POINTS", value: constructorData?.points ?? "—", icon: Gauge },
              { label: "WINS", value: constructorData?.wins ?? "—", icon: Trophy },
              { label: "PODIUMS", value: constructorData?.podiums ?? "—", icon: Trophy },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-card rounded-sm p-3 border border-border text-center">
                <Icon size={14} className="mx-auto mb-1 text-muted-foreground" />
                <div className="font-black f1-stat-number text-lg text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground f1-mono">{label}</div>
              </div>
            ))}
          </div>

          {/* Performance & Latest Result */}
          <div className={`grid gap-4 ${(racesLoading || latestRaceResult || constructorData?.australiaResult) ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
            {/* Performance Radar */}
            <div className="bg-card border border-border rounded-sm p-4 shadow-sm">
              <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest mb-2">Performance Indices</div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={getRadarData(teamName)}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fontSize: 12, fontFamily: "IBM Plex Mono", fill: "#888" }}
                  />
                  <Radar
                    name={teamName}
                    dataKey="A"
                    stroke={teamColor}
                    fill={teamColor}
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="text-sm text-muted-foreground f1-mono text-center mt-1">Estimated performance indices</div>
            </div>

            {/* Latest Race Result */}
            {(racesLoading || latestRaceResult || constructorData?.australiaResult) && (
              <div className="bg-card rounded-sm p-4">
                {racesLoading ? (
                  <div className="text-muted-foreground text-[13px] f1-mono uppercase tracking-widest">Loading latest result...</div>
                ) : latestRaceResult ? (
                  <>
                    <div className="text-muted-foreground text-xs f1-mono uppercase tracking-widest mb-2">
                      Latest Race — {latestRaceResult.race.name}
                    </div>
                    <div className="space-y-2">
                      {latestRaceResult.teamResults.map((r: any, i: number) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-card-foreground font-black f1-stat-number text-sm">P{r.position}</span>
                            <span className="text-card-foreground text-sm">{r.driver}</span>
                          </div>
                          <span className="text-muted-foreground text-sm f1-mono">{r.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : constructorData?.australiaResult ? (
                  <>
                    <div className="text-muted-foreground text-xs f1-mono uppercase tracking-widest mb-2">
                      Australian GP Result
                    </div>
                    <div className="text-card-foreground font-bold f1-mono text-sm">{constructorData.australiaResult}</div>
                  </>
                ) : null}
              </div>
            )}
          </div>

          {/* Collapsible Technical Analysis */}
          {carSpec && (
            <Collapsible open={techOpen} onOpenChange={setTechOpen} className="mb-6">
              <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-sm p-4 shadow-sm hover:border-muted-foreground/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <Settings size={14} className="text-[#E8002D]" />
                  <span className="f1-display text-sm font-black text-foreground uppercase tracking-wide">Technical Analysis</span>
                </div>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${techOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-2">
                {/* Tech Specs Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Chassis", value: carSpec.chassis },
                    { label: "Power Unit", value: carSpec.powerUnit },
                    { label: "Engine Config", value: carSpec.engineConfig },
                    { label: "Displacement", value: carSpec.displacement },
                    { label: "Max RPM", value: carSpec.maxRPM || "~15,000 rpm" },
                    { label: "Hybrid System", value: carSpec.hybridSystem },
                    { label: "MGU-K Power", value: carSpec.mguKPower },
                    { label: "Total Power", value: carSpec.totalPower },
                    { label: "Weight (w/ driver)", value: carSpec.weight },
                    { label: "Gearbox", value: carSpec.gearbox },
                    { label: "Front Suspension", value: carSpec.frontSuspension },
                    { label: "Rear Suspension", value: carSpec.rearSuspension },
                    { label: "Brakes", value: carSpec.brakes },
                    { label: "Wheels", value: carSpec.wheels },
                    { label: "Fuel", value: carSpec.fuel },
                    { label: "Active Aero", value: carSpec.activeAero ? "Yes — X/Z Mode" : "No" },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-muted rounded-sm p-2.5">
                      <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest">{label}</div>
                      <div className="text-sm font-medium text-foreground mt-0.5 f1-mono">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Strengths & Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="bg-card border border-border rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="f1-display text-sm font-black text-foreground uppercase tracking-wide">Strengths</span>
                    </div>
                    <div className="space-y-1.5">
                      {carSpec.strengths?.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                          <span className="leading-relaxed">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="bg-card border border-border rounded-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle size={14} className="text-red-500" />
                      <span className="f1-display text-sm font-black text-foreground uppercase tracking-wide">Challenges</span>
                    </div>
                    <div className="space-y-1.5">
                      {carSpec.weaknesses?.map((w, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                          <span className="leading-relaxed">{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
        </>)}
      </DialogContent>
    </Dialog>
  );
}
