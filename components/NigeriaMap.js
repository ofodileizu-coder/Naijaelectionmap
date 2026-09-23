"use client";
import { PARTIES, OTHERS, UNITS, THRESHOLD_PCT } from "../lib/data";
import { STATE_PATHS, STATE_CENTROIDS, MAP_VIEWBOX } from "../lib/geo";

const colorOf = (id) => (PARTIES.find((p) => p.id === id) || OTHERS).color;

function describe(unit, info, view) {
  const style = {};
  if (!info.entered) return { style, cls: "empty", label: "", aria: `${unit.name}: no data` };

  if (view === "leader") {
    const strength = Math.min(1, 0.4 + info.margin / 50);
    style["--c"] = colorOf(info.leader);
    style["--mix"] = `${Math.round(strength * 100)}%`;
    return {
      style,
      cls: (strength > 0.62 ? "dark " : "") + (info.leaderShare < THRESHOLD_PCT ? "thin" : ""),
      label: `${Math.round(info.leaderShare)}`,
      aria: `${unit.name}: ${info.leader} leads with ${info.leaderShare}%`,
    };
  }

  const s = info.shares[view] || 0;
  style["--c"] = colorOf(view);
  if (s >= THRESHOLD_PCT) {
    const strength = Math.min(1, 0.45 + (s - THRESHOLD_PCT) / 50);
    style["--mix"] = `${Math.round(strength * 100)}%`;
    return { style, cls: strength > 0.62 ? "dark" : "", label: `${Math.round(s)}`, aria: `${unit.name}: ${view} ${s}%, above 25%` };
  }
  style["--mix"] = "0%";
  return { style, cls: "hatch", label: `${Math.round(s)}`, aria: `${unit.name}: ${view} ${s}%, below 25%` };
}

export default function NigeriaMap({ results, selected, onSelect, view }) {
  const activate = (code) => onSelect(code);
  return (
    <div>
      <svg
        viewBox={MAP_VIEWBOX}
        className="nigeria-map"
        role="group"
        aria-label="Map of Nigeria's 36 states and the FCT"
      >
        <defs>
          <pattern id="hatchPattern" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="var(--panel)" />
            <line x1="0" y1="0" x2="0" y2="10" stroke="#c3cdbf" strokeWidth="5" />
          </pattern>
        </defs>
        {UNITS.map((u) => {
          const info = results.units[u.code];
          const d = describe(u, info, view);
          const [cx, cy] = STATE_CENTROIDS[u.code];
          return (
            <g
              key={u.code}
              className={`state ${d.cls}${selected === u.code ? " sel" : ""}`}
              style={d.style}
              onClick={() => activate(u.code)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  activate(u.code);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={d.aria}
              aria-pressed={selected === u.code}
            >
              <title>{u.name}</title>
              <path d={STATE_PATHS[u.code]} />
              {d.label && (
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="legend">
        {view === "leader"
          ? "Colour is the state leader; a darker fill means a wider lead. A dashed edge marks a leader under 25%. The number is the leader's share."
          : `Filled states are where ${view} reaches 25%. Hatched states fall short. The number is ${view}'s share.`}
      </p>
      <p className="credit">
        State boundaries: <a href="https://www.geoboundaries.org" target="_blank" rel="noreferrer">geoBoundaries</a>, CC BY 4.0. Simplified; not for surveying or legal use.
      </p>
    </div>
  );
}
