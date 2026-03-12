// F1 2026 Dashboard — Main Dashboard Page
// Design Philosophy: Precision Engineering Editorial
// Swiss typographic grid meets motorsport data journalism

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import OverviewSection from "@/components/sections/OverviewSection";
import DriversSection from "@/components/sections/DriversSection";
import ConstructorsSection from "@/components/sections/ConstructorsSection";
import RacesSection from "@/components/sections/RacesSection";
import PredictionsSection from "@/components/sections/PredictionsSection";
import CarsSection from "@/components/sections/CarsSection";

type Section = "overview" | "drivers" | "constructors" | "races" | "predictions" | "cars";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [teamContext, setTeamContext] = useState<string | undefined>(undefined);

  const navigateToSection = (section: string, team?: string) => {
    setTeamContext(team);
    setActiveSection(section as Section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onSectionChange={(s) => navigateToSection(s)} />;
      case "drivers":
        return (
          <DriversSection
            onNavigateToTeam={(team) => navigateToSection("constructors", team)}
            onNavigateToCar={(team) => navigateToSection("cars", team)}
          />
        );
      case "constructors":
        return <ConstructorsSection key={teamContext} initialTeam={teamContext} />;
      case "races":
        return <RacesSection />;
      case "predictions":
        return <PredictionsSection />;
      case "cars":
        return <CarsSection key={teamContext} initialTeam={teamContext} />;
      default:
        return <OverviewSection onSectionChange={(s) => navigateToSection(s)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={(s) => {
        setTeamContext(undefined);
        setActiveSection(s as Section);
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
