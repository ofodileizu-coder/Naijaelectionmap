import {
  PARTIES,
  UNITS,
  THRESHOLD_PCT,
  REQUIRED_UNITS,
  TOTAL_UNITS,
  REGISTERED_VOTERS,
  DEFAULT_TURNOUT_PCT,
} from "./data";

const round1 = (x) => Math.round(x * 10) / 10;

export function emptyState() {
  const s = {};
  for (const u of UNITS) {
    s[u.code] = {
      turnoutPct: null, // null = use the national turnout
      shares: Object.fromEntries(PARTIES.map((p) => [p.id, 0])),
    };
  }
  return s;
}

// Votes cast in a state = registered voters x turnout.
export function votesCast(code, entry, nationalPct) {
  const pct = entry.turnoutPct ?? nationalPct;
  return Math.round((REGISTERED_VOTERS[code] * pct) / 100);
}

export function othersShare(shares) {
  const sum = PARTIES.reduce((a, p) => a + (shares[p.id] || 0), 0);
  return Math.max(0, round1(100 - sum));
}

export function hasData(entry) {
  return PARTIES.some((p) => (entry.shares[p.id] || 0) > 0);
}

// Set one party's share; it can never push the total past 100%.
export function withShare(entry, partyId, value) {
  const v = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const taken = PARTIES.filter((p) => p.id !== partyId).reduce(
    (a, p) => a + (entry.shares[p.id] || 0),
    0
  );
  return {
    ...entry,
    shares: { ...entry.shares, [partyId]: round1(Math.min(v, 100 - taken)) },
  };
}

// Sets one party to a landslide share (e.g. 75-90%) and zeroes every other
// party in that state -- used by the paint tool for an instant, clean fill.
export function setLandslide(entry, partyId, pct) {
  const v = Math.max(0, Math.min(100, Number.isFinite(pct) ? pct : 0));
  const shares = Object.fromEntries(PARTIES.map((p) => [p.id, p.id === partyId ? round1(v) : 0]));
  return { ...entry, shares };
}

// A plausible result where `partyId` leads: 45 / 20 / 15 / 10, rest to Others.
export function quickShares(partyId) {
  const spread = [20, 15, 10, 5];
  const shares = {};
  let i = 0;
  for (const p of PARTIES) {
    shares[p.id] = p.id === partyId ? 45 : spread[i++] ?? 0;
  }
  return shares;
}

// ---------- Probability tools ----------

// Pick a party id at random, in proportion to its weight.
function weightedPick(weights) {
  const total = PARTIES.reduce((a, p) => a + Math.max(0, weights[p.id] || 0), 0);
  if (total <= 0) return PARTIES[Math.floor(Math.random() * PARTIES.length)].id;
  let r = Math.random() * total;
  for (const p of PARTIES) {
    r -= Math.max(0, weights[p.id] || 0);
    if (r <= 0) return p.id;
  }
  return PARTIES[PARTIES.length - 1].id;
}

// Random vote shares in which `leaderId` always finishes first.
function sharesWithLeader(leaderId) {
  const others = 1 + Math.random() * 4; // 1-5% to Others
  const raw = PARTIES.map(() => Math.random() ** 2 + 0.03);
  const total = raw.reduce((a, b) => a + b, 0);
  const values = raw.map((w) => round1((w / total) * (100 - others))).sort((a, b) => b - a);
  const rest = PARTIES.filter((p) => p.id !== leaderId).map((p) => p.id);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  const shares = { [leaderId]: values[0] };
  rest.forEach((id, i) => (shares[id] = values[i + 1]));
  return shares;
}

// One random election. Each zone gets a random swing per party, so states in a
// region tend to move together; then every state's leader is drawn from the
// weights. Returns { stateCode: shares }.
export function randomScenario(weights) {
  const zoneFactor = {};
  for (const u of UNITS) {
    if (!zoneFactor[u.zone]) {
      zoneFactor[u.zone] = Object.fromEntries(
        PARTIES.map((p) => [p.id, Math.exp((Math.random() - 0.5) * 1.6)])
      );
    }
  }
  const out = {};
  for (const u of UNITS) {
    const w = {};
    for (const p of PARTIES) w[p.id] = (weights[p.id] || 0) * zoneFactor[u.zone][p.id];
    out[u.code] = sharesWithLeader(weightedPick(w));
  }
  return out;
}

// Run many random elections and report how often each party wins in round one.
export function simulate(weights, nationalPct, runs = 1000) {
  const elected = Object.fromEntries(PARTIES.map((p) => [p.id, 0]));
  let runoff = 0;
  const base = emptyState();
  for (let i = 0; i < runs; i++) {
    const scenario = randomScenario(weights);
    const data = {};
    for (const u of UNITS) data[u.code] = { ...base[u.code], shares: scenario[u.code] };
    const { status } = computeResults(data, nationalPct);
    if (status.kind === "elected") elected[status.top.id]++;
    else runoff++;
  }
  const pct = (n) => (n / runs) * 100;
  return {
    runs,
    elected: Object.fromEntries(Object.entries(elected).map(([k, v]) => [k, pct(v)])),
    runoff: pct(runoff),
  };
}

/**
 * The constitutional maths engine.
 * Returns per-state info, national party totals, and the election status.
 */
export function computeResults(data, nationalPct = DEFAULT_TURNOUT_PCT) {
  const acc = Object.fromEntries(
    PARTIES.map((p) => [
      p.id,
      { id: p.id, name: p.name, color: p.color, votes: 0, unitsMet: 0, unitsWon: 0, unitsMajority: 0 },
    ])
  );
  const units = {};
  let totalVotes = 0;
  let entered = 0;

  for (const u of UNITS) {
    const e = data[u.code];
    if (!e || !hasData(e)) {
      units[u.code] = { entered: false };
      continue;
    }
    const cast = votesCast(u.code, e, nationalPct);
    if (!(cast > 0)) {
      units[u.code] = { entered: false };
      continue;
    }
    entered++;
    totalVotes += cast;
    const oth = othersShare(e.shares);
    const ranked = [
      ...PARTIES.map((p) => ({ id: p.id, share: e.shares[p.id] || 0 })),
      { id: "OTH", share: oth },
    ].sort((a, b) => b.share - a.share);
    const leader = ranked[0];

    for (const p of PARTIES) {
      const s = e.shares[p.id] || 0;
      acc[p.id].votes += (cast * s) / 100;
      if (s >= THRESHOLD_PCT) acc[p.id].unitsMet++;
      if (s > 50) acc[p.id].unitsMajority++;
    }
    if (leader.id !== "OTH") acc[leader.id].unitsWon++;

    units[u.code] = {
      entered: true,
      leader: leader.id,
      leaderShare: leader.share,
      margin: leader.share - ranked[1].share,
      shares: { ...e.shares, OTH: oth },
    };
  }

  const parties = Object.values(acc)
    .map((p) => ({ ...p, share: totalVotes ? (p.votes / totalVotes) * 100 : 0 }))
    .sort((a, b) => b.votes - a.votes);

  return { units, parties, totalVotes, entered, status: getStatus(parties, entered) };
}

function getStatus(parties, entered) {
  if (entered === 0) return { kind: "empty" };
  const top = parties[0];
  const remaining = TOTAL_UNITS - entered;

  if (top.unitsMet >= REQUIRED_UNITS) return { kind: "elected", top };

  if (remaining === 0) {
    // No first-round winner: highest votes vs the rival with a majority in the most states.
    const opponent = parties
      .slice(1)
      .sort(
        (a, b) =>
          b.unitsMajority - a.unitsMajority || b.unitsWon - a.unitsWon || b.votes - a.votes
      )[0];
    return { kind: "runoff", top, opponent };
  }

  const canReach = top.unitsMet + remaining >= REQUIRED_UNITS;
  return { kind: "counting", top, entered, remaining, needed: REQUIRED_UNITS - top.unitsMet, canReach };
}
