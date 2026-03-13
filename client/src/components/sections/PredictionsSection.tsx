// F1 2026 Dashboard — Predictions Section
// Design: Data-driven predictions derived from live standings and race results

import { useMemo } from "react";
import { RACES_2026, DRIVERS_2026, TEAM_COLORS, RACE_CIRCUIT_IDS } from "@/lib/f1Data";
import { useDriverStandings, useConstructorStandings, useRaceResults } from "@/hooks/useF1LiveData";
import { TrendingUp, Target, Zap, Trophy, AlertTriangle, Loader2 } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// ─── Constructor ID → team color mapping ────────────────────────────────────
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

const TOTAL_RACES = 24;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toAmericanOdds(probability: number): string {
  if (probability <= 0) return "+9999";
  if (probability >= 1) return "-9999";
  if (probability > 0.5) {
    const odds = Math.round(-100 * (probability / (1 - probability)));
    return `${odds}`;
  }
  const odds = Math.round(100 * ((1 - probability) / probability));
  return `+${odds}`;
}

function getDriverColor(constructorId: string | undefined): string {
  return CONSTRUCTOR_ID_TO_COLOR[constructorId ?? ""] ?? "#888";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A2E] text-white px-3 py-2 rounded-sm text-xs shadow-lg">
        <div className="font-bold f1-mono mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-white/70">{p.name}:</span>
            <span className="font-bold">{p.value} pts</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PredictionsSection() {
  const { standings: driverStandings, round: currentRound, isLoading: driversLoading } = useDriverStandings();
  const { standings: constructorStandings, isLoading: constructorsLoading } = useConstructorStandings();
  const { races: completedRaces, isLoading: resultsLoading } = useRaceResults();

  const isLoading = driversLoading || constructorsLoading || resultsLoading;
  const completedRaceCount = completedRaces.length || 0;
  const roundNum = parseInt(currentRound ?? "0") || completedRaceCount;
  const hasData = roundNum > 0 && driverStandings.length > 0;

  // ─── A. Top 6 drivers for projections ───────────────────────────────────────
  const topDrivers = useMemo(() => {
    return driverStandings.slice(0, 6).map((d: any) => {
      const racesUsed = Math.max(completedRaceCount, 1);
      const remainingRaces = Math.max(TOTAL_RACES - racesUsed, 0);
      const avgPointsPerRace = d.points / racesUsed;
      const projectedPoints = Math.round(d.points + avgPointsPerRace * remainingRaces);
      return {
        ...d,
        projectedPoints,
        avgPointsPerRace,
        color: d.teamColor ?? getDriverColor(d.constructorId),
      };
    });
  }, [driverStandings, completedRaceCount]);

  // ─── B. Championship trajectory from race results ───────────────────────────
  const trajectoryData = useMemo(() => {
    if (completedRaces.length === 0) return [];
    const top6Ids = topDrivers.map((d: any) => d.driverId ?? d.shortName);
    const cumulativePoints: Record<string, number> = {};
    top6Ids.forEach((id: string) => { cumulativePoints[id] = 0; });

    return completedRaces.map((race: any) => {
      const roundLabel = race.raceName
        ?.replace(" Grand Prix", "")
        ?.substring(0, 3)
        ?.toUpperCase() ?? `R${race.round}`;

      const roundData: any = { round: roundLabel };

      topDrivers.forEach((driver: any) => {
        const driverId = driver.driverId ?? driver.shortName;
        const result = race.results?.find(
          (r: any) => r.driverId === driver.driverId || r.code === driver.shortName
        );
        cumulativePoints[driverId] = (cumulativePoints[driverId] ?? 0) + (result?.points ?? 0);
        const displayName = driver.familyName ?? driver.shortName ?? driverId;
        roundData[displayName] = cumulativePoints[driverId];
      });

      return roundData;
    });
  }, [completedRaces, topDrivers]);

  // ─── C. Upcoming race predictions ───────────────────────────────────────────
  const upcomingPredictions = useMemo(() => {
    const upcomingRaces = RACES_2026.filter(r => r.status === "upcoming" || r.status === "next").slice(0, 6);
    if (!hasData) return upcomingRaces.map(r => ({ race: r, favorite: null as any, odds: "", prediction: "", probability: 0 }));

    // Compute driver form: average points over last 3 races
    const driverForm: Record<string, number> = {};
    const last3Races = completedRaces.slice(-3);
    const formRaceCount = last3Races.length || 1;

    last3Races.forEach((race: any) => {
      race.results?.forEach((r: any) => {
        const key = r.driverId ?? r.code;
        if (key) {
          driverForm[key] = (driverForm[key] ?? 0) + (r.points ?? 0);
        }
      });
    });

    // Normalize form to average
    Object.keys(driverForm).forEach(k => {
      driverForm[k] = driverForm[k] / formRaceCount;
    });

    // Constructor strength score: inverse of position (P1=10, P2=9, ...)
    const constructorStrength: Record<string, number> = {};
    constructorStandings.forEach((c: any, idx: number) => {
      constructorStrength[c.constructorId ?? c.name] = Math.max(11 - (idx + 1), 1);
    });

    return upcomingRaces.map(race => {
      // Score each top driver
      const scored = driverStandings.slice(0, 10).map((d: any) => {
        const driverId = d.driverId ?? d.shortName;
        const form = driverForm[driverId] ?? 0;
        const teamStrength = constructorStrength[d.constructorId ?? ""] ?? 1;
        // 60% form, 40% constructor
        const score = form * 0.6 + teamStrength * 0.4;
        return { driver: d, score };
      });

      scored.sort((a: { driver: any; score: number }, b: { driver: any; score: number }) => b.score - a.score);
      const totalScore = scored.reduce((s: number, d: { driver: any; score: number }) => s + Math.max(d.score, 0.01), 0);
      const favorite = scored[0];
      const probability = totalScore > 0 ? Math.min(Math.max(favorite.score / totalScore, 0.05), 0.95) : 0.1;
      const odds = toAmericanOdds(probability);
      const probPct = Math.round(probability * 100);

      // Form description
      const formDesc = completedRaceCount >= 3
        ? `strong recent form (avg ${driverForm[favorite.driver.driverId ?? favorite.driver.shortName]?.toFixed(1) ?? "0"} pts/race)`
        : completedRaceCount > 0
          ? `early season data (${completedRaceCount} race${completedRaceCount > 1 ? "s" : ""})`
          : "pre-season analysis";

      const favName = favorite.driver.name ?? `${favorite.driver.givenName ?? ""} ${favorite.driver.familyName ?? ""}`.trim();
      const prediction = `${favName} leads the field with ${probPct}% win probability based on ${formDesc}.`;

      return {
        race,
        favorite: favorite.driver,
        odds,
        prediction,
        probability,
      };
    });
  }, [driverStandings, constructorStandings, completedRaces, hasData, completedRaceCount]);

  // ─── D. Key storylines ──────────────────────────────────────────────────────
  const storylines = useMemo(() => {
    if (!hasData) return [];
    const stories: Array<{ title: string; body: string; confidence: number; label: string }> = [];

    // 1. Championship leader
    const leader = driverStandings[0] as any;
    if (leader) {
      const leaderName = leader.name ?? `${leader.givenName ?? ""} ${leader.familyName ?? ""}`.trim();
      const leaderTeam = leader.team ?? "Unknown";
      // Extrapolate probability from points share
      const totalTopPoints = driverStandings.slice(0, 5).reduce((s: number, d: any) => s + ((d as any).points ?? 0), 0);
      const leaderShare = totalTopPoints > 0 ? Math.round((leader.points / totalTopPoints) * 100) : 50;
      stories.push({
        title: `${leaderTeam} Leading the Championship`,
        body: `${leaderName} leads with ${leader.points}pts after ${roundNum} round${roundNum > 1 ? "s" : ""}. ${leaderTeam}'s pace suggests they are the team to beat in 2026.`,
        confidence: Math.min(leaderShare, 95),
        label: `${leaderTeam} title probability`,
      });
    }

    // 2. Closest title battle — gap between P1 and P2
    const p2 = driverStandings[1] as any;
    if (leader && p2) {
      const gap = (leader.points ?? 0) - (p2.points ?? 0);
      const p2Name = p2.name ?? `${p2.givenName ?? ""} ${p2.familyName ?? ""}`.trim();
      const p2Team = p2.team ?? "Unknown";
      const totalTopPoints = driverStandings.slice(0, 5).reduce((s: number, d: any) => s + ((d as any).points ?? 0), 0);
      const p2Share = totalTopPoints > 0 ? Math.round((p2.points / totalTopPoints) * 100) : 30;
      stories.push({
        title: `Title Battle: ${gap}pt Gap to P2`,
        body: `${p2Name} (${p2Team}) trails by ${gap} point${gap !== 1 ? "s" : ""}. ${gap <= 20 ? "The championship fight is extremely close." : gap <= 50 ? "A few strong results could close this gap." : "It will take a sustained challenge to overturn this lead."}`,
        confidence: Math.min(p2Share, 90),
        label: `${p2Name} title probability`,
      });
    }

    // 3. Best team form — team with most points in last completed race
    if (completedRaces.length > 0) {
      const lastRace = completedRaces[completedRaces.length - 1];
      const teamPoints: Record<string, number> = {};
      lastRace.results?.forEach((r: any) => {
        const team = r.team ?? "Unknown";
        teamPoints[team] = (teamPoints[team] ?? 0) + (r.points ?? 0);
      });
      const bestTeam = Object.entries(teamPoints).sort(([, a], [, b]) => (b as number) - (a as number))[0];
      if (bestTeam) {
        const [teamName, pts] = bestTeam;
        const constructorPos = constructorStandings.findIndex((c: any) => c.name === teamName) + 1;
        stories.push({
          title: `${teamName} — Best Form Right Now`,
          body: `${teamName} scored ${pts} points at the last race${constructorPos > 0 ? `, currently P${constructorPos} in the constructors' standings` : ""}. Their recent performance suggests strong ongoing pace.`,
          confidence: Math.min(Math.round((pts / 44) * 100), 95), // 44 = max team points in a race (25+19)
          label: "Recent form strength",
        });
      }
    }

    // 4. Rookie watch
    const rookies = DRIVERS_2026.filter(d => d.career.debutYear === 2026);
    if (rookies.length > 0) {
      const rookieNames = rookies.map(r => r.name).join(" & ");
      // Find rookie standings positions
      const rookieStandings = rookies.map(r => {
        const standing = driverStandings.find(
          (d: any) => d.name === r.name || (d.familyName && r.name.includes(d.familyName))
        ) as any;
        return { name: r.name, points: standing?.points ?? 0, position: standing?.position ?? 99 };
      }).filter(r => r.position < 99);

      const bestRookie = rookieStandings.sort((a, b) => a.position - b.position)[0];
      const rookieConfidence = bestRookie ? Math.min(Math.round((bestRookie.points / Math.max(leader?.points ?? 1, 1)) * 50), 40) : 10;

      stories.push({
        title: `Rookie Watch: ${rookieNames}`,
        body: bestRookie
          ? `${bestRookie.name} sits P${bestRookie.position} with ${bestRookie.points}pts. An impressive start for a rookie season with plenty of room to grow.`
          : `${rookieNames} debuting in 2026. Watch for their development through the season.`,
        confidence: Math.max(rookieConfidence, 5),
        label: "Rookie impact rating",
      });
    }

    return stories;
  }, [driverStandings, constructorStandings, completedRaces, hasData, roundNum]);

  // ─── Projected standings for the bar chart ──────────────────────────────────
  const projectedStandings = useMemo(() => {
    return topDrivers.map((d: any) => ({
      driver: `${(d.givenName ?? d.name?.split(" ")[0] ?? "").charAt(0)}. ${d.familyName ?? d.name?.split(" ").pop() ?? d.shortName}`,
      team: d.team ?? "Unknown",
      current: d.points ?? 0,
      projected: d.projectedPoints ?? 0,
      color: d.color,
    }));
  }, [topDrivers]);

  // ─── Line chart legend entries ──────────────────────────────────────────────
  const legendEntries = useMemo(() => {
    const seenColors = new Set<string>();
    return topDrivers.map((d: any, idx: number) => {
      const name = d.familyName ?? d.shortName ?? `Driver ${idx + 1}`;
      const color = d.color;
      const isDashed = seenColors.has(color);
      seenColors.add(color);
      return { name, color, dashed: isDashed };
    });
  }, [topDrivers]);

  // ─── Loading / empty state ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="p-6 md:p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#E8002D] mr-2" size={20} />
        <span className="text-gray-500 f1-mono">Loading prediction data...</span>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-[#E8002D]" />
          <div>
            <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">Data Analysis</div>
            <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Season Predictions</h2>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm text-center">
          <Trophy size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-lg font-semibold text-[#1A1A2E] f1-display">Predictions will be available after Round 1</p>
          <p className="text-sm text-gray-400 mt-1">Once the first race is completed, predictions will be generated from live standings and results data.</p>
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
          <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">Data Analysis</div>
          <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Season Predictions</h2>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 mb-6 flex items-start gap-2">
        <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-700">Predictions are derived from current championship standings, race results, and constructor performance data. They are statistical projections based on form extrapolation, not guarantees.</p>
      </div>

      {/* Championship Trajectory Chart */}
      {trajectoryData.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#E8002D]" />
            <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">
              Championship Trajectory (Rounds 1{trajectoryData.length > 1 ? `\u2013${trajectoryData.length}` : ""})
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={trajectoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="round" tick={{ fontSize: 13, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 13, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {(() => {
                const seenColors = new Set<string>();
                return topDrivers.map((d: any, idx: number) => {
                  const name = d.familyName ?? d.shortName ?? `Driver ${idx + 1}`;
                  const color = d.color;
                  const isDashed = seenColors.has(color);
                  seenColors.add(color);
                  return (
                    <Line
                      key={name}
                      type="monotone"
                      dataKey={name}
                      stroke={color}
                      strokeWidth={isDashed ? 1.5 : 2.5}
                      strokeDasharray={isDashed ? "4 2" : undefined}
                      dot={{ r: isDashed ? 2 : 3 }}
                      name={name}
                    />
                  );
                });
              })()}
            </LineChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {legendEntries.map(({ name, color, dashed }: { name: string; color: string; dashed: boolean }) => (
              <div key={name} className="flex items-center gap-1.5">
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: color, opacity: dashed ? 0.6 : 1 }} />
                <span className="text-sm text-gray-500 f1-mono">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Race Predictions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={16} className="text-[#E8002D]" />
          <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Upcoming Race Predictions</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {upcomingPredictions.map(({ race, favorite, odds, prediction }) => {
            const favColor = favorite ? getDriverColor(favorite.constructorId) : "#E8002D";
            const favName = favorite
              ? (favorite.name ?? `${favorite.givenName ?? ""} ${favorite.familyName ?? ""}`.trim())
              : null;
            return (
              <div key={race.round} className={`bg-white border rounded-sm p-4 shadow-sm ${race.status === "next" ? "border-[#E8002D]/40" : "border-gray-100"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[13px] text-gray-400 f1-mono uppercase tracking-widest">Round {race.round}</div>
                    <div className="f1-display text-base font-bold text-[#1A1A2E] leading-tight mt-0.5">
                      {race.name.replace(" Grand Prix", " GP")}
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">{race.date}</div>
                  </div>
                  <div className="text-2xl">{race.flag}</div>
                </div>

                {prediction && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{prediction}</p>
                )}

                {favName && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-sm text-gray-400 f1-mono">Predicted Winner</div>
                      <div className="font-bold text-sm f1-display" style={{ color: favColor }}>{favName}</div>
                    </div>
                    {odds && (
                      <div className="bg-gray-50 rounded-sm px-2 py-1">
                        <div className="text-sm text-gray-400 f1-mono">Odds</div>
                        <div className="font-black f1-stat-number text-[#1A1A2E]">{odds}</div>
                      </div>
                    )}
                  </div>
                )}

                {race.isSprint && (
                  <div className="mt-2 flex items-center gap-1 text-yellow-600 text-xs f1-mono">
                    <Zap size={10} /> Sprint Weekend
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Season Outlook */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Championship Outlook */}
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-[#E8002D]" />
            <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Driver Championship Outlook</div>
          </div>
          <div className="space-y-3">
            {projectedStandings.map((d: { driver: string; team: string; current: number; projected: number; color: string }, i: number) => {
              const maxProjected = projectedStandings[0]?.projected || 1;
              const pct = (d.projected / maxProjected) * 100;
              return (
                <div key={d.driver}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400 f1-mono w-4">{i + 1}</span>
                      <span className="text-sm font-semibold text-[#1A1A2E]">{d.driver}</span>
                      <span className="text-sm text-gray-400">{d.team}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold f1-mono text-[#1A1A2E]">{d.projected}</span>
                      <span className="text-sm text-gray-400 ml-1">proj.</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: d.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-400 mt-4 f1-mono">*Projected final points based on current form extrapolation over {TOTAL_RACES} races</p>
        </div>

        {/* Key Storylines */}
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#E8002D]" />
            <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Key Season Storylines</div>
          </div>
          <div className="space-y-4">
            {storylines.map(({ title, body, confidence, label }) => (
              <div key={title} className="pb-3 border-b border-gray-50 last:border-0">
                <div className="font-semibold text-sm text-[#1A1A2E] mb-1">{title}</div>
                <p className="text-sm text-gray-500 leading-relaxed mb-2">{body}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8002D] rounded-full" style={{ width: `${confidence}%` }} />
                  </div>
                  <span className="text-sm text-[#E8002D] font-bold f1-mono">{confidence}%</span>
                  <span className="text-sm text-gray-400 f1-mono">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
