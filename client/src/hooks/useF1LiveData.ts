// F1 2026 Dashboard — Live Data Hooks
// Fetches real-time standings, results, and schedule from the backend API proxy
// Falls back to static data if the API is unavailable

import { trpc } from "@/lib/trpc";
import {
  DRIVERS_2026,
  CONSTRUCTORS_2026,
  RACES_2026,
  TEAM_COLORS,
} from "@/lib/f1Data";

// ─── Team colour mapping from API constructor IDs ─────────────────────────────
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

const NATIONALITY_FLAGS: Record<string, string> = {
  British: "🇬🇧",
  Italian: "🇮🇹",
  Monegasque: "🇲🇨",
  Dutch: "🇳🇱",
  Brazilian: "🇧🇷",
  French: "🇫🇷",
  Spanish: "🇪🇸",
  Australian: "🇦🇺",
  German: "🇩🇪",
  Finnish: "🇫🇮",
  Canadian: "🇨🇦",
  Mexican: "🇲🇽",
  Thai: "🇹🇭",
  "New Zealander": "🇳🇿",
  Argentine: "🇦🇷",
};

// ─── Driver Standings Hook ────────────────────────────────────────────────────
export function useDriverStandings() {
  const { data: liveData, isLoading, error } = trpc.f1.driverStandings.useQuery(undefined, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  if (liveData?.standings && liveData.standings.length > 0) {
    // Merge live standings with static data for flags/numbers
    const enriched = liveData.standings.map((d: any) => {
      const staticDriver = DRIVERS_2026.find(
        (s) => s.shortName === d.code || s.name.toLowerCase().includes((d.familyName ?? "").toLowerCase())
      );
      const teamColor = CONSTRUCTOR_ID_TO_COLOR[d.constructorId ?? ""] ?? "#888";
      const teamDisplay = CONSTRUCTOR_ID_TO_DISPLAY[d.constructorId ?? ""] ?? d.team;
      return {
        ...staticDriver, // spread static profile fields first (career, bio, photo, etc.)
        ...d, // then overlay live API data (position, points, wins)
        flag: staticDriver?.flag ?? NATIONALITY_FLAGS[d.nationality ?? ""] ?? "🏁",
        number: d.number ?? staticDriver?.number ?? "—",
        team: teamDisplay,
        teamColor,
        name: `${d.givenName} ${d.familyName}`,
        shortName: d.code ?? staticDriver?.shortName ?? d.familyName?.slice(0, 3).toUpperCase() ?? "???",
      };
    });
    return { standings: enriched, round: liveData.round, isLive: true, isLoading, updatedAt: liveData.updatedAt };
  }

  // Fallback to static data
  return {
    standings: DRIVERS_2026.map((d) => ({
      ...d,
      position: d.position,
      points: d.points,
      wins: d.wins,
      teamColor: TEAM_COLORS[d.team] ?? "#888",
      shortName: d.shortName,
    })),
    round: "1",
    isLive: false,
    isLoading,
    updatedAt: null,
  };
}

// ─── Constructor Standings Hook ───────────────────────────────────────────────
export function useConstructorStandings() {
  const { data: liveData, isLoading, error } = trpc.f1.constructorStandings.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (liveData?.standings && liveData.standings.length > 0) {
    const enriched = liveData.standings.map((c: any) => {
      const staticTeam = CONSTRUCTORS_2026.find(
        (s) => s.name === c.name ||
          CONSTRUCTOR_ID_TO_DISPLAY[c.constructorId ?? ""] === s.name
      );
      const teamColor = CONSTRUCTOR_ID_TO_COLOR[c.constructorId ?? ""] ?? "#888";
      const teamDisplay = CONSTRUCTOR_ID_TO_DISPLAY[c.constructorId ?? ""] ?? c.name;
      return {
        ...c,
        name: teamDisplay,
        teamColor,
        chassis: staticTeam?.chassis ?? "—",
        powerUnit: staticTeam?.powerUnit ?? "—",
        drivers: staticTeam?.drivers ?? [],
      };
    });
    return { standings: enriched, round: liveData.round, isLive: true, isLoading, updatedAt: liveData.updatedAt };
  }

  return {
    standings: CONSTRUCTORS_2026.map((c) => ({
      ...c,
      teamColor: TEAM_COLORS[c.name] ?? "#888",
    })),
    round: "1",
    isLive: false,
    isLoading,
    updatedAt: null,
  };
}

// ─── Race Results Hook ────────────────────────────────────────────────────────
export function useRaceResults() {
  const { data: liveData, isLoading } = trpc.f1.raceResults.useQuery(undefined, {
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 2,
  });

  const races = (liveData?.races ?? []).map((race: any) => ({
    ...race,
    results: race.results?.map((r: any) => ({
      ...r,
      team: CONSTRUCTOR_ID_TO_DISPLAY[r.constructorId ?? ""] ?? r.team,
    })),
  }));

  return {
    races,
    isLive: !!liveData,
    isLoading,
    updatedAt: liveData?.updatedAt ?? null,
  };
}

// ─── Schedule Hook ────────────────────────────────────────────────────────────
export function useSchedule() {
  const { data: liveData, isLoading } = trpc.f1.schedule.useQuery(undefined, {
    staleTime: 1000 * 60 * 60, // 1 hour (schedule doesn't change often)
    retry: 2,
  });

  return {
    races: liveData?.races ?? [],
    isLive: !!liveData,
    isLoading,
    updatedAt: liveData?.updatedAt ?? null,
  };
}

// ─── Qualifying Hook ─────────────────────────────────────────────────────────
export function useQualifying(round: number | null) {
  const { data, isLoading } = trpc.f1.qualifying.useQuery(
    { round: round! },
    {
      enabled: round !== null && round > 0,
      staleTime: 1000 * 60 * 10,
      retry: 2,
    }
  );
  return { qualifying: data, isLoading };
}

// ─── Sprint Results Hook ─────────────────────────────────────────────────────
export function useSprintResults(round: number | null) {
  const { data, isLoading } = trpc.f1.sprintResults.useQuery(
    { round: round! },
    {
      enabled: round !== null && round > 0,
      staleTime: 1000 * 60 * 10,
      retry: 2,
    }
  );
  return { sprint: data, isLoading };
}

// ─── Practice Sessions Hook ─────────────────────────────────────────────────
export function usePracticeSessions(circuitShortName: string | null) {
  const { data, isLoading } = trpc.f1.practiceSessions.useQuery(
    { circuitShortName: circuitShortName! },
    {
      enabled: !!circuitShortName,
      staleTime: 1000 * 60 * 10,
      retry: 2,
    }
  );
  return { practice: data, isLoading };
}

// ─── Circuit History Hook ────────────────────────────────────────────────────
export function useCircuitHistory(circuitId: string | null) {
  const { data, isLoading } = trpc.f1.circuitHistory.useQuery(
    { circuitId: circuitId! },
    {
      enabled: !!circuitId,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours - historical data rarely changes
      retry: 2,
    }
  );
  return { history: data, isLoading };
}

// ─── Latest Session Hook ──────────────────────────────────────────────────────
export function useLatestSession() {
  const { data, isLoading } = trpc.f1.latestSession.useQuery(undefined, {
    staleTime: 1000 * 60 * 2, // 2 minutes during race weekends
    retry: 2,
  });

  return { session: data, isLoading };
}
