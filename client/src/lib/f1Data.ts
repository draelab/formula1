// F1 2026 Season Data
// Design Philosophy: Precision Engineering Editorial
// Swiss typographic grid meets motorsport data journalism

export const TEAM_COLORS: Record<string, string> = {
  Mercedes: "#00D2BE",
  Ferrari: "#E8002D",
  McLaren: "#FF8700",
  "Red Bull Racing": "#3671C6",
  Haas: "#B6BABD",
  "Racing Bulls": "#6692FF",
  Audi: "#C9082A",
  Alpine: "#FF87BC",
  Williams: "#64C4FF",
  Cadillac: "#333333",
  "Aston Martin": "#358C75",
};

export const TEAM_SECONDARY_COLORS: Record<string, string> = {
  Mercedes: "#1A1A2E",
  Ferrari: "#FFFFFF",
  McLaren: "#1A1A2E",
  "Red Bull Racing": "#1A1A2E",
  Haas: "#1A1A2E",
  "Racing Bulls": "#1A1A2E",
  Audi: "#FFFFFF",
  Alpine: "#0090FF",
  Williams: "#1A1A2E",
  Cadillac: "#FFFFFF",
  "Aston Martin": "#1A1A2E",
};

export interface Driver {
  position: number;
  name: string;
  shortName: string;
  nationality: string;
  flag: string;
  team: string;
  number: number;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  age: number;
  bio: string;
  australiaResult: string | number;
}

export const DRIVERS_2026: Driver[] = [
  {
    position: 1, name: "George Russell", shortName: "RUS", nationality: "British", flag: "🇬🇧",
    team: "Mercedes", number: 63, points: 25, wins: 1, podiums: 1, poles: 1, fastestLaps: 0,
    age: 28, australiaResult: 1,
    bio: "George Russell took pole position and dominated the 2026 season opener in Melbourne, leading a Mercedes 1-2. The reigning championship leader is considered the favourite for the 2026 title."
  },
  {
    position: 2, name: "Kimi Antonelli", shortName: "ANT", nationality: "Italian", flag: "🇮🇹",
    team: "Mercedes", number: 12, points: 18, wins: 0, podiums: 1, poles: 0, fastestLaps: 0,
    age: 19, australiaResult: 2,
    bio: "The teenage Italian sensation finished second on his debut season opener, completing a stunning Mercedes 1-2. Antonelli is the youngest driver on the grid and widely regarded as a future champion."
  },
  {
    position: 3, name: "Charles Leclerc", shortName: "LEC", nationality: "Monégasque", flag: "🇲🇨",
    team: "Ferrari", number: 16, points: 15, wins: 0, podiums: 1, poles: 0, fastestLaps: 0,
    age: 28, australiaResult: 3,
    bio: "Leclerc delivered a strong podium finish in Australia despite a Ferrari strategy error that cost him a potential victory. He set the fastest time in Bahrain pre-season testing."
  },
  {
    position: 4, name: "Lewis Hamilton", shortName: "HAM", nationality: "British", flag: "🇬🇧",
    team: "Ferrari", number: 44, points: 12, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 41, australiaResult: 4,
    bio: "In his first season at Ferrari, Hamilton finished fourth in Australia. He set the fastest time in the Barcelona pre-season test, suggesting the SF-26 has strong potential."
  },
  {
    position: 5, name: "Lando Norris", shortName: "NOR", nationality: "British", flag: "🇬🇧",
    team: "McLaren", number: 1, points: 10, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 25, australiaResult: 5,
    bio: "The reigning World Champion started his title defence with a fifth-place finish. McLaren's sole starter after Piastri's pre-race incident, Norris showed pace but couldn't match the Mercedes and Ferrari."
  },
  {
    position: 6, name: "Max Verstappen", shortName: "VER", nationality: "Dutch", flag: "🇳🇱",
    team: "Red Bull Racing", number: 3, points: 8, wins: 0, podiums: 0, poles: 0, fastestLaps: 1,
    age: 28, australiaResult: 6,
    bio: "A stunning recovery drive from 20th on the grid (after a qualifying crash) to 6th, with the fastest lap of the race. Verstappen's raw pace was evident despite Red Bull's new Ford-powered car still finding its feet."
  },
  {
    position: 7, name: "Oliver Bearman", shortName: "BEA", nationality: "British", flag: "🇬🇧",
    team: "Haas", number: 87, points: 6, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 20, australiaResult: 7,
    bio: "The young Brit delivered an impressive seventh-place finish for Haas in his first full season, demonstrating the team's improved competitiveness with the new Ferrari-powered VF-26."
  },
  {
    position: 8, name: "Arvid Lindblad", shortName: "LIN", nationality: "British", flag: "🇬🇧",
    team: "Racing Bulls", number: 41, points: 4, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 18, australiaResult: 8,
    bio: "The youngest F1 driver in history scored points on his debut, finishing eighth for Racing Bulls. Promoted from Formula 2, Lindblad is one of the most exciting prospects in the sport."
  },
  {
    position: 9, name: "Gabriel Bortoleto", shortName: "BOR", nationality: "Brazilian", flag: "🇧🇷",
    team: "Audi", number: 5, points: 2, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 21, australiaResult: 9,
    bio: "The 2024 F2 champion scored two points on his F1 debut with the new Audi works team. A promising start for both driver and the German manufacturer's first F1 season."
  },
  {
    position: 10, name: "Pierre Gasly", shortName: "GAS", nationality: "French", flag: "🇫🇷",
    team: "Alpine", number: 10, points: 1, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 29, australiaResult: 10,
    bio: "Gasly claimed the final championship point in Australia, a solid result for Alpine in their first season with Mercedes power units."
  },
  {
    position: 11, name: "Esteban Ocon", shortName: "OCO", nationality: "French", flag: "🇫🇷",
    team: "Haas", number: 31, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 29, australiaResult: 11,
    bio: "Ocon joined Haas for 2026 after leaving Alpine. Finished just outside the points in Australia."
  },
  {
    position: 12, name: "Alexander Albon", shortName: "ALB", nationality: "Thai", flag: "🇹🇭",
    team: "Williams", number: 23, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 28, australiaResult: 12,
    bio: "Albon continues to lead Williams alongside Carlos Sainz. Finished 12th in Australia as the team continues to develop the FW48."
  },
  {
    position: 13, name: "Liam Lawson", shortName: "LAW", nationality: "New Zealander", flag: "🇳🇿",
    team: "Racing Bulls", number: 30, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 23, australiaResult: 13,
    bio: "Lawson leads the Racing Bulls lineup alongside rookie Lindblad. Finished 13th in Australia."
  },
  {
    position: 14, name: "Franco Colapinto", shortName: "COL", nationality: "Argentine", flag: "🇦🇷",
    team: "Alpine", number: 43, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 22, australiaResult: 14,
    bio: "The Argentine impressed in his late-2025 Williams debut and now races full-time for Alpine. Finished 14th in Australia."
  },
  {
    position: 15, name: "Carlos Sainz", shortName: "SAI", nationality: "Spanish", flag: "🇪🇸",
    team: "Williams", number: 55, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 31, australiaResult: 15,
    bio: "After leaving Ferrari, Sainz joined Williams for 2026. Finished 15th in Australia but is expected to be a strong performer as the season develops."
  },
  {
    position: 16, name: "Sergio Pérez", shortName: "PER", nationality: "Mexican", flag: "🇲🇽",
    team: "Cadillac", number: 11, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 36, australiaResult: "Ret",
    bio: "Pérez returned to F1 with the new Cadillac team after his Red Bull contract ended. Retired in Australia but brings vital experience to the new American constructor."
  },
  {
    position: 17, name: "Isack Hadjar", shortName: "HAD", nationality: "French", flag: "🇫🇷",
    team: "Red Bull Racing", number: 6, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 21, australiaResult: "Ret",
    bio: "Promoted to Red Bull's main team, Hadjar qualified third on his debut but retired from the race. A hugely promising talent."
  },
  {
    position: 18, name: "Oscar Piastri", shortName: "PIA", nationality: "Australian", flag: "🇦🇺",
    team: "McLaren", number: 81, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 24, australiaResult: "DNS",
    bio: "Piastri suffered a crash while driving to the grid in his home race, resulting in a DNS. A heartbreaking start to his title defence campaign."
  },
  {
    position: 19, name: "Nico Hülkenberg", shortName: "HUL", nationality: "German", flag: "🇩🇪",
    team: "Audi", number: 27, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 38, australiaResult: "DNS",
    bio: "Hülkenberg leads the Audi works team alongside Bortoleto. Did not start in Australia due to a technical issue."
  },
  {
    position: 20, name: "Fernando Alonso", shortName: "ALO", nationality: "Spanish", flag: "🇪🇸",
    team: "Aston Martin", number: 14, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 44, australiaResult: "Ret",
    bio: "The two-time World Champion continues with Aston Martin, now powered by Honda. Retired in Australia as the team adapts to the new power unit."
  },
  {
    position: 21, name: "Valtteri Bottas", shortName: "BOT", nationality: "Finnish", flag: "🇫🇮",
    team: "Cadillac", number: 77, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 36, australiaResult: "Ret",
    bio: "Bottas returned to F1 with Cadillac after a year as Mercedes reserve driver. Retired in Australia."
  },
  {
    position: 22, name: "Lance Stroll", shortName: "STR", nationality: "Canadian", flag: "🇨🇦",
    team: "Aston Martin", number: 18, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 27, australiaResult: "NC",
    bio: "Stroll continues alongside Alonso at Aston Martin. Was not classified in Australia after failing to complete 90% of the race distance."
  },
];

export interface Constructor {
  position: number;
  name: string;
  points: number;
  wins: number;
  podiums: number;
  chassis: string;
  powerUnit: string;
  drivers: string[];
  australiaResult: string;
  color: string;
}

export const CONSTRUCTORS_2026: Constructor[] = [
  { position: 1, name: "Mercedes", points: 43, wins: 1, podiums: 2, chassis: "F1 W17", powerUnit: "Mercedes-AMG F1 M17", drivers: ["George Russell", "Kimi Antonelli"], australiaResult: "1-2", color: "#00D2BE" },
  { position: 2, name: "Ferrari", points: 27, wins: 0, podiums: 1, chassis: "SF-26", powerUnit: "Ferrari 067/6", drivers: ["Charles Leclerc", "Lewis Hamilton"], australiaResult: "3-4", color: "#E8002D" },
  { position: 3, name: "McLaren", points: 10, wins: 0, podiums: 0, chassis: "MCL40", powerUnit: "Mercedes-AMG F1 M17", drivers: ["Lando Norris", "Oscar Piastri"], australiaResult: "5-DNS", color: "#FF8700" },
  { position: 4, name: "Red Bull Racing", points: 8, wins: 0, podiums: 0, chassis: "RB22", powerUnit: "Red Bull Ford DM01", drivers: ["Max Verstappen", "Isack Hadjar"], australiaResult: "6-Ret", color: "#3671C6" },
  { position: 5, name: "Haas", points: 6, wins: 0, podiums: 0, chassis: "VF-26", powerUnit: "Ferrari 067/6", drivers: ["Oliver Bearman", "Esteban Ocon"], australiaResult: "7-11", color: "#B6BABD" },
  { position: 6, name: "Racing Bulls", points: 4, wins: 0, podiums: 0, chassis: "VCARB 03", powerUnit: "Red Bull Ford DM01", drivers: ["Liam Lawson", "Arvid Lindblad"], australiaResult: "8-13", color: "#6692FF" },
  { position: 7, name: "Audi", points: 2, wins: 0, podiums: 0, chassis: "R26", powerUnit: "Audi AFR 26 Hybrid", drivers: ["Gabriel Bortoleto", "Nico Hülkenberg"], australiaResult: "9-DNS", color: "#C9082A" },
  { position: 8, name: "Alpine", points: 1, wins: 0, podiums: 0, chassis: "A526", powerUnit: "Mercedes-AMG F1 M17", drivers: ["Pierre Gasly", "Franco Colapinto"], australiaResult: "10-14", color: "#FF87BC" },
  { position: 9, name: "Williams", points: 0, wins: 0, podiums: 0, chassis: "FW48", powerUnit: "Mercedes-AMG F1 M17", drivers: ["Alexander Albon", "Carlos Sainz"], australiaResult: "12-15", color: "#64C4FF" },
  { position: 10, name: "Cadillac", points: 0, wins: 0, podiums: 0, chassis: "MAC-26", powerUnit: "Ferrari 067/6", drivers: ["Sergio Pérez", "Valtteri Bottas"], australiaResult: "Ret-Ret", color: "#333333" },
  { position: 11, name: "Aston Martin", points: 0, wins: 0, podiums: 0, chassis: "AMR26", powerUnit: "Honda RA626H", drivers: ["Fernando Alonso", "Lance Stroll"], australiaResult: "Ret-NC", color: "#358C75" },
];

export interface Race {
  round: number;
  name: string;
  circuit: string;
  location: string;
  country: string;
  flag: string;
  date: string;
  status: "completed" | "upcoming" | "next";
  winner?: string;
  winnerTeam?: string;
  polePosition?: string;
  fastestLap?: string;
  laps?: number;
  circuitLength?: number;
  turns?: number;
  raceDistance?: number;
  lapRecord?: string;
  lapRecordHolder?: string;
  lapRecordYear?: number;
  isSprint?: boolean;
  description?: string;
  prediction?: string;
  predictionFavorite?: string;
  predictionOdds?: string;
}

export const RACES_2026: Race[] = [
  {
    round: 1, name: "Australian Grand Prix", circuit: "Albert Park Circuit", location: "Melbourne", country: "Australia", flag: "🇦🇺",
    date: "8 March 2026", status: "completed", winner: "George Russell", winnerTeam: "Mercedes",
    polePosition: "George Russell", fastestLap: "Max Verstappen", laps: 58, circuitLength: 5.278, turns: 14, raceDistance: 306.1,
    lapRecord: "1:19.813", lapRecordHolder: "Charles Leclerc", lapRecordYear: 2023,
    description: "The season opener at Albert Park saw Mercedes dominate with a 1-2 finish. Russell led from pole while Verstappen recovered from 20th to 6th with the fastest lap.",
  },
  {
    round: 2, name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", location: "Shanghai", country: "China", flag: "🇨🇳",
    date: "15 March 2026", status: "next", isSprint: true, circuitLength: 5.451, turns: 16, raceDistance: 305.1,
    lapRecord: "1:32.238", lapRecordHolder: "Michael Schumacher", lapRecordYear: 2004,
    description: "Shanghai's long back straight and technical final sector provide a unique challenge. The circuit rewards strong top-end power and aerodynamic efficiency.",
    prediction: "Mercedes enter as heavy favourites after their dominant Australian performance. Russell is the strong favourite at -138 odds, with Ferrari's Leclerc and Hamilton the main challengers. The sprint format adds extra intrigue.",
    predictionFavorite: "George Russell", predictionOdds: "-138",
  },
  {
    round: 3, name: "Japanese Grand Prix", circuit: "Suzuka Circuit", location: "Suzuka", country: "Japan", flag: "🇯🇵",
    date: "29 March 2026", status: "upcoming", circuitLength: 5.807, turns: 18, raceDistance: 307.5,
    lapRecord: "1:30.983", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2019,
    description: "Suzuka is the ultimate driver's circuit — the iconic 130R corner and the Esses test car and driver to the limit. High-downforce setups are essential.",
    prediction: "Ferrari and Mercedes are expected to be closely matched at Suzuka. The circuit's high-speed nature should suit Mercedes' W17, but Ferrari's SF-26 has shown strong cornering ability in testing.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+250",
  },
  {
    round: 4, name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", location: "Sakhir", country: "Bahrain", flag: "🇧🇭",
    date: "12 April 2026", status: "upcoming", circuitLength: 5.412, turns: 15, raceDistance: 308.2,
    lapRecord: "1:31.447", lapRecordHolder: "Pedro de la Rosa", lapRecordYear: 2005,
    description: "The desert circuit under floodlights is a classic F1 venue. High tyre degradation and thermal management are key factors in Bahrain.",
    prediction: "Red Bull's Ford-powered RB22 may find more pace in Bahrain's high-temperature conditions. Ferrari's SF-26 showed strong form in Bahrain testing with Leclerc setting the fastest time.",
    predictionFavorite: "Lewis Hamilton", predictionOdds: "+300",
  },
  {
    round: 5, name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", location: "Jeddah", country: "Saudi Arabia", flag: "🇸🇦",
    date: "19 April 2026", status: "upcoming", circuitLength: 6.174, turns: 27, raceDistance: 308.5,
    lapRecord: "1:30.734", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2021,
    description: "The fastest street circuit on the calendar. Jeddah's long straights reward power unit performance, while the narrow walls demand precision.",
    prediction: "Mercedes' power unit advantage should shine on Jeddah's long straights. Russell is expected to be the favourite, with Verstappen's Red Bull also potentially competitive.",
    predictionFavorite: "George Russell", predictionOdds: "+150",
  },
  {
    round: 6, name: "Miami Grand Prix", circuit: "Miami International Autodrome", location: "Miami Gardens", country: "USA", flag: "🇺🇸",
    date: "3 May 2026", status: "upcoming", isSprint: true, circuitLength: 5.412, turns: 19, raceDistance: 308.3,
    lapRecord: "1:29.708", lapRecordHolder: "Max Verstappen", lapRecordYear: 2023,
    description: "The Miami circuit around the Hard Rock Stadium has become a fan favourite. Sprint format adds extra excitement to the Florida weekend.",
    prediction: "McLaren traditionally performs well in Miami. With Norris looking to bounce back after Australia, the papaya cars could be strong contenders at their home race.",
    predictionFavorite: "Lando Norris", predictionOdds: "+350",
  },
  {
    round: 7, name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", location: "Montreal", country: "Canada", flag: "🇨🇦",
    date: "24 May 2026", status: "upcoming", isSprint: true, circuitLength: 4.361, turns: 14, raceDistance: 305.3,
    lapRecord: "1:13.078", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2019,
    description: "The street circuit on Île Notre-Dame is famous for its Wall of Champions and long pit straight. Heavy braking zones reward strong brakes and mechanical grip.",
    prediction: "Canada's stop-start nature should suit Ferrari and Mercedes equally. Hamilton has a strong record in Montreal and could be a serious threat.",
    predictionFavorite: "Lewis Hamilton", predictionOdds: "+280",
  },
  {
    round: 8, name: "Monaco Grand Prix", circuit: "Circuit de Monaco", location: "Monaco", country: "Monaco", flag: "🇲🇨",
    date: "7 June 2026", status: "upcoming", circuitLength: 3.337, turns: 19, raceDistance: 260.3,
    lapRecord: "1:12.909", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2021,
    description: "The crown jewel of Formula 1. Monaco's narrow streets demand absolute precision. The 2026 mandatory two-stop rule has been dropped, returning strategy to teams.",
    prediction: "Leclerc's Monaco expertise makes him the favourite on home soil. The circuit's nature means qualifying position is crucial — expect Ferrari to target pole.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+200",
  },
  {
    round: 9, name: "Barcelona-Catalunya Grand Prix", circuit: "Circuit de Barcelona-Catalunya", location: "Montmeló", country: "Spain", flag: "🇪🇸",
    date: "14 June 2026", status: "upcoming", circuitLength: 4.655, turns: 16, raceDistance: 307.2,
    lapRecord: "1:16.330", lapRecordHolder: "Max Verstappen", lapRecordYear: 2023,
    description: "The traditional testing circuit in Barcelona continues to host a race. A balanced circuit that tests all aspects of car performance.",
    prediction: "Barcelona's comprehensive nature should reveal the true pecking order. Mercedes and Ferrari are expected to be closely matched.",
    predictionFavorite: "George Russell", predictionOdds: "+180",
  },
  {
    round: 10, name: "Austrian Grand Prix", circuit: "Red Bull Ring", location: "Spielberg", country: "Austria", flag: "🇦🇹",
    date: "28 June 2026", status: "upcoming", circuitLength: 4.318, turns: 10, raceDistance: 306.5,
    lapRecord: "1:05.619", lapRecordHolder: "Carlos Sainz", lapRecordYear: 2020,
    description: "The short, fast Red Bull Ring is a Red Bull home race. High-speed corners and a long main straight create exciting racing.",
    prediction: "Red Bull's home race could see Verstappen challenge strongly. The circuit's power-sensitive nature may also suit Mercedes.",
    predictionFavorite: "Max Verstappen", predictionOdds: "+220",
  },
  {
    round: 11, name: "British Grand Prix", circuit: "Silverstone Circuit", location: "Silverstone", country: "UK", flag: "🇬🇧",
    date: "5 July 2026", status: "upcoming", isSprint: true, circuitLength: 5.891, turns: 18, raceDistance: 306.2,
    lapRecord: "1:27.097", lapRecordHolder: "Max Verstappen", lapRecordYear: 2020,
    description: "Silverstone's high-speed corners like Copse and Maggots-Becketts-Chapel are legendary. The home race for Russell, Norris, Hamilton, and Bearman.",
    prediction: "A British battle is expected at Silverstone. Russell and Norris will be highly motivated on home soil, with Hamilton also a factor for Ferrari.",
    predictionFavorite: "George Russell", predictionOdds: "+160",
  },
  {
    round: 12, name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", location: "Stavelot", country: "Belgium", flag: "🇧🇪",
    date: "19 July 2026", status: "upcoming", circuitLength: 7.004, turns: 19, raceDistance: 308.1,
    lapRecord: "1:46.286", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2018,
    description: "Spa-Francorchamps is one of the greatest circuits in the world. Eau Rouge, Raidillon, and the Kemmel Straight create unforgettable racing.",
    prediction: "Spa's long straights and high-speed corners suit power unit performance. Mercedes and Ferrari are expected to be the frontrunners.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
  },
  {
    round: 13, name: "Hungarian Grand Prix", circuit: "Hungaroring", location: "Mogyoród", country: "Hungary", flag: "🇭🇺",
    date: "26 July 2026", status: "upcoming", circuitLength: 4.381, turns: 14, raceDistance: 306.6,
    lapRecord: "1:16.627", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2020,
    description: "The Hungaroring is often called 'Monaco without the barriers' — a tight, twisty circuit where overtaking is difficult and qualifying is crucial.",
    prediction: "Ferrari's strong cornering performance should suit the Hungaroring. Leclerc and Hamilton are expected to be strong contenders.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+240",
  },
  {
    round: 14, name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", location: "Zandvoort", country: "Netherlands", flag: "🇳🇱",
    date: "23 August 2026", status: "upcoming", isSprint: true, circuitLength: 4.259, turns: 14, raceDistance: 306.6,
    lapRecord: "1:11.097", lapRecordHolder: "Max Verstappen", lapRecordYear: 2021,
    description: "Verstappen's home race at the revived Zandvoort circuit. The banked corners and narrow layout create intense racing.",
    prediction: "Verstappen has dominated Zandvoort since its return. Red Bull will be highly motivated for their star driver's home race.",
    predictionFavorite: "Max Verstappen", predictionOdds: "+180",
  },
  {
    round: 15, name: "Italian Grand Prix", circuit: "Monza Circuit", location: "Monza", country: "Italy", flag: "🇮🇹",
    date: "6 September 2026", status: "upcoming", circuitLength: 5.793, turns: 11, raceDistance: 306.7,
    lapRecord: "1:21.046", lapRecordHolder: "Rubens Barrichello", lapRecordYear: 2004,
    description: "The Temple of Speed. Monza's long straights and minimal downforce setup make it the fastest race on the calendar. Ferrari's home race.",
    prediction: "Ferrari's home race at Monza will be a massive occasion for Hamilton and Leclerc. The circuit's power-sensitive nature could also suit Red Bull's Ford-powered RB22.",
    predictionFavorite: "Lewis Hamilton", predictionOdds: "+220",
  },
  {
    round: 16, name: "Spanish Grand Prix", circuit: "Madring", location: "Madrid", country: "Spain", flag: "🇪🇸",
    date: "13 September 2026", status: "upcoming", circuitLength: 5.5, turns: 20, raceDistance: 308.0,
    lapRecord: "N/A (new circuit)", lapRecordHolder: "N/A", lapRecordYear: 2026,
    description: "The brand new Madrid street circuit around the IFEMA exhibition centre makes its debut in 2026. A completely new challenge for all teams.",
    prediction: "With no historical data, this is the great unknown. Teams that adapt fastest to the new circuit will have an advantage.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
  },
  {
    round: 17, name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", location: "Baku", country: "Azerbaijan", flag: "🇦🇿",
    date: "26 September 2026", status: "upcoming", circuitLength: 6.003, turns: 20, raceDistance: 306.0,
    lapRecord: "1:43.009", lapRecordHolder: "Charles Leclerc", lapRecordYear: 2019,
    description: "The Baku street circuit is famous for its long straight and dramatic racing. The race is held on a Saturday due to Azerbaijan's Remembrance Day.",
    prediction: "Baku's long straight rewards power unit performance. Mercedes and Ferrari are expected to be strong, with the unpredictable street circuit adding drama.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+250",
  },
  {
    round: 18, name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", location: "Singapore", country: "Singapore", flag: "🇸🇬",
    date: "11 October 2026", status: "upcoming", isSprint: true, circuitLength: 4.940, turns: 23, raceDistance: 308.7,
    lapRecord: "1:35.867", lapRecordHolder: "Kevin Magnussen", lapRecordYear: 2018,
    description: "The night race under the Singapore skyline is one of the most atmospheric events on the calendar. The bumpy, slow-speed circuit is physically demanding.",
    prediction: "Singapore's unique characteristics make it hard to predict. Ferrari's strong mechanical grip should be an advantage on the bumpy surface.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+280",
  },
  {
    round: 19, name: "United States Grand Prix", circuit: "Circuit of the Americas", location: "Austin, Texas", country: "USA", flag: "🇺🇸",
    date: "25 October 2026", status: "upcoming", circuitLength: 5.513, turns: 20, raceDistance: 308.4,
    lapRecord: "1:36.169", lapRecordHolder: "Charles Leclerc", lapRecordYear: 2019,
    description: "COTA's sweeping corners and elevation changes make it a fan favourite. The circuit tests all aspects of car performance.",
    prediction: "COTA's balanced nature should produce a close fight between Mercedes and Ferrari. Verstappen has historically been strong here.",
    predictionFavorite: "Max Verstappen", predictionOdds: "+260",
  },
  {
    round: 20, name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", location: "Mexico City", country: "Mexico", flag: "🇲🇽",
    date: "1 November 2026", status: "upcoming", circuitLength: 4.304, turns: 17, raceDistance: 305.4,
    lapRecord: "1:17.774", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2021,
    description: "The high-altitude circuit in Mexico City reduces aerodynamic downforce and challenges power units. A unique challenge for all teams.",
    prediction: "Mexico's altitude affects different power units differently. Red Bull's Ford-powered car and Ferrari could both be strong here.",
    predictionFavorite: "Sergio Pérez", predictionOdds: "+400",
  },
  {
    round: 21, name: "São Paulo Grand Prix", circuit: "Interlagos Circuit", location: "São Paulo", country: "Brazil", flag: "🇧🇷",
    date: "8 November 2026", status: "upcoming", circuitLength: 4.309, turns: 15, raceDistance: 305.9,
    lapRecord: "1:10.540", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2018,
    description: "Interlagos is one of the most exciting circuits on the calendar, with unpredictable weather and dramatic racing. Bortoleto's home race.",
    prediction: "Brazil's unpredictable weather adds a lottery element. Bortoleto will be hugely motivated at his home race, but Mercedes and Ferrari are the favourites.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
  },
  {
    round: 22, name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", location: "Paradise, Nevada", country: "USA", flag: "🇺🇸",
    date: "21 November 2026", status: "upcoming", circuitLength: 6.201, turns: 17, raceDistance: 309.9,
    lapRecord: "1:35.490", lapRecordHolder: "Oscar Piastri", lapRecordYear: 2024,
    description: "The spectacular night race on the Las Vegas Strip is one of F1's most glamorous events. Long straights reward power unit performance.",
    prediction: "Las Vegas' long straights should suit Mercedes' power advantage. Russell is the favourite, with Ferrari also expected to be competitive.",
    predictionFavorite: "George Russell", predictionOdds: "+180",
  },
  {
    round: 23, name: "Qatar Grand Prix", circuit: "Lusail International Circuit", location: "Lusail", country: "Qatar", flag: "🇶🇦",
    date: "29 November 2026", status: "upcoming", circuitLength: 5.380, turns: 16, raceDistance: 308.6,
    lapRecord: "1:24.319", lapRecordHolder: "Max Verstappen", lapRecordYear: 2023,
    description: "The Lusail circuit's flowing layout and high-speed corners create exciting racing. Tyre management is crucial in Qatar's heat.",
    prediction: "Qatar's high-speed nature should suit Mercedes. Russell is the favourite to extend his championship lead if it comes down to the final races.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
  },
  {
    round: 24, name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", location: "Abu Dhabi", country: "UAE", flag: "🇦🇪",
    date: "6 December 2026", status: "upcoming", circuitLength: 5.281, turns: 16, raceDistance: 306.2,
    lapRecord: "1:26.103", lapRecordHolder: "Max Verstappen", lapRecordYear: 2021,
    description: "The season finale at Yas Marina. The circuit's flowing layout and twilight setting create a spectacular end to the championship.",
    prediction: "The season finale will likely determine the championship. If Russell maintains his form, he should be the favourite to clinch the title in Abu Dhabi.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
  },
];

export interface CarSpec {
  team: string;
  chassis: string;
  powerUnit: string;
  powerUnitManufacturer: string;
  engineConfig: string;
  displacement: string;
  maxRPM?: string;
  hybridSystem: string;
  mguKPower: string;
  totalPower: string;
  weight: string;
  wheelbase: string;
  width: string;
  frontSuspension: string;
  rearSuspension: string;
  brakes: string;
  wheels: string;
  fuel: string;
  gearbox: string;
  activeAero: boolean;
  keyFeatures: string[];
  strengths: string[];
  weaknesses: string[];
  color: string;
}

export const CAR_SPECS_2026: CarSpec[] = [
  {
    team: "Mercedes", chassis: "F1 W17", powerUnit: "Mercedes-AMG F1 M17", powerUnitManufacturer: "Mercedes-AMG HPP",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc", maxRPM: "15,000 rpm",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite (Brembo)",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel (Petronas)", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#00D2BE",
    keyFeatures: ["Active aerodynamics (X-Mode/Z-Mode)", "50/50 electric-combustion power split", "Narrower 1,900mm width", "30kg lighter than 2025 cars", "Enhanced ERS with 350kW MGU-K"],
    strengths: ["Dominant power unit performance", "Strong straight-line speed", "Excellent energy deployment", "Experienced driver pairing"],
    weaknesses: ["Active aero still being optimised", "New regulations mean unknowns remain", "Antonelli still developing race craft"],
  },
  {
    team: "Ferrari", chassis: "SF-26", powerUnit: "Ferrari 067/6", powerUnitManufacturer: "Scuderia Ferrari",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc", maxRPM: "15,000 rpm",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "770 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pushrod", brakes: "Brembo ventilated carbon discs",
    wheels: "18\" Brembo", fuel: "100% Sustainable Fuel (Shell)", gearbox: "Longitudinal 8-speed + reverse",
    activeAero: true, color: "#E8002D",
    keyFeatures: ["Hydraulically controlled rear differential", "Electronically controlled rear brakes", "Carbon fibre composite honeycomb chassis", "Halo cockpit protection", "Direct injection at max 350 bar"],
    strengths: ["Strong cornering performance", "Excellent mechanical grip", "Hamilton's experience and pace", "Proven power unit reliability"],
    weaknesses: ["Strategy errors in Australia", "Active aero optimisation ongoing", "Hamilton-Leclerc dynamic still developing"],
  },
  {
    team: "McLaren", chassis: "MCL40", powerUnit: "Mercedes-AMG F1 M17", powerUnitManufacturer: "Mercedes-AMG HPP",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc", maxRPM: "15,000 rpm",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#FF8700",
    keyFeatures: ["Reigning constructors' champion package", "Active aerodynamics system", "Overtake Mode (replaces DRS)", "Mercedes customer power unit", "Mastercard title sponsorship"],
    strengths: ["Reigning champions' experience", "Strong mechanical package", "Norris championship pedigree", "Mercedes power unit advantage"],
    weaknesses: ["Piastri DNS in Australia set back points", "Active aero adaptation required", "Catching up after poor Australia start"],
  },
  {
    team: "Red Bull Racing", chassis: "RB22", powerUnit: "Red Bull Ford DM01", powerUnitManufacturer: "Red Bull Powertrains / Ford",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite (Brembo)",
    wheels: "18\" OZ Racing", fuel: "Esso Synergy (100% Sustainable)", gearbox: "Red Bull Technology 8-speed",
    activeAero: true, color: "#3671C6",
    keyFeatures: ["New Red Bull Ford DM01 power unit", "First Ford F1 engine since 2004", "Verstappen's recovery pace in Australia", "Hadjar promoted from Racing Bulls", "Oracle title sponsorship"],
    strengths: ["Verstappen's exceptional driving ability", "Strong chassis design heritage", "Ford partnership bringing resources", "Hadjar's raw speed potential"],
    weaknesses: ["New power unit still being developed", "Ford partnership is new territory", "Verstappen qualifying crash in Australia"],
  },
  {
    team: "Haas", chassis: "VF-26", powerUnit: "Ferrari 067/6", powerUnitManufacturer: "Scuderia Ferrari",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "770 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#B6BABD",
    keyFeatures: ["Toyota (TGR) partnership for 2026", "Ferrari customer power unit", "Bearman-Ocon driver pairing", "Rebranded as TGR Haas F1 Team", "Strong Australia result (7th-11th)"],
    strengths: ["Ferrari power unit reliability", "Bearman's impressive debut season", "Toyota technical partnership", "Strong points haul in Australia"],
    weaknesses: ["Customer team limitations", "Development resources vs works teams", "Ocon still adapting to new team"],
  },
  {
    team: "Racing Bulls", chassis: "VCARB 03", powerUnit: "Red Bull Ford DM01", powerUnitManufacturer: "Red Bull Powertrains / Ford",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "Esso Synergy (100% Sustainable)", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#6692FF",
    keyFeatures: ["Youngest driver pairing on grid", "Lindblad promoted from F2", "Red Bull Ford power unit", "Visa Cash App title sponsorship", "Points in Australia (8th-13th)"],
    strengths: ["Young talent development", "Red Bull technical support", "Lindblad's exceptional raw pace", "Ford power unit potential"],
    weaknesses: ["Inexperienced driver pairing", "Customer team development limits", "New power unit adaptation"],
  },
  {
    team: "Audi", chassis: "R26", powerUnit: "Audi AFR 26 Hybrid", powerUnitManufacturer: "Audi Sport",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#C9082A",
    keyFeatures: ["Brand new Audi works team", "First Audi F1 power unit", "Acquired from Sauber in 2024", "Revolut title sponsorship", "Bortoleto's debut points in Australia"],
    strengths: ["Volkswagen Group resources", "Long-term commitment to F1", "Bortoleto's F2 championship pedigree", "Hülkenberg's experience"],
    weaknesses: ["New power unit development curve", "First season as works team", "DNS for Hülkenberg in Australia"],
  },
  {
    team: "Alpine", chassis: "A526", powerUnit: "Mercedes-AMG F1 M17", powerUnitManufacturer: "Mercedes-AMG HPP",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "~350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#FF87BC",
    keyFeatures: ["Switched from Renault to Mercedes power", "First season without Renault engine since 2000", "Gasly-Colapinto driver pairing", "BWT pink livery", "Gasly scored final point in Australia"],
    strengths: ["Mercedes customer power unit", "Gasly's experience and consistency", "Colapinto's impressive 2025 form", "Improved power unit vs Renault"],
    weaknesses: ["Customer team status", "New power unit adaptation", "Midfield competition is fierce"],
  },
  {
    team: "Williams", chassis: "FW48", powerUnit: "Mercedes-AMG F1 M17", powerUnitManufacturer: "Mercedes-AMG HPP",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "~350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#64C4FF",
    keyFeatures: ["Atlassian title sponsorship", "Sainz-Albon experienced pairing", "Mercedes customer power unit", "Missed Barcelona test due to production delays", "Active aero 30% less downforce, 55% less drag"],
    strengths: ["Experienced driver pairing", "Sainz's race craft and experience", "Mercedes power unit reliability", "Atlassian's technical resources"],
    weaknesses: ["Missed pre-season testing", "Production delays in 2026", "Historically underfunded vs top teams"],
  },
  {
    team: "Cadillac", chassis: "MAC-26", powerUnit: "Ferrari 067/6", powerUnitManufacturer: "Scuderia Ferrari",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "770 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#333333",
    keyFeatures: ["First new F1 team since Haas in 2016", "General Motors / Cadillac brand", "Ferrari customer power unit (until 2029)", "Pérez and Bottas experienced pairing", "Future in-house GM power unit from 2029"],
    strengths: ["GM's financial backing", "Experienced driver pairing", "Ferrari power unit reliability", "Strong American market presence"],
    weaknesses: ["Brand new team with no F1 experience", "Both drivers retired in Australia", "Building infrastructure from scratch"],
  },
  {
    team: "Aston Martin", chassis: "AMR26", powerUnit: "Honda RA626H", powerUnitManufacturer: "Honda Racing Corporation",
    engineConfig: "90° V6 Turbocharged", displacement: "1,600 cc",
    hybridSystem: "Single MGU-K (no MGU-H)", mguKPower: "350 kW (470 hp)", totalPower: ">1,000 hp",
    weight: "768 kg (incl. driver)", wheelbase: "≤3,400 mm", width: "1,900 mm",
    frontSuspension: "Pushrod", rearSuspension: "Pullrod", brakes: "Carbon-Carbon Composite",
    wheels: "18\" OZ Racing", fuel: "100% Sustainable Fuel (Aramco)", gearbox: "8-speed semi-automatic",
    activeAero: true, color: "#358C75",
    keyFeatures: ["Exclusive Honda works partnership", "Honda's return as independent supplier since 2021", "Alonso's 44th birthday in 2026 season", "Aramco title sponsorship", "Active aero with moveable front/rear wings"],
    strengths: ["Honda's commitment and resources", "Alonso's exceptional experience", "Exclusive works engine partnership", "Aramco's technical collaboration"],
    weaknesses: ["New power unit still developing", "Alonso and Stroll retired in Australia", "Honda adapting to new regulations"],
  },
];
