"use client";
import { useState } from "react";
import { PARTIES } from "../lib/data";

const LANDSLIDES = [75, 80, 85, 90];

export default function PaintTool({ armed, onArm }) {
  const [party, setParty] = useState(PARTIES[0].id);
  const [pct, setPct] = useState(80);

  return (
    <section className="block" aria-label="Paint tool">
      <h2>Fill states</h2>
      <p className="hint">
        This is the fast way to build a map: pick a party and a share below, then tap states on the map to fill
        them instantly -- like YAPms. A higher share (90%) leaves no room for anyone else to reach 25% there; a
        lower one (75%) leaves some. Use "25% marker" to give a second party the threshold without taking the
        lead. The panel on the right still lets you fine-tune any state by hand.
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
