// ---- Constitutional constants (Section 134, 1999 Constitution) ----
export const THRESHOLD_PCT = 25;   // minimum share of votes in a state
export const REQUIRED_UNITS = 24;  // two-thirds of 37 (36 states + FCT)
export const TOTAL_UNITS = 37;

// ---- Parties. Add or edit here; the whole app adapts. ----
export const PARTIES = [
  { id: "APC", name: "All Progressives Congress", color: "#1F5FBF" },
  { id: "PDP", name: "Peoples Democratic Party", color: "#C0392B" },
  { id: "LP", name: "Labour Party", color: "#1E8A4C" },
  { id: "NNPP", name: "New Nigeria Peoples Party", color: "#E08A1E" },
];
export const OTHERS = { id: "OTH", name: "Others", color: "#7D857F" };

export const ZONES = {
  NW: "North West",
  NE: "North East",
  NC: "North Central",
  SW: "South West",
  SE: "South East",
  SS: "South South",
};

// ---- Registered voters per state (INEC final register, January 2023). ----
// Total: 93,469,008. The FCT has since grown to 1,680,315 (INEC, January 2026);
// update any figure here when INEC publishes a newer national register.
export const REGISTERED_VOTERS = {
  SO: 2172056,
  KT: 3516719,
  JG: 2351298,
  KB: 2032041,
  ZA: 1926870,
  KN: 5921370,
  KD: 4335208,
  YB: 1485146,
  BO: 2513281,
  BA: 2749268,
  GO: 1575794,
  AD: 2196566,
  TA: 2022374,
  NI: 2698344,
  PL: 2789528,
  KW: 1695927,
  FC: 1570307,
  NA: 1899244,
  KO: 1932654,
  BE: 2777727,
  OY: 3276675,
  OS: 1954800,
  EK: 987647,
  OG: 2688305,
  ON: 1991344,
  LA: 7060195,
  EN: 2112793,
  AN: 2656437,
  EB: 1597646,
  IM: 2419922,
  AB: 2120808,
  ED: 2501081,
  CR: 1766466,
  DE: 3221697,
  AK: 2357418,
  BY: 1056862,
  RI: 3537190,
};

// National turnout used to turn registered voters into votes cast.
// The 2023 presidential election turnout was about 26.7%.
export const DEFAULT_TURNOUT_PCT = 27;

// Starting chance (weight) that each party leads a given state in random scenarios.
export const DEFAULT_WEIGHTS = { APC: 35, PDP: 25, LP: 25, NNPP: 15 };

// ---- The 36 states + FCT. col/row place each tile on the geographic grid. ----
export const UNITS = [
  // North West
  { code: "SO", name: "Sokoto", zone: "NW", col: 1, row: 0 },
  { code: "KT", name: "Katsina", zone: "NW", col: 3, row: 0 },
  { code: "JG", name: "Jigawa", zone: "NW", col: 5, row: 0 },
  { code: "KB", name: "Kebbi", zone: "NW", col: 0, row: 1 },
  { code: "ZA", name: "Zamfara", zone: "NW", col: 2, row: 1 },
  { code: "KN", name: "Kano", zone: "NW", col: 4, row: 1 },
  { code: "KD", name: "Kaduna", zone: "NW", col: 3, row: 2 },
  // North East
  { code: "YB", name: "Yobe", zone: "NE", col: 6, row: 0 },
  { code: "BO", name: "Borno", zone: "NE", col: 7, row: 0 },
  { code: "BA", name: "Bauchi", zone: "NE", col: 5, row: 1 },
  { code: "GO", name: "Gombe", zone: "NE", col: 6, row: 1 },
  { code: "AD", name: "Adamawa", zone: "NE", col: 7, row: 2 },
  { code: "TA", name: "Taraba", zone: "NE", col: 6, row: 3 },
  // North Central
  { code: "NI", name: "Niger", zone: "NC", col: 1, row: 2 },
  { code: "PL", name: "Plateau", zone: "NC", col: 5, row: 2 },
  { code: "KW", name: "Kwara", zone: "NC", col: 1, row: 3 },
  { code: "FC", name: "FCT Abuja", zone: "NC", col: 3, row: 3 },
  { code: "NA", name: "Nasarawa", zone: "NC", col: 4, row: 3 },
  { code: "KO", name: "Kogi", zone: "NC", col: 3, row: 4 },
  { code: "BE", name: "Benue", zone: "NC", col: 5, row: 4 },
  // South West
  { code: "OY", name: "Oyo", zone: "SW", col: 0, row: 4 },
  { code: "OS", name: "Osun", zone: "SW", col: 1, row: 4 },
  { code: "EK", name: "Ekiti", zone: "SW", col: 2, row: 4 },
  { code: "OG", name: "Ogun", zone: "SW", col: 0, row: 5 },
  { code: "ON", name: "Ondo", zone: "SW", col: 2, row: 5 },
  { code: "LA", name: "Lagos", zone: "SW", col: 0, row: 6 },
  // South East
  { code: "EN", name: "Enugu", zone: "SE", col: 4, row: 4 },
  { code: "AN", name: "Anambra", zone: "SE", col: 4, row: 5 },
  { code: "EB", name: "Ebonyi", zone: "SE", col: 5, row: 5 },
  { code: "IM", name: "Imo", zone: "SE", col: 4, row: 6 },
  { code: "AB", name: "Abia", zone: "SE", col: 5, row: 6 },
  // South South
  { code: "ED", name: "Edo", zone: "SS", col: 3, row: 5 },
  { code: "CR", name: "Cross River", zone: "SS", col: 6, row: 5 },
  { code: "DE", name: "Delta", zone: "SS", col: 3, row: 6 },
  { code: "AK", name: "Akwa Ibom", zone: "SS", col: 6, row: 6 },
  { code: "BY", name: "Bayelsa", zone: "SS", col: 4, row: 7 },
  { code: "RI", name: "Rivers", zone: "SS", col: 5, row: 7 },
];
