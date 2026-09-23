// Packs a scenario (national turnout + every state's shares and turnout) into
// a short URL-safe string, and unpacks it back. One byte per number, so the
// link stays a few hundred characters -- short enough for X, Facebook and
// WhatsApp to accept as a normal link.
import { UNITS, PARTIES } from "./data";
import { emptyState } from "./engine";

export function encodeScenario(data, turnoutPct) {
  const bytes = new Uint8Array(1 + UNITS.length * 5);
  bytes[0] = Math.max(0, Math.min(255, Math.round(turnoutPct)));
  let i = 1;
  for (const u of UNITS) {
    const e = data[u.code];
    for (const p of PARTIES) {
      bytes[i++] = Math.max(0, Math.min(200, Math.round((e.shares[p.id] || 0) * 2)));
    }
    bytes[i++] = e.turnoutPct ? Math.max(1, Math.min(200, Math.round(e.turnoutPct * 2))) : 0;
  }
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeScenario(str) {
  try {
    const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const turnoutPct = bytes[0];
    const data = emptyState();
    let i = 1;
    for (const u of UNITS) {
      const shares = {};
      for (const p of PARTIES) shares[p.id] = (bytes[i++] || 0) / 2;
      const tp = bytes[i++];
      data[u.code] = { turnoutPct: tp ? tp / 2 : null, shares };
    }
    return { data, turnoutPct };
  } catch {
    return null;
  }
}

export function captionFor(status) {
  if (status.kind === "elected") {
    return `My Nigeria election prediction: ${status.top.id} wins in round one, with 25%+ in ${status.top.unitsMet} of 37 states.`;
  }
  if (status.kind === "runoff") {
    return `My Nigeria election prediction: ${status.top.id} vs ${status.opponent.id} go to a runoff.`;
  }
  return "Build your own Nigeria election prediction -- can any party reach 25% in 24 of the 37 states?";
}
