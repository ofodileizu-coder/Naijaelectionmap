import { kvEnabled, kvPipeline } from "../../lib/kv";
import { describeOutcome } from "../../lib/outcome";
import { SITE_URL, HASHTAG } from "../../lib/site";

// Private page for the site owner: maps people asked to have featured, and the anonymous totals.
// Open it at /admin?key=YOUR_ADMIN_KEY (ADMIN_KEY is set in Vercel's environment variables).
export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminPage({ searchParams }) {
  const key = process.env.ADMIN_KEY;
  if (!key || searchParams?.key !== key) {
    return (
      <main className="prose" style={{ padding: "48px 20px", maxWidth: 640, margin: "0 auto" }}>
        <h1>Not found</h1>
      </main>
    );
  }
  if (!kvEnabled) {
    return (
      <main className="prose" style={{ padding: "48px 20px", maxWidth: 640, margin: "0 auto" }}>
        <h1>Storage not connected</h1>
        <p>Connect Upstash Redis to this project in Vercel (Storage tab), then redeploy.</p>
      </main>
    );
  }

  const out = await kvPipeline([["GET", "maps:total"], ["HGETALL", "maps:outcomes"], ["LRANGE", "features", "0", "199"]]);
  const total = Number(out?.[0] || 0);
  const flat = out?.[1] || [];
  const outcomes = [];
  for (let i = 0; i + 1 < flat.length; i += 2) outcomes.push([flat[i], Number(flat[i + 1])]);
  outcomes.sort((a, b) => b[1] - a[1]);
  const features = (out?.[2] || []).map((x) => {
    try {
      return JSON.parse(x);
    } catch {
      return null;
    }
  }).filter(Boolean);

  return (
    <main className="admin" style={{ padding: "28px 20px", maxWidth: 980, margin: "0 auto" }}>
      <h1>electionmap.ng admin</h1>

      <h2>Maps shared: {total.toLocaleString("en-NG")}</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Maps</th>
            <th>Share</th>
          </tr>
        </thead>
        <tbody>
          {outcomes.map(([k, n]) => (
            <tr key={k}>
              <td>{describeOutcome(k)}</td>
              <td>{n.toLocaleString("en-NG")}</td>
              <td>{total ? ((n / total) * 100).toFixed(1) : "0"}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Maps to feature ({features.length})</h2>
      <p>Newest first. Everyone listed ticked the box agreeing to be reposted with credit.</p>
      <div className="feature-list">
        {features.map((f, i) => {
          const link = `${SITE_URL}/p/${f.code}`;
          const caption = `Prediction by ${f.handle}: ${f.headline}. Do you agree? Make yours at electionmap.ng ${HASHTAG}`;
          return (
            <article key={i} className="feature-item">
              <a href={`/og?s=${encodeURIComponent(f.code)}`} target="_blank" rel="noreferrer">
                <img src={`/og?s=${encodeURIComponent(f.code)}`} alt={f.headline} loading="lazy" />
              </a>
              <div>
                <p>
                  <strong>{f.handle}</strong> on {f.platform} &middot; {new Date(f.at).toLocaleString("en-NG")}
                </p>
                <p>{f.headline}</p>
                <p className="caption-box">{caption}</p>
                <p>
                  <a href={link} target="_blank" rel="noreferrer">
                    Open map
                  </a>{" "}
                  &middot; Right-click the picture to save it.
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
