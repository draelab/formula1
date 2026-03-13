// F1 2026 Dashboard — Main Dashboard Page
// Design Philosophy: Precision Engineering Editorial
// Swiss typographic grid meets motorsport data journalism

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import Sidebar from "@/components/Sidebar";
import OverviewSection from "@/components/sections/OverviewSection";
import DriversSection from "@/components/sections/DriversSection";
import ConstructorsSection from "@/components/sections/ConstructorsSection";
import RacesSection from "@/components/sections/RacesSection";
import PredictionsSection from "@/components/sections/PredictionsSection";
import CurrentRaceSection from "@/components/sections/CurrentRaceSection";

type Section = "overview" | "drivers" | "constructors" | "races" | "current-race" | "predictions";

const VALID_SECTIONS: Set<string> = new Set<string>([
  "overview", "drivers", "constructors", "races", "current-race", "predictions",
]);

export default function Dashboard() {
  const params = useParams<{ section: string }>();
  const [, setLocation] = useLocation();
  const [teamContext, setTeamContext] = useState<string | undefined>(undefined);

  const activeSection: Section = VALID_SECTIONS.has(params.section ?? "")
    ? (params.section as Section)
    : "overview";

  const navigateToSection = (section: string, team?: string) => {
    setTeamContext(team);
    setLocation(`/${section}`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onSectionChange={(s) => navigateToSection(s)} />;
      case "drivers":
        return (
          <DriversSection
            onNavigateToTeam={(team) => navigateToSection("constructors", team)}
            onNavigateToCar={(team) => navigateToSection("constructors", team)}
          />
        );
      case "constructors":
        return <ConstructorsSection key={teamContext} initialTeam={teamContext} />;
      case "races":
        return <RacesSection />;
      case "current-race":
        return <CurrentRaceSection />;
      case "predictions":
        return <PredictionsSection />;
      default:
        return <OverviewSection onSectionChange={(s) => navigateToSection(s)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={(s) => {
        setTeamContext(undefined);
        setLocation(`/${s}`);
      }} />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile top padding for hamburger */}
        <div className="lg:hidden h-14" />

        {/* Content */}
        <div className="animate-fade-up">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
