"use client";
import { PARTIES, OTHERS, ZONES, REQUIRED_UNITS } from "../lib/data";
import { othersShare } from "../lib/engine";

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
  const oth = othersShare(entry.shares);
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

      <div className="mini-national" aria-label="National summary">
        <div className="mini-head">
          <span>National so far</span>
          <button type="button" className="btn small ghost" onClick={onClear}>
            Clear {unit.name}
          </button>
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
    </section>
  );
}
