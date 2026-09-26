"use client";
import { useState } from "react";
import { PARTIES } from "../lib/data";

const SECOND = [10, 20, 25]; // share for a party that isn't leading the state
const LEAD = [33, 50, 60, 75, 80, 85, 90]; // share for the party that wins the state

export default function PaintTool({ armed, onArm }) {
  const [pct, setPct] = useState(75);

  const pickParty = (id) => onArm(armed?.partyId === id ? null : { partyId: id, pct });
  const pickPct = (v) => {
    setPct(v);
    if (armed) onArm({ ...armed, pct: v });
  };
  const pctChip = (v) => (
    <button
      key={v}
      type="button"
      className={`chip chip-pct${pct === v ? " on" : ""}`}
      onClick={() => pickPct(v)}
      aria-pressed={pct === v}
    >
      {v}%
    </button>
  );

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
        {armed && (
          <button type="button" className="btn small ghost" onClick={() => onArm(null)}>
            Done
          </button>
        )}
      </div>
      <div className="filler-row">
        <span className="filler-label">Wins the state with</span>
        {LEAD.map(pctChip)}
        <span className="filler-label">Runner-up with</span>
        {SECOND.map(pctChip)}
      </div>
      <p className="hint tight">
        {armed
          ? pct < 33
            ? `Click a state to give ${armed.partyId} ${pct}% there as the runner-up. Colour in the winner first.`
            : `Click states to make ${armed.partyId} win them with ${pct}% of the vote.`
          : "Choose a party and a percentage, then click states on the map to colour them in. The party you choose wins that state, and the remaining votes are shared between the other two parties."}
      </p>
    </section>
  );
}
