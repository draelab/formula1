// F1 2026 Dashboard — Sidebar Navigation
// Design: Deep charcoal sidebar with F1 red accents, race calendar timeline

import { useState } from "react";
import { RACES_2026 } from "@/lib/f1Data";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import {
  LayoutDashboard,
  Users,
  Building2,
  MapPin,
  TrendingUp,
  ChevronRight,
  Flag,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "drivers", label: "Drivers", icon: Users },
  { id: "constructors", label: "Constructors", icon: Building2 },
  { id: "races", label: "Races", icon: MapPin },
  { id: "current-race", label: "Race Weekend", icon: Flag },
  { id: "predictions", label: "Predictions", icon: TrendingUp },
];

const completedRaces = RACES_2026.filter(r => r.status === "completed");
const nextRace = RACES_2026.find(r => r.status === "next");

interface SidebarContentProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMobileClose: () => void;
}

function SidebarContent({ activeSection, onSectionChange, onMobileClose }: SidebarContentProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E8002D] flex items-center justify-center rounded-sm p-1">
            <svg viewBox="0 0 80 40" fill="white" className="w-full h-full">
              <path d="M0 30.5V3.1h27.6v7.2H10v5h14.8v6.9H10V30.5H0zM27.6 30.5V10.3L37.6 3.1V30.5h-10z" />
            </svg>
          </div>
          <div>
            <div className="text-white font-bold text-sm f1-display tracking-wider">F1 DASH</div>
            <div className="text-white/40 text-sm f1-mono">2026 SEASON</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-2 px-3 text-white/30 text-[13px] f1-mono uppercase tracking-widest">Navigation</div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                onMobileClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-all duration-200 mb-0.5 text-left",
                isActive
                  ? "bg-[#E8002D] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
            >
              <Icon size={16} className="shrink-0" />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </button>
          );
        })}

        {/* Race Status */}
        <div className="mt-6 mb-2 px-3 text-white/30 text-[13px] f1-mono uppercase tracking-widest">Season Progress</div>

        {nextRace && (
          <div className="mx-3 mb-3 p-3 bg-[#E8002D]/15 border border-[#E8002D]/30 rounded-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 bg-[#E8002D] rounded-full animate-pulse" />
              <span className="text-[#E8002D] text-sm f1-mono uppercase tracking-wider">Next Race</span>
            </div>
            <div className="text-white text-sm font-semibold f1-display">{nextRace.name}</div>
            <div className="text-white/50 text-sm mt-0.5">{nextRace.date}</div>
          </div>
        )}

        <div className="mx-3 space-y-1">
          {completedRaces.map((race) => (
            <div key={race.round} className="flex items-center gap-2 py-1">
              <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0">
                <Flag size={8} className="text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-sm truncate">{race.name.replace(" Grand Prix", " GP")}</div>
              </div>
              <div className="text-white/40 text-sm f1-mono shrink-0">R{race.round}</div>
            </div>
          ))}
        </div>

        {/* Season stats */}
        <div className="mx-3 mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/5 rounded-sm p-2 text-center">
              <div className="text-white f1-stat-number text-xl">{completedRaces.length}</div>
              <div className="text-white/40 text-sm">Races Done</div>
            </div>
            <div className="bg-white/5 rounded-sm p-2 text-center">
              <div className="text-white f1-stat-number text-xl">{24 - completedRaces.length}</div>
              <div className="text-white/40 text-sm">Remaining</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer with theme toggle */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-white/30 text-sm f1-mono">Data current as of</div>
            <div className="text-white/50 text-sm f1-mono">Round 1 — Australia 2026</div>
          </div>
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white/70 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-sidebar text-white rounded-sm flex items-center justify-center shadow-lg"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar h-screen sticky top-0 shrink-0">
        <SidebarContent activeSection={activeSection} onSectionChange={onSectionChange} onMobileClose={() => setMobileOpen(false)} />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-sidebar z-50 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent activeSection={activeSection} onSectionChange={onSectionChange} onMobileClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}
