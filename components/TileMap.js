"use client";
import { PARTIES, OTHERS, UNITS, THRESHOLD_PCT } from "../lib/data";

const colorOf = (id) => (PARTIES.find((p) => p.id === id) || OTHERS).color;

function describe(unit, info, view) {
  const style = { "--col": unit.col + 1, "--row": unit.row + 1 };
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

export default function TileMap({ results, selected, onSelect, view }) {
  return (
    <div>
      <div className="tilemap" role="group" aria-label="Map of Nigeria's 36 states and the FCT">
        {UNITS.map((u) => {
          const d = describe(u, results.units[u.code], view);
          return (
            <button
              key={u.code}
              type="button"
              className={`tile ${d.cls}${selected === u.code ? " sel" : ""}`}
              style={d.style}
              onClick={() => onSelect(u.code)}
              aria-label={d.aria}
              aria-pressed={selected === u.code}
              title={u.name}
            >
              <span className="tile-code">{u.code}</span>
              <span className="tile-val">{d.label}</span>
            </button>
          );
        })}
      </div>
      <p className="legend">
        {view === "leader"
          ? "Colour is the state leader; a darker tile means a wider lead. A dashed edge marks a leader under 25%. The number is the leader's share."
          : `Filled tiles are states where ${view} reaches 25%. Hatched tiles fall short. The number is ${view}'s share.`}
      </p>
    </div>
  );
}
