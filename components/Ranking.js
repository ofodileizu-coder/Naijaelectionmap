"use client";
import { REQUIRED_UNITS, TOTAL_UNITS } from "../lib/data";

const fmt = (n) => Math.round(n).toLocaleString("en-NG");

function Strip({ met, color }) {
  return (
    <div className="strip" aria-hidden="true">
      {Array.from({ length: TOTAL_UNITS }, (_, i) => (
        <span key={i} className={i < met ? "cell on" : "cell"} style={i < met ? { background: color } : undefined} />
      ))}
      <span className="mark" style={{ left: `${(REQUIRED_UNITS / TOTAL_UNITS) * 100}%` }} />
    </div>
  );
}

export default function Ranking({ results, view, onView }) {
  return (
    <section className="block" aria-label="National results and threshold meter">
      <h2>National result</h2>
      <p className="hint">
        Each square is a state (or the FCT) where the party has reached 25%. The line marks 24 of 37.
      </p>
      {results.parties.map((p) => (
        <div className="prow" key={p.id}>
          <div className="prow-head">
            <button
              type="button"
              className={`chip${view === p.id ? " on" : ""}`}
              style={{ "--c": p.color }}
              onClick={() => onView(view === p.id ? "leader" : p.id)}
              aria-pressed={view === p.id}
              title={`Show where ${p.id} reaches 25% on the map`}
            >
              {p.id}
            </button>
            <span className="pshare">{p.share.toFixed(1)}%</span>
            <span className="pvotes">{fmt(p.votes)} votes</span>
            <span className={`pcount${p.unitsMet >= REQUIRED_UNITS ? " met" : ""}`}>
              {p.unitsMet} of {REQUIRED_UNITS}
            </span>
          </div>
          <Strip met={p.unitsMet} color={p.color} />
        </div>
      ))}
    </section>
  );
}
