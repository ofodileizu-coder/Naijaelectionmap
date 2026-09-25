"use client";
import { PARTIES, OTHERS, UNITS, THRESHOLD_PCT } from "../lib/data";
import { STATE_PATHS, STATE_CENTROIDS, MAP_VIEWBOX } from "../lib/geo";

const colorOf = (id) => (PARTIES.find((p) => p.id === id) || OTHERS).color;

function minorDots(info) {
  if (!info.entered) return [];
  return PARTIES.filter((p) => p.id !== info.leader && (info.shares[p.id] || 0) >= THRESHOLD_PCT).map((p) => ({
    id: p.id,
    color: p.color,
  }));
}

function describe(unit, info, view) {
  const style = {};
  if (!info.entered) return { style, cls: "empty", label: "", aria: `${unit.name}: no data`, minor: [] };

  if (view === "leader") {
    const strength = Math.min(1, 0.4 + info.margin / 50);
    style["--c"] = colorOf(info.leader);
    style["--mix"] = `${Math.round(strength * 100)}%`;
    return {
      style,
      cls: (strength > 0.62 ? "dark " : "") + (info.leaderShare < THRESHOLD_PCT ? "thin" : ""),
      label: `${Math.round(info.leaderShare)}`,
      aria: `${unit.name}: ${info.leader} leads with ${info.leaderShare}%`,
      minor: minorDots(info),
    };
  }

  const s = info.shares[view] || 0;
  style["--c"] = colorOf(view);
  if (s >= THRESHOLD_PCT) {
    const strength = Math.min(1, 0.45 + (s - THRESHOLD_PCT) / 50);
    style["--mix"] = `${Math.round(strength * 100)}%`;
    return { style, cls: strength > 0.62 ? "dark" : "", label: `${Math.round(s)}`, aria: `${unit.name}: ${view} ${s}%, above 25%`, minor: minorDots(info) };
  }
  style["--mix"] = "0%";
  return { style, cls: "hatch", label: `${Math.round(s)}`, aria: `${unit.name}: ${view} ${s}%, below 25%`, minor: minorDots(info) };
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
              <text className="st-code" x={cx} y={d.label ? cy - 8 : cy} textAnchor="middle" dominantBaseline="middle">
                {u.code}
              </text>
              {d.label && (
                <text className="st-val" x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="middle">
                  {d.label}
                </text>
              )}
              {d.minor.map((m, i) => (
                <circle
                  key={m.id}
                  cx={cx - ((d.minor.length - 1) * 26) / 2 + i * 26}
                  cy={cy + 34}
                  r={11}
                  fill={m.color}
                  stroke="#fff"
                  strokeWidth={2.5}
                />
              ))}
            </g>
          );
        })}
      </svg>
      <p className="legend">
        {view === "leader"
          ? "Darker = wider lead. Dashed edge = leader under 25%. Small dots = another party also clearing 25% there."
          : `Filled = ${view} at 25%+. Hatched = below 25%.`}
      </p>
    </div>
  );
}
