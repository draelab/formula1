import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { cacheSet, cacheGet } from "./db";
import { z } from "zod";

// ─── F1 API helpers ────────────────────────────────────────────────────────────
const JOLPICA_BASE = "https://api.jolpi.ca/ergast/f1";
const OPENF1_BASE = "https://api.openf1.org/v1";
const CURRENT_YEAR = 2026;

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
      await cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] driverStandings error:", err);
      return await cacheGet(CACHE_KEY);
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
      await cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] constructorStandings error:", err);
      return await cacheGet(CACHE_KEY);
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
      await cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] raceResults error:", err);
      return await cacheGet(CACHE_KEY);
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
      await cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] schedule error:", err);
      return await cacheGet(CACHE_KEY);
    }
  }),

  /** Latest session info from OpenF1 */
  latestSession: publicProcedure.query(async () => {
    const CACHE_KEY = "latestSession";
    try {
      const sessions = await fetchOpenF1(`/sessions?year=${CURRENT_YEAR}&session_type=Race`);
      if (!sessions || sessions.length === 0) return await cacheGet(CACHE_KEY);
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
      await cacheSet(CACHE_KEY, result);
      return result;
    } catch (err) {
      console.error("[F1 API] latestSession error:", err);
      return await cacheGet(CACHE_KEY);
    }
  }),

  /** Sprint results for a specific round */
  sprintResults: publicProcedure
    .input(z.object({ round: z.number() }))
    .query(async ({ input }) => {
      const CACHE_KEY = `sprintResults_${input.round}`;
      try {
        const data = await fetchJolpica(`/${CURRENT_YEAR}/${input.round}/sprint.json`);
        const race = data?.MRData?.RaceTable?.Races?.[0];
        if (!race) return await cacheGet(CACHE_KEY);
        const result = {
          round: parseInt(race.round),
          raceName: race.raceName,
          results: (race.SprintResults ?? []).map((r: any) => ({
            position: parseInt(r.position),
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
            time: r.Time?.time ?? null,
          })),
          updatedAt: new Date().toISOString(),
        };
        await cacheSet(CACHE_KEY, result);
        return result;
      } catch (err) {
        console.error("[F1 API] sprintResults error:", err);
        return await cacheGet(CACHE_KEY);
      }
    }),

  /** Practice session lap times from OpenF1 */
  practiceSessions: publicProcedure
    .input(z.object({ circuitShortName: z.string() }))
    .query(async ({ input }) => {
      const CACHE_KEY = `practice_${input.circuitShortName}`;
      try {
        // Get all sessions for this circuit in current year
        const sessions = await fetchOpenF1(
          `/sessions?year=${CURRENT_YEAR}&circuit_short_name=${input.circuitShortName}`
        );
        if (!sessions?.length) return await cacheGet(CACHE_KEY);

        // Filter to practice sessions only
        const practiceSessions = sessions.filter((s: any) =>
          s.session_type === "Practice"
        );

        // For each practice session, get the fastest lap per driver
        const sessionResults = await Promise.all(
          practiceSessions.map(async (session: any) => {
            try {
              const laps = await fetchOpenF1(
                `/laps?session_key=${session.session_key}&is_pit_out_lap=false`
              );

              // Group by driver, find fastest lap for each
              const driverBest: Record<number, any> = {};
              for (const lap of (laps ?? [])) {
                if (!lap.lap_duration || lap.lap_duration <= 0) continue;
                const num = lap.driver_number;
                if (!driverBest[num] || lap.lap_duration < driverBest[num].lap_duration) {
                  driverBest[num] = lap;
                }
              }

              // Sort by fastest time
              const sorted = Object.values(driverBest)
                .sort((a: any, b: any) => a.lap_duration - b.lap_duration);

              return {
                sessionName: session.session_name,
                sessionKey: session.session_key,
                dateStart: session.date_start,
                results: sorted.slice(0, 20).map((lap: any, idx: number) => ({
                  position: idx + 1,
                  driverNumber: lap.driver_number,
                  lapDuration: lap.lap_duration,
                  sector1: lap.duration_sector_1,
                  sector2: lap.duration_sector_2,
                  sector3: lap.duration_sector_3,
                })),
              };
            } catch {
              return {
                sessionName: session.session_name,
                sessionKey: session.session_key,
                dateStart: session.date_start,
                results: [],
              };
            }
          })
        );

        const result = {
          circuitShortName: input.circuitShortName,
          sessions: sessionResults,
          updatedAt: new Date().toISOString(),
        };
        await cacheSet(CACHE_KEY, result);
        return result;
      } catch (err) {
        console.error("[F1 API] practiceSessions error:", err);
        return await cacheGet(CACHE_KEY);
      }
    }),

  /** Historical results at a specific circuit (for predictions) */
  circuitHistory: publicProcedure
    .input(z.object({ circuitId: z.string() }))
    .query(async ({ input }) => {
      const CACHE_KEY = `circuit_${input.circuitId}`;
      try {
        // Fetch last 10 years of results at this circuit
        const data = await fetchJolpica(`/circuits/${input.circuitId}/results.json?limit=200&offset=0`);
        const races = data?.MRData?.RaceTable?.Races ?? [];

        // Only keep recent years (last 10)
        const cutoff = CURRENT_YEAR - 10;
        const recentRaces = races.filter((r: any) => parseInt(r.season) >= cutoff);

        const result = {
          circuitId: input.circuitId,
          races: recentRaces.map((race: any) => ({
            season: race.season,
            round: race.round,
            results: (race.Results ?? []).slice(0, 10).map((r: any) => ({
              position: parseInt(r.position),
              driverId: r.Driver?.driverId,
              givenName: r.Driver?.givenName,
              familyName: r.Driver?.familyName,
              constructorId: r.Constructor?.constructorId,
              constructorName: r.Constructor?.name,
              grid: parseInt(r.grid),
              points: parseFloat(r.points),
              status: r.status,
            })),
          })),
          updatedAt: new Date().toISOString(),
        };
        await cacheSet(CACHE_KEY, result);
        return result;
      } catch (err) {
        console.error("[F1 API] circuitHistory error:", err);
        return await cacheGet(CACHE_KEY);
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
        if (!race) return await cacheGet(CACHE_KEY);
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
        await cacheSet(CACHE_KEY, result);
        return result;
      } catch (err) {
        console.error("[F1 API] qualifying error:", err);
        return await cacheGet(CACHE_KEY);
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
