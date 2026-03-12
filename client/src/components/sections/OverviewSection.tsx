// F1 2026 Dashboard — Overview Section (Live Data)
// Design: Hero banner + key stats + latest race result

import { DRIVERS_2026, CONSTRUCTORS_2026, RACES_2026, TEAM_COLORS } from "@/lib/f1Data";
import { useDriverStandings, useConstructorStandings, useRaceResults, useSchedule } from "@/hooks/useF1LiveData";
import { Trophy, Zap, Flag, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { DataFreshnessBadge } from "@/components/LiveDataUI";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-hero-banner-4qb4fdVTV5aszZb5q6bpPq.webp";
const COCKPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-cockpit-view-RT5qP3fSrxVZwiVuYSEQxm.webp";

interface OverviewSectionProps {
  onSectionChange: (section: string) => void;
}

export default function OverviewSection({ onSectionChange }: OverviewSectionProps) {
  const { standings: driverStandings, isLive: driversLive, isLoading: driversLoading, updatedAt } = useDriverStandings();
  const { standings: constructorStandings } = useConstructorStandings();
  const { races: liveRaceResults, isLive: resultsLive } = useRaceResults();
  const { races: liveSchedule } = useSchedule();

  // Use live data if available, otherwise fall back to static
  const leader = driverStandings[0] ?? DRIVERS_2026[0];
  const constructorLeader = constructorStandings[0] ?? CONSTRUCTORS_2026[0];

  // Determine last completed race and next race
  const today = new Date();
  const lastRace = liveRaceResults.length > 0
    ? liveRaceResults[liveRaceResults.length - 1]
    : RACES_2026.find(r => r.status === "completed");

  const nextRace = liveSchedule.length > 0
    ? liveSchedule.find((r: any) => new Date(r.date) >= today)
    : RACES_2026.find(r => r.status === "next");

  const leaderColor = (leader as any).teamColor || TEAM_COLORS[(leader as any).team] || "#E8002D";
  const constructorColor = (constructorLeader as any).teamColor || TEAM_COLORS[(constructorLeader as any).name] || "#E8002D";

  // Get top 3 from last race
  const top3 = lastRace && (lastRace as any).results
    ? (lastRace as any).results.slice(0, 3)
    : null;

  return (
    <div className="space-y-0">
      {/* Hero Banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={HERO_IMG}
          alt="F1 2026 Season"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 via-[#1A1A2E]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <div className="text-[#E8002D] text-sm f1-mono uppercase tracking-widest mb-2">2026 FIA Formula One World Championship</div>
          <h1 className="f1-display text-white text-4xl md:text-6xl font-black leading-none mb-3">
            SEASON<br />DASHBOARD
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md font-light">
            Live standings, performance analysis, race predictions and technical breakdowns for every team and driver.
          </p>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <button
              onClick={() => onSectionChange("drivers")}
              className="bg-[#E8002D] text-white px-5 py-2 text-sm font-semibold f1-display tracking-wider hover:bg-[#c0001f] transition-colors flex items-center gap-2"
            >
              STANDINGS <ChevronRight size={14} />
            </button>
            <button
              onClick={() => onSectionChange("races")}
              className="border border-white/40 text-white px-5 py-2 text-sm font-semibold f1-display tracking-wider hover:bg-white/10 transition-colors"
            >
              RACE CALENDAR
            </button>
            <DataFreshnessBadge isLive={driversLive} updatedAt={updatedAt} isLoading={driversLoading} />
          </div>
        </div>
      </div>

      {/* Championship Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Driver Leader */}
        <div className="bg-[#1A1A2E] p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: leaderColor, filter: "blur(40px)" }} />
          <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-3">Drivers Championship Leader</div>
          <div className="flex items-end gap-4">
            <div>
              <div className="text-white/60 text-sm mb-1">{(leader as any).flag} {(leader as any).nationality}</div>
              <div className="f1-display text-white text-3xl md:text-4xl font-black leading-none mb-1">
                {(leader as any).name || `${(leader as any).givenName} ${(leader as any).familyName}`}
              </div>
              <div className="text-sm font-medium" style={{ color: leaderColor }}>{(leader as any).team}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="f1-stat-number text-5xl font-black" style={{ color: leaderColor }}>{(leader as any).points}</div>
              <div className="text-white/40 text-xs f1-mono">POINTS</div>
            </div>
          </div>
          <div className="mt-4 h-0.5 w-full opacity-20" style={{ background: leaderColor }} />
          <div className="mt-3 flex gap-4">
            {[
              { label: "Wins", value: (leader as any).wins ?? 0 },
              { label: "Podiums", value: (leader as any).podiums ?? "—" },
              { label: "Poles", value: (leader as any).poles ?? "—" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-white/40 text-xs f1-mono">{label}</div>
                <div className="text-white font-bold f1-stat-number">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Constructor Leader */}
        <div className="p-6 md:p-8 relative overflow-hidden" style={{ backgroundColor: constructorColor }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative">
            <div className="text-white/60 text-xs f1-mono uppercase tracking-widest mb-3">Constructors Championship Leader</div>
            <div className="f1-display text-white text-3xl md:text-4xl font-black leading-none mb-1">
              {(constructorLeader as any).name}
            </div>
            <div className="text-white/70 text-sm mb-4">
              {(constructorLeader as any).chassis ?? "—"} · {(constructorLeader as any).powerUnit ?? "—"}
            </div>
            <div className="flex items-end gap-4">
              <div>
                <div className="text-white/60 text-xs f1-mono">Drivers</div>
                <div className="text-white text-sm font-medium">
                  {((constructorLeader as any).drivers ?? []).join(" · ")}
                </div>
              </div>
              <div className="ml-auto text-right">
                <div className="f1-stat-number text-5xl font-black text-white">{(constructorLeader as any).points}</div>
                <div className="text-white/60 text-xs f1-mono">POINTS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Season Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white border-b border-gray-100">
        {[
          { icon: <Flag size={16} />, label: "Races Completed", value: liveRaceResults.length || RACES_2026.filter(r => r.status === "completed").length },
          { icon: <Clock size={16} />, label: "Races Remaining", value: 24 - (liveRaceResults.length || RACES_2026.filter(r => r.status === "completed").length) },
          { icon: <Trophy size={16} />, label: "Different Winners", value: 1 },
          { icon: <TrendingUp size={16} />, label: "Season Round", value: `${liveRaceResults.length || 1} / 24` },
        ].map(({ icon, label, value }) => (
          <div key={label} className="p-4 md:p-5 border-r border-gray-100 last:border-r-0 flex items-center gap-3">
            <div className="text-[#E8002D]">{icon}</div>
            <div>
              <div className="text-xs text-gray-400 f1-mono uppercase">{label}</div>
              <div className="font-black text-xl text-[#1A1A2E] f1-stat-number">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Race Result */}
      {lastRace && (
        <div className="p-6 md:p-8 bg-white">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest mb-1">Latest Result</div>
              <h3 className="f1-display text-xl font-black text-[#1A1A2E] uppercase">
                {(lastRace as any).raceName || (lastRace as any).name}
              </h3>
              <div className="text-gray-400 text-xs f1-mono mt-0.5">
                {(lastRace as any).date} · {(lastRace as any).circuitName || (lastRace as any).circuit}
              </div>
            </div>
            {resultsLive && (
              <span className="text-xs f1-mono text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-sm">
                LIVE DATA
              </span>
            )}
          </div>

          {/* Top 3 from live results */}
          {top3 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {top3.map((result: any, idx: number) => {
                const medals = ["🥇", "🥈", "🥉"];
                const bgColors = ["bg-yellow-50 border-yellow-200", "bg-gray-50 border-gray-200", "bg-amber-50 border-amber-200"];
                return (
                  <div key={idx} className={`rounded-sm border p-3 ${bgColors[idx]}`}>
                    <div className="text-lg mb-1">{medals[idx]}</div>
                    <div className="font-bold text-sm text-[#1A1A2E]">
                      {result.givenName} {result.familyName}
                    </div>
                    <div className="text-xs text-gray-500">{result.team}</div>
                    <div className="text-xs f1-mono text-gray-400 mt-1">{result.points} pts</div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Fallback static display */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { pos: "🥇 P1", name: "George Russell", team: "Mercedes", detail: "Led from pole" },
                { pos: "🥈 P2", name: "Kimi Antonelli", team: "Mercedes", detail: "Mercedes 1-2" },
                { pos: "🥉 P3", name: "Charles Leclerc", team: "Ferrari", detail: "Best of the rest" },
              ].map(({ pos, name, team, detail }) => (
                <div key={pos} className="bg-gray-50 rounded-sm border border-gray-100 p-3">
                  <div className="text-xs text-gray-400 f1-mono mb-1">{pos}</div>
                  <div className="font-bold text-sm text-[#1A1A2E]">{name}</div>
                  <div className="text-xs text-gray-500">{team}</div>
                  <div className="text-xs text-gray-400 mt-1">{detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Next Race */}
      {nextRace && (
        <div className="bg-[#1A1A2E] p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest mb-2">Next Race</div>
              <h3 className="f1-display text-white text-2xl font-black uppercase mb-1">
                {(nextRace as any).raceName || (nextRace as any).name}
              </h3>
              <div className="text-white/50 text-sm f1-mono">
                {(nextRace as any).date} · {(nextRace as any).circuitName || (nextRace as any).circuit}
              </div>
              {(nextRace as any).sprint && (
                <div className="mt-2 inline-flex items-center gap-1 bg-[#E8002D]/20 text-[#E8002D] text-xs f1-mono px-2 py-0.5 rounded-sm">
                  <Zap size={10} />
                  SPRINT WEEKEND
                </div>
              )}
            </div>
            <button
              onClick={() => onSectionChange("races")}
              className="text-white/40 hover:text-white text-xs f1-mono flex items-center gap-1 transition-colors mt-1"
            >
              VIEW CALENDAR <ChevronRight size={12} />
            </button>
          </div>
        </div>
      )}

      {/* 2026 Regulation Changes Banner */}
      <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
        <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest mb-3">2026 Regulation Changes</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "New Power Unit", desc: "50/50 ICE/ERS split, 350kW electrical deployment" },
            { title: "Active Aerodynamics", desc: "Moveable front & rear wings for drag reduction" },
            { title: "Narrower Cars", desc: "Width reduced from 2000mm to 1900mm" },
            { title: "New Teams", desc: "Audi F1 and Cadillac join the grid as new entrants" },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-sm border border-gray-100 p-3">
              <div className="font-semibold text-sm text-[#1A1A2E] mb-1">{title}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
