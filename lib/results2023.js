// 2023 presidential election: state totals for the four leading candidates,
// as announced by INEC and published by Legit.ng (25 April 2023).
//   APC = Bola Tinubu, PDP = Atiku Abubakar, LP = Peter Obi, NNPP = Rabiu Kwankwaso
// The 14 smaller parties are not included, so shares computed from these
// figures run slightly above INEC's official percentages. Obi's Ondo total is
// corrected from a published 4,405 to 44,405, which matches his official 8.59%.
import { UNITS, ZONES, REGISTERED_VOTERS, THRESHOLD_PCT } from "./data";

export const CANDIDATES_2023 = {
  APC: { name: "Bola Tinubu", party: "APC", color: "#1F5FBF" },
  PDP: { name: "Atiku Abubakar", party: "PDP", color: "#C0392B" },
  LP: { name: "Peter Obi", party: "LP", color: "#1E8A4C" },
  NNPP: { name: "Rabiu Kwankwaso", party: "NNPP", color: "#B7791F" },
};
export const ORDER_2023 = ["APC", "PDP", "LP", "NNPP"];

// Official national result (INEC, 1 March 2023).
export const NATIONAL_2023 = [
  { id: "APC", votes: 8794726, pct: 36.61 },
  { id: "PDP", votes: 6984520, pct: 29.07 },
  { id: "LP", votes: 6101533, pct: 25.4 },
  { id: "NNPP", votes: 1496687, pct: 6.23 },
];
export const TURNOUT_2023_PCT = 26.71;

const RAW = {
  AB: [8914, 22676, 327095, 1239],
  AD: [182881, 417611, 105648, 8006],
  AK: [160620, 214012, 132683, 7796],
  AN: [5111, 9036, 584621, 1967],
  BA: [316694, 426607, 27373, 72103],
  BY: [42572, 68818, 49975, 540],
  BE: [310468, 130081, 308372, 4740],
  BO: [252282, 190921, 7205, 4626],
  CR: [130520, 95425, 179917, 1644],
  DE: [90183, 161600, 341866, 3122],
  EB: [42402, 13503, 259738, 1661],
  ED: [144471, 89585, 331163, 2743],
  EK: [201494, 89554, 11397, 264],
  EN: [4772, 15749, 428640, 1808],
  FC: [90902, 74194, 281717, 4517],
  GO: [146977, 319123, 26160, 10520],
  IM: [66406, 30234, 360495, 1552],
  JG: [421390, 386587, 1889, 98234],
  KD: [399293, 554360, 294494, 92969],
  KN: [517341, 131716, 28513, 997279],
  KT: [482283, 489045, 6376, 69386],
  KB: [248088, 285175, 10682, 5038],
  KO: [240751, 145104, 56217, 4238],
  KW: [263572, 136909, 31116, 3141],
  LA: [572606, 75750, 582454, 8442],
  NA: [172922, 147093, 191361, 12715],
  NI: [375183, 284898, 80452, 21836],
  OG: [341554, 123831, 85829, 2200],
  ON: [369924, 115463, 44405, 930],
  OS: [343945, 354366, 23283, 713],
  OY: [449884, 182977, 99110, 4095],
  PL: [307195, 243808, 466272, 8869],
  RI: [231591, 88468, 175071, 1322],
  SO: [285444, 288679, 6568, 1300],
  TA: [135165, 189017, 146315, 12818],
  YB: [151459, 198567, 2406, 18270],
  ZA: [298396, 193978, 1660, 4044],
};

const SLUG_OVERRIDES = { FC: "fct" };
export function slugFor(unit) {
  return SLUG_OVERRIDES[unit.code] || unit.name.toLowerCase().replace(/[^a-z]+/g, "-");
}
export function displayName(unit) {
  return unit.code === "FC" ? "FCT (Abuja)" : `${unit.name} State`;
}

function round1(x) {
  return Math.round(x * 10) / 10;
}

function buildState(unit) {
  const raw = RAW[unit.code];
  const total = raw.reduce((a, b) => a + b, 0);
  const rows = ORDER_2023.map((id, i) => ({
    id,
    ...CANDIDATES_2023[id],
    votes: raw[i],
    pct: round1((raw[i] / total) * 100),
  })).sort((a, b) => b.votes - a.votes);
  const registered = REGISTERED_VOTERS[unit.code];
  return {
    ...unit,
    slug: slugFor(unit),
    title: displayName(unit),
    zoneName: ZONES[unit.zone],
    rows,
    total,
    winner: rows[0],
    runnerUp: rows[1],
    marginPts: round1(rows[0].pct - rows[1].pct),
    over25: rows.filter((r) => r.pct >= THRESHOLD_PCT).map((r) => r.id),
    registered,
    turnoutApprox: round1((total / registered) * 100),
    // The 2027 NDC ticket pairs Obi with Kwankwaso, so their combined 2023 share is a useful (if rough) baseline.
    obiPlusKwankwaso: round1(((raw[2] + raw[3]) / total) * 100),
  };
}

export const STATES_2023 = UNITS.map(buildState).sort((a, b) => a.name.localeCompare(b.name));

export function stateBySlug(slug) {
  return STATES_2023.find((s) => s.slug === slug) || null;
}

export function statesInZone(zone) {
  return STATES_2023.filter((s) => s.zone === zone);
}

// Number of units (of 37) where each 2023 candidate reached 25% of the four-candidate vote.
export function unitsOver25() {
  const out = {};
  ORDER_2023.forEach((id) => (out[id] = STATES_2023.filter((s) => s.over25.includes(id)).length));
  return out;
}

export function statesWonBy(id) {
  return STATES_2023.filter((s) => s.winner.id === id);
}
