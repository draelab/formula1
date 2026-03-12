// F1 2026 Dashboard — Constructors Section
// Design: Team cards with livery colours, performance comparison charts

import { CONSTRUCTORS_2026, TEAM_COLORS, DRIVERS_2026 } from "@/lib/f1Data";
import { useConstructorStandings } from "@/hooks/useF1LiveData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useState } from "react";
import { DataFreshnessBadge, ConstructorSkeleton } from "@/components/LiveDataUI";

const PIT_STOP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-pit-stop-Jz4yxLDRhPimQfbVkZphv8.webp";

export default function ConstructorsSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const { standings: liveStandings, round, isLive, isLoading, updatedAt } = useConstructorStandings();

  // Use live data if available, otherwise fall back to static
  const constructors = liveStandings.length > 0 ? liveStandings : CONSTRUCTORS_2026;

  const chartData = constructors.map((c: any) => ({
    name: c.name.replace(" Racing", "").replace("Red Bull", "RBR"),
    points: c.points,
    color: c.teamColor || TEAM_COLORS[c.name] || "#888",
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[#1A1A2E] text-white px-3 py-2 rounded-sm text-xs shadow-lg">
          <div className="font-bold f1-display">{d.name}</div>
          <div className="text-[#E8002D] font-bold f1-mono">{d.points} pts</div>
        </div>
      );
    }
    return null;
  };

  const selectedTeam = selected ? CONSTRUCTORS_2026.find(c => c.name === selected) : null;
  const teamDrivers = selected ? DRIVERS_2026.filter(d => d.team === selected) : [];

  // Radar data for selected team (mock performance metrics)
  const getRadarData = (teamName: string) => {
    const metrics: Record<string, number[]> = {
      "Mercedes": [95, 90, 88, 85, 92, 80],
      "Ferrari": [88, 92, 85, 90, 85, 88],
      "McLaren": [87, 85, 90, 88, 83, 92],
      "Red Bull Racing": [85, 88, 82, 92, 80, 90],
      "Haas": [72, 70, 75, 68, 78, 65],
      "Racing Bulls": [75, 72, 78, 70, 76, 68],
      "Audi": [70, 68, 72, 65, 74, 62],
      "Alpine": [73, 71, 76, 69, 75, 67],
      "Williams": [74, 72, 77, 70, 76, 68],
      "Cadillac": [65, 63, 68, 60, 70, 58],
      "Aston Martin": [71, 69, 74, 67, 73, 65],
    };
    const vals = metrics[teamName] || [70, 70, 70, 70, 70, 70];
    return [
      { subject: "Power", A: vals[0] },
      { subject: "Aero", A: vals[1] },
      { subject: "Mech. Grip", A: vals[2] },
      { subject: "Reliability", A: vals[3] },
      { subject: "Strategy", A: vals[4] },
      { subject: "Driver", A: vals[5] },
    ];
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E8002D]" />
        <div>
          <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest">2026 Season</div>
          <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Constructor Standings</h2>
        </div>
      </div>

      {/* Points Chart */}
      <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm mb-6">
        <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-4">Championship Points — After Round 1</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
            <YAxis tick={{ fontSize: 11, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
            <Bar dataKey="points" radius={[2, 2, 0, 0]}>
              {chartData.map((entry: any, index: number) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {constructors.map((team: any) => {
          const color = TEAM_COLORS[team.name] || "#888";
          const isSelected = selected === team.name;
          return (
            <div
              key={team.name}
              onClick={() => setSelected(isSelected ? null : team.name)}
              className={`bg-white border rounded-sm p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? "border-[#E8002D] shadow-md" : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <div>
                    <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest">P{team.position}</div>
                    <div className="f1-display text-lg font-bold text-[#1A1A2E] leading-tight">{team.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{team.chassis}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="f1-stat-number text-3xl font-black text-[#1A1A2E]">{team.points}</div>
                  <div className="text-xs text-gray-400 f1-mono">PTS</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-50">
                <div className="text-center">
                  <div className="f1-stat-number text-xl font-black text-[#1A1A2E]">{team.wins}</div>
                  <div className="text-xs text-gray-400 f1-mono">Wins</div>
                </div>
                <div className="text-center">
                  <div className="f1-stat-number text-xl font-black text-[#1A1A2E]">{team.podiums}</div>
                  <div className="text-xs text-gray-400 f1-mono">Podiums</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-600 f1-mono">{team.australiaResult}</div>
                  <div className="text-xs text-gray-400 f1-mono">AUS</div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-50">
                <div className="text-xs text-gray-400 f1-mono truncate">{team.powerUnit}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Detail Panel */}
      {selectedTeam && (
        <div className="bg-white border border-[#E8002D]/30 rounded-sm shadow-md overflow-hidden">
          <div className="h-1" style={{ backgroundColor: TEAM_COLORS[selectedTeam.name] || "#888" }} />
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 rounded-full" style={{ backgroundColor: TEAM_COLORS[selectedTeam.name] || "#888" }} />
                  <h3 className="f1-display text-2xl font-black text-[#1A1A2E] uppercase">{selectedTeam.name}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-sm p-3">
                    <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-1">Chassis</div>
                    <div className="font-semibold text-[#1A1A2E] text-sm">{selectedTeam.chassis}</div>
                  </div>
                  <div className="bg-gray-50 rounded-sm p-3">
                    <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-1">Power Unit</div>
                    <div className="font-semibold text-[#1A1A2E] text-sm">{selectedTeam.powerUnit}</div>
                  </div>
                </div>

                {/* Drivers */}
                <div className="mb-4">
                  <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">2026 Drivers</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {teamDrivers.map(driver => (
                      <div key={driver.name} className="flex items-center gap-3 bg-gray-50 rounded-sm p-3">
                        <div className="w-8 h-8 flex items-center justify-center text-sm font-black f1-display rounded-sm" style={{ backgroundColor: `${TEAM_COLORS[driver.team]}20`, color: TEAM_COLORS[driver.team] }}>
                          {driver.number}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#1A1A2E]">{driver.name}</div>
                          <div className="text-xs text-gray-400">{driver.nationality} {driver.flag}</div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="font-black f1-stat-number text-[#1A1A2E]">{driver.points}</div>
                          <div className="text-xs text-gray-400 f1-mono">pts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Australia Result */}
                <div className="bg-[#1A1A2E] rounded-sm p-3">
                  <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-1">Australian GP Result</div>
                  <div className="text-white f1-display text-xl font-bold">{selectedTeam.australiaResult}</div>
                </div>
              </div>

              {/* Radar Chart */}
              <div>
                <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-3">Performance Metrics</div>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={getRadarData(selectedTeam.name)}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#888" }} />
                    <Radar name={selectedTeam.name} dataKey="A" stroke={TEAM_COLORS[selectedTeam.name] || "#888"} fill={TEAM_COLORS[selectedTeam.name] || "#888"} fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
                <div className="text-xs text-gray-400 f1-mono text-center mt-1">Estimated performance indices</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="mt-6 rounded-sm overflow-hidden h-48 relative">
        <img src={PIT_STOP_IMG} alt="F1 Pit Stop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/70 to-transparent flex items-center px-8">
          <div>
            <div className="text-white/60 text-xs f1-mono uppercase tracking-widest">2026 Regulations</div>
            <div className="text-white f1-display text-2xl font-black">11 TEAMS · 22 DRIVERS</div>
            <div className="text-white/60 text-sm mt-1">Audi & Cadillac join the grid for the first time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
