// F1 2026 Dashboard — Drivers Section (Live Data)
// Design: Editorial table with team colour accents, performance bars

import { useState } from "react";
import { TEAM_COLORS } from "@/lib/f1Data";
import { useDriverStandings } from "@/hooks/useF1LiveData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChevronRight } from "lucide-react";
import { DataFreshnessBadge, DriverSkeleton } from "@/components/LiveDataUI";
import DriverProfileModal from "@/components/DriverProfileModal";

interface DriversSectionProps {
  onNavigateToTeam?: (team: string) => void;
  onNavigateToCar?: (team: string) => void;
}

export default function DriversSection({ onNavigateToTeam, onNavigateToCar }: DriversSectionProps) {
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [view, setView] = useState<"table" | "chart">("table");
  const [failedHeadshots, setFailedHeadshots] = useState<Set<string>>(new Set());
  const { standings, round, isLive, isLoading, updatedAt } = useDriverStandings();

  const maxPoints = Math.max(...standings.map((d: any) => d.points), 1);

  const chartData = standings.filter((d: any) => d.points > 0).map((d: any) => ({
    name: d.shortName,
    points: d.points,
    team: d.team,
    color: (d.teamColor || TEAM_COLORS[d.team]) ?? "#888",
  }));

  const handleDriverClick = (driver: any) => {
    setSelectedDriver(driver);
    setModalOpen(true);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[#1A1A2E] text-white px-3 py-2 rounded-sm text-xs shadow-lg">
          <div className="font-bold f1-display">{d.name}</div>
          <div className="text-white/60">{d.team}</div>
          <div className="text-[#E8002D] font-bold f1-mono">{d.points} pts</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-8 bg-[#E8002D]" />
            <div>
              <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest">2026 Season</div>
              <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Drivers</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4 mt-1">
            <p className="text-gray-500 text-sm">After Round {round}</p>
            <DataFreshnessBadge isLive={isLive} updatedAt={updatedAt} isLoading={isLoading} />
          </div>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-sm p-1">
          <button
            onClick={() => setView("table")}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors f1-mono ${view === "table" ? "bg-[#1A1A2E] text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            TABLE
          </button>
          <button
            onClick={() => setView("chart")}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors f1-mono ${view === "chart" ? "bg-[#1A1A2E] text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            CHART
          </button>
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && <DriverSkeleton />}

      {/* Table View */}
      {!isLoading && view === "table" && (
        <div className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[40px_44px_1fr_120px_60px_60px_60px_60px_30px] gap-2 px-4 py-2 bg-[#1A1A2E] text-white/50 text-xs f1-mono uppercase tracking-widest">
            <div>POS</div>
            <div></div>
            <div>DRIVER</div>
            <div>TEAM</div>
            <div className="text-right hidden sm:block">NAT</div>
            <div className="text-right hidden md:block">AUS</div>
            <div className="text-right"></div>
            <div className="text-right">POINTS</div>
            <div></div>
          </div>

          {/* Driver rows */}
          {standings.map((driver: any) => {
            const teamColor = driver.teamColor || TEAM_COLORS[driver.team] || "#888";
            const pos = driver.position;

            return (
              <div key={driver.name || driver.driverId} className="border-b border-gray-50 last:border-0">
                <div
                  className="grid grid-cols-[40px_44px_1fr_120px_60px_60px_60px_60px_30px] gap-2 px-4 py-3 items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => handleDriverClick(driver)}
                >
                  {/* Position */}
                  <div className={`w-8 h-8 flex items-center justify-center text-sm font-black f1-display rounded-sm ${pos === 1 ? "bg-yellow-400 text-[#1A1A2E]" : pos === 2 ? "bg-gray-300 text-[#1A1A2E]" : pos === 3 ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                    {pos}
                  </div>

                  {/* Driver headshot */}
                  <div className="flex items-center justify-center">
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border-2 bg-gray-100 flex-shrink-0"
                      style={{ borderColor: teamColor }}
                    >
                      {failedHeadshots.has(driver.shortName) ? (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400 f1-mono">
                          {driver.shortName}
                        </div>
                      ) : (
                        <img
                          src={driver.headshot || driver.photo}
                          alt={driver.name}
                          className="w-full h-full object-cover"
                          onError={() => setFailedHeadshots((prev) => new Set(prev).add(driver.shortName))}
                        />
                      )}
                    </div>
                  </div>

                  {/* Driver name */}
                  <div>
                    <div className="font-semibold text-sm text-[#1A1A2E]">
                      {driver.name || `${driver.givenName} ${driver.familyName}`}
                    </div>
                    <div className="text-xs text-gray-400 f1-mono">#{driver.number}</div>
                  </div>

                  {/* Team */}
                  <div className="text-xs font-medium truncate" style={{ color: teamColor }}>
                    {driver.team}
                  </div>

                  {/* Nationality flag */}
                  <div className="text-base hidden sm:block text-center">{driver.flag}</div>

                  {/* Australia result */}
                  <div className="text-xs text-gray-500 f1-mono text-center hidden md:block">
                    {driver.australiaResult ?? (driver.position <= 10 ? `P${driver.position}` : "—")}
                  </div>

                  {/* Points bar */}
                  <div className="hidden md:block">
                    {driver.points > 0 && (
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-16">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(driver.points / maxPoints) * 100}%`, backgroundColor: teamColor }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <span className="font-black f1-stat-number text-[#1A1A2E]">{driver.points}</span>
                    <span className="text-xs text-gray-400 ml-1">pts</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-end">
                    <ChevronRight size={12} className="text-gray-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chart View */}
      {!isLoading && view === "chart" && (
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
          <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-4">Championship Points — All Drivers</div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="points" radius={[2, 2, 0, 0]}>
                {chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Driver Profile Modal */}
      <DriverProfileModal
        driver={selectedDriver}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onNavigateToTeam={onNavigateToTeam}
        onNavigateToCar={onNavigateToCar}
      />
    </div>
  );
}
