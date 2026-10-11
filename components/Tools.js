"use client";
import { useState } from "react";
import { PARTIES, ZONES } from "../lib/data";

export default function Tools({ turnoutPct, onTurnoutPct, onReset, onZone }) {
  const [party, setParty] = useState(PARTIES[0].id);

  return (
    <section className="block" aria-label="Scenario tools">
      <h2>Scenarios</h2>

      <label className="field stack">
        <span>National turnout: {turnoutPct}%</span>
        <input
          type="range"
          min="10"
          max="80"
          step="1"
          value={turnoutPct}
          onChange={(e) => onTurnoutPct(parseInt(e.target.value, 10))}
        />
      </label>
      <p className="hint tight">Votes cast = registered voters (2027 register) x turnout. In 2023 turnout was about 27%.</p>

      <div className="zonerow">
        <button type="button" className="btn ghost" onClick={onReset}>
          Clear all
        </button>
      </div>

      <h3>Give a party a whole zone</h3>
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
    </section>
  );
}
