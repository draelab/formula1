// F1 2026 Dashboard — Constructors Section
// Design: Team cards with livery colours, performance comparison charts

import { CONSTRUCTORS_2026, TEAM_COLORS, TEAM_CAR_IMAGES } from "@/lib/f1Data";
import { useConstructorStandings } from "@/hooks/useF1LiveData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useState, useEffect } from "react";
import ConstructorProfileModal from "@/components/ConstructorProfileModal";

interface ConstructorsSectionProps {
  initialTeam?: string;
}

export default function ConstructorsSection({ initialTeam }: ConstructorsSectionProps) {
  const [modalTeam, setModalTeam] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (initialTeam) {
      setModalTeam(initialTeam);
      setModalOpen(true);
    }
  }, [initialTeam]);

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
        <div className="bg-card text-card-foreground px-3 py-2 rounded-sm text-xs shadow-lg">
          <div className="font-bold f1-display">{d.name}</div>
          <div className="text-[#E8002D] font-bold f1-mono">{d.points} pts</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E8002D]" />
        <div>
          <div className="text-[#E8002D] text-[13px] f1-mono uppercase tracking-widest">2026 Season</div>
          <h2 className="f1-display text-3xl font-black text-foreground uppercase tracking-wide">Constructors</h2>
        </div>
      </div>

      {/* Points Chart */}
      <div className="bg-card border border-border rounded-sm p-5 shadow-sm mb-6">
        <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest mb-4">Championship Points — After Round 1</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12, fontFamily: "IBM Plex Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" />
            <YAxis tick={{ fontSize: 13, fontFamily: "IBM Plex Mono", fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
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
          return (
            <div
              key={team.name}
              onClick={() => { setModalTeam(team.name); setModalOpen(true); }}
              className="bg-card border rounded-sm p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md border-border"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <div>
                    <div className="text-[13px] text-muted-foreground f1-mono uppercase tracking-widest">P{team.position}</div>
                    <div className="f1-display text-lg font-bold text-foreground leading-tight">{team.name}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{team.chassis}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="f1-stat-number text-3xl font-black text-foreground">{team.points}</div>
                  <div className="text-sm text-muted-foreground f1-mono">PTS</div>
                </div>
              </div>

              {/* Car image */}
              {TEAM_CAR_IMAGES[team.name] && (
                <div className="h-16 flex items-center justify-center mb-1">
                  <img
                    src={TEAM_CAR_IMAGES[team.name]}
                    alt={`${team.name} car`}
                    className="h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                <div className="text-center">
                  <div className="f1-stat-number text-xl font-black text-foreground">{team.wins}</div>
                  <div className="text-sm text-muted-foreground f1-mono">Wins</div>
                </div>
                <div className="text-center">
                  <div className="f1-stat-number text-xl font-black text-foreground">{team.podiums}</div>
                  <div className="text-sm text-muted-foreground f1-mono">Podiums</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground f1-mono">{team.australiaResult}</div>
                  <div className="text-sm text-muted-foreground f1-mono">AUS</div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-border">
                <div className="text-sm text-muted-foreground f1-mono truncate">{team.powerUnit}</div>
              </div>
            </div>
          );
        })}
      </div>

      <ConstructorProfileModal
        teamName={modalTeam}
        open={modalOpen}
        onOpenChange={setModalOpen}
        teamNames={constructors.map((c: any) => c.name)}
        onTeamChange={(name) => setModalTeam(name)}
      />
    </div>
  );
}
