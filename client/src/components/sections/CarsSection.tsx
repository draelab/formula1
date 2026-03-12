// F1 2026 Dashboard — Car Breakdown Section
// Design: Technical spec cards with performance radar charts

import { useState } from "react";
import { CAR_SPECS_2026, TEAM_COLORS } from "@/lib/f1Data";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import { Zap, Settings, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031769921/QfooNsf5N2WhwQZYmGVtwY/f1-hero-banner-4qb4fdVTV5aszZb5q6bpPq.webp";

const performanceData: Record<string, number[]> = {
  "Mercedes": [95, 92, 88, 90, 85],
  "Ferrari": [88, 94, 90, 87, 88],
  "McLaren": [88, 88, 91, 85, 90],
  "Red Bull Racing": [84, 90, 85, 88, 82],
  "Haas": [88, 72, 74, 80, 76],
  "Racing Bulls": [84, 74, 76, 78, 74],
  "Audi": [72, 70, 72, 74, 70],
  "Alpine": [85, 73, 75, 78, 72],
  "Williams": [85, 74, 76, 78, 74],
  "Cadillac": [88, 65, 67, 72, 68],
  "Aston Martin": [82, 70, 73, 76, 71],
};

const getRadarData = (team: string) => {
  const vals = performanceData[team] || [70, 70, 70, 70, 70];
  return [
    { subject: "Power Unit", A: vals[0] },
    { subject: "Aero", A: vals[1] },
    { subject: "Mech. Grip", A: vals[2] },
    { subject: "Reliability", A: vals[3] },
    { subject: "Driver", A: vals[4] },
  ];
};

export default function CarsSection() {
  const [selected, setSelected] = useState<string>("Mercedes");
  const [expandedSpec, setExpandedSpec] = useState<string | null>(null);

  const car = CAR_SPECS_2026.find(c => c.team === selected)!;
  const color = TEAM_COLORS[selected] || "#888";

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-[#E8002D]" />
        <div>
          <div className="text-[#E8002D] text-xs f1-mono uppercase tracking-widest">Technical Analysis</div>
          <h2 className="f1-display text-3xl font-black text-[#1A1A2E] uppercase tracking-wide">Car Breakdown</h2>
        </div>
      </div>

      {/* Hero */}
      <div className="relative rounded-sm overflow-hidden h-40 mb-6">
        <img src={HERO_IMG} alt="F1 Car" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/80 to-transparent flex items-center px-8">
          <div>
            <div className="text-white/50 text-xs f1-mono uppercase tracking-widest">2026 Technical Regulations</div>
            <div className="text-white f1-display text-2xl font-black">NEW ERA · ACTIVE AERO · 350kW MGU-K</div>
            <div className="text-white/60 text-sm mt-1">All-new power unit regulations with 50/50 electric-combustion split</div>
          </div>
        </div>
      </div>

      {/* Team Selector */}
      <div className="mb-6">
        <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-3">Select Team</div>
        <div className="flex flex-wrap gap-2">
          {CAR_SPECS_2026.map((c) => {
            const tc = TEAM_COLORS[c.team] || "#888";
            const isSelected = selected === c.team;
            return (
              <button
                key={c.team}
                onClick={() => setSelected(c.team)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all border f1-mono ${
                  isSelected
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                }`}
                style={isSelected ? { backgroundColor: tc, borderColor: tc } : {}}
              >
                {c.team}
              </button>
            );
          })}
        </div>
      </div>

      {/* Car Detail */}
      {car && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Specs */}
          <div className="lg:col-span-2 space-y-4">
            {/* Car Header */}
            <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-16 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <div>
                    <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest">{car.team}</div>
                    <div className="f1-display text-3xl font-black text-[#1A1A2E]">{car.chassis}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{car.powerUnit}</div>
                  </div>
                </div>
                {car.activeAero && (
                  <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-sm px-2.5 py-1.5">
                    <Zap size={12} className="text-yellow-600" />
                    <span className="text-xs text-yellow-700 f1-mono font-medium">ACTIVE AERO</span>
                  </div>
                )}
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.keyFeatures.map((feat) => (
                  <div key={feat} className="flex items-start gap-2 text-xs text-gray-600">
                    <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: color }} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs Grid */}
            <div className="bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings size={14} className="text-[#E8002D]" />
                <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Technical Specifications</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Chassis", value: car.chassis },
                  { label: "Power Unit", value: car.powerUnit },
                  { label: "Engine Config", value: car.engineConfig },
                  { label: "Displacement", value: car.displacement },
                  { label: "Max RPM", value: car.maxRPM || "~15,000 rpm" },
                  { label: "Hybrid System", value: car.hybridSystem },
                  { label: "MGU-K Power", value: car.mguKPower },
                  { label: "Total Power", value: car.totalPower },
                  { label: "Weight (w/ driver)", value: car.weight },
                  { label: "Gearbox", value: car.gearbox },
                  { label: "Front Suspension", value: car.frontSuspension },
                  { label: "Rear Suspension", value: car.rearSuspension },
                  { label: "Brakes", value: car.brakes },
                  { label: "Wheels", value: car.wheels },
                  { label: "Fuel", value: car.fuel },
                  { label: "Active Aero", value: car.activeAero ? "Yes — X/Z Mode" : "No" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-sm p-2.5">
                    <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest">{label}</div>
                    <div className="text-sm font-medium text-[#1A1A2E] mt-0.5 f1-mono">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={14} className="text-green-500" />
                  <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Strengths</div>
                </div>
                <div className="space-y-2">
                  {car.strengths.map((s) => (
                    <div key={s} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-green-500 mt-1.5 shrink-0" />
                      <span className="text-xs text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle size={14} className="text-[#E8002D]" />
                  <div className="text-sm font-semibold text-[#1A1A2E] f1-display uppercase tracking-wide">Challenges</div>
                </div>
                <div className="space-y-2">
                  {car.weaknesses.map((w) => (
                    <div key={w} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#E8002D] mt-1.5 shrink-0" />
                      <span className="text-xs text-gray-600">{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Radar + Comparison */}
          <div className="space-y-4">
            {/* Performance Radar */}
            <div className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
              <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-3">Performance Indices</div>
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={getRadarData(selected)}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fontFamily: "IBM Plex Mono", fill: "#888" }} />
                  <Radar name={car.team} dataKey="A" stroke={color} fill={color} fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
              <div className="text-xs text-gray-400 f1-mono text-center">Estimated performance indices (0–100)</div>
            </div>

            {/* 2026 Regulation Overview */}
            <div className="bg-[#1A1A2E] rounded-sm p-4 text-white">
              <div className="text-white/40 text-xs f1-mono uppercase tracking-widest mb-3">2026 Regulation Changes</div>
              <div className="space-y-3">
                {[
                  { icon: "⚡", title: "350kW MGU-K", desc: "3× more electric power than 2025" },
                  { icon: "✈️", title: "Active Aerodynamics", desc: "X-Mode (high drag) & Z-Mode (low drag)" },
                  { icon: "⚖️", title: "30kg Lighter", desc: "768kg minimum weight (down from 798kg)" },
                  { icon: "📏", title: "Shorter & Narrower", desc: "200mm shorter, 50mm narrower cars" },
                  { icon: "🔋", title: "50/50 Power Split", desc: "Equal combustion and electric contribution" },
                  { icon: "⛽", title: "Sustainable Fuel", desc: "100% sustainable fuel mandatory" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-2.5">
                    <span className="text-sm shrink-0">{icon}</span>
                    <div>
                      <div className="text-white text-xs font-semibold f1-display">{title}</div>
                      <div className="text-white/50 text-xs">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Cars Quick Compare */}
            <div className="bg-white border border-gray-100 rounded-sm p-4 shadow-sm">
              <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-3">All Cars — Power Units</div>
              <div className="space-y-1.5">
                {CAR_SPECS_2026.map((c) => {
                  const tc = TEAM_COLORS[c.team] || "#888";
                  const puShort = c.powerUnitManufacturer.includes("Mercedes") ? "Mercedes" :
                    c.powerUnitManufacturer.includes("Ferrari") ? "Ferrari" :
                    c.powerUnitManufacturer.includes("Ford") ? "Red Bull Ford" :
                    c.powerUnitManufacturer.includes("Audi") ? "Audi" :
                    c.powerUnitManufacturer.includes("Honda") ? "Honda" : c.powerUnitManufacturer;
                  return (
                    <button
                      key={c.team}
                      onClick={() => setSelected(c.team)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-left transition-colors ${selected === c.team ? "bg-gray-100" : "hover:bg-gray-50"}`}
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tc }} />
                      <span className="text-xs font-medium text-[#1A1A2E] flex-1">{c.team}</span>
                      <span className="text-xs text-gray-400 f1-mono">{puShort}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
