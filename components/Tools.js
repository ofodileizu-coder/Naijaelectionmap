"use client";
import { useState } from "react";
import { PARTIES, ZONES } from "../lib/data";

export default function Tools({ turnoutPct, onTurnoutPct, weights, onWeights, onRandom, onReset, onZone }) {
  const [party, setParty] = useState(PARTIES[0].id);
  const total = PARTIES.reduce((a, p) => a + (weights[p.id] || 0), 0) || 1;

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
      <p className="hint tight">Votes cast = registered voters x turnout. In 2023 turnout was about 27%.</p>

      <h3>Chance of leading a state</h3>
      <div className="sliders">
        {PARTIES.map((p) => (
          <div className="srow" key={p.id} style={{ "--c": p.color }}>
            <span className="chip on static">{p.id}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={weights[p.id]}
              onChange={(e) => onWeights({ ...weights, [p.id]: parseInt(e.target.value, 10) })}
              aria-label={`${p.id} chance of leading a state`}
            />
            <span className="pct ro">{Math.round(((weights[p.id] || 0) / total) * 100)}%</span>
          </div>
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
