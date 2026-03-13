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

export interface DriverCareer {
  debutYear: number;
  seasonsInF1: number;
  raceEntries: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
  championships: number;
  championshipYears?: string;
  bestFinish?: string;
  previousTeams: string[];
  juniorFormula?: string;
}

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
  // Extended profile fields
  dateOfBirth: string;
  placeOfBirth: string;
  photo: string;
  headshot: string;
  career: DriverCareer;
}

// Local image helpers — images stored in public/drivers/, public/cars/, public/tracks/
const driverPhoto = (slug: string) => `/drivers/${slug}-photo.webp`;
const driverHeadshot = (slug: string) => `/drivers/${slug}-headshot.webp`;

export const TEAM_CAR_IMAGES: Record<string, string> = {
  Mercedes: "/cars/mercedes.webp",
  Ferrari: "/cars/ferrari.webp",
  McLaren: "/cars/mclaren.webp",
  "Red Bull Racing": "/cars/red-bull-racing.webp",
  Haas: "/cars/haas.webp",
  "Racing Bulls": "/cars/racing-bulls.webp",
  Audi: "/cars/audi.webp",
  Alpine: "/cars/alpine.webp",
  Williams: "/cars/williams.webp",
  Cadillac: "/cars/cadillac.webp",
  "Aston Martin": "/cars/aston-martin.webp",
};

export const TEAM_LOGOS: Record<string, string> = {
  Mercedes: "/teams/mercedes.webp",
  Ferrari: "/teams/ferrari.webp",
  McLaren: "/teams/mclaren.webp",
  "Red Bull Racing": "/teams/red-bull-racing.webp",
  Haas: "/teams/haas.webp",
  "Racing Bulls": "/teams/racing-bulls.webp",
  Audi: "/teams/audi.webp",
  Alpine: "/teams/alpine.webp",
  Williams: "/teams/williams.webp",
  Cadillac: "/teams/cadillac.webp",
  "Aston Martin": "/teams/aston-martin.webp",
};

export const DRIVERS_2026: Driver[] = [
  {
    position: 1, name: "George Russell", shortName: "RUS", nationality: "British", flag: "🇬🇧",
    team: "Mercedes", number: 63, points: 25, wins: 1, podiums: 1, poles: 1, fastestLaps: 0,
    age: 28, australiaResult: 1,
    dateOfBirth: "15 February 1998", placeOfBirth: "King's Lynn, England",
    photo: driverPhoto("russell"),
    headshot: driverHeadshot("russell"),
    bio: "George Russell took pole position and dominated the 2026 season opener in Melbourne, leading a Mercedes 1-2. A 2017 GP3 and 2018 Formula 2 champion, Russell spent three formative years at Williams before joining Mercedes in 2022. Known for his meticulous preparation and qualifying speed, he has steadily built himself into a title contender. His commanding victory in Australia marks him as the favourite for the 2026 championship.",
    career: { debutYear: 2019, seasonsInF1: 7, raceEntries: 152, wins: 5, podiums: 24, poles: 8, fastestLaps: 11, championships: 0, bestFinish: "4th (2022, 2025)", previousTeams: ["Williams", "Mercedes"], juniorFormula: "2017 GP3 champion, 2018 F2 champion" },
  },
  {
    position: 2, name: "Kimi Antonelli", shortName: "ANT", nationality: "Italian", flag: "🇮🇹",
    team: "Mercedes", number: 12, points: 18, wins: 0, podiums: 1, poles: 0, fastestLaps: 0,
    age: 19, australiaResult: 2,
    dateOfBirth: "25 August 2006", placeOfBirth: "Bologna, Italy",
    photo: driverPhoto("antonelli"),
    headshot: driverHeadshot("antonelli"),
    bio: "The teenage Italian sensation finished second on his debut season opener, completing a stunning Mercedes 1-2. Antonelli skipped Formula 3 entirely, going straight from Formula Regional European Championship to Formula 2, where he finished runner-up in 2024. A Mercedes junior driver since his karting days, he became the youngest driver to set a fastest lap in F1 history during his 2025 rookie season. At just 19, he is widely regarded as a generational talent.",
    career: { debutYear: 2025, seasonsInF1: 1, raceEntries: 24, wins: 0, podiums: 4, poles: 0, fastestLaps: 1, championships: 0, bestFinish: "7th (2025)", previousTeams: ["Mercedes"], juniorFormula: "2023 FRECA champion, 2024 F2 runner-up" },
  },
  {
    position: 3, name: "Charles Leclerc", shortName: "LEC", nationality: "Monégasque", flag: "🇲🇨",
    team: "Ferrari", number: 16, points: 15, wins: 0, podiums: 1, poles: 0, fastestLaps: 0,
    age: 28, australiaResult: 3,
    dateOfBirth: "16 October 1997", placeOfBirth: "Monte Carlo, Monaco",
    photo: driverPhoto("leclerc"),
    headshot: driverHeadshot("leclerc"),
    bio: "Leclerc delivered a strong podium finish in Australia despite a Ferrari strategy error that cost him a potential victory. A graduate of the Ferrari Driver Academy, he won back-to-back GP3 and Formula 2 titles before debuting with Sauber in 2018 and earning a Ferrari seat just one year later. He holds the record for most pole positions without a world championship (27) and has been Ferrari's leading driver since 2019. His natural speed at circuits like Monaco and Monza has made him one of the most exciting drivers of his generation.",
    career: { debutYear: 2018, seasonsInF1: 8, raceEntries: 171, wins: 8, podiums: 50, poles: 27, fastestLaps: 11, championships: 0, bestFinish: "2nd (2022)", previousTeams: ["Sauber", "Ferrari"], juniorFormula: "2016 GP3 champion, 2017 F2 champion" },
  },
  {
    position: 4, name: "Lewis Hamilton", shortName: "HAM", nationality: "British", flag: "🇬🇧",
    team: "Ferrari", number: 44, points: 12, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 41, australiaResult: 4,
    dateOfBirth: "7 January 1985", placeOfBirth: "Stevenage, England",
    photo: driverPhoto("hamilton"),
    headshot: driverHeadshot("hamilton"),
    bio: "The most statistically successful driver in Formula 1 history, Hamilton holds all-time records for wins (105), pole positions (104), and podiums (202), sharing the record of seven World Championships with Michael Schumacher. After 12 seasons at Mercedes where he won six of his titles, he made a blockbuster move to Ferrari for 2025. His first season in red proved difficult as the team adjusted, but pre-season testing for 2026 showed encouraging pace. At 41, he remains one of the fastest and most determined drivers on the grid.",
    career: { debutYear: 2007, seasonsInF1: 19, raceEntries: 380, wins: 105, podiums: 202, poles: 104, fastestLaps: 68, championships: 7, championshipYears: "2008, 2014, 2015, 2017, 2018, 2019, 2020", previousTeams: ["McLaren", "Mercedes"], juniorFormula: "2006 GP2 champion" },
  },
  {
    position: 5, name: "Lando Norris", shortName: "NOR", nationality: "British", flag: "🇬🇧",
    team: "McLaren", number: 1, points: 10, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 26, australiaResult: 5,
    dateOfBirth: "13 November 1999", placeOfBirth: "Bristol, England",
    photo: driverPhoto("norris"),
    headshot: driverHeadshot("norris"),
    bio: "The reigning World Champion started his title defence with a fifth-place finish as McLaren's sole starter after Piastri's pre-race incident. Norris staged one of F1's greatest championship comebacks in 2025, overturning a 34-point deficit to beat Verstappen by just 2 points, becoming the first McLaren champion since Hamilton in 2008. A McLaren driver since his F1 debut in 2019, he has grown from a promising talent into a complete racing driver with 11 career victories. His number 1 on the car for 2026 signals his intent to defend his crown.",
    career: { debutYear: 2019, seasonsInF1: 7, raceEntries: 152, wins: 11, podiums: 44, poles: 16, fastestLaps: 18, championships: 1, championshipYears: "2025", previousTeams: ["McLaren"], juniorFormula: "2017 F3 European champion, 2018 F2 runner-up" },
  },
  {
    position: 6, name: "Max Verstappen", shortName: "VER", nationality: "Dutch", flag: "🇳🇱",
    team: "Red Bull Racing", number: 3, points: 8, wins: 0, podiums: 0, poles: 0, fastestLaps: 1,
    age: 28, australiaResult: 6,
    dateOfBirth: "30 September 1997", placeOfBirth: "Hasselt, Belgium",
    photo: driverPhoto("verstappen"),
    headshot: driverHeadshot("verstappen"),
    bio: "A stunning recovery drive from 20th on the grid to 6th, with the fastest lap of the race, showcased the raw talent that has delivered four World Championships. The youngest driver to start an F1 race (17 years, 166 days) and youngest race winner (18 years, 228 days), Verstappen dominated the sport from 2021 to 2024 with a record-breaking 19-win season in 2023. He narrowly lost the 2025 title to Norris by just 2 points despite winning the most races (8). Now paired with Red Bull's new Ford-powered engine, he remains the benchmark against which all others are measured.",
    career: { debutYear: 2015, seasonsInF1: 11, raceEntries: 233, wins: 71, podiums: 127, poles: 48, fastestLaps: 37, championships: 4, championshipYears: "2021, 2022, 2023, 2024", previousTeams: ["Toro Rosso", "Red Bull Racing"], juniorFormula: "2014 FIA European F3 3rd" },
  },
  {
    position: 7, name: "Oliver Bearman", shortName: "BEA", nationality: "British", flag: "🇬🇧",
    team: "Haas", number: 87, points: 6, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 20, australiaResult: 7,
    dateOfBirth: "8 May 2005", placeOfBirth: "Chelmsford, England",
    photo: driverPhoto("bearman"),
    headshot: driverHeadshot("bearman"),
    bio: "The young Brit delivered an impressive seventh-place finish for Haas, building on a remarkable start to his F1 career. Bearman made history in 2024 when he scored points on debut substituting for Sainz at Ferrari in Saudi Arabia (P7), becoming the first driver to score for two different teams in his first two races. A Ferrari Driver Academy member and 2021 Italian F4 champion, he earned his full-time Haas seat through three strong substitute appearances in 2024. His best result of 4th at the 2025 Mexico City Grand Prix showed his potential.",
    career: { debutYear: 2024, seasonsInF1: 2, raceEntries: 27, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, championships: 0, bestFinish: "13th (2025)", previousTeams: ["Ferrari (sub)", "Haas"], juniorFormula: "2021 Italian F4 champion, 2023 F3 runner-up" },
  },
  {
    position: 8, name: "Arvid Lindblad", shortName: "LIN", nationality: "British", flag: "🇬🇧",
    team: "Racing Bulls", number: 41, points: 4, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 18, australiaResult: 8,
    dateOfBirth: "8 August 2007", placeOfBirth: "London, England",
    photo: driverPhoto("lindblad"),
    headshot: driverHeadshot("lindblad"),
    bio: "The sole rookie on the 2026 grid and the youngest driver in F1, Lindblad scored points on his debut with an eighth-place finish. Of British-Swedish heritage, he joined the Red Bull Junior Team at just 14 and has broken records at every level — becoming the youngest race winner in Formula 2 history at 17 years and 254 days. He won the 2024 Formula Regional Oceania championship and impressed in F3 with four wins including a historic sprint-and-feature double at Silverstone. His promotion straight from F2 to F1 reflects Red Bull's supreme confidence in his ability.",
    career: { debutYear: 2026, seasonsInF1: 0, raceEntries: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, championships: 0, bestFinish: "Rookie", previousTeams: [], juniorFormula: "2024 FR Oceania champion, F2 youngest winner" },
  },
  {
    position: 9, name: "Gabriel Bortoleto", shortName: "BOR", nationality: "Brazilian", flag: "🇧🇷",
    team: "Audi", number: 5, points: 2, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 21, australiaResult: 9,
    dateOfBirth: "14 October 2004", placeOfBirth: "São Paulo, Brazil",
    photo: driverPhoto("bortoleto"),
    headshot: driverHeadshot("bortoleto"),
    bio: "The 2024 F2 champion scored two points in Australia, a promising start for the new Audi works team. Bortoleto became only the fourth driver to win consecutive F3 and F2 titles (after Leclerc, Russell, and Piastri), establishing himself as one of the brightest talents in motorsport. Part of Fernando Alonso's management stable, he debuted in F1 with Kick Sauber in 2025 and continues with the same team under its new Audi identity. He is the first Brazilian to compete full-time in F1 since Felipe Massa in 2017.",
    career: { debutYear: 2025, seasonsInF1: 1, raceEntries: 24, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, championships: 0, bestFinish: "19th (2025)", previousTeams: ["Kick Sauber"], juniorFormula: "2023 F3 champion, 2024 F2 champion" },
  },
  {
    position: 10, name: "Pierre Gasly", shortName: "GAS", nationality: "French", flag: "🇫🇷",
    team: "Alpine", number: 10, points: 1, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 30, australiaResult: 10,
    dateOfBirth: "7 February 1996", placeOfBirth: "Rouen, France",
    photo: driverPhoto("gasly"),
    headshot: driverHeadshot("gasly"),
    bio: "Gasly claimed the final championship point in Australia, a solid result for Alpine in their first season with Mercedes power. His career has been defined by resilience — after being promoted to Red Bull Racing in 2019, he was demoted back to Toro Rosso mid-season, only to deliver one of the most emotional victories in F1 history at the 2020 Italian Grand Prix at Monza, the first win for a French driver in 24 years. He has been Alpine's team leader since 2023 and is contracted through 2028.",
    career: { debutYear: 2017, seasonsInF1: 9, raceEntries: 177, wins: 1, podiums: 5, poles: 0, fastestLaps: 3, championships: 0, bestFinish: "7th (2019)", previousTeams: ["Toro Rosso", "Red Bull Racing", "AlphaTauri", "Alpine"], juniorFormula: "2016 GP2 runner-up" },
  },
  {
    position: 11, name: "Esteban Ocon", shortName: "OCO", nationality: "French", flag: "🇫🇷",
    team: "Haas", number: 31, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 29, australiaResult: 11,
    dateOfBirth: "17 September 1996", placeOfBirth: "Évreux, France",
    photo: driverPhoto("ocon"),
    headshot: driverHeadshot("ocon"),
    bio: "Ocon finished just outside the points in Australia in his first race for Haas. A former Mercedes junior driver and 2015 GP3 champion, he won his sole Grand Prix at the chaotic 2021 Hungarian Grand Prix for Alpine. His career has been marked by determination — he sat out the entire 2019 season as a reserve driver before returning to the grid with Renault. Having raced for Manor, Force India, Renault, and Alpine, he brings valuable experience to the growing Haas team.",
    career: { debutYear: 2016, seasonsInF1: 8, raceEntries: 180, wins: 1, podiums: 4, poles: 0, fastestLaps: 1, championships: 0, bestFinish: "8th (2017, 2021)", previousTeams: ["Manor", "Force India", "Renault", "Alpine", "Haas"], juniorFormula: "2015 GP3 champion, 2014 European F3 champion" },
  },
  {
    position: 12, name: "Alexander Albon", shortName: "ALB", nationality: "Thai", flag: "🇹🇭",
    team: "Williams", number: 23, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 29, australiaResult: 12,
    dateOfBirth: "23 March 1996", placeOfBirth: "London, England",
    photo: driverPhoto("albon"),
    headshot: driverHeadshot("albon"),
    bio: "Albon finished 12th in Australia as Williams continues to develop the FW48. Born in London to a Thai mother and British father, he races under the Thai flag and burst onto the F1 scene with Toro Rosso in 2019, earning a mid-season promotion to Red Bull Racing where he secured two podiums. After being dropped from the Red Bull race seat after 2020, he spent a year as their test driver before rebuilding his career at Williams from 2022 onwards. He has established himself as a consistent and well-respected midfield performer.",
    career: { debutYear: 2019, seasonsInF1: 6, raceEntries: 129, wins: 0, podiums: 2, poles: 0, fastestLaps: 1, championships: 0, bestFinish: "8th (2019, 2025)", previousTeams: ["Toro Rosso", "Red Bull Racing", "Williams"], juniorFormula: "2016 GP3 runner-up" },
  },
  {
    position: 13, name: "Liam Lawson", shortName: "LAW", nationality: "New Zealander", flag: "🇳🇿",
    team: "Racing Bulls", number: 30, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 24, australiaResult: 13,
    dateOfBirth: "11 February 2002", placeOfBirth: "Hastings, New Zealand",
    photo: driverPhoto("lawson"),
    headshot: driverHeadshot("lawson"),
    bio: "Lawson finished 13th in Australia alongside his rookie teammate Lindblad. His path to a full-time F1 seat was unconventional — he first deputised for the injured Ricciardo at AlphaTauri in 2023, scoring points in Singapore, then returned as a mid-season substitute at Racing Bulls in 2024. His performances earned him a brief promotion to Red Bull Racing alongside Verstappen for the start of 2025, but after two difficult races he was moved back to Racing Bulls where he found more consistent form with a best finish of 5th in Baku.",
    career: { debutYear: 2023, seasonsInF1: 3, raceEntries: 36, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, championships: 0, bestFinish: "14th (2025)", previousTeams: ["AlphaTauri (sub)", "Racing Bulls", "Red Bull Racing"], juniorFormula: "2019 Toyota Racing Series champion" },
  },
  {
    position: 14, name: "Franco Colapinto", shortName: "COL", nationality: "Argentine", flag: "🇦🇷",
    team: "Alpine", number: 43, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 22, australiaResult: 14,
    dateOfBirth: "27 May 2003", placeOfBirth: "Buenos Aires, Argentina",
    photo: driverPhoto("colapinto"),
    headshot: driverHeadshot("colapinto"),
    bio: "Colapinto finished 14th in Australia in his first full season with Alpine. He became the first Argentine F1 driver in 23 years when he replaced Logan Sargeant at Williams from the 2024 Italian Grand Prix onwards, scoring 5 points across 9 races with a best finish of 8th in Azerbaijan. His impressive performances attracted interest from several teams, and he joined Alpine initially as a reserve driver for 2025 before being promoted mid-season. Still only 22, he represents a new generation of Argentine motorsport talent.",
    career: { debutYear: 2024, seasonsInF1: 2, raceEntries: 28, wins: 0, podiums: 0, poles: 0, fastestLaps: 0, championships: 0, bestFinish: "19th (2024)", previousTeams: ["Williams", "Alpine"], juniorFormula: "2023 F2 8th overall" },
  },
  {
    position: 15, name: "Carlos Sainz", shortName: "SAI", nationality: "Spanish", flag: "🇪🇸",
    team: "Williams", number: 55, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 31, australiaResult: 15,
    dateOfBirth: "1 September 1994", placeOfBirth: "Madrid, Spain",
    photo: driverPhoto("sainz"),
    headshot: driverHeadshot("sainz"),
    bio: "Son of rally legend Carlos Sainz Sr., Sainz finished 15th in Australia but is expected to elevate Williams as the season develops. A four-time Grand Prix winner, he scored a remarkable comeback victory in Australia 2024 just weeks after emergency appendix surgery. After four successful seasons at Ferrari where he accumulated 25 podiums, he joined Williams for 2025 and immediately elevated the team with podium finishes in Azerbaijan and Qatar. His experience across five teams makes him one of the most well-rounded drivers on the grid.",
    career: { debutYear: 2015, seasonsInF1: 11, raceEntries: 231, wins: 4, podiums: 29, poles: 6, fastestLaps: 4, championships: 0, bestFinish: "4th (2024)", previousTeams: ["Toro Rosso", "Renault", "McLaren", "Ferrari", "Williams"], juniorFormula: "2014 Formula Renault 3.5 champion" },
  },
  {
    position: 16, name: "Sergio Pérez", shortName: "PER", nationality: "Mexican", flag: "🇲🇽",
    team: "Cadillac", number: 11, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 36, australiaResult: "Ret",
    dateOfBirth: "26 January 1990", placeOfBirth: "Guadalajara, Mexico",
    photo: driverPhoto("perez"),
    headshot: driverHeadshot("perez"),
    bio: "The most successful Mexican driver in F1 history retired from the Australian Grand Prix but brings invaluable experience to the new Cadillac team. Known as 'the Minister of Defense' for his tire management and wheel-to-wheel racecraft, Pérez has won six Grands Prix and finished championship runner-up in 2023. After four seasons at Red Bull Racing supporting Verstappen's title campaigns, he took a sabbatical in 2025 before signing with the new American constructor for their inaugural season.",
    career: { debutYear: 2011, seasonsInF1: 14, raceEntries: 282, wins: 6, podiums: 39, poles: 3, fastestLaps: 12, championships: 0, bestFinish: "2nd (2023)", previousTeams: ["Sauber", "McLaren", "Force India", "Racing Point", "Red Bull Racing"], juniorFormula: "2010 GP2 runner-up" },
  },
  {
    position: 17, name: "Isack Hadjar", shortName: "HAD", nationality: "French", flag: "🇫🇷",
    team: "Red Bull Racing", number: 6, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 21, australiaResult: "Ret",
    dateOfBirth: "28 September 2004", placeOfBirth: "Paris, France",
    photo: driverPhoto("hadjar"),
    headshot: driverHeadshot("hadjar"),
    bio: "Hadjar qualified third on his Red Bull Racing debut but retired from the race due to a mechanical issue. Of French-Algerian heritage, he joined the Red Bull Junior Team in 2022 and finished runner-up in the 2024 Formula 2 Championship with four wins. He made his F1 debut with Racing Bulls in 2025, scoring a maiden podium at the Dutch Grand Prix to become the youngest Frenchman on an F1 rostrum. His performances earned him a promotion to the main Red Bull team alongside Verstappen for 2026.",
    career: { debutYear: 2025, seasonsInF1: 1, raceEntries: 24, wins: 0, podiums: 1, poles: 0, fastestLaps: 0, championships: 0, bestFinish: "12th (2025)", previousTeams: ["Racing Bulls"], juniorFormula: "2024 F2 runner-up" },
  },
  {
    position: 18, name: "Oscar Piastri", shortName: "PIA", nationality: "Australian", flag: "🇦🇺",
    team: "McLaren", number: 81, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 24, australiaResult: "DNS",
    dateOfBirth: "6 April 2001", placeOfBirth: "Melbourne, Australia",
    photo: driverPhoto("piastri"),
    headshot: driverHeadshot("piastri"),
    bio: "Piastri suffered a heartbreaking crash while driving to the grid at his home race, resulting in a DNS. He arrived in F1 with one of the most decorated junior careers in history — consecutive champion in Formula Renault Eurocup, Formula 3, and Formula 2. After a contractual dispute between Alpine and McLaren was resolved in McLaren's favor, he debuted in 2023 and quickly established himself as a star, taking nine victories in just three seasons. His seven wins and 16 podiums in 2025 saw him finish 3rd in the championship.",
    career: { debutYear: 2023, seasonsInF1: 3, raceEntries: 71, wins: 9, podiums: 26, poles: 6, fastestLaps: 9, championships: 0, bestFinish: "3rd (2025)", previousTeams: ["McLaren"], juniorFormula: "2020 F. Renault champion, 2021 F3 champion, 2022 F2 champion" },
  },
  {
    position: 19, name: "Nico Hülkenberg", shortName: "HUL", nationality: "German", flag: "🇩🇪",
    team: "Audi", number: 27, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 38, australiaResult: "DNS",
    dateOfBirth: "19 August 1987", placeOfBirth: "Emmerich am Rhein, Germany",
    photo: driverPhoto("hulkenberg"),
    headshot: driverHeadshot("hulkenberg"),
    bio: "Hülkenberg did not start in Australia due to a technical issue on the Audi. He announced himself with a stunning pole position at the 2010 Brazilian Grand Prix as a Williams rookie and has been one of the most respected midfield drivers across eight different teams over 15 seasons. He held the record for most race starts without a podium for over a decade before finally breaking through with 3rd place at the rain-affected 2025 British Grand Prix on his 239th start. His vast experience makes him invaluable as the Audi works team builds for the future.",
    career: { debutYear: 2010, seasonsInF1: 13, raceEntries: 252, wins: 0, podiums: 1, poles: 1, fastestLaps: 2, championships: 0, bestFinish: "7th (2018)", previousTeams: ["Williams", "Force India", "Sauber", "Renault", "Haas", "Kick Sauber"], juniorFormula: "2009 GP2 champion" },
  },
  {
    position: 20, name: "Fernando Alonso", shortName: "ALO", nationality: "Spanish", flag: "🇪🇸",
    team: "Aston Martin", number: 14, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 44, australiaResult: "Ret",
    dateOfBirth: "29 July 1981", placeOfBirth: "Oviedo, Spain",
    photo: driverPhoto("alonso"),
    headshot: driverHeadshot("alonso"),
    bio: "One of the greatest drivers in F1 history, Alonso retired in Australia as Aston Martin adapts to its new Honda power unit. He became the youngest World Champion at the time when he won back-to-back titles with Renault in 2005 and 2006, ending Michael Schumacher's five-year dominance. He narrowly missed further titles at Ferrari, finishing runner-up in 2010, 2012, and 2013. In 2024, he became the first driver to reach 400 Grand Prix starts. Now 44 with 32 wins and 106 podiums across 25 seasons, his longevity and competitiveness remain unmatched.",
    career: { debutYear: 2001, seasonsInF1: 23, raceEntries: 428, wins: 32, podiums: 106, poles: 22, fastestLaps: 26, championships: 2, championshipYears: "2005, 2006", previousTeams: ["Minardi", "Renault", "McLaren", "Ferrari", "Alpine"], juniorFormula: "2000 Formula 3000 runner-up" },
  },
  {
    position: 21, name: "Valtteri Bottas", shortName: "BOT", nationality: "Finnish", flag: "🇫🇮",
    team: "Cadillac", number: 77, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 36, australiaResult: "Ret",
    dateOfBirth: "28 August 1989", placeOfBirth: "Nastola, Finland",
    photo: driverPhoto("bottas"),
    headshot: driverHeadshot("bottas"),
    bio: "Bottas retired in Australia in the Cadillac team's inaugural race. He holds the record for the most career points (1,797) without winning a World Championship, having finished runner-up twice during five seasons as Lewis Hamilton's teammate at Mercedes (2017-2021), where he won 10 races and helped the team to five consecutive constructors' titles. After three seasons at Alfa Romeo/Kick Sauber and a year as Mercedes reserve in 2025, he brings a wealth of front-running experience to the new American constructor.",
    career: { debutYear: 2013, seasonsInF1: 12, raceEntries: 247, wins: 10, podiums: 67, poles: 20, fastestLaps: 19, championships: 0, bestFinish: "2nd (2019, 2020)", previousTeams: ["Williams", "Mercedes", "Alfa Romeo/Kick Sauber"], juniorFormula: "2011 GP3 champion" },
  },
  {
    position: 22, name: "Lance Stroll", shortName: "STR", nationality: "Canadian", flag: "🇨🇦",
    team: "Aston Martin", number: 18, points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0,
    age: 27, australiaResult: "NC",
    dateOfBirth: "29 October 1998", placeOfBirth: "Montreal, Canada",
    photo: driverPhoto("stroll"),
    headshot: driverHeadshot("stroll"),
    bio: "Stroll was not classified in Australia after failing to complete 90% of the race distance. He became one of the youngest drivers to score a podium when he finished 3rd in Baku during his 2017 rookie season with Williams at just 18. His father Lawrence Stroll's investment led to the team becoming Racing Point and then Aston Martin, where Lance has been a fixture since 2019. He claimed his sole pole position in wet conditions at the 2020 Turkish Grand Prix. Now in his tenth F1 season, he continues to develop alongside the experienced Alonso.",
    career: { debutYear: 2017, seasonsInF1: 9, raceEntries: 191, wins: 0, podiums: 3, poles: 1, fastestLaps: 0, championships: 0, bestFinish: "10th (2023)", previousTeams: ["Williams", "Racing Point", "Aston Martin"], juniorFormula: "2016 European F3 champion" },
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

export interface CircuitWinner {
  year: number;
  driver: string;
  team: string;
}

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
  // Circuit profile fields
  trackImage?: string;
  yearBuilt?: number;
  firstGrandPrix?: number;
  numberOfGrandsPrix?: number;
  circuitType?: "permanent" | "street" | "hybrid";
  drsZones?: number;
  altitude?: number;
  notableFacts?: string[];
  pastWinners?: CircuitWinner[];
}

export const RACES_2026: Race[] = [
  {
    round: 1, name: "Australian Grand Prix", circuit: "Albert Park Circuit", location: "Melbourne", country: "Australia", flag: "🇦🇺",
    date: "8 March 2026", status: "completed", winner: "George Russell", winnerTeam: "Mercedes",
    polePosition: "George Russell", fastestLap: "Max Verstappen", laps: 58, circuitLength: 5.278, turns: 14, raceDistance: 306.1,
    lapRecord: "1:19.813", lapRecordHolder: "Charles Leclerc", lapRecordYear: 2023,
    description: "The season opener at Albert Park saw Mercedes dominate with a 1-2 finish. Russell led from pole while Verstappen recovered from 20th to 6th with the fastest lap.",
    trackImage: "/tracks/Australia.png", yearBuilt: 1953, firstGrandPrix: 1996, numberOfGrandsPrix: 29, circuitType: "street", drsZones: 4, altitude: 2,
    notableFacts: ["Redesigned in 2022 with faster corners and a new DRS zone", "The only circuit that runs anti-clockwise in the Southern Hemisphere calendar", "Hosted the first race of the season 24 times since 1996", "Located around an artificial lake in a public park"],
    pastWinners: [
      { year: 2025, driver: "Oscar Piastri", team: "McLaren" },
      { year: 2024, driver: "Carlos Sainz", team: "Ferrari" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2019, driver: "Valtteri Bottas", team: "Mercedes" },
    ],
  },
  {
    round: 2, name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", location: "Shanghai", country: "China", flag: "🇨🇳",
    date: "15 March 2026", status: "next", isSprint: true, circuitLength: 5.451, turns: 16, raceDistance: 305.1,
    lapRecord: "1:32.238", lapRecordHolder: "Michael Schumacher", lapRecordYear: 2004,
    description: "Shanghai's long back straight and technical final sector provide a unique challenge. The circuit rewards strong top-end power and aerodynamic efficiency.",
    prediction: "Mercedes enter as heavy favourites after their dominant Australian performance. Russell is the strong favourite at -138 odds, with Ferrari's Leclerc and Hamilton the main challengers. The sprint format adds extra intrigue.",
    predictionFavorite: "George Russell", predictionOdds: "-138",
    trackImage: "/tracks/China.png", yearBuilt: 2004, firstGrandPrix: 2004, numberOfGrandsPrix: 21, circuitType: "permanent", drsZones: 2, altitude: 5,
    notableFacts: ["Designed by Hermann Tilke to resemble the Chinese character 'shang' (above)", "Was absent from the calendar from 2020–2023 due to COVID-19", "Features one of F1's longest back straights at 1.175 km", "The snail-shaped Turn 1-2-3 complex is one of the most demanding in F1"],
    pastWinners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2019, driver: "Lewis Hamilton", team: "Mercedes" },
      { year: 2018, driver: "Daniel Ricciardo", team: "Red Bull Racing" },
      { year: 2017, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 3, name: "Japanese Grand Prix", circuit: "Suzuka Circuit", location: "Suzuka", country: "Japan", flag: "🇯🇵",
    date: "29 March 2026", status: "upcoming", circuitLength: 5.807, turns: 18, raceDistance: 307.5,
    lapRecord: "1:30.983", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2019,
    description: "Suzuka is the ultimate driver's circuit — the iconic 130R corner and the Esses test car and driver to the limit. High-downforce setups are essential.",
    prediction: "Ferrari and Mercedes are expected to be closely matched at Suzuka. The circuit's high-speed nature should suit Mercedes' W17, but Ferrari's SF-26 has shown strong cornering ability in testing.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+250",
    trackImage: "/tracks/Japan.png", yearBuilt: 1962, firstGrandPrix: 1987, numberOfGrandsPrix: 37, circuitType: "permanent", drsZones: 2, altitude: 55,
    notableFacts: ["Only figure-eight circuit on the F1 calendar — track crosses over itself", "Built by Honda as a test track in 1962", "Site of iconic championship deciders: Senna vs Prost in 1989 and 1990", "The 130R corner is taken at over 300 km/h"],
    pastWinners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2019, driver: "Valtteri Bottas", team: "Mercedes" },
    ],
  },
  {
    round: 4, name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", location: "Sakhir", country: "Bahrain", flag: "🇧🇭",
    date: "12 April 2026", status: "upcoming", circuitLength: 5.412, turns: 15, raceDistance: 308.2,
    lapRecord: "1:31.447", lapRecordHolder: "Pedro de la Rosa", lapRecordYear: 2005,
    description: "The desert circuit under floodlights is a classic F1 venue. High tyre degradation and thermal management are key factors in Bahrain.",
    prediction: "Red Bull's Ford-powered RB22 may find more pace in Bahrain's high-temperature conditions. Ferrari's SF-26 showed strong form in Bahrain testing with Leclerc setting the fastest time.",
    predictionFavorite: "Lewis Hamilton", predictionOdds: "+300",
    trackImage: "/tracks/Bahrain.png", yearBuilt: 2002, firstGrandPrix: 2004, numberOfGrandsPrix: 22, circuitType: "permanent", drsZones: 3, altitude: 7,
    notableFacts: ["First Grand Prix in the Middle East (2004)", "Hosted two races in 2020 using different track layouts", "The outer track layout was used for the 2020 Sakhir Grand Prix", "Night race since 2014 under 495 floodlight pylons"],
    pastWinners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 5, name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", location: "Jeddah", country: "Saudi Arabia", flag: "🇸🇦",
    date: "19 April 2026", status: "upcoming", circuitLength: 6.174, turns: 27, raceDistance: 308.5,
    lapRecord: "1:30.734", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2021,
    description: "The fastest street circuit on the calendar. Jeddah's long straights reward power unit performance, while the narrow walls demand precision.",
    prediction: "Mercedes' power unit advantage should shine on Jeddah's long straights. Russell is expected to be the favourite, with Verstappen's Red Bull also potentially competitive.",
    predictionFavorite: "George Russell", predictionOdds: "+150",
    trackImage: "/tracks/Saudi_Arabia.png", yearBuilt: 2021, firstGrandPrix: 2021, numberOfGrandsPrix: 5, circuitType: "street", drsZones: 3, altitude: 15,
    notableFacts: ["The longest street circuit on the F1 calendar at 6.174 km", "Average speed exceeds 250 km/h — fastest street circuit ever", "Built along the Red Sea waterfront in just 14 months", "Features blind high-speed corners that test driver bravery"],
    pastWinners: [
      { year: 2025, driver: "Oscar Piastri", team: "McLaren" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Sergio Pérez", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 6, name: "Miami Grand Prix", circuit: "Miami International Autodrome", location: "Miami Gardens", country: "USA", flag: "🇺🇸",
    date: "3 May 2026", status: "upcoming", isSprint: true, circuitLength: 5.412, turns: 19, raceDistance: 308.3,
    lapRecord: "1:29.708", lapRecordHolder: "Max Verstappen", lapRecordYear: 2023,
    description: "The Miami circuit around the Hard Rock Stadium has become a fan favourite. Sprint format adds extra excitement to the Florida weekend.",
    prediction: "McLaren traditionally performs well in Miami. With Norris looking to bounce back after Australia, the papaya cars could be strong contenders at their home race.",
    predictionFavorite: "Lando Norris", predictionOdds: "+350",
    trackImage: "/tracks/Miami.png", yearBuilt: 2022, firstGrandPrix: 2022, numberOfGrandsPrix: 4, circuitType: "hybrid", drsZones: 3, altitude: 2,
    notableFacts: ["Built in the parking lot around Hard Rock Stadium", "Features a faux marina with fake water for the paddock area", "Lando Norris won his first ever F1 race here in 2024", "One of three US races on the calendar"],
    pastWinners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren" },
      { year: 2024, driver: "Lando Norris", team: "McLaren" },
      { year: 2023, driver: "Sergio Pérez", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 7, name: "Canadian Grand Prix", circuit: "Circuit Gilles Villeneuve", location: "Montreal", country: "Canada", flag: "🇨🇦",
    date: "24 May 2026", status: "upcoming", isSprint: true, circuitLength: 4.361, turns: 14, raceDistance: 305.3,
    lapRecord: "1:13.078", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2019,
    description: "The street circuit on Île Notre-Dame is famous for its Wall of Champions and long pit straight. Heavy braking zones reward strong brakes and mechanical grip.",
    prediction: "Canada's stop-start nature should suit Ferrari and Mercedes equally. Hamilton has a strong record in Montreal and could be a serious threat.",
    predictionFavorite: "Lewis Hamilton", predictionOdds: "+280",
    trackImage: "/tracks/Canada.png", yearBuilt: 1978, firstGrandPrix: 1978, numberOfGrandsPrix: 43, circuitType: "hybrid", drsZones: 2, altitude: 13,
    notableFacts: ["Named after Gilles Villeneuve, who won the first race here in 1978", "The 'Wall of Champions' at the final chicane has caught out Schumacher, Villeneuve, and Hill", "Built on a man-made island created for Expo 67", "Lewis Hamilton has won here 7 times — more than any other driver"],
    pastWinners: [
      { year: 2025, driver: "George Russell", team: "Mercedes" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2019, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 8, name: "Monaco Grand Prix", circuit: "Circuit de Monaco", location: "Monaco", country: "Monaco", flag: "🇲🇨",
    date: "7 June 2026", status: "upcoming", circuitLength: 3.337, turns: 19, raceDistance: 260.3,
    lapRecord: "1:12.909", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2021,
    description: "The crown jewel of Formula 1. Monaco's narrow streets demand absolute precision. The 2026 mandatory two-stop rule has been dropped, returning strategy to teams.",
    prediction: "Leclerc's Monaco expertise makes him the favourite on home soil. The circuit's nature means qualifying position is crucial — expect Ferrari to target pole.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+200",
    trackImage: "/tracks/Monaco.png", yearBuilt: 1929, firstGrandPrix: 1950, numberOfGrandsPrix: 72, circuitType: "street", drsZones: 1, altitude: 30,
    notableFacts: ["The shortest and slowest circuit on the calendar at 3.337 km", "Ayrton Senna holds the record with 6 Monaco victories", "Part of motorsport's Triple Crown alongside Le Mans and Indy 500", "The tunnel section is the only part of an F1 circuit that goes indoors"],
    pastWinners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren" },
      { year: 2024, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Sergio Pérez", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 9, name: "Barcelona-Catalunya Grand Prix", circuit: "Circuit de Barcelona-Catalunya", location: "Montmeló", country: "Spain", flag: "🇪🇸",
    date: "14 June 2026", status: "upcoming", circuitLength: 4.655, turns: 16, raceDistance: 307.2,
    lapRecord: "1:16.330", lapRecordHolder: "Max Verstappen", lapRecordYear: 2023,
    description: "The traditional testing circuit in Barcelona continues to host a race. A balanced circuit that tests all aspects of car performance.",
    prediction: "Barcelona's comprehensive nature should reveal the true pecking order. Mercedes and Ferrari are expected to be closely matched.",
    predictionFavorite: "George Russell", predictionOdds: "+180",
    trackImage: "/tracks/Spain.png", yearBuilt: 1991, firstGrandPrix: 1991, numberOfGrandsPrix: 35, circuitType: "permanent", drsZones: 2, altitude: 122,
    notableFacts: ["F1's primary pre-season testing venue for decades", "The fast Turn 3 is one of the biggest aerodynamic tests on the calendar", "Hosted a shared race with Valencia from 2008–2012", "Michael Schumacher won here 6 times"],
    pastWinners: [
      { year: 2025, driver: "Lewis Hamilton", team: "Ferrari" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 10, name: "Austrian Grand Prix", circuit: "Red Bull Ring", location: "Spielberg", country: "Austria", flag: "🇦🇹",
    date: "28 June 2026", status: "upcoming", circuitLength: 4.318, turns: 10, raceDistance: 306.5,
    lapRecord: "1:05.619", lapRecordHolder: "Carlos Sainz", lapRecordYear: 2020,
    description: "The short, fast Red Bull Ring is a Red Bull home race. High-speed corners and a long main straight create exciting racing.",
    prediction: "Red Bull's home race could see Verstappen challenge strongly. The circuit's power-sensitive nature may also suit Mercedes.",
    predictionFavorite: "Max Verstappen", predictionOdds: "+220",
    trackImage: "/tracks/Austria.png", yearBuilt: 1969, firstGrandPrix: 1970, numberOfGrandsPrix: 38, circuitType: "permanent", drsZones: 3, altitude: 677,
    notableFacts: ["The highest altitude circuit on the calendar at 677m above sea level", "Only 10 corners — the fewest of any F1 circuit", "Previously known as the Österreichring and A1-Ring", "Owned by Red Bull's Dietrich Mateschitz, rebuilt in 2011"],
    pastWinners: [
      { year: 2025, driver: "George Russell", team: "Mercedes" },
      { year: 2024, driver: "George Russell", team: "Mercedes" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 11, name: "British Grand Prix", circuit: "Silverstone Circuit", location: "Silverstone", country: "UK", flag: "🇬🇧",
    date: "5 July 2026", status: "upcoming", isSprint: true, circuitLength: 5.891, turns: 18, raceDistance: 306.2,
    lapRecord: "1:27.097", lapRecordHolder: "Max Verstappen", lapRecordYear: 2020,
    description: "Silverstone's high-speed corners like Copse and Maggots-Becketts-Chapel are legendary. The home race for Russell, Norris, Hamilton, and Bearman.",
    prediction: "A British battle is expected at Silverstone. Russell and Norris will be highly motivated on home soil, with Hamilton also a factor for Ferrari.",
    predictionFavorite: "George Russell", predictionOdds: "+160",
    trackImage: "/tracks/Great_Britain.png", yearBuilt: 1948, firstGrandPrix: 1950, numberOfGrandsPrix: 59, circuitType: "permanent", drsZones: 2, altitude: 153,
    notableFacts: ["Hosted the very first Formula 1 World Championship race on 13 May 1950", "Built on a former World War II bomber airfield", "Lewis Hamilton has won here 9 times — the record for most wins at a single circuit", "Maggots-Becketts-Chapel is considered the greatest sequence of corners in F1"],
    pastWinners: [
      { year: 2025, driver: "Lewis Hamilton", team: "Ferrari" },
      { year: 2024, driver: "Lewis Hamilton", team: "Mercedes" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Carlos Sainz", team: "Ferrari" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 12, name: "Belgian Grand Prix", circuit: "Circuit de Spa-Francorchamps", location: "Stavelot", country: "Belgium", flag: "🇧🇪",
    date: "19 July 2026", status: "upcoming", circuitLength: 7.004, turns: 19, raceDistance: 308.1,
    lapRecord: "1:46.286", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2018,
    description: "Spa-Francorchamps is one of the greatest circuits in the world. Eau Rouge, Raidillon, and the Kemmel Straight create unforgettable racing.",
    prediction: "Spa's long straights and high-speed corners suit power unit performance. Mercedes and Ferrari are expected to be the frontrunners.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
    trackImage: "/tracks/Belgium.png", yearBuilt: 1925, firstGrandPrix: 1950, numberOfGrandsPrix: 57, circuitType: "permanent", drsZones: 2, altitude: 415,
    notableFacts: ["At 7.004 km, it's the longest circuit on the current F1 calendar", "Eau Rouge/Raidillon is the most iconic corner complex in motorsport", "Notorious for unpredictable weather — microclimate means rain can hit one part of the track and not another", "Michael Schumacher won here 6 times"],
    pastWinners: [
      { year: 2025, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2024, driver: "Lewis Hamilton", team: "Mercedes" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 13, name: "Hungarian Grand Prix", circuit: "Hungaroring", location: "Mogyoród", country: "Hungary", flag: "🇭🇺",
    date: "26 July 2026", status: "upcoming", circuitLength: 4.381, turns: 14, raceDistance: 306.6,
    lapRecord: "1:16.627", lapRecordHolder: "Lewis Hamilton", lapRecordYear: 2020,
    description: "The Hungaroring is often called 'Monaco without the barriers' — a tight, twisty circuit where overtaking is difficult and qualifying is crucial.",
    prediction: "Ferrari's strong cornering performance should suit the Hungaroring. Leclerc and Hamilton are expected to be strong contenders.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+240",
    trackImage: "/tracks/Hungary.png", yearBuilt: 1986, firstGrandPrix: 1986, numberOfGrandsPrix: 40, circuitType: "permanent", drsZones: 2, altitude: 264,
    notableFacts: ["First Grand Prix behind the Iron Curtain in 1986", "Lewis Hamilton holds the record with 9 victories here", "The circuit sits in a natural amphitheatre valley, offering great views for spectators", "Jenson Button won from 14th on the grid here in 2006 — one of F1's greatest drives"],
    pastWinners: [
      { year: 2025, driver: "Oscar Piastri", team: "McLaren" },
      { year: 2024, driver: "Oscar Piastri", team: "McLaren" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Esteban Ocon", team: "Alpine" },
    ],
  },
  {
    round: 14, name: "Dutch Grand Prix", circuit: "Circuit Zandvoort", location: "Zandvoort", country: "Netherlands", flag: "🇳🇱",
    date: "23 August 2026", status: "upcoming", isSprint: true, circuitLength: 4.259, turns: 14, raceDistance: 306.6,
    lapRecord: "1:11.097", lapRecordHolder: "Max Verstappen", lapRecordYear: 2021,
    description: "Verstappen's home race at the revived Zandvoort circuit. The banked corners and narrow layout create intense racing.",
    prediction: "Verstappen has dominated Zandvoort since its return. Red Bull will be highly motivated for their star driver's home race.",
    predictionFavorite: "Max Verstappen", predictionOdds: "+180",
    trackImage: "/tracks/Netherlands.png", yearBuilt: 1948, firstGrandPrix: 1952, numberOfGrandsPrix: 35, circuitType: "permanent", drsZones: 2, altitude: 4,
    notableFacts: ["Returned to the calendar in 2021 after a 36-year absence (last race 1985)", "Features two banked turns — Turn 3 (18°) and the final corner (32°)", "One of the narrowest circuits on the calendar, making overtaking very difficult", "Built in the coastal sand dunes north of Haarlem"],
    pastWinners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2024, driver: "Lando Norris", team: "McLaren" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 15, name: "Italian Grand Prix", circuit: "Monza Circuit", location: "Monza", country: "Italy", flag: "🇮🇹",
    date: "6 September 2026", status: "upcoming", circuitLength: 5.793, turns: 11, raceDistance: 306.7,
    lapRecord: "1:21.046", lapRecordHolder: "Rubens Barrichello", lapRecordYear: 2004,
    description: "The Temple of Speed. Monza's long straights and minimal downforce setup make it the fastest race on the calendar. Ferrari's home race.",
    prediction: "Ferrari's home race at Monza will be a massive occasion for Hamilton and Leclerc. The circuit's power-sensitive nature could also suit Red Bull's Ford-powered RB22.",
    predictionFavorite: "Lewis Hamilton", predictionOdds: "+220",
    trackImage: "/tracks/Italy.png", yearBuilt: 1922, firstGrandPrix: 1950, numberOfGrandsPrix: 74, circuitType: "permanent", drsZones: 2, altitude: 162,
    notableFacts: ["The fastest race on the F1 calendar with average speeds exceeding 260 km/h", "Has hosted more Grands Prix than any other circuit in F1 history", "The old banked oval is still visible alongside the current circuit", "The Tifosi create the most passionate atmosphere in F1 — 100,000+ fans for Ferrari"],
    pastWinners: [
      { year: 2025, driver: "Lewis Hamilton", team: "Ferrari" },
      { year: 2024, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Daniel Ricciardo", team: "McLaren" },
    ],
  },
  {
    round: 16, name: "Spanish Grand Prix", circuit: "Madrid Street Circuit", location: "Madrid", country: "Spain", flag: "🇪🇸",
    date: "13 September 2026", status: "upcoming", circuitLength: 5.5, turns: 20, raceDistance: 308.0,
    description: "The brand new Madrid street circuit around the IFEMA exhibition centre makes its debut in 2026. A completely new challenge for all teams.",
    prediction: "With no historical data, this is the great unknown. Teams that adapt fastest to the new circuit will have an advantage.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
    trackImage: "/tracks/Madrid.png", yearBuilt: 2026, firstGrandPrix: 2026, numberOfGrandsPrix: 0, circuitType: "street", drsZones: 3, altitude: 667,
    notableFacts: ["Brand new circuit debuting in 2026 — the first new venue since Las Vegas", "Located around the IFEMA exhibition centre in northeast Madrid", "Replaces Barcelona-Catalunya as the primary Spanish Grand Prix host from 2027", "Designed by Tilke Engineers with input from the FIA"],
  },
  {
    round: 17, name: "Azerbaijan Grand Prix", circuit: "Baku City Circuit", location: "Baku", country: "Azerbaijan", flag: "🇦🇿",
    date: "26 September 2026", status: "upcoming", circuitLength: 6.003, turns: 20, raceDistance: 306.0,
    lapRecord: "1:43.009", lapRecordHolder: "Charles Leclerc", lapRecordYear: 2019,
    description: "The Baku street circuit is famous for its long straight and dramatic racing. The race is held on a Saturday due to Azerbaijan's Remembrance Day.",
    prediction: "Baku's long straight rewards power unit performance. Mercedes and Ferrari are expected to be strong, with the unpredictable street circuit adding drama.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+250",
    trackImage: "/tracks/Baku.png", yearBuilt: 2016, firstGrandPrix: 2017, numberOfGrandsPrix: 8, circuitType: "street", drsZones: 2, altitude: -28,
    notableFacts: ["Features the longest straight in F1 at 2.2 km along the Baku seafront", "Winds through the UNESCO-listed Old City with medieval castle walls", "Every race at Baku has produced dramatic incidents and surprise results", "The narrowest point of the track is just 7.6 metres wide through the Old City"],
    pastWinners: [
      { year: 2025, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2024, driver: "Oscar Piastri", team: "McLaren" },
      { year: 2023, driver: "Sergio Pérez", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Sergio Pérez", team: "Red Bull Racing" },
    ],
  },
  {
    round: 18, name: "Singapore Grand Prix", circuit: "Marina Bay Street Circuit", location: "Singapore", country: "Singapore", flag: "🇸🇬",
    date: "11 October 2026", status: "upcoming", isSprint: true, circuitLength: 4.940, turns: 23, raceDistance: 308.7,
    lapRecord: "1:35.867", lapRecordHolder: "Kevin Magnussen", lapRecordYear: 2018,
    description: "The night race under the Singapore skyline is one of the most atmospheric events on the calendar. The bumpy, slow-speed circuit is physically demanding.",
    prediction: "Singapore's unique characteristics make it hard to predict. Ferrari's strong mechanical grip should be an advantage on the bumpy surface.",
    predictionFavorite: "Charles Leclerc", predictionOdds: "+280",
    trackImage: "/tracks/Singapore.png", yearBuilt: 2008, firstGrandPrix: 2008, numberOfGrandsPrix: 15, circuitType: "street", drsZones: 3, altitude: 5,
    notableFacts: ["The first night race in F1 history (2008)", "Over 1,500 lighting projectors illuminate the circuit", "The most physically demanding race due to heat, humidity, and 23 corners", "Site of the 'Crashgate' scandal in 2008 when Renault ordered a deliberate crash"],
    pastWinners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren" },
      { year: 2024, driver: "Lando Norris", team: "McLaren" },
      { year: 2023, driver: "Carlos Sainz", team: "Ferrari" },
      { year: 2022, driver: "Sergio Pérez", team: "Red Bull Racing" },
      { year: 2019, driver: "Sebastian Vettel", team: "Ferrari" },
    ],
  },
  {
    round: 19, name: "United States Grand Prix", circuit: "Circuit of the Americas", location: "Austin, Texas", country: "USA", flag: "🇺🇸",
    date: "25 October 2026", status: "upcoming", circuitLength: 5.513, turns: 20, raceDistance: 308.4,
    lapRecord: "1:36.169", lapRecordHolder: "Charles Leclerc", lapRecordYear: 2019,
    description: "COTA's sweeping corners and elevation changes make it a fan favourite. The circuit tests all aspects of car performance.",
    prediction: "COTA's balanced nature should produce a close fight between Mercedes and Ferrari. Verstappen has historically been strong here.",
    predictionFavorite: "Max Verstappen", predictionOdds: "+260",
    trackImage: "/tracks/USA.png", yearBuilt: 2012, firstGrandPrix: 2012, numberOfGrandsPrix: 12, circuitType: "permanent", drsZones: 2, altitude: 164,
    notableFacts: ["Turn 1 features a dramatic 40-metre elevation change up a steep hill", "Inspired by some of the best corners in F1: Turn 1 echoes Silverstone's Maggots, Turns 3-6 echo the Esses at Suzuka", "The first purpose-built F1 circuit in the United States", "Has hosted MotoGP, WEC, and NASCAR in addition to F1"],
    pastWinners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2024, driver: "Charles Leclerc", team: "Ferrari" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 20, name: "Mexico City Grand Prix", circuit: "Autódromo Hermanos Rodríguez", location: "Mexico City", country: "Mexico", flag: "🇲🇽",
    date: "1 November 2026", status: "upcoming", circuitLength: 4.304, turns: 17, raceDistance: 305.4,
    lapRecord: "1:17.774", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2021,
    description: "The high-altitude circuit in Mexico City reduces aerodynamic downforce and challenges power units. A unique challenge for all teams.",
    prediction: "Mexico's altitude affects different power units differently. Red Bull's Ford-powered car and Ferrari could both be strong here.",
    predictionFavorite: "Sergio Pérez", predictionOdds: "+400",
    trackImage: "/tracks/Mexico.png", yearBuilt: 1959, firstGrandPrix: 1963, numberOfGrandsPrix: 24, circuitType: "permanent", drsZones: 3, altitude: 2238,
    notableFacts: ["At 2,238m above sea level, it's by far the highest circuit on the calendar", "The thin air reduces engine power by ~20% and aerodynamic downforce by ~25%", "The stadium section (Foro Sol) holds 30,000 fans creating an electric atmosphere", "Named after Mexican racing brothers Ricardo and Pedro Rodríguez"],
    pastWinners: [
      { year: 2025, driver: "Carlos Sainz", team: "Ferrari" },
      { year: 2024, driver: "Carlos Sainz", team: "Ferrari" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 21, name: "São Paulo Grand Prix", circuit: "Interlagos Circuit", location: "São Paulo", country: "Brazil", flag: "🇧🇷",
    date: "8 November 2026", status: "upcoming", circuitLength: 4.309, turns: 15, raceDistance: 305.9,
    lapRecord: "1:10.540", lapRecordHolder: "Valtteri Bottas", lapRecordYear: 2018,
    description: "Interlagos is one of the most exciting circuits on the calendar, with unpredictable weather and dramatic racing. Bortoleto's home race.",
    prediction: "Brazil's unpredictable weather adds a lottery element. Bortoleto will be hugely motivated at his home race, but Mercedes and Ferrari are the favourites.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
    trackImage: "/tracks/Brazil.png", yearBuilt: 1940, firstGrandPrix: 1973, numberOfGrandsPrix: 43, circuitType: "permanent", drsZones: 2, altitude: 750,
    notableFacts: ["One of the few anti-clockwise circuits on the calendar", "Ayrton Senna's home circuit — officially named Autódromo José Carlos Pace", "Scene of some of the most dramatic season finales in F1 history", "Lewis Hamilton won his first World Championship here in 2008 on the last corner of the last lap"],
    pastWinners: [
      { year: 2025, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "George Russell", team: "Mercedes" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 22, name: "Las Vegas Grand Prix", circuit: "Las Vegas Strip Circuit", location: "Paradise, Nevada", country: "USA", flag: "🇺🇸",
    date: "21 November 2026", status: "upcoming", circuitLength: 6.201, turns: 17, raceDistance: 309.9,
    lapRecord: "1:35.490", lapRecordHolder: "Oscar Piastri", lapRecordYear: 2024,
    description: "The spectacular night race on the Las Vegas Strip is one of F1's most glamorous events. Long straights reward power unit performance.",
    prediction: "Las Vegas' long straights should suit Mercedes' power advantage. Russell is the favourite, with Ferrari also expected to be competitive.",
    predictionFavorite: "George Russell", predictionOdds: "+180",
    trackImage: "/tracks/Las_Vegas.png", yearBuilt: 2023, firstGrandPrix: 2023, numberOfGrandsPrix: 3, circuitType: "street", drsZones: 2, altitude: 620,
    notableFacts: ["Races past iconic landmarks: the Bellagio fountains, Caesars Palace, and the MSG Sphere", "Held in the early hours of the morning (10 PM local start) for European TV audiences", "The $500 million event required major infrastructure work on the Las Vegas Strip", "Cars reach over 340 km/h on the 1.9 km main straight"],
    pastWinners: [
      { year: 2025, driver: "George Russell", team: "Mercedes" },
      { year: 2024, driver: "George Russell", team: "Mercedes" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
  {
    round: 23, name: "Qatar Grand Prix", circuit: "Lusail International Circuit", location: "Lusail", country: "Qatar", flag: "🇶🇦",
    date: "29 November 2026", status: "upcoming", circuitLength: 5.380, turns: 16, raceDistance: 308.6,
    lapRecord: "1:24.319", lapRecordHolder: "Max Verstappen", lapRecordYear: 2023,
    description: "The Lusail circuit's flowing layout and high-speed corners create exciting racing. Tyre management is crucial in Qatar's heat.",
    prediction: "Qatar's high-speed nature should suit Mercedes. Russell is the favourite to extend his championship lead if it comes down to the final races.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
    trackImage: "/tracks/Qatar.png", yearBuilt: 2004, firstGrandPrix: 2021, numberOfGrandsPrix: 4, circuitType: "permanent", drsZones: 2, altitude: 5,
    notableFacts: ["Originally built for MotoGP in 2004, upgraded to F1 standards in 2021", "Features 6 consecutive right-hand turns (T4-T9) that test tyre endurance", "The 2023 race saw extreme tyre failures due to high kerb loads", "Located 30 km north of Doha near the FIFA World Cup stadiums"],
    pastWinners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren" },
      { year: 2024, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Lewis Hamilton", team: "Mercedes" },
    ],
  },
  {
    round: 24, name: "Abu Dhabi Grand Prix", circuit: "Yas Marina Circuit", location: "Abu Dhabi", country: "UAE", flag: "🇦🇪",
    date: "6 December 2026", status: "upcoming", circuitLength: 5.281, turns: 16, raceDistance: 306.2,
    lapRecord: "1:26.103", lapRecordHolder: "Max Verstappen", lapRecordYear: 2021,
    description: "The season finale at Yas Marina. The circuit's flowing layout and twilight setting create a spectacular end to the championship.",
    prediction: "The season finale will likely determine the championship. If Russell maintains his form, he should be the favourite to clinch the title in Abu Dhabi.",
    predictionFavorite: "George Russell", predictionOdds: "+200",
    trackImage: "/tracks/Abu_Dhabi.png", yearBuilt: 2009, firstGrandPrix: 2009, numberOfGrandsPrix: 17, circuitType: "hybrid", drsZones: 2, altitude: 5,
    notableFacts: ["The only circuit to transition from daylight to night during the race (twilight race)", "Part of the track passes through the Yas Hotel (W Hotel) which straddles the circuit", "Site of the controversial 2021 championship decider between Hamilton and Verstappen", "Extensively redesigned in 2021 to improve overtaking opportunities"],
    pastWinners: [
      { year: 2025, driver: "Lando Norris", team: "McLaren" },
      { year: 2024, driver: "Lando Norris", team: "McLaren" },
      { year: 2023, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2022, driver: "Max Verstappen", team: "Red Bull Racing" },
      { year: 2021, driver: "Max Verstappen", team: "Red Bull Racing" },
    ],
  },
];

const VENUE_BASE = "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto/q_auto/content/dam/fom-website/2018-redesign-assets/Racehub header images 16x9";

export const VENUE_IMAGES: Record<string, string> = {
  "Australian Grand Prix": `${VENUE_BASE}/Australia`,
  "Chinese Grand Prix": `${VENUE_BASE}/China`,
  "Japanese Grand Prix": `${VENUE_BASE}/Japan`,
  "Bahrain Grand Prix": `${VENUE_BASE}/Bahrain`,
  "Saudi Arabian Grand Prix": `${VENUE_BASE}/Saudi_Arabia`,
  "Miami Grand Prix": `${VENUE_BASE}/Miami`,
  "Canadian Grand Prix": `${VENUE_BASE}/Canada`,
  "Monaco Grand Prix": `${VENUE_BASE}/Monaco`,
  "Barcelona-Catalunya Grand Prix": `${VENUE_BASE}/Spain`,
  "Spanish Grand Prix": `${VENUE_BASE}/Spain`,
  "Austrian Grand Prix": `${VENUE_BASE}/Austria`,
  "British Grand Prix": `${VENUE_BASE}/Great%20Britain`,
  "Belgian Grand Prix": `${VENUE_BASE}/Belgium`,
  "Hungarian Grand Prix": `${VENUE_BASE}/Hungary`,
  "Dutch Grand Prix": `${VENUE_BASE}/Netherlands`,
  "Italian Grand Prix": `${VENUE_BASE}/Italy`,
  "Azerbaijan Grand Prix": `${VENUE_BASE}/Azerbaijan`,
  "Singapore Grand Prix": `${VENUE_BASE}/Singapore`,
  "United States Grand Prix": `${VENUE_BASE}/USA`,
  "Mexico City Grand Prix": `${VENUE_BASE}/Mexico`,
  "São Paulo Grand Prix": `${VENUE_BASE}/Brazil`,
  "Las Vegas Grand Prix": `${VENUE_BASE}/Las%20Vegas`,
  "Qatar Grand Prix": `${VENUE_BASE}/Qatar`,
  "Abu Dhabi Grand Prix": `${VENUE_BASE}/Abu%20Dhabi`,
};

// ─── Race name → Jolpica circuitId mapping for predictions ──────────────────
export const RACE_CIRCUIT_IDS: Record<string, string> = {
  "Australian Grand Prix": "albert_park",
  "Chinese Grand Prix": "shanghai",
  "Japanese Grand Prix": "suzuka",
  "Bahrain Grand Prix": "bahrain",
  "Saudi Arabian Grand Prix": "jeddah",
  "Miami Grand Prix": "miami",
  "Canadian Grand Prix": "villeneuve",
  "Monaco Grand Prix": "monaco",
  "Barcelona-Catalunya Grand Prix": "catalunya",
  "Austrian Grand Prix": "red_bull_ring",
  "British Grand Prix": "silverstone",
  "Belgian Grand Prix": "spa",
  "Hungarian Grand Prix": "hungaroring",
  "Dutch Grand Prix": "zandvoort",
  "Italian Grand Prix": "monza",
  "Spanish Grand Prix": "madrid",
  "Azerbaijan Grand Prix": "baku",
  "Singapore Grand Prix": "marina_bay",
  "United States Grand Prix": "americas",
  "Mexico City Grand Prix": "rodriguez",
  "São Paulo Grand Prix": "interlagos",
  "Las Vegas Grand Prix": "las_vegas",
  "Qatar Grand Prix": "losail",
  "Abu Dhabi Grand Prix": "yas_marina",
};

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
