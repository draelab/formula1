// F1 2026 Dashboard — Driver Profile Modal
// Full driver bio, career stats, season stats, car & team links

import { Driver, TEAM_COLORS, TEAM_CAR_IMAGES, CONSTRUCTORS_2026, CAR_SPECS_2026 } from "@/lib/f1Data";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Trophy, Flag, Timer, Gauge, Calendar, MapPin, Hash, Users } from "lucide-react";

interface DriverProfileModalProps {
  driver: Driver | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateToTeam?: (team: string) => void;
  onNavigateToCar?: (team: string) => void;
  drivers?: Driver[];
  onDriverChange?: (driver: Driver) => void;
}

export default function DriverProfileModal({
  driver,
  open,
  onOpenChange,
  onNavigateToTeam,
  onNavigateToCar,
  drivers,
  onDriverChange,
}: DriverProfileModalProps) {
  const teamColor = driver ? (TEAM_COLORS[driver.team] || "#888") : "#888";
  const carSpec = driver ? CAR_SPECS_2026.find((c) => c.team === driver.team) : undefined;
  const constructorData = driver ? CONSTRUCTORS_2026.find((c) => c.name === driver.team) : undefined;
  const carImage = driver ? TEAM_CAR_IMAGES[driver.team] : undefined;
  const career = driver?.career;

  const currentIndex = drivers && driver ? drivers.findIndex((d) => d.name === driver.name) : -1;
  const hasPrev = drivers && currentIndex > 0;
  const hasNext = drivers && currentIndex >= 0 && currentIndex < drivers.length - 1;

  const handleTeamClick = () => {
    if (!driver) return;
    onOpenChange(false);
    setTimeout(() => onNavigateToTeam?.(driver.team), 200);
  };

  const handleCarClick = () => {
    if (!driver) return;
    onOpenChange(false);
    setTimeout(() => onNavigateToCar?.(driver.team), 200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-4xl max-h-[85vh] overflow-y-auto p-0 gap-0 bg-[#F8F7F4] border-0 relative"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{driver?.name ?? "Driver"} — Driver Profile</DialogTitle>
        {(!driver || !career) ? null : (<>

        {/* Navigation buttons — fixed position relative to viewport */}
        <div className="sticky top-0 left-0 right-0 h-0 z-50 pointer-events-none" style={{ top: 'calc(50vh - 60px)' }}>
          {hasPrev && (
            <button
              onClick={() => onDriverChange?.(drivers![currentIndex - 1])}
              aria-label="Previous driver"
              className="absolute left-3 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {hasNext && (
            <button
              onClick={() => onDriverChange?.(drivers![currentIndex + 1])}
              aria-label="Next driver"
              className="absolute right-3 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors pointer-events-auto"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Header band */}
        <div className="relative overflow-hidden" style={{ backgroundColor: teamColor }}>
          {/* Close button */}
          <button
            onClick={() => onOpenChange(false)}
            aria-label="Close driver profile"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
          >
            ✕
          </button>

          <div className="flex items-end gap-6 p-6 pb-0">
            {/* Driver photo */}
            <div className="w-40 h-48 md:w-52 md:h-60 flex-shrink-0 relative">
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Driver info */}
            <div className="flex-1 pb-6 text-white">
              <div className="text-white/60 text-[13px] f1-mono uppercase tracking-widest mb-1">
                #{driver.number} · {driver.team}
              </div>
              <h2 className="f1-display text-3xl md:text-4xl font-black uppercase leading-none mb-2">
                {driver.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <span className="text-lg">{driver.flag}</span>
                  {driver.nationality}
                </span>
                <span className="f1-mono">Age {driver.age}</span>
                {career.championships > 0 && (
                  <span className="bg-yellow-400 text-[#1A1A2E] px-2 py-0.5 text-xs font-bold f1-mono rounded-sm">
                    {career.championships}× CHAMPION
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Bio */}
          <div>
            <p className="text-sm text-gray-600 leading-relaxed">{driver.bio}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400 f1-mono">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {driver.dateOfBirth}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {driver.placeOfBirth}
              </span>
            </div>
          </div>

          {/* 2026 Season Stats */}
          <div>
            <h3 className="f1-display text-sm font-black text-[#1A1A2E] uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E8002D] inline-block" />
              2026 Season
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: "POS", value: driver.position, icon: Hash },
                { label: "PTS", value: driver.points, icon: Gauge },
                { label: "WINS", value: driver.wins, icon: Trophy },
                { label: "PODIUMS", value: driver.podiums, icon: Trophy },
                { label: "POLES", value: driver.poles, icon: Timer },
                { label: "FL", value: driver.fastestLaps, icon: Flag },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white rounded-sm p-3 border border-gray-100 text-center">
                  <Icon size={14} className="mx-auto mb-1 text-gray-300" />
                  <div className="font-black f1-stat-number text-lg text-[#1A1A2E]">{value}</div>
                  <div className="text-xs text-gray-400 f1-mono">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Stats */}
          <div>
            <h3 className="f1-display text-sm font-black text-[#1A1A2E] uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-[#E8002D] inline-block" />
              Career Statistics
              <span className="text-gray-400 font-normal text-sm f1-mono ml-1">
                {career.debutYear === 2026 ? "Rookie" : `${career.debutYear}–present · ${career.seasonsInF1} seasons`}
              </span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: "ENTRIES", value: career.raceEntries || "—" },
                { label: "WINS", value: career.wins },
                { label: "PODIUMS", value: career.podiums },
                { label: "POLES", value: career.poles },
                { label: "FAST LAPS", value: career.fastestLaps },
                { label: "TITLES", value: career.championships },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#1A1A2E] rounded-sm p-3 text-center">
                  <div className="font-black f1-stat-number text-lg text-white">{value}</div>
                  <div className="text-xs text-white/40 f1-mono">{label}</div>
                </div>
              ))}
            </div>
            {career.championshipYears && (
              <div className="mt-2 text-sm text-gray-500 f1-mono">
                Championships: {career.championshipYears}
              </div>
            )}
            {career.bestFinish && !career.championships && (
              <div className="mt-2 text-sm text-gray-500 f1-mono">
                Best championship finish: {career.bestFinish}
              </div>
            )}
            {career.previousTeams.length > 0 && (
              <div className="mt-2 text-sm text-gray-500 f1-mono flex items-center gap-1">
                <Users size={11} />
                Previous teams: {career.previousTeams.join(" → ")}
              </div>
            )}
            {career.juniorFormula && (
              <div className="mt-1 text-sm text-gray-400 f1-mono">
                Junior: {career.juniorFormula}
              </div>
            )}
          </div>

          {/* Car & Team Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Car card */}
            {carSpec && (
              <button
                onClick={handleCarClick}
                className="bg-white border border-gray-100 rounded-sm p-4 text-left hover:border-gray-300 transition-colors group cursor-pointer"
              >
                <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">Current Car</div>
                {carImage && (
                  <div className="h-24 mb-3 flex items-center justify-center">
                    <img
                      src={carImage}
                      alt={carSpec.chassis}
                      className="h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className="f1-display font-black text-[#1A1A2E] text-sm uppercase">{carSpec.chassis}</div>
                <div className="text-sm text-gray-500 f1-mono mt-1">{carSpec.powerUnit}</div>
                <div className="text-sm text-gray-400 mt-1">{carSpec.totalPower} · {carSpec.weight}</div>
                <div className="flex items-center gap-1 text-sm font-medium mt-3 group-hover:gap-2 transition-all" style={{ color: teamColor }}>
                  View Full Specs <ChevronRight size={12} />
                </div>
              </button>
            )}

            {/* Team card */}
            {constructorData && (
              <button
                onClick={handleTeamClick}
                className="bg-white border border-gray-100 rounded-sm p-4 text-left hover:border-gray-300 transition-colors group cursor-pointer"
              >
                <div className="text-xs text-gray-400 f1-mono uppercase tracking-widest mb-2">Team</div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-10 rounded-full" style={{ backgroundColor: teamColor }} />
                  <div>
                    <div className="f1-display font-black text-[#1A1A2E] text-sm uppercase">{constructorData.name}</div>
                    <div className="text-sm text-gray-500 f1-mono">
                      P{constructorData.position} · {constructorData.points} pts
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 f1-mono">
                  Drivers: {constructorData.drivers.join(", ")}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {constructorData.chassis} · {constructorData.powerUnit}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium mt-3 group-hover:gap-2 transition-all" style={{ color: teamColor }}>
                  View Team Details <ChevronRight size={12} />
                </div>
              </button>
            )}
          </div>
        </div>
        </>)}
      </DialogContent>
    </Dialog>
  );
}
