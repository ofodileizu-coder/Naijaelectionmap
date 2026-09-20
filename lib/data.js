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

// ---- Default votes cast per state. ----
// Every state starts at the same placeholder so the maths is easy to test.
// Replace with real figures (e.g. INEC registered voters x expected turnout)
// by filling TURNOUT_OVERRIDES, keyed by state code. Users can also edit
// turnout per state in the app.
export const DEFAULT_TURNOUT = 1000000;
export const TURNOUT_OVERRIDES = {
  // LA: 2500000,
  // KN: 2000000,
};

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
