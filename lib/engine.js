import {
  PARTIES,
  UNITS,
  THRESHOLD_PCT,
  REQUIRED_UNITS,
  TOTAL_UNITS,
  DEFAULT_TURNOUT,
  TURNOUT_OVERRIDES,
} from "./data";

const round1 = (x) => Math.round(x * 10) / 10;

export function emptyState() {
  const s = {};
  for (const u of UNITS) {
    s[u.code] = {
      turnout: TURNOUT_OVERRIDES[u.code] ?? DEFAULT_TURNOUT,
      shares: Object.fromEntries(PARTIES.map((p) => [p.id, 0])),
    };
  }
  return s;
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

export function randomShares() {
  const w = [...PARTIES.map(() => Math.random() ** 2), Math.random() * 0.15];
  const total = w.reduce((a, b) => a + b, 0);
  const shares = {};
  PARTIES.forEach((p, i) => (shares[p.id] = round1((w[i] / total) * 100)));
  return shares;
}

/**
 * The constitutional maths engine.
 * Returns per-state info, national party totals, and the election status.
 */
export function computeResults(data) {
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
    if (!e || !hasData(e) || !(e.turnout > 0)) {
      units[u.code] = { entered: false };
      continue;
    }
    entered++;
    totalVotes += e.turnout;
    const oth = othersShare(e.shares);
    const ranked = [
      ...PARTIES.map((p) => ({ id: p.id, share: e.shares[p.id] || 0 })),
      { id: "OTH", share: oth },
    ].sort((a, b) => b.share - a.share);
    const leader = ranked[0];

    for (const p of PARTIES) {
      const s = e.shares[p.id] || 0;
      acc[p.id].votes += (e.turnout * s) / 100;
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
