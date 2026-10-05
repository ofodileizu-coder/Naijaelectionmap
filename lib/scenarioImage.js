// Shared helpers for the personalised preview image a shared map link shows on
// Facebook, WhatsApp and X. Pure functions, so they run on the server and edge.
import { PARTIES, UNITS, TOTAL_UNITS } from "./data";
import { STATE_PATHS, MAP_VIEWBOX } from "./geo";
import { decodeScenario } from "./share";
import { computeResults } from "./engine";

const PANEL = "#f4f6f0";
const EMPTY = "#cdd6ca"; // uncoloured states: visible grey so the whole country always shows

// A shared code is 149 bytes in URL-safe base64 (about 199 characters).
export function resultsFromCode(code) {
  if (!code || typeof code !== "string" || code.length < 150 || code.length > 260) return null;
  const decoded = decodeScenario(code);
  if (!decoded) return null;
  const results = computeResults(decoded.data, decoded.turnoutPct);
  if (results.entered === 0) return null;
  return results;
}

export function headlineFor(status) {
  if (status.kind === "elected") return `${status.top.id} wins in round one`;
  if (status.kind === "runoff") return `${status.top.id} vs ${status.opponent.id} go to a runoff`;
  if (status.kind === "counting") return `${status.top.id} leads after ${status.entered} of ${TOTAL_UNITS} states`;
  return "Who wins Nigeria in 2027?";
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Same colour logic as the on-site map: stronger colour = wider lead.
function mix(hex, amount) {
  const a = hexToRgb(hex);
  const b = hexToRgb(PANEL);
  const c = a.map((v, i) => Math.round(v * amount + b[i] * (1 - amount)));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const colorOf = (id) => (PARTIES.find((p) => p.id === id) || { color: "#7D857F" }).color;

export function mapSvg(results) {
  const paths = UNITS.map((u) => {
    const info = results.units[u.code];
    if (!info || !info.entered) {
      return `<path d="${STATE_PATHS[u.code]}" fill="${EMPTY}" stroke="${PANEL}" stroke-width="1.6"/>`;
    }
    const strength = Math.min(1, 0.4 + info.margin / 50);
    return `<path d="${STATE_PATHS[u.code]}" fill="${mix(colorOf(info.leader), strength)}" stroke="${PANEL}" stroke-width="1.6"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MAP_VIEWBOX}">${paths}</svg>`;
}

export function mapDataUri(results) {
  const svg = mapSvg(results);
  const b64 = typeof btoa === "function" ? btoa(svg) : Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${b64}`;
}

// Neutral outline map for the general site preview (no party colours).
export function blankMapDataUri() {
  const paths = UNITS.map((u) => `<path d="${STATE_PATHS[u.code]}" fill="#c9d4c6" stroke="#f4f6f0" stroke-width="2"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MAP_VIEWBOX}">${paths}</svg>`;
  const b64 = typeof btoa === "function" ? btoa(svg) : Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${b64}`;
}

// Preview pictures are drawn at 1.5x Facebook's minimum (1200x630) so they stay sharp.
export const PREVIEW_SCALE = 1.5;
export const PREVIEW_SIZE = { width: 1800, height: 945 };
