"use client";
import { PARTIES, OTHERS, ZONES } from "../lib/data";
import { othersShare } from "../lib/engine";

export default function StatePanel({ unit, entry, onShare, onTurnout, onQuick, onClear }) {
  const oth = othersShare(entry.shares);
  const num = (v) => (v === "" ? 0 : parseFloat(v));

  return (
    <section className="block" aria-label={`Edit ${unit.name}`}>
      <div className="panel-head">
        <h2>{unit.name}</h2>
        <span className="zone">{ZONES[unit.zone]}</span>
      </div>

      <label className="field">
        <span>Votes cast</span>
        <input
          type="number"
          min="0"
          step="10000"
          value={entry.turnout}
          onChange={(e) => onTurnout(Math.max(0, num(e.target.value) || 0))}
        />
      </label>

      <div className="sliders">
        {PARTIES.map((p) => (
          <div className="srow" key={p.id} style={{ "--c": p.color }}>
            <span className="chip on static">{p.id}</span>
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={entry.shares[p.id]}
              onChange={(e) => onShare(p.id, num(e.target.value))}
              aria-label={`${p.name} share of votes`}
            />
            <input
              className="pct"
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={entry.shares[p.id]}
              onChange={(e) => onShare(p.id, num(e.target.value))}
              aria-label={`${p.id} percent`}
            />
          </div>
        ))}
        <div className="srow others" style={{ "--c": OTHERS.color }}>
          <span className="chip on static">Others</span>
          <div className="fill" style={{ "--w": `${oth}%` }} />
          <span className="pct ro">{oth}</span>
        </div>
      </div>

      <div className="quick">
        <span>Quick result</span>
        {PARTIES.map((p) => (
          <button key={p.id} type="button" className="btn small" onClick={() => onQuick(p.id)}>
            {p.id} leads
          </button>
        ))}
        <button type="button" className="btn small ghost" onClick={onClear}>
          Clear state
        </button>
      </div>
    </section>
  );
}
