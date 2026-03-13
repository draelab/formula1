// F1 2026 Dashboard — Current Race Weekend Section
// Shows the most recent or upcoming race weekend with all session results

import { useState, useMemo } from "react";
import {
  useSchedule,
  useRaceResults,
  useQualifying,
  useSprintResults,
  usePracticeSessions,
  useDriverStandings,
} from "@/hooks/useF1LiveData";
import { RACES_2026, VENUE_IMAGES, TEAM_COLORS } from "@/lib/f1Data";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Trophy, Flag, Zap } from "lucide-react";

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

type SessionTab = "FP1" | "FP2" | "FP3" | "Qualifying" | "Sprint" | "Race";

function formatLapTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toFixed(3).padStart(6, "0")}`;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  } catch {
    return dateStr;
  }
}

export default function CurrentRaceSection() {
  const { races: scheduleRaces, isLoading: scheduleLoading } = useSchedule();
  const { races: raceResults, isLoading: resultsLoading } = useRaceResults();
  const { standings } = useDriverStandings();

  // Find the current/most recent round
  const currentRound = useMemo(() => {
    // First try from static data — find the "next" or last "completed" race
    const nextRace = RACES_2026.find((r) => r.status === "next");
    if (nextRace) return nextRace.round;

    const completed = RACES_2026.filter((r) => r.status === "completed");
    if (completed.length > 0) return completed[completed.length - 1].round;

    // Fallback: use schedule data with today's date
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

  // Get static race info
  const staticRace = RACES_2026.find((r) => r.round === currentRound);
  // Get schedule race info (from API)
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

  // Determine available session tabs
  const availableTabs = useMemo(() => {
    const tabs: SessionTab[] = [];
    if (practice?.sessions) {
      for (const s of practice.sessions) {
        if (s.sessionName === "Practice 1") tabs.push("FP1");
        else if (s.sessionName === "Practice 2") tabs.push("FP2");
        else if (s.sessionName === "Practice 3") tabs.push("FP3");
      }
    }
    // If no practice data, still show FP tabs as placeholders
    if (tabs.length === 0) {
      tabs.push("FP1", "FP2");
      if (!isSprint) tabs.push("FP3");
    }
    tabs.push("Qualifying");
    if (isSprint) tabs.push("Sprint");
    tabs.push("Race");
    return tabs;
  }, [practice, isSprint]);

  // Default to most interesting tab
  const [activeTab, setActiveTab] = useState<SessionTab | null>(null);
  const effectiveTab = useMemo(() => {
    if (activeTab && availableTabs.includes(activeTab)) return activeTab;
    // Auto-select: race > sprint > qualifying > latest practice
    if (raceResult?.results?.length) return "Race";
    if (sprint?.results?.length) return "Sprint";
    if (qualifying?.results?.length) return "Qualifying";
    return availableTabs[availableTabs.length - 1] ?? "Race";
  }, [activeTab, availableTabs, raceResult, sprint, qualifying]);

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
            <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">
              Current Race Weekend
            </h2>
          </div>
        </div>
        <div className="flex items-center justify-center h-64 text-gray-400 f1-mono">
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
          <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">
            Current Race Weekend
          </h2>
        </div>
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
      <div className="flex gap-1 bg-gray-100 rounded-sm p-1 mb-6 overflow-x-auto">
        {availableTabs.map((tab) => {
          const hasData =
            (tab === "Race" && raceResult?.results?.length) ||
            (tab === "Qualifying" && qualifying?.results?.length) ||
            (tab === "Sprint" && sprint?.results?.length) ||
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
                  ? "bg-[#1A1A2E] text-white"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
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
      <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden mb-6">
        {effectiveTab === "Race" && (
          <RaceResultsTable result={raceResult} isLoading={resultsLoading} />
        )}
        {effectiveTab === "Qualifying" && (
          <QualifyingTable qualifying={qualifying} isLoading={qualiLoading} />
        )}
        {effectiveTab === "Sprint" && (
          <SprintResultsTable sprint={sprint} isLoading={sprintLoading} />
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
        staticRace={staticRace}
        scheduleRace={scheduleRace}
        isSprint={isSprint}
        raceResult={raceResult}
        qualifying={qualifying}
        sprint={sprint}
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
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        Loading race results...
      </div>
    );
  }
  if (!result?.results?.length) {
    return (
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        No race results available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Driver
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 hidden sm:table-cell">
              Team
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Status
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 w-16">
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
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="f1-display font-black text-[#1A1A2E]">
                      {r.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-[#1A1A2E]">
                    {r.givenName} {r.familyName}
                  </span>
                  <span className="text-gray-400 f1-mono text-xs ml-2">
                    {r.code}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-500 text-sm hidden sm:table-cell">
                  {teamName}
                </td>
                <td className="px-4 py-2.5 f1-mono text-sm text-gray-600">
                  {r.status === "Finished"
                    ? r.fastestLap?.time ?? "Finished"
                    : r.status}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono font-bold text-[#1A1A2E]">
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
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        Loading qualifying results...
      </div>
    );
  }
  if (!qualifying?.results?.length) {
    return (
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        No qualifying data available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Driver
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 hidden sm:table-cell">
              Team
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Q1
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Q2
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Q3
            </th>
          </tr>
        </thead>
        <tbody>
          {qualifying.results.map((r: any, idx: number) => (
            <tr
              key={idx}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
            >
              <td className="px-4 py-2.5 f1-display font-black text-[#1A1A2E]">
                {r.position}
              </td>
              <td className="px-4 py-2.5">
                <span className="font-semibold text-[#1A1A2E]">
                  {r.givenName} {r.familyName}
                </span>
                <span className="text-gray-400 f1-mono text-xs ml-2">
                  {r.code}
                </span>
              </td>
              <td className="px-4 py-2.5 text-gray-500 text-sm hidden sm:table-cell">
                {r.team}
              </td>
              <td className="text-right px-4 py-2.5 f1-mono text-sm text-gray-600">
                {r.q1 ?? "-"}
              </td>
              <td className="text-right px-4 py-2.5 f1-mono text-sm text-gray-600">
                {r.q2 ?? "-"}
              </td>
              <td className="text-right px-4 py-2.5 f1-mono text-sm font-bold text-[#1A1A2E]">
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
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        Loading sprint results...
      </div>
    );
  }
  if (!sprint?.results?.length) {
    return (
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        No sprint results available yet
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Driver
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 hidden sm:table-cell">
              Team
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Time/Status
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 w-16">
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
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ backgroundColor: teamColor }}
                    />
                    <span className="f1-display font-black text-[#1A1A2E]">
                      {r.position}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className="font-semibold text-[#1A1A2E]">
                    {r.givenName} {r.familyName}
                  </span>
                  <span className="text-gray-400 f1-mono text-xs ml-2">
                    {r.code}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-gray-500 text-sm hidden sm:table-cell">
                  {teamName}
                </td>
                <td className="px-4 py-2.5 f1-mono text-sm text-gray-600">
                  {r.time ?? r.status}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono font-bold text-[#1A1A2E]">
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
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        Loading practice data...
      </div>
    );
  }

  const session = practice?.sessions?.find(
    (s: any) => s.sessionName === sessionName
  );

  if (!session?.results?.length) {
    return (
      <div className="p-8 text-center text-gray-400 f1-mono text-sm">
        No session data available yet
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 w-12">
              Pos
            </th>
            <th className="text-left px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Driver
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400">
              Best Lap
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 hidden md:table-cell">
              S1
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 hidden md:table-cell">
              S2
            </th>
            <th className="text-right px-4 py-2.5 f1-mono text-[11px] uppercase tracking-widest text-gray-400 hidden md:table-cell">
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
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-4 py-2.5 f1-display font-black text-[#1A1A2E]">
                  {r.position}
                </td>
                <td className="px-4 py-2.5">
                  {driver ? (
                    <>
                      <span className="font-semibold text-[#1A1A2E]">
                        {driver.name}
                      </span>
                      <span className="text-gray-400 f1-mono text-xs ml-2">
                        {driver.code}
                      </span>
                    </>
                  ) : (
                    <span className="f1-mono text-gray-600">
                      #{r.driverNumber}
                    </span>
                  )}
                </td>
                <td className="text-right px-4 py-2.5">
                  <span className="f1-mono text-sm font-bold text-[#1A1A2E]">
                    {formatLapTime(r.lapDuration)}
                  </span>
                  {gap !== null && (
                    <span className="text-gray-400 f1-mono text-xs ml-2">
                      +{gap.toFixed(3)}
                    </span>
                  )}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-gray-500 hidden md:table-cell">
                  {r.sector1 ? r.sector1.toFixed(3) : "-"}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-gray-500 hidden md:table-cell">
                  {r.sector2 ? r.sector2.toFixed(3) : "-"}
                </td>
                <td className="text-right px-4 py-2.5 f1-mono text-sm text-gray-500 hidden md:table-cell">
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
  staticRace,
  scheduleRace,
  isSprint,
  raceResult,
  qualifying,
  sprint,
  practice,
}: {
  staticRace: any;
  scheduleRace: any;
  isSprint: boolean;
  raceResult: any;
  qualifying: any;
  sprint: any;
  practice: any;
}) {
  const sessions = useMemo(() => {
    const list: {
      name: string;
      time: string;
      completed: boolean;
    }[] = [];

    // Determine which sessions have data
    const hasFP1 = practice?.sessions?.some(
      (s: any) => s.sessionName === "Practice 1" && s.results?.length > 0
    );
    const hasFP2 = practice?.sessions?.some(
      (s: any) => s.sessionName === "Practice 2" && s.results?.length > 0
    );
    const hasFP3 = practice?.sessions?.some(
      (s: any) => s.sessionName === "Practice 3" && s.results?.length > 0
    );
    const hasQuali = qualifying?.results?.length > 0;
    const hasSprint = sprint?.results?.length > 0;
    const hasRace = raceResult?.results?.length > 0;

    list.push({ name: "FP1", time: "Fri", completed: !!hasFP1 });
    list.push({ name: "FP2", time: "Fri", completed: !!hasFP2 });

    if (isSprint) {
      list.push({ name: "Qualifying", time: "Fri", completed: hasQuali });
      list.push({ name: "Sprint", time: "Sat", completed: hasSprint });
      list.push({ name: "Race", time: "Sun", completed: hasRace });
    } else {
      list.push({ name: "FP3", time: "Sat", completed: !!hasFP3 });
      list.push({ name: "Qualifying", time: "Sat", completed: hasQuali });
      list.push({ name: "Race", time: "Sun", completed: hasRace });
    }

    return list;
  }, [isSprint, qualifying, sprint, raceResult, practice]);

  return (
    <div className="bg-[#1A1A2E] rounded-sm p-5">
      <h4 className="f1-mono text-[11px] uppercase tracking-widest text-white/50 mb-3">
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
                : "bg-white/5 text-white/60"
            )}
          >
            {s.completed ? (
              <Trophy size={12} className="text-green-400" />
            ) : (
              <Clock size={12} className="text-white/30" />
            )}
            <span className="font-medium">{s.name}</span>
            <span className="text-xs opacity-50">{s.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
