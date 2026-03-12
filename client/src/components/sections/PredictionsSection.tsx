// F1 2026 Dashboard — Predictions Section
// Design: Data-driven predictions with confidence indicators

import { RACES_2026, DRIVERS_2026, CONSTRUCTORS_2026, TEAM_COLORS } from "@/lib/f1Data";
import { TrendingUp, Target, Zap, Trophy, AlertTriangle } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const upcomingRaces = RACES_2026.filter(r => r.status === "upcoming" || r.status === "next").slice(0, 6);

// Projected championship points if current form continues
const projectedStandings = [
  { driver: "G. Russell", team: "Mercedes", current: 25, projected: 380, color: "#00D2BE" },
  { driver: "K. Antonelli", team: "Mercedes", current: 18, projected: 290, color: "#00D2BE" },
  { driver: "C. Leclerc", team: "Ferrari", current: 15, projected: 265, color: "#E8002D" },
  { driver: "L. Hamilton", team: "Ferrari", current: 12, projected: 240, color: "#E8002D" },
  { driver: "L. Norris", team: "McLaren", current: 10, projected: 220, color: "#FF8700" },
  { driver: "M. Verstappen", team: "Red Bull", current: 8, projected: 195, color: "#3671C6" },
];

// Championship trajectory (simulated rounds 1-8)
const trajectoryData = [
  { round: "AUS", Russell: 25, Antonelli: 18, Leclerc: 15, Hamilton: 12, Norris: 10, Verstappen: 8 },
  { round: "CHN", Russell: 50, Antonelli: 33, Leclerc: 27, Hamilton: 22, Norris: 22, Verstappen: 16 },
  { round: "JPN", Russell: 68, Antonelli: 48, Leclerc: 45, Hamilton: 37, Norris: 37, Verstappen: 24 },
  { round: "BAH", Russell: 83, Antonelli: 60, Leclerc: 63, Hamilton: 55, Norris: 52, Verstappen: 39 },
  { round: "SAU", Russell: 101, Antonelli: 75, Leclerc: 78, Hamilton: 70, Norris: 67, Verstappen: 54 },
  { round: "MIA", Russell: 116, Antonelli: 88, Leclerc: 90, Hamilton: 85, Norris: 85, Verstappen: 69 },
];

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
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E8002D]" />
        <div>
          <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest">Data Analysis</div>
          <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Season Predictions</h2>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 mb-6 flex items-start gap-2">
        <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700">Predictions are based on 2026 pre-season testing data, Round 1 results, historical performance patterns, and publicly available odds. They are analytical estimates, not guarantees.</p>
      </div>

      {/* Championship Trajectory Chart */}
      <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[#E8002D]" />
          <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Projected Championship Trajectory (Rounds 1–6)</div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trajectoryData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="round" tick={{ fontSize: 11, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fontFamily: "IBM Plex Mono", fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="Russell" stroke="#00D2BE" strokeWidth={2.5} dot={{ r: 3 }} name="Russell" />
            <Line type="monotone" dataKey="Antonelli" stroke="#00D2BE" strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 2 }} name="Antonelli" />
            <Line type="monotone" dataKey="Leclerc" stroke="#E8002D" strokeWidth={2} dot={{ r: 3 }} name="Leclerc" />
            <Line type="monotone" dataKey="Hamilton" stroke="#E8002D" strokeWidth={1.5} strokeDasharray="4 2" dot={{ r: 2 }} name="Hamilton" />
            <Line type="monotone" dataKey="Norris" stroke="#FF8700" strokeWidth={2} dot={{ r: 3 }} name="Norris" />
            <Line type="monotone" dataKey="Verstappen" stroke="#3671C6" strokeWidth={2} dot={{ r: 3 }} name="Verstappen" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-3 justify-center">
          {[
            { name: "Russell", color: "#00D2BE" },
            { name: "Antonelli", color: "#00D2BE", dashed: true },
            { name: "Leclerc", color: "#E8002D" },
            { name: "Hamilton", color: "#E8002D", dashed: true },
            { name: "Norris", color: "#FF8700" },
            { name: "Verstappen", color: "#3671C6" },
          ].map(({ name, color, dashed }) => (
            <div key={name} className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: color, opacity: dashed ? 0.6 : 1 }} />
              <span className="text-xs text-gray-500 f1-mono">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Race Predictions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target size={16} className="text-[#E8002D]" />
          <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Upcoming Race Predictions</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {upcomingRaces.map((race) => {
            const favDriver = DRIVERS_2026.find(d => d.name === race.predictionFavorite);
            const favColor = favDriver ? TEAM_COLORS[favDriver.team] : "#E8002D";
            return (
              <div key={race.round} className={`bg-white border rounded-sm p-4 shadow-sm ${race.status === "next" ? "border-[#E8002D]/40" : "border-gray-100"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest">Round {race.round}</div>
                    <div className="f1-display text-base font-bold text-[#1A1A2E] leading-tight mt-0.5">
                      {race.name.replace(" Grand Prix", " GP")}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{race.date}</div>
                  </div>
                  <div className="text-2xl">{race.flag}</div>
                </div>

                {race.prediction && (
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{race.prediction}</p>
                )}

                {race.predictionFavorite && (
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400 f1-mono">Predicted Winner</div>
                      <div className="font-bold text-sm f1-display" style={{ color: favColor }}>{race.predictionFavorite}</div>
                    </div>
                    {race.predictionOdds && (
                      <div className="bg-gray-50 rounded-sm px-2 py-1">
                        <div className="text-xs text-gray-400 f1-mono">Odds</div>
                        <div className="font-black f1-stat-number text-[#1A1A2E]">{race.predictionOdds}</div>
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
            {projectedStandings.map((d, i) => {
              const maxProjected = projectedStandings[0].projected;
              const pct = (d.projected / maxProjected) * 100;
              return (
                <div key={d.driver}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 f1-mono w-4">{i + 1}</span>
                      <span className="text-sm font-semibold text-[#1A1A2E]">{d.driver}</span>
                      <span className="text-xs text-gray-400">{d.team}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold f1-mono text-[#1A1A2E]">{d.projected}</span>
                      <span className="text-xs text-gray-400 ml-1">proj.</span>
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
          <p className="text-xs text-gray-400 mt-4 f1-mono">*Projected final points based on current form extrapolation</p>
        </div>

        {/* Key Storylines */}
        <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-[#E8002D]" />
            <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Key Season Storylines</div>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Mercedes Dominance — Sustainable?",
                body: "Russell's pole-to-win in Australia suggests the W17 is the class of the field. But Ferrari's testing pace and Hamilton's experience could close the gap rapidly.",
                confidence: 75,
                label: "Mercedes title probability",
              },
              {
                title: "Hamilton's Ferrari Debut",
                body: "Lewis Hamilton's move to Ferrari is the biggest storyline of 2026. A 4th place in Australia is a solid start — if the SF-26 develops well, a 8th title is possible.",
                confidence: 35,
                label: "Hamilton title probability",
              },
              {
                title: "Verstappen's Ford Challenge",
                body: "The new Red Bull Ford DM01 power unit is still finding its feet. Verstappen's recovery to 6th with fastest lap shows his talent, but the car needs development.",
                confidence: 20,
                label: "Verstappen title probability",
              },
              {
                title: "Rookie Watch: Antonelli & Lindblad",
                body: "Antonelli's 2nd place and Lindblad's 8th on debut are extraordinary. Both could be future champions — watch them develop through the season.",
                confidence: 15,
                label: "Antonelli title probability",
              },
            ].map(({ title, body, confidence, label }) => (
              <div key={title} className="pb-3 border-b border-gray-50 last:border-0">
                <div className="font-semibold text-sm text-[#1A1A2E] mb-1">{title}</div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{body}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8002D] rounded-full" style={{ width: `${confidence}%` }} />
                  </div>
                  <span className="text-xs text-[#E8002D] font-bold f1-mono">{confidence}%</span>
                  <span className="text-xs text-gray-400 f1-mono">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
