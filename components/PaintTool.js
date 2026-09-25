"use client";
import { useState } from "react";
import { PARTIES } from "../lib/data";

const SHARES = [75, 80, 85, 90];

// A compact toolbar: pick a party and it's ready to fill. Tap states on the map.
export default function PaintTool({ armed, onArm }) {
  const [pct, setPct] = useState(80);

  const pickParty = (id) => onArm(armed?.partyId === id ? null : { partyId: id, pct });
  const pickPct = (v) => {
    setPct(v);
    if (armed) onArm({ ...armed, pct: v });
  };

  return (
    <section className="block filler" aria-label="Fill states">
      <div className="filler-row">
        <span className="filler-label">Fill with</span>
        {PARTIES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`chip chip-wide${armed?.partyId === p.id ? " on" : ""}`}
            style={{ "--c": p.color }}
            onClick={() => pickParty(p.id)}
            aria-pressed={armed?.partyId === p.id}
          >
            {p.id}
          </button>
        ))}

        <span className="filler-label">Share</span>
        {SHARES.map((v) => (
          <button
            key={v}
            type="button"
            className={`chip chip-pct${pct === v ? " on" : ""}`}
            onClick={() => pickPct(v)}
            aria-pressed={pct === v}
          >
            {v}%
          </button>
        ))}
        <button
          type="button"
          className={`chip chip-pct${pct === 25 ? " on" : ""}`}
          onClick={() => pickPct(25)}
          aria-pressed={pct === 25}
        >
          25% only
        </button>

        {armed && (
          <button type="button" className="btn small ghost" onClick={() => onArm(null)}>
            Done
          </button>
        )}
      </div>
      <p className="hint tight">
        {armed
          ? armed.pct === 25
            ? `Tap a state to give ${armed.partyId} 25% there without changing the leader.`
            : `Tap states to fill them with ${armed.partyId} at ${armed.pct}%.`
          : "Pick a party, then tap states on the map. 90% leaves no one else room for 25%; 75% does."}
      </p>
    </section>
  );
}
