"use client";
import { useState } from "react";
import { PARTIES, ZONES } from "../lib/data";

export default function Tools({ onZone, onRandom, onReset }) {
  const [party, setParty] = useState(PARTIES[0].id);
  return (
    <section className="block" aria-label="Scenario tools">
      <h2>Scenarios</h2>
      <p className="hint">Give a party the lead across a whole zone, then fine-tune individual states.</p>
      <div className="zonerow">
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
      <div className="zonerow">
        {Object.entries(ZONES).map(([z, label]) => (
          <button key={z} type="button" className="btn small" onClick={() => onZone(z, party)}>
            {label}
          </button>
        ))}
      </div>
      <div className="zonerow">
        <button type="button" className="btn" onClick={onRandom}>
          Random scenario
        </button>
        <button type="button" className="btn ghost" onClick={onReset}>
          Clear all
        </button>
      </div>
    </section>
  );
}
