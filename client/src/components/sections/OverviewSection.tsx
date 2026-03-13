// F1 2026 Dashboard — Overview Section (Live Data)
// Design: Hero banner + compact stats bar + race result with bar chart

import { DRIVERS_2026, CONSTRUCTORS_2026, RACES_2026, TEAM_COLORS } from "@/lib/f1Data";
import { useDriverStandings, useConstructorStandings, useRaceResults, useSchedule } from "@/hooks/useF1LiveData";
import { Zap, ChevronRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-hero-banner-4qb4fdVTV5aszZb5q6bpPq.webp";
const COCKPIT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-cockpit-view-RT5qP3fSrxVZwiVuYSEQxm.webp";

interface OverviewSectionProps {
  onSectionChange: (section: string) => void;
}

export default function OverviewSection({ onSectionChange }: OverviewSectionProps) {
  const { standings: driverStandings, isLoading: driversLoading } = useDriverStandings();
  const { standings: constructorStandings } = useConstructorStandings();
  const { races: liveRaceResults } = useRaceResults();
  const { races: liveSchedule } = useSchedule();

  const leader = driverStandings[0] ?? DRIVERS_2026[0];
  const constructorLeader = constructorStandings[0] ?? CONSTRUCTORS_2026[0];
  const top5Drivers = (driverStandings.length > 0 ? driverStandings : DRIVERS_2026).slice(0, 5);

  const today = new Date();
  const completedCount = liveRaceResults.length || RACES_2026.filter(r => r.status === "completed").length;
  const lastRace = liveRaceResults.length > 0
    ? liveRaceResults[liveRaceResults.length - 1]
    : RACES_2026.find(r => r.status === "completed");

  const nextRace = liveSchedule.length > 0
    ? liveSchedule.find((r: any) => new Date(r.date) >= today)
    : RACES_2026.find(r => r.status === "next");

  // Top 10 results from last race
  const raceTop10 = lastRace && (lastRace as any).results
    ? (lastRace as any).results.slice(0, 10)
    : [
        { givenName: "George", familyName: "Russell", team: "Mercedes", points: 25 },
        { givenName: "Kimi", familyName: "Antonelli", team: "Mercedes", points: 18 },
        { givenName: "Charles", familyName: "Leclerc", team: "Ferrari", points: 15 },
        { givenName: "Lewis", familyName: "Hamilton", team: "Ferrari", points: 12 },
        { givenName: "Lando", familyName: "Norris", team: "McLaren", points: 10 },
        { givenName: "Max", familyName: "Verstappen", team: "Red Bull Racing", points: 8 },
        { givenName: "Oliver", familyName: "Bearman", team: "Haas", points: 6 },
        { givenName: "Liam", familyName: "Lawson", team: "Racing Bulls", points: 4 },
        { givenName: "Gabriel", familyName: "Bortoleto", team: "Audi", points: 2 },
        { givenName: "Pierre", familyName: "Gasly", team: "Alpine", points: 1 },
      ];

  const maxPoints = Math.max(...top5Drivers.map((d: any) => Number(d.points) || 0));

  // Helper to get 3-letter code from name
  const getCode = (d: any) => {
    const name = d.familyName || d.name?.split(" ").pop() || "";
    return name.substring(0, 3).toUpperCase();
  };

  const getFlag = (d: any) => d.flag || d.nationality?.substring(0, 2) || "🏁";

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
          </div>
        </div>
      </div>

      {/* Compact Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#1A1A2E] border-b border-white/10">
        <div className="p-4 md:p-5 border-r border-white/10 text-center">
          <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Championship Leader</div>
          <div className="text-white font-bold text-sm f1-display">
            {(leader as any).name || `${(leader as any).givenName} ${(leader as any).familyName}`}
          </div>
          <div className="text-[#E8002D] text-sm f1-mono font-bold">{(leader as any).points} PTS</div>
        </div>
        <div className="p-4 md:p-5 border-r border-white/10 text-center">
          <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Constructors Leader</div>
          <div className="text-white font-bold text-sm f1-display">{(constructorLeader as any).name}</div>
          <div className="text-[#E8002D] text-sm f1-mono font-bold">{(constructorLeader as any).points} PTS</div>
        </div>
        <div className="p-4 md:p-5 border-r border-white/10 text-center">
          <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Races Completed</div>
          <div className="text-white font-bold text-lg f1-display">{completedCount} / 24</div>
          <div className="text-white/50 text-xs f1-mono">
            {lastRace ? ((lastRace as any).raceName || (lastRace as any).name || "").replace(" Grand Prix", "") : "—"}
          </div>
        </div>
        <div className="p-4 md:p-5 text-center">
          <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Next Race</div>
          <div className="text-white font-bold text-sm f1-display">
            {nextRace ? ((nextRace as any).country || ((nextRace as any).raceName || (nextRace as any).name || "").replace(" Grand Prix", "")) : "—"}
          </div>
          <div className="text-[#E8002D] text-xs f1-mono">
            {nextRace ? (nextRace as any).date : ""}
          </div>
        </div>
      </div>

      {/* Main Content: Latest Race + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Left: Latest Race */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 border-r border-gray-100">
          <h2 className="f1-display text-xl font-black text-[#1A1A2E] uppercase mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#E8002D] inline-block" />
            Latest Race — {lastRace ? ((lastRace as any).raceName || (lastRace as any).name || "").replace(" Grand Prix", "") : "Australia"}
          </h2>

          {/* Race Image */}
          <div className="relative h-48 md:h-64 overflow-hidden mb-6">
            <img
              src={COCKPIT_IMG}
              alt="Race"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 md:p-6">
              <div className="text-white/60 text-xs f1-mono mb-1">
                ROUND {(lastRace as any)?.round || 1} · {((lastRace as any)?.circuitName || (lastRace as any)?.circuit || "Albert Park").toUpperCase()} · {(lastRace as any)?.date || "8 MARCH 2026"}
              </div>
              <div className="f1-display text-white text-xl md:text-2xl font-black uppercase">
                {(lastRace as any)?.raceName || (lastRace as any)?.name || "Australian Grand Prix"}
              </div>
            </div>
          </div>

          {/* Top 5 Results */}
          <div className="space-y-0">
            {raceTop10.map((result: any, idx: number) => {
              const teamColor = TEAM_COLORS[result.team] || "#666";
              const posColors = ["bg-[#E8002D] text-white", "bg-[#1A1A2E] text-white", "bg-[#1A1A2E] text-white", "text-[#1A1A2E] bg-transparent", "text-[#1A1A2E] bg-transparent", "text-[#1A1A2E] bg-transparent", "text-[#1A1A2E] bg-transparent", "text-[#1A1A2E] bg-transparent", "text-[#1A1A2E] bg-transparent", "text-[#1A1A2E] bg-transparent"];
              return (
                <div key={idx} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${posColors[idx]}`}
                    style={idx < 3 ? {} : {}}
                  >
                    {idx + 1}
                  </div>
                  <div className="w-1 h-8 mr-3 rounded-full" style={{ backgroundColor: teamColor }} />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-[#1A1A2E]">
                      {result.givenName ? `${result.givenName} ${result.familyName}` : result.name}
                    </div>
                    <div className="text-xs text-gray-400">{result.team}</div>
                  </div>
                  <div className="text-sm f1-mono font-semibold text-[#1A1A2E]">{result.points} pts</div>
                </div>
              );
            })}
          </div>

          {/* Race Footer */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400 f1-mono">
            <div>
              {(() => {
                if (!lastRace || !(lastRace as any).results) return "Pole: G. Russell · Fastest Lap: M. Verstappen";
                const results = (lastRace as any).results;
                const pole = results.find((r: any) => r.grid === "1" || r.grid === 1);
                const fl = results.find((r: any) => r.fastestLap);
                const poleName = pole ? `${(pole.givenName ?? "")[0]}. ${pole.familyName ?? pole.driver ?? ""}` : "—";
                const flName = fl ? `${(fl.givenName ?? "")[0]}. ${fl.familyName ?? fl.driver ?? ""}` : "—";
                return `Pole: ${poleName} · Fastest Lap: ${flName}`;
              })()}
            </div>
            <div>Laps: {(lastRace as any)?.laps || 58}</div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-[#1A1A2E]">
          {/* Top 5 Drivers Bar Chart */}
          <div className="p-6 border-b border-white/10">
            <h3 className="f1-display text-white text-lg font-black uppercase mb-4">Top 5 Drivers</h3>
            <div className="space-y-3">
              {top5Drivers.map((d: any, idx: number) => {
                const teamColor = d.teamColor || TEAM_COLORS[d.team] || "#E8002D";
                const pts = Number(d.points) || 0;
                const barWidth = maxPoints > 0 ? (pts / maxPoints) * 100 : 0;
                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white/50 text-xs f1-mono w-4">{idx + 1}</span>
                        <span className="text-white font-bold text-sm f1-mono">{getCode(d)}</span>
                        <span className="text-sm">{getFlag(d)}</span>
                      </div>
                      <span className="text-white font-bold text-sm f1-mono">{pts}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, backgroundColor: teamColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Race Card */}
          {nextRace && (
            <div className="p-6 border-b border-white/10">
              <h3 className="f1-display text-white text-lg font-black uppercase mb-3">Next Race</h3>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-white/40 text-xs f1-mono mb-1">ROUND {(nextRace as any).round || 2}</div>
                  <div className="f1-display text-white text-lg font-black leading-tight">
                    {(nextRace as any).raceName || (nextRace as any).name}
                  </div>
                  <div className="text-white/50 text-xs f1-mono mt-1">
                    {(nextRace as any).circuitName || (nextRace as any).circuit}
                  </div>
                </div>
                {(nextRace as any).flag && (
                  <span className="text-2xl">{(nextRace as any).flag}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <div className="text-white/40 text-xs f1-mono">Date</div>
                  <div className="text-white text-sm font-medium">{(nextRace as any).date}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs f1-mono">Format</div>
                  <div className="text-white text-sm font-medium">
                    {(nextRace as any).sprint ? "Sprint Weekend" : "Standard"}
                  </div>
                </div>
                <div>
                  <div className="text-white/40 text-xs f1-mono">Circuit Length</div>
                  <div className="text-white text-sm font-medium">{(nextRace as any).circuitLength || "5.451 km"}</div>
                </div>
                <div>
                  <div className="text-white/40 text-xs f1-mono">Favourite</div>
                  <div className="text-sm font-medium" style={{ color: "#E8002D" }}>
                    {(leader as any).name || `${(leader as any).givenName} ${(leader as any).familyName}`}
                  </div>
                </div>
              </div>

              {(nextRace as any).sprint && (
                <div className="mt-3 w-full bg-[#E8002D]/20 text-[#E8002D] text-xs f1-mono px-3 py-2 rounded-sm flex items-center gap-1 justify-center">
                  <Zap size={10} />
                  SPRINT WEEKEND
                </div>
              )}
            </div>
          )}

          {/* 2026 Key Changes */}
          <div className="p-6">
            <h3 className="f1-display text-white text-lg font-black uppercase mb-3">2026 Regulation Changes</h3>
            <div className="space-y-2">
              {[
                { icon: "⚡", text: "350kW MGU-K — 3× more electric power" },
                { icon: "✈️", text: "Active aero X-Mode/Z-Mode replaces DRS" },
                { icon: "⚖️", text: "30kg lighter — 768kg minimum weight" },
                { icon: "📏", text: "Shorter & narrower — 200mm shorter, 50mm narrower" },
                { icon: "🔋", text: "50/50 combustion/electric power split" },
                { icon: "⛽", text: "100% sustainable fuel mandatory" },
                { icon: "🏎️", text: "Audi & Cadillac debut as new teams" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/70 text-sm">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 text-xs text-gray-400 f1-mono flex items-center justify-between border-t border-gray-100">
        <div>Data current as of<br />Round {completedCount} — {lastRace ? ((lastRace as any).raceName || (lastRace as any).name || "Australia") : "Australia"} {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}
