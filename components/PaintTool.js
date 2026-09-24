"use client";
import { useState } from "react";
import { PARTIES } from "../lib/data";

const LANDSLIDES = [75, 80, 85, 90];

export default function PaintTool({ armed, onArm }) {
  const [party, setParty] = useState(PARTIES[0].id);
  const [pct, setPct] = useState(80);

  return (
    <section className="block" aria-label="Paint tool">
      <h2>Paint tool</h2>
      <p className="hint">
        Pick a party and a share, then tap any state on the map to set it instantly -- no sliders needed. Tap
        "25% marker" to just mark a party clearing the threshold without changing who's leading.
      </p>

      <div className="paint-row">
        <span>Party</span>
        {PARTIES.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`chip${party === p.id ? " on" : ""}`}
            style={{ "--c": p.color }}
            onClick={() => setParty(p.id)}
            aria-pressed={party === p.id}
          >
            {p.id}
          </button>
        ))}
      </div>

      <div className="paint-row">
        <span>Landslide</span>
        {LANDSLIDES.map((v) => (
          <button
            key={v}
            type="button"
            className={`chip pct${pct === v ? " on" : ""}`}
            onClick={() => setPct(v)}
            aria-pressed={pct === v}
          >
            {v}%
          </button>
        ))}
        <button type="button" className={`chip pct${pct === 25 ? " on" : ""}`} onClick={() => setPct(25)} aria-pressed={pct === 25}>
          25% marker
        </button>
      </div>

      <div className="paint-row">
        {armed ? (
          <button type="button" className="btn" onClick={() => onArm(null)}>
            Stop painting
          </button>
        ) : (
          <button type="button" className="btn" onClick={() => onArm({ partyId: party, pct })}>
            Start painting {party} at {pct}%
          </button>
        )}
      </div>

      {armed && (
        <p className="paint-armed">
          {armed.pct === 25
            ? `Tap a state to mark ${armed.partyId} clearing 25% there.`
            : `Tap a state to set ${armed.partyId} to ${armed.pct}% there.`}
        </p>
      )}
    </section>
  );
}
