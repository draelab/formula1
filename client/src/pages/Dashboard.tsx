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

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection onSectionChange={(s) => setActiveSection(s as Section)} />;
      case "drivers":
        return <DriversSection />;
      case "constructors":
        return <ConstructorsSection />;
      case "races":
        return <RacesSection />;
      case "predictions":
        return <PredictionsSection />;
      case "cars":
        return <CarsSection />;
      default:
        return <OverviewSection onSectionChange={(s) => setActiveSection(s as Section)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F4]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={(s) => setActiveSection(s as Section)} />

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
