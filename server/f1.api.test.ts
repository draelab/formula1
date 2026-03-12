// F1 2026 Dashboard — API Route Tests
// Tests that the tRPC F1 procedures return correctly shaped data

import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock fetch globally ──────────────────────────────────────────────────────
const mockFetch = vi.fn();
global.fetch = mockFetch;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

// ─── Sample API Responses ─────────────────────────────────────────────────────
const SAMPLE_DRIVER_STANDINGS = {
  MRData: {
    StandingsTable: {
      StandingsLists: [{
        season: "2026",
        round: "1",
        DriverStandings: [
          {
            position: "1",
            points: "25",
            wins: "1",
            Driver: {
              driverId: "russell",
              code: "RUS",
              permanentNumber: "63",
              givenName: "George",
              familyName: "Russell",
              nationality: "British",
            },
            Constructors: [{ constructorId: "mercedes", name: "Mercedes" }],
          },
          {
            position: "2",
            points: "18",
            wins: "0",
            Driver: {
              driverId: "antonelli",
              code: "ANT",
              permanentNumber: "12",
              givenName: "Andrea Kimi",
              familyName: "Antonelli",
              nationality: "Italian",
            },
            Constructors: [{ constructorId: "mercedes", name: "Mercedes" }],
          },
        ],
      }],
    },
  },
};

const SAMPLE_CONSTRUCTOR_STANDINGS = {
  MRData: {
    StandingsTable: {
      StandingsLists: [{
        season: "2026",
        round: "1",
        ConstructorStandings: [
          {
            position: "1",
            positionText: "1",
            points: "43",
            wins: "1",
            Constructor: { constructorId: "mercedes", name: "Mercedes", nationality: "German" },
          },
          {
            position: "2",
            positionText: "2",
            points: "27",
            wins: "0",
            Constructor: { constructorId: "ferrari", name: "Ferrari", nationality: "Italian" },
          },
        ],
      }],
    },
  },
};

const SAMPLE_RACE_RESULTS = {
  MRData: {
    RaceTable: {
      Races: [{
        round: "1",
        raceName: "Australian Grand Prix",
        Circuit: { circuitName: "Albert Park Grand Prix Circuit" },
        date: "2026-03-08",
        Results: [
          {
            positionText: "1",
            number: "63",
            Driver: { driverId: "russell", code: "RUS", givenName: "George", familyName: "Russell" },
            Constructor: { constructorId: "mercedes", name: "Mercedes" },
            grid: "1",
            laps: "58",
            status: "Finished",
            points: "25",
          },
        ],
      }],
    },
  },
};

const SAMPLE_SCHEDULE = {
  MRData: {
    RaceTable: {
      Races: [
        {
          round: "1",
          raceName: "Australian Grand Prix",
          Circuit: {
            circuitId: "albert_park",
            circuitName: "Albert Park Grand Prix Circuit",
            Location: { locality: "Melbourne", country: "Australia" },
          },
          date: "2026-03-08",
          time: "05:00:00Z",
        },
        {
          round: "2",
          raceName: "Chinese Grand Prix",
          Circuit: {
            circuitId: "shanghai",
            circuitName: "Shanghai International Circuit",
            Location: { locality: "Shanghai", country: "China" },
          },
          date: "2026-03-15",
          time: "07:00:00Z",
          Sprint: { date: "2026-03-14", time: "07:00:00Z" },
        },
      ],
    },
  },
};

// ─── Tests ────────────────────────────────────────────────────────────────────
describe("f1.driverStandings", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("returns parsed driver standings from the Jolpica API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => SAMPLE_DRIVER_STANDINGS,
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.driverStandings();

    expect(result).not.toBeNull();
    expect(result!.season).toBe("2026");
    expect(result!.round).toBe("1");
    expect(result!.standings).toHaveLength(2);

    const leader = result!.standings[0];
    expect(leader.position).toBe(1);
    expect(leader.points).toBe(25);
    expect(leader.wins).toBe(1);
    expect(leader.code).toBe("RUS");
    expect(leader.givenName).toBe("George");
    expect(leader.familyName).toBe("Russell");
    expect(leader.team).toBe("Mercedes");
    expect(leader.constructorId).toBe("mercedes");
  });

  it("returns null when the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.driverStandings();

    expect(result).toBeNull();
  });
});

describe("f1.constructorStandings", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("returns parsed constructor standings from the Jolpica API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => SAMPLE_CONSTRUCTOR_STANDINGS,
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.constructorStandings();

    expect(result).not.toBeNull();
    expect(result!.standings).toHaveLength(2);

    const leader = result!.standings[0];
    expect(leader.position).toBe(1);
    expect(leader.points).toBe(43);
    expect(leader.wins).toBe(1);
    expect(leader.name).toBe("Mercedes");
    expect(leader.constructorId).toBe("mercedes");
  });

  it("returns null when the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 503 });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.constructorStandings();

    expect(result).toBeNull();
  });
});

describe("f1.raceResults", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("returns parsed race results from the Jolpica API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => SAMPLE_RACE_RESULTS,
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.raceResults();

    expect(result).not.toBeNull();
    expect(result!.races).toHaveLength(1);

    const race = result!.races[0];
    expect(race.round).toBe(1);
    expect(race.raceName).toBe("Australian Grand Prix");
    expect(race.results).toHaveLength(1);
    expect(race.results[0].code).toBe("RUS");
    expect(race.results[0].points).toBe(25);
  });

  it("returns null when the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.raceResults();

    expect(result).toBeNull();
  });
});

describe("f1.schedule", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("returns the full race schedule with sprint indicator", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => SAMPLE_SCHEDULE,
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.schedule();

    expect(result).not.toBeNull();
    expect(result!.races).toHaveLength(2);

    const aus = result!.races[0];
    expect(aus.round).toBe(1);
    expect(aus.raceName).toBe("Australian Grand Prix");
    expect(aus.country).toBe("Australia");
    expect(aus.sprint).toBeNull();

    const chn = result!.races[1];
    expect(chn.sprint).not.toBeNull();
    expect(chn.sprint!.date).toBe("2026-03-14");
  });

  it("returns null when the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.schedule();

    expect(result).toBeNull();
  });
});

describe("f1.qualifying", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("returns qualifying results for a specific round", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        MRData: {
          RaceTable: {
            Races: [{
              round: "1",
              raceName: "Australian Grand Prix",
              QualifyingResults: [
                {
                  position: "1",
                  Driver: { driverId: "russell", code: "RUS", givenName: "George", familyName: "Russell" },
                  Constructor: { name: "Mercedes" },
                  Q1: "1:15.234",
                  Q2: "1:14.890",
                  Q3: "1:14.123",
                },
              ],
            }],
          },
        },
      }),
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.qualifying({ round: 1 });

    expect(result).not.toBeNull();
    expect(result!.round).toBe(1);
    expect(result!.results).toHaveLength(1);
    expect(result!.results[0].position).toBe(1);
    expect(result!.results[0].code).toBe("RUS");
    expect(result!.results[0].q3).toBe("1:14.123");
  });

  it("returns null when no qualifying data exists for the round", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ MRData: { RaceTable: { Races: [] } } }),
    });

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.f1.qualifying({ round: 99 });

    expect(result).toBeNull();
  });
});
