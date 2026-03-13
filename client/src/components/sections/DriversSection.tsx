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
        <div className="bg-card text-card-foreground px-3 py-2 rounded-sm text-xs shadow-lg">
          <div className="font-bold f1-display">{d.name}</div>
          <div className="text-muted-foreground">{d.team}</div>
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
              <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">2026 Season</div>
              <h2 className="f1-display text-3xl font-black text-foreground uppercase tracking-wide">Drivers</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4 mt-1">
            <p className="text-muted-foreground text-sm">After Round {round}</p>
            <DataFreshnessBadge isLive={isLive} updatedAt={updatedAt} isLoading={isLoading} />
          </div>
        </div>
        <div className="flex gap-1 bg-muted rounded-sm p-1">
          <button
            onClick={() => setView("table")}
            className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors f1-mono ${view === "table" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            TABLE
          </button>
          <button
            onClick={() => setView("chart")}
            className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors f1-mono ${view === "chart" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            CHART
          </button>
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && <DriverSkeleton />}

      {/* Table View */}
      {!isLoading && view === "table" && (
        <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[40px_44px_1fr_120px_60px_60px_60px_60px_30px] gap-2 px-4 py-2 bg-muted text-muted-foreground text-[13px] f1-mono uppercase tracking-widest">
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
              <div key={driver.name || driver.driverId} className="border-b border-border last:border-0">
                <div
                  className="grid grid-cols-[40px_44px_1fr_120px_60px_60px_60px_60px_30px] gap-2 px-4 py-3 items-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleDriverClick(driver)}
                >
                  {/* Position */}
                  <div className={`w-8 h-8 flex items-center justify-center text-sm font-black f1-display rounded-sm ${pos === 1 ? "bg-yellow-400 text-foreground" : pos === 2 ? "bg-gray-300 text-foreground" : pos === 3 ? "bg-amber-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {pos}
                  </div>

                  {/* Driver headshot */}
                  <div className="flex items-center justify-center">
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border-2 bg-muted flex-shrink-0"
                      style={{ borderColor: teamColor }}
                    >
                      {failedHeadshots.has(driver.shortName) ? (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-muted-foreground f1-mono">
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
                    <div className="font-semibold text-sm text-foreground">
                      {driver.name || `${driver.givenName} ${driver.familyName}`}
                    </div>
                    <div className="text-sm text-muted-foreground f1-mono">#{driver.number}</div>
                  </div>

                  {/* Team */}
                  <div className="text-sm font-medium truncate" style={{ color: teamColor }}>
                    {driver.team}
                  </div>

                  {/* Nationality flag */}
                  <div className="text-base hidden sm:block text-center">{driver.flag}</div>

                  {/* Australia result */}
                  <div className="text-sm text-muted-foreground f1-mono text-center hidden md:block">
                    {driver.australiaResult ?? (driver.position <= 10 ? `P${driver.position}` : "—")}
                  </div>

                  {/* Points bar */}
                  <div className="hidden md:block">
                    {driver.points > 0 && (
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden w-16">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(driver.points / maxPoints) * 100}%`, backgroundColor: teamColor }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <span className="font-black f1-stat-number text-foreground">{driver.points}</span>
                    <span className="text-sm text-muted-foreground ml-1">pts</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-end">
                    <ChevronRight size={12} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chart View */}
      {!isLoading && view === "chart" && (
        <div className="bg-card border border-border rounded-sm p-5 shadow-sm">
          <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest mb-4">Championship Points — All Drivers</div>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
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
        drivers={standings}
        onDriverChange={(d) => setSelectedDriver(d)}
      />
    </div>
  );
}
