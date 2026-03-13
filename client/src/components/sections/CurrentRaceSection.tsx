// F1 2026 Dashboard — Current Race Weekend Section
// Shows any race weekend with all session results, navigable by round

import { useState, useMemo } from "react";
import {
  useSchedule,
  useRaceResults,
  useQualifying,
  useSprintResults,
  useSprintQualifying,
  usePracticeSessions,
  useDriverStandings,
} from "@/hooks/useF1LiveData";
import { RACES_2026, VENUE_IMAGES } from "@/lib/f1Data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Clock, Trophy, Zap } from "lucide-react";

// ─── Circuit name mapping for OpenF1 API ─────────────────────────────────────
const CIRCUIT_SHORT_NAMES: Record<string, string> = {
  "Albert Park Circuit": "Albert Park",
  "Albert Park Grand Prix Circuit": "Albert Park",
  "Shanghai International Circuit": "Shanghai",
  "Suzuka Circuit": "Suzuka",
  "Bahrain International Circuit": "Bahrain",
  "Jeddah Corniche Circuit": "Jeddah",
  "Miami International Autodrome": "Miami",
  "Circuit Gilles Villeneuve": "Montreal",
  "Circuit de Monaco": "Monaco",
  "Circuit de Barcelona-Catalunya": "Barcelona",
  "Red Bull Ring": "Spielberg",
  "Silverstone Circuit": "Silverstone",
  "Circuit de Spa-Francorchamps": "Spa-Francorchamps",
  "Hungaroring": "Hungaroring",
  "Circuit Park Zandvoort": "Zandvoort",
  "Autodromo Nazionale di Monza": "Monza",
  "Baku City Circuit": "Baku",
  "Marina Bay Street Circuit": "Singapore",
  "Circuit of the Americas": "Austin",
  "Autódromo Hermanos Rodríguez": "Mexico City",
  "Autódromo José Carlos Pace": "São Paulo",
  "Las Vegas Strip Circuit": "Las Vegas",
  "Losail International Circuit": "Losail",
  "Yas Marina Circuit": "Yas Island",
};

// ─── Constructor ID to display name ──────────────────────────────────────────
const CONSTRUCTOR_ID_TO_DISPLAY: Record<string, string> = {
  mercedes: "Mercedes",
  ferrari: "Ferrari",
  mclaren: "McLaren",
  red_bull: "Red Bull Racing",
  haas: "Haas",
  rb: "Racing Bulls",
  audi: "Audi",
  alpine: "Alpine",
  williams: "Williams",
  cadillac: "Cadillac",
  aston_martin: "Aston Martin",
};

const CONSTRUCTOR_ID_TO_COLOR: Record<string, string> = {
  mercedes: "#00D2BE",
  ferrari: "#E8002D",
  mclaren: "#FF8700",
  red_bull: "#3671C6",
  haas: "#B6BABD",
  rb: "#6692FF",
  audi: "#D0D0D0",
  alpine: "#FF87BC",
  williams: "#64C4FF",
  cadillac: "#C92D4B",
  aston_martin: "#358C75",
};

type SessionTab = "FP1" | "FP2" | "FP3" | "Sprint Qualifying" | "Qualifying" | "Sprint" | "Race";

function formatLapTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toFixed(3).padStart(6, "0")}`;
}


export default function CurrentRaceSection() {
  const { races: scheduleRaces, isLoading: scheduleLoading } = useSchedule();
  const { races: raceResults, isLoading: resultsLoading } = useRaceResults();
  const { standings } = useDriverStandings();

  // Find the default round (current/most recent)
  const defaultRound = useMemo(() => {
    const nextRace = RACES_2026.find((r) => r.status === "next");
    if (nextRace) return nextRace.round;

    const completed = RACES_2026.filter((r) => r.status === "completed");
    if (completed.length > 0) return completed[completed.length - 1].round;

    if (scheduleRaces.length > 0) {
      const today = new Date();
      const past = scheduleRaces.filter(
        (r: any) => new Date(r.date) <= today
      );
      if (past.length > 0) return past[past.length - 1].round;
      return scheduleRaces[0].round;
    }

    return 1;
  }, [scheduleRaces]);

  // Round selector state
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const currentRound = selectedRound ?? defaultRound;

  // Get static race info
  const staticRace = RACES_2026.find((r) => r.round === currentRound);
  const scheduleRace = scheduleRaces.find(
    (r: any) => r.round === currentRound
  );

  const raceName = staticRace?.name ?? scheduleRace?.raceName ?? "Race";
  const circuitName =
    staticRace?.circuit ?? scheduleRace?.circuitName ?? "Circuit";
  const isSprint = staticRace?.isSprint ?? !!scheduleRace?.sprint;
  const venueImage = VENUE_IMAGES[raceName] ?? null;

  // Get OpenF1 circuit short name
  const circuitShortName = CIRCUIT_SHORT_NAMES[circuitName] ?? null;

  // Fetch session data
  const { qualifying, isLoading: qualiLoading } = useQualifying(currentRound);
  const { sprint, isLoading: sprintLoading } = useSprintResults(
    isSprint ? currentRound : null
  );
  const { sprintQualifying, isLoading: sqLoading } = useSprintQualifying(
    isSprint ? circuitShortName : null
  );
  const { practice, isLoading: practiceLoading } =
    usePracticeSessions(circuitShortName);

  // Get race result for this round
  const raceResult = raceResults.find((r: any) => r.round === currentRound);

  // Build driver number-to-name map from standings
  const driverNumberMap = useMemo(() => {
    const map: Record<number, { name: string; team: string; code: string }> =
      {};
    for (const d of standings ?? []) {
      if (d.number) {
        map[Number(d.number)] = {
          name: d.name ?? `${d.givenName ?? ""} ${d.familyName ?? ""}`.trim(),
          team: d.team ?? "Unknown",
          code: d.shortName ?? d.code ?? "???",
        };
      }
    }
    return map;
  }, [standings]);

  // Determine available session tabs based on weekend type
  const availableTabs = useMemo(() => {
    const tabs: SessionTab[] = [];
    if (isSprint) {
      // Sprint weekend: FP1, Sprint Qualifying, Sprint, Qualifying, Race
      tabs.push("FP1", "Sprint Qualifying", "Sprint", "Qualifying", "Race");
    } else {
      // Normal weekend: FP1, FP2, FP3, Qualifying, Race
      tabs.push("FP1", "FP2", "FP3", "Qualifying", "Race");
    }
    return tabs;
  }, [isSprint]);

  // Default to last completed session (reverse chronological order)
  const [activeTab, setActiveTab] = useState<SessionTab | null>(null);
  const effectiveTab = useMemo(() => {
    if (activeTab && availableTabs.includes(activeTab)) return activeTab;
    // Auto-select: last completed session in weekend order
    if (raceResult?.results?.length) return "Race";
    if (sprint?.results?.length) return "Sprint";
    if (qualifying?.results?.length) return "Qualifying";
    if (isSprint && sprintQualifying?.results?.length) return "Sprint Qualifying";
    // Check practice sessions in reverse (FP3 > FP2 > FP1)
    const fpTabs = availableTabs.filter(t => t.startsWith("FP"));
    for (let i = fpTabs.length - 1; i >= 0; i--) {
      const fpNum = fpTabs[i].replace("FP", "");
      const hasData = practice?.sessions?.some(
        (s: any) => s.sessionName === `Practice ${fpNum}` && s.results?.length > 0
      );
      if (hasData) return fpTabs[i];
    }
    return availableTabs[0] ?? "Race";
  }, [activeTab, availableTabs, raceResult, sprint, qualifying, sprintQualifying, practice, isSprint]);

  // Reset active tab when round changes
  const handleRoundChange = (round: number) => {
    setSelectedRound(round);
    setActiveTab(null);
  };

  // Round navigation
  const totalRounds = RACES_2026.length;
  const hasPrev = currentRound > 1;
  const hasNext = currentRound < totalRounds;

  const isLoading = scheduleLoading || resultsLoading;

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-[#E8002D]" />
          <div>
            <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">
              2026 Season
            </div>
            <h2 className="f1-display text-3xl font-black text-foreground uppercase tracking-wide">
              Race Weekend
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center h-64 text-muted-foreground f1-mono">
          Loading race weekend data...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E8002D]" />
        <div>
          <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">
            2026 Season
          </div>
          <h2 className="f1-display text-3xl font-black text-foreground uppercase tracking-wide">
            Race Weekend
          </h2>
        </div>
      </div>

      {/* Round selector */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => hasPrev && handleRoundChange(currentRound - 1)}
          disabled={!hasPrev}
          className={cn(
            "w-8 h-8 rounded-sm flex items-center justify-center transition-colors",
            hasPrev
              ? "bg-muted text-foreground hover:bg-muted/80"
              : "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
          )}
        >
          <ChevronLeft size={16} />
        </button>

        <select
          value={currentRound}
          onChange={(e) => handleRoundChange(Number(e.target.value))}
          className="flex-1 bg-muted border border-border rounded-sm px-3 py-2 text-sm f1-mono text-foreground appearance-none cursor-pointer hover:bg-muted/80 transition-colors"
        >
          {RACES_2026.map((race) => (
            <option key={race.round} value={race.round}>
              R{race.round} — {race.name}
              {race.isSprint ? " ⚡" : ""}
              {race.status === "completed" ? " ✓" : race.status === "next" ? " ●" : ""}
            </option>
          ))}
        </select>

        <button
          onClick={() => hasNext && handleRoundChange(currentRound + 1)}
          disabled={!hasNext}
          className={cn(
            "w-8 h-8 rounded-sm flex items-center justify-center transition-colors",
            hasNext
              ? "bg-muted text-foreground hover:bg-muted/80"
              : "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Hero venue image */}
      <div className="relative rounded-sm overflow-hidden h-48 md:h-64 mb-6">
        {venueImage ? (
          <img
            src={venueImage}
            alt={raceName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1A1A2E]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/90 via-[#1A1A2E]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5 md:p-6">
          <h3 className="f1-display text-2xl md:text-3xl font-black text-white uppercase tracking-wide">
            {raceName}
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-white/70 text-sm f1-mono">
              Round {currentRound}
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/70 text-sm f1-mono">
              {staticRace?.date ?? scheduleRace?.date ?? ""}
            </span>
            <span className="text-white/40">|</span>
            <span className="text-white/70 text-sm f1-mono">{circuitName}</span>
          </div>
          {isSprint && (
            <span className="inline-flex items-center gap-1 mt-2 bg-yellow-500/90 text-[#1A1A2E] text-xs px-2 py-0.5 rounded-sm f1-mono font-bold uppercase">
              <Zap size={10} /> Sprint Weekend
            </span>
          )}
        </div>
      </div>

      {/* Session selector tabs */}
      <div className="flex gap-1 bg-muted rounded-sm p-1 mb-6 overflow-x-auto">
        {availableTabs.map((tab) => {
          const hasData =
            (tab === "Race" && raceResult?.results?.length) ||
            (tab === "Qualifying" && qualifying?.results?.length) ||
            (tab === "Sprint" && sprint?.results?.length) ||
            (tab === "Sprint Qualifying" && sprintQualifying?.results?.length) ||
            (tab.startsWith("FP") &&
              practice?.sessions?.some(
                (s: any) =>
                  s.sessionName ===
                    `Practice ${tab.replace("FP", "")}` &&
                  s.results?.length > 0
              ));

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 md:px-4 py-2 text-sm font-medium rounded-sm transition-colors f1-mono whitespace-nowrap relative",
                effectiveTab === tab
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "Sprint Qualifying" ? "SQ" : tab}
              {hasData && (
                <span
                  className={cn(
                    "absolute top-1 right-1 w-1.5 h-1.5 rounded-full",
                    effectiveTab === tab ? "bg-green-400" : "bg-green-500"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Session results */}
      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden mb-6">
        {effectiveTab === "Race" && (
          <RaceResultsTable result={raceResult} isLoading={resultsLoading} />
        )}
        {effectiveTab === "Qualifying" && (
          <QualifyingTable qualifying={qualifying} isLoading={qualiLoading} />
        )}
        {effectiveTab === "Sprint" && (
          <SprintResultsTable sprint={sprint} isLoading={sprintLoading} />
        )}
        {effectiveTab === "Sprint Qualifying" && (
          <SprintQualifyingTable
            sprintQualifying={sprintQualifying}
            isLoading={sqLoading}
            driverMap={driverNumberMap}
          />
        )}
        {effectiveTab.startsWith("FP") && (
          <PracticeTable
            practice={practice}
            sessionName={`Practice ${effectiveTab.replace("FP", "")}`}
            isLoading={practiceLoading}
            driverMap={driverNumberMap}
          />
        )}
      </div>

      {/* Weekend schedule */}
      <WeekendSchedule
        isSprint={isSprint}
        raceResult={raceResult}
        qualifying={qualifying}
        sprint={sprint}
        sprintQualifying={sprintQualifying}
        practice={practice}
      />
    </div>
  );
}

// ─── Race Results Table ──────────────────────────────────────────────────────
function RaceResultsTable({
  result,
  isLoading,
}: {
  result: any;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        Loading race results...
      </div>
    );
  }
  if (!result?.results?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        No race results available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Driver
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
              Team
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Status
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-16">
              Pts
            </th>
          </tr>
        </thead>
        <tbody>
          {result.results.map((r: any, idx: number) => {
            const teamColor =
              CONSTRUCTOR_ID_TO_COLOR[r.constructorId ?? ""] ?? "#888";
            const teamName =
              CONSTRUCTOR_ID_TO_DISPLAY[r.constructorId ?? ""] ?? r.team;
            return (
              <tr
                key={idx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="f1-display font-black text-foreground">
                      {r.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-foreground">
                    {r.givenName} {r.familyName}
                  </span>
                  <span className="text-muted-foreground f1-mono text-xs ml-2">
                    {r.code}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground text-sm hidden sm:table-cell">
                  {teamName}
                </td>
                <td className="px-4 py-2.5 f1-mono text-sm text-muted-foreground">
                  {r.status === "Finished"
                    ? r.fastestLap?.time ?? "Finished"
                    : r.status}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono font-bold text-foreground">
                  {r.points > 0 ? r.points : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Qualifying Table ────────────────────────────────────────────────────────
function QualifyingTable({
  qualifying,
  isLoading,
}: {
  qualifying: any;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        Loading qualifying results...
      </div>
    );
  }
  if (!qualifying?.results?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        No qualifying data available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Driver
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
              Team
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Q1
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Q2
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Q3
            </th>
          </tr>
        </thead>
        <tbody>
          {qualifying.results.map((r: any, idx: number) => (
            <tr
              key={idx}
              className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
            >
              <td className="px-4 py-2.5 f1-display font-black text-foreground">
                {r.position}
              </td>
              <td className="px-4 py-2.5">
                <span className="font-semibold text-foreground">
                  {r.givenName} {r.familyName}
                </span>
                <span className="text-muted-foreground f1-mono text-xs ml-2">
                  {r.code}
                </span>
              </td>
              <td className="px-4 py-2.5 text-muted-foreground text-sm hidden sm:table-cell">
                {r.team}
              </td>
              <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground">
                {r.q1 ?? "-"}
              </td>
              <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground">
                {r.q2 ?? "-"}
              </td>
              <td className="text-right px-4 py-2.5 f1-mono text-sm font-bold text-foreground">
                {r.q3 ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Sprint Results Table ────────────────────────────────────────────────────
function SprintResultsTable({
  sprint,
  isLoading,
}: {
  sprint: any;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        Loading sprint results...
      </div>
    );
  }
  if (!sprint?.results?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        No sprint results available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Driver
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">
              Team
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Time/Status
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-16">
              Pts
            </th>
          </tr>
        </thead>
        <tbody>
          {sprint.results.map((r: any, idx: number) => {
            const teamColor =
              CONSTRUCTOR_ID_TO_COLOR[r.constructorId ?? ""] ?? "#888";
            const teamName =
              CONSTRUCTOR_ID_TO_DISPLAY[r.constructorId ?? ""] ?? r.team;
            return (
              <tr
                key={idx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="f1-display font-black text-foreground">
                      {r.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-foreground">
                    {r.givenName} {r.familyName}
                  </span>
                  <span className="text-muted-foreground f1-mono text-xs ml-2">
                    {r.code}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground text-sm hidden sm:table-cell">
                  {teamName}
                </td>
                <td className="px-4 py-2.5 f1-mono text-sm text-muted-foreground">
                  {r.time ?? r.status}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono font-bold text-foreground">
                  {r.points > 0 ? r.points : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Sprint Qualifying Table ─────────────────────────────────────────────────
function SprintQualifyingTable({
  sprintQualifying,
  isLoading,
  driverMap,
}: {
  sprintQualifying: any;
  isLoading: boolean;
  driverMap: Record<number, { name: string; team: string; code: string }>;
}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        Loading sprint qualifying data...
      </div>
    );
  }
  if (!sprintQualifying?.results?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        No sprint qualifying data available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Driver
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Best Lap
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              S1
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              S2
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              S3
            </th>
          </tr>
        </thead>
        <tbody>
          {sprintQualifying.results.map((r: any, idx: number) => {
            const driver = driverMap[r.driverNumber];
            const gap =
              idx > 0
                ? r.lapDuration - sprintQualifying.results[0].lapDuration
                : null;
            return (
              <tr
                key={idx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-2.5 f1-display font-black text-foreground">
                  {r.position}
                </td>
                <td className="px-4 py-2.5">
                  {driver ? (
                    <>
                      <span className="font-semibold text-foreground">
                        {driver.name}
                      </span>
                      <span className="text-muted-foreground f1-mono text-xs ml-2">
                        {driver.code}
                      </span>
                    </>
                  ) : (
                    <span className="f1-mono text-muted-foreground">
                      #{r.driverNumber}
                    </span>
                  )}
                </td>
                <td className="text-right px-4 py-2.5">
                  <span className="f1-mono text-sm font-bold text-foreground">
                    {formatLapTime(r.lapDuration)}
                  </span>
                  {gap !== null && (
                    <span className="text-muted-foreground f1-mono text-xs ml-2">
                      +{gap.toFixed(3)}
                    </span>
                  )}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground hidden md:table-cell">
                  {r.sector1 ? r.sector1.toFixed(3) : "-"}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground hidden md:table-cell">
                  {r.sector2 ? r.sector2.toFixed(3) : "-"}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground hidden md:table-cell">
                  {r.sector3 ? r.sector3.toFixed(3) : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Practice Table ──────────────────────────────────────────────────────────
function PracticeTable({
  practice,
  sessionName,
  isLoading,
  driverMap,
}: {
  practice: any;
  sessionName: string;
  isLoading: boolean;
  driverMap: Record<number, { name: string; team: string; code: string }>;
}) {
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        Loading practice data...
      </div>
    );
  }

  const session = practice?.sessions?.find(
    (s: any) => s.sessionName === sessionName
  );

  if (!session?.results?.length) {
    return (
      <div className="p-8 text-center text-muted-foreground f1-mono text-sm">
        No session data available yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Driver
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Best Lap
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              S1
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              S2
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-muted-foreground hidden md:table-cell">
              S3
            </th>
          </tr>
        </thead>
        <tbody>
          {session.results.map((r: any, idx: number) => {
            const driver = driverMap[r.driverNumber];
            const gap =
              idx > 0
                ? r.lapDuration - session.results[0].lapDuration
                : null;
            return (
              <tr
                key={idx}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-2.5 f1-display font-black text-foreground">
                  {r.position}
                </td>
                <td className="px-4 py-2.5">
                  {driver ? (
                    <>
                      <span className="font-semibold text-foreground">
                        {driver.name}
                      </span>
                      <span className="text-muted-foreground f1-mono text-xs ml-2">
                        {driver.code}
                      </span>
                    </>
                  ) : (
                    <span className="f1-mono text-muted-foreground">
                      #{r.driverNumber}
                    </span>
                  )}
                </td>
                <td className="text-right px-4 py-2.5">
                  <span className="f1-mono text-sm font-bold text-foreground">
                    {formatLapTime(r.lapDuration)}
                  </span>
                  {gap !== null && (
                    <span className="text-muted-foreground f1-mono text-xs ml-2">
                      +{gap.toFixed(3)}
                    </span>
                  )}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground hidden md:table-cell">
                  {r.sector1 ? r.sector1.toFixed(3) : "-"}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground hidden md:table-cell">
                  {r.sector2 ? r.sector2.toFixed(3) : "-"}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-muted-foreground hidden md:table-cell">
                  {r.sector3 ? r.sector3.toFixed(3) : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Weekend Schedule ────────────────────────────────────────────────────────
function WeekendSchedule({
  isSprint,
  raceResult,
  qualifying,
  sprint,
  sprintQualifying,
  practice,
}: {
  isSprint: boolean;
  raceResult: any;
  qualifying: any;
  sprint: any;
  sprintQualifying: any;
  practice: any;
}) {
  const sessions = useMemo(() => {
    const list: {
      name: string;
      day: string;
      completed: boolean;
    }[] = [];

    const hasFP1 = practice?.sessions?.some(
      (s: any) => s.sessionName === "Practice 1" && s.results?.length > 0
    );
    const hasQuali = qualifying?.results?.length > 0;
    const hasRace = raceResult?.results?.length > 0;

    if (isSprint) {
      const hasSQ = sprintQualifying?.results?.length > 0;
      const hasSprint = sprint?.results?.length > 0;
      list.push({ name: "FP1", day: "Fri", completed: !!hasFP1 });
      list.push({ name: "Sprint Qualifying", day: "Fri", completed: !!hasSQ });
      list.push({ name: "Sprint", day: "Sat", completed: hasSprint });
      list.push({ name: "Qualifying", day: "Sat", completed: hasQuali });
      list.push({ name: "Race", day: "Sun", completed: hasRace });
    } else {
      const hasFP2 = practice?.sessions?.some(
        (s: any) => s.sessionName === "Practice 2" && s.results?.length > 0
      );
      const hasFP3 = practice?.sessions?.some(
        (s: any) => s.sessionName === "Practice 3" && s.results?.length > 0
      );
      list.push({ name: "FP1", day: "Fri", completed: !!hasFP1 });
      list.push({ name: "FP2", day: "Fri", completed: !!hasFP2 });
      list.push({ name: "FP3", day: "Sat", completed: !!hasFP3 });
      list.push({ name: "Qualifying", day: "Sat", completed: hasQuali });
      list.push({ name: "Race", day: "Sun", completed: hasRace });
    }

    return list;
  }, [isSprint, qualifying, sprint, sprintQualifying, raceResult, practice]);

  return (
    <div className="bg-card rounded-sm p-5">
      <h4 className="f1-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
        Weekend Schedule
      </h4>
      <div className="flex flex-wrap gap-3">
        {sessions.map((s) => (
          <div
            key={s.name}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-sm text-sm f1-mono",
              s.completed
                ? "bg-green-500/10 text-green-400"
                : "bg-muted/50 text-muted-foreground"
            )}
          >
            {s.completed ? (
              <Trophy size={12} className="text-green-400" />
            ) : (
              <Clock size={12} className="text-muted-foreground" />
            )}
            <span className="font-medium">{s.name}</span>
            <span className="text-xs opacity-50">{s.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
