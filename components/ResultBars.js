// Horizontal bars for one state's (or the nation's) result, with the 25% line marked.
export default function ResultBars({ rows, showVotes = true, caption }) {
  return (
    <figure className="rbars">
      {rows.map((r) => (
        <div className="rbar" key={r.id}>
          <div className="rbar-label">
            <span className="rbar-dot" style={{ background: r.color }} aria-hidden="true" />
            <span className="rbar-name">
              {r.name} <span className="rbar-party">{r.party}</span>
            </span>
            <span className="rbar-pct">{r.pct.toFixed(1)}%</span>
            {showVotes && <span className="rbar-votes">{r.votes.toLocaleString("en-NG")}</span>}
          </div>
          <div className="rbar-track">
            <div className="rbar-fill" style={{ width: `${Math.min(100, r.pct)}%`, background: r.color }} />
            <div className="rbar-line" aria-hidden="true" />
          </div>
        </div>
      ))}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
