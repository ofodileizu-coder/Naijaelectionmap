// ---- Constitutional constants (Section 134, 1999 Constitution) ----
export const THRESHOLD_PCT = 25;   // minimum share of votes in a state
export const REQUIRED_UNITS = 24;  // two-thirds of 37 (36 states + FCT)
export const TOTAL_UNITS = 37;

// ---- Parties. Add or edit here; the whole app adapts. ----
export const PARTIES = [
  { id: "APC", name: "All Progressives Congress", color: "#1F5FBF" },
  { id: "ADC", name: "African Democratic Congress", color: "#C0392B" },
  { id: "NDC", name: "Nigeria Democratic Congress", color: "#1E8A4C" },
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

// ---- Registered voters per state, 2023 (INEC final register, January 2023). ----
// Total: 93,469,008. Used for the 2023 results pages (turnout etc.).
export const REGISTERED_VOTERS_2023 = {
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

// ---- Registered voters per state for 2027. ----
// INEC announced the national total (103,428,715) and the figures for the
// states marked "INEC" in October 2026. It has not yet published the rest, so
// those are estimates: each state's 2023 figure grown in proportion so that all
// 37 add up to the national total, kept below Bauchi (10th largest).
// Replace every estimate with INEC's figure once the full list is out, and
// add the state's code to REGISTER_2027_CONFIRMED.
export const REGISTER_2027_TOTAL = 103428715;
export const REGISTER_2027_CONFIRMED = new Set(["LA", "KN", "KD", "KT", "RI", "OY", "DE", "BE", "OG", "BA", "FC", "BY", "EK"]);
export const REGISTERED_VOTERS = {
  SO: 2441749, // estimate
  KT: 3876051, // INEC
  JG: 2643246, // estimate
  KB: 2284349, // estimate
  ZA: 2166119, // estimate
  KN: 6570276, // INEC
  KD: 4662640, // INEC
  YB: 1669549, // estimate
  BO: 2825342, // estimate
  BA: 3012547, // INEC
  GO: 1771452, // estimate
  AD: 2469302, // estimate
  TA: 2273481, // estimate
  NI: 2990000, // estimate
  PL: 2990000, // estimate
  KW: 1906501, // estimate
  FC: 1732043, // INEC
  NA: 2135063, // estimate
  KO: 2172621, // estimate
  BE: 3057225, // INEC
  OY: 3588111, // INEC
  OS: 2197517, // estimate
  EK: 1055708, // INEC
  OG: 3037981, // INEC
  ON: 2238599, // estimate
  LA: 7488633, // INEC
  EN: 2375127, // estimate
  AN: 2986273, // estimate
  EB: 1796017, // estimate
  IM: 2720391, // estimate
  AB: 2384137, // estimate
  ED: 2811627, // estimate
  CR: 1985799, // estimate
  DE: 3525988, // INEC
  AK: 2650126, // estimate
  BY: 1200691, // INEC
  RI: 3736434, // INEC
};

// National turnout used to turn registered voters into votes cast.
// The 2023 presidential election turnout was about 26.7%.
export const DEFAULT_TURNOUT_PCT = 27;

// Starting chance (weight) that each party leads a given state in random scenarios.
export const DEFAULT_WEIGHTS = { APC: 35, ADC: 30, NDC: 35 };

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
