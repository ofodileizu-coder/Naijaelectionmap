"use client";
import { ZONES, REQUIRED_UNITS } from "../lib/data";

const fmt = (n) => Math.round(n).toLocaleString("en-NG");

export default function StatePanel({
  unit,
  entry,
  registered,
  votes,
  nationalPct,
  onShare,
  onTurnoutPct,
  onClear,
  results,
}) {
  const num = (v) => (v === "" ? 0 : parseFloat(v));

  return (
    <section className="block" aria-label={`Edit ${unit.name}`}>
      <div className="panel-head">
        <h2>{unit.name}</h2>
        <span className="zone">{ZONES[unit.zone]}</span>
      </div>

      <dl className="facts">
        <div>
          <dt>Registered voters</dt>
          <dd>{fmt(registered)}</dd>
        </div>
        <div>
          <dt>Votes cast</dt>
          <dd>{fmt(votes)}</dd>
        </div>
      </dl>

      <label className="field">
        <span>Turnout in this state (%)</span>
        <input
          type="number"
          min="1"
          max="100"
          step="0.5"
          placeholder={String(nationalPct)}
          value={entry.turnoutPct ?? ""}
          onChange={(e) => onTurnoutPct(e.target.value === "" ? null : Math.min(100, Math.max(1, num(e.target.value))))}
        />
      </label>

      <div className="mini-national" aria-label="National summary">
        <div className="mini-head">
          <span>National so far</span>
        </div>
        {results.parties.map((p) => (
          <div className="mini-row" key={p.id} style={{ "--c": p.color }}>
            <span className="mini-dot" />
            <b>{p.id}</b>
            <span className="mini-pct">{p.share.toFixed(1)}%</span>
            <span className="mini-votes">{fmt(p.votes)} votes</span>
            <span className={`mini-states${p.unitsMet >= REQUIRED_UNITS ? " met" : ""}`}>
              {p.unitsMet}/{REQUIRED_UNITS} states
            </span>
          </div>
        ))}
      </div>

      <button type="button" className="btn clear-state" onClick={onClear}>
        Clear {unit.name}
      </button>
    </section>
  );
}
