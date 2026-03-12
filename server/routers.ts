import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// ─── F1 API helpers ────────────────────────────────────────────────────────────
const JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1";
const OPENF1_BASE = "https://api.openf1.org/v1";
const CURRENT_YEAR = 2026;

// In-memory cache: stores last successful API response per endpoint key
const apiCache = new Map<string, { data: any; cachedAt: string }>();

function cacheSet(key: string, data: any) {
  apiCache.set(key, { data, cachedAt: new Date().toISOString() });
}

function cacheGet(key: string) {
  const entry = apiCache.get(key);
  if (!entry) return null;
  // Mark the data as served from cache
  return { ...entry.data, updatedAt: entry.cachedAt, fromCache: true };
}

async function fetchJolpica(path: string) {
  const url = `${JOLPICA_BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Jolpica API error: ${res.status} ${url}`);
  return res.json();
}

async function fetchOpenF1(path: string) {
  const url = `${OPENF1_BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`OpenF1 API error: ${res.status} ${url}`);
  return res.json();
}

// ─── F1 Router ─────────────────────────────────────────────────────────────────
const f1Router = router({
  /** Driver championship standings for the current season */
  driverStandings: publicProcedure.query(async () => {
    const CACHE_KEY = "driverStandings";
    try {
      const data = await fetchJolpica(`/${CURRENT_YEAR}/driverstandings.json?limit=30`);
      const standingsList = data?.MRData?.StandingsTable?.StandingsLists?.[0];
      const result = {
        season: standingsList?.season ?? String(CURRENT_YEAR),
        round: standingsList?.round ?? "0",
        standings: (standingsList?.DriverStandings ?? []).map((d: any) => ({
          position: parseInt(d.position),
          points: parseFloat(d.points),
          wins: parseInt(d.wins),
          driverId: d.Driver?.driverId,
          code: d.Driver?.code,
          number: d.Driver?.permanentNumber,
          givenName: d.Driver?.givenName,
          familyName: d.Driver?.familyName,
          nationality: d.Driver?.nationality,
          team: d.Constructors?.[0]?.name ?? "Unknown",
          constructorId: d.Constructors?.[0]?.constructorId,
        })),
        updatedAt: new Date().toISOString(),
      };
      cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] driverStandings error:", err);
      return cacheGet(CACHE_KEY);
    }
  }),

  /** Constructor championship standings for the current season */
  constructorStandings: publicProcedure.query(async () => {
    const CACHE_KEY = "constructorStandings";
    try {
      const data = await fetchJolpica(`/${CURRENT_YEAR}/constructorstandings.json?limit=15`);
      const standingsList = data?.MRData?.StandingsTable?.StandingsLists?.[0];
      const result = {
        season: standingsList?.season ?? String(CURRENT_YEAR),
        round: standingsList?.round ?? "0",
        standings: (standingsList?.ConstructorStandings ?? []).map((c: any) => ({
          position: c.positionText === "-" ? 99 : parseInt(c.position),
          positionText: c.positionText,
          points: parseFloat(c.points),
          wins: parseInt(c.wins),
          constructorId: c.Constructor?.constructorId,
          name: c.Constructor?.name,
          nationality: c.Constructor?.nationality,
        })),
        updatedAt: new Date().toISOString(),
      };
      cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] constructorStandings error:", err);
      return cacheGet(CACHE_KEY);
    }
  }),

  /** All race results for the current season */
  raceResults: publicProcedure.query(async () => {
    const CACHE_KEY = "raceResults";
    try {
      const data = await fetchJolpica(`/${CURRENT_YEAR}/results.json?limit=500`);
      const races = data?.MRData?.RaceTable?.Races ?? [];
      const result = {
        season: String(CURRENT_YEAR),
        races: races.map((race: any) => ({
          round: parseInt(race.round),
          raceName: race.raceName,
          circuitName: race.Circuit?.circuitName,
          date: race.date,
          results: (race.Results ?? []).slice(0, 10).map((r: any) => ({
            position: r.positionText,
            number: r.number,
            driverId: r.Driver?.driverId,
            code: r.Driver?.code,
            givenName: r.Driver?.givenName,
            familyName: r.Driver?.familyName,
            team: r.Constructor?.name,
            constructorId: r.Constructor?.constructorId,
            grid: parseInt(r.grid),
            laps: parseInt(r.laps),
            status: r.status,
            points: parseFloat(r.points),
            fastestLap: r.FastestLap ? {
              rank: r.FastestLap.rank,
              lap: r.FastestLap.lap,
              time: r.FastestLap.Time?.time,
            } : null,
          })),
        })),
        updatedAt: new Date().toISOString(),
      };
      cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] raceResults error:", err);
      return cacheGet(CACHE_KEY);
    }
  }),

  /** Full race schedule for the current season */
  schedule: publicProcedure.query(async () => {
    const CACHE_KEY = "schedule";
    try {
      const data = await fetchJolpica(`/${CURRENT_YEAR}.json?limit=30`);
      const races = data?.MRData?.RaceTable?.Races ?? [];
      const result = {
        season: String(CURRENT_YEAR),
        races: races.map((race: any) => ({
          round: parseInt(race.round),
          raceName: race.raceName,
          circuitId: race.Circuit?.circuitId,
          circuitName: race.Circuit?.circuitName,
          locality: race.Circuit?.Location?.locality,
          country: race.Circuit?.Location?.country,
          date: race.date,
          time: race.time,
          sprint: race.Sprint ? { date: race.Sprint.date, time: race.Sprint.time } : null,
        })),
        updatedAt: new Date().toISOString(),
      };
      cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] schedule error:", err);
      return cacheGet(CACHE_KEY);
    }
  }),

  /** Latest session info from OpenF1 */
  latestSession: publicProcedure.query(async () => {
    const CACHE_KEY = "latestSession";
    try {
      const sessions = await fetchOpenF1(`/sessions?year=${CURRENT_YEAR}&session_type=Race`);
      if (!sessions || sessions.length === 0) return cacheGet(CACHE_KEY);
      const sorted = [...sessions].sort((a: any, b: any) =>
        new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
      );
      const latest = sorted[0];
      const result = {
        sessionKey: latest.session_key,
        sessionName: latest.session_name,
        sessionType: latest.session_type,
        dateStart: latest.date_start,
        dateEnd: latest.date_end,
        circuitShortName: latest.circuit_short_name,
        countryName: latest.country_name,
        year: latest.year,
        updatedAt: new Date().toISOString(),
      };
      cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] latestSession error:", err);
      return cacheGet(CACHE_KEY);
    }
  }),

  /** Qualifying results for a specific round */
  qualifying: publicProcedure
    .input(z.object({ round: z.number() }))
    .query(async ({ input }) => {
      const CACHE_KEY = `qualifying_${input.round}`;
      try {
        const data = await fetchJolpica(`/${CURRENT_YEAR}/${input.round}/qualifying.json`);
        const race = data?.MRData?.RaceTable?.Races?.[0];
        if (!race) return cacheGet(CACHE_KEY);
        const result = {
          round: parseInt(race.round),
          raceName: race.raceName,
          results: (race.QualifyingResults ?? []).map((r: any) => ({
            position: parseInt(r.position),
            driverId: r.Driver?.driverId,
            code: r.Driver?.code,
            givenName: r.Driver?.givenName,
            familyName: r.Driver?.familyName,
            team: r.Constructor?.name,
            q1: r.Q1,
            q2: r.Q2,
            q3: r.Q3,
          })),
          updatedAt: new Date().toISOString(),
        };
        cacheSet(CACHE_KEY, result);
        return result;
      } catch (err) {
        console.error("[F1 API] qualifying error:", err);
        return cacheGet(CACHE_KEY);
      }
    }),
});

// ─── App Router ────────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  f1: f1Router,
});

export type AppRouter = typeof appRouter;
