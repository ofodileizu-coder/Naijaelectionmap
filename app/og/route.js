import { ImageResponse } from "next/og";
import { PARTIES, REQUIRED_UNITS, TOTAL_UNITS } from "../../lib/data";
import { resultsFromCode, headlineFor, mapDataUri } from "../../lib/scenarioImage";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };
const INK = "#10261c";
const MUTED = "#55665c";

// GET /og?s=CODE -> a 1200x630 picture of that person's map and result.
// Facebook, WhatsApp and X show it as the link preview when the map is shared.
export async function GET(request) {
  const code = new URL(request.url).searchParams.get("s");
  const results = resultsFromCode(code);
  const cache = { "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable" };

  if (!results) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#e6ebe2", color: INK, padding: "80px" }}>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>electionmap.ng</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, marginTop: 24, letterSpacing: -2 }}>Who wins Nigeria in 2027?</div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 18, color: MUTED }}>Build your map and share your prediction.</div>
        </div>
      ),
      { ...SIZE, headers: cache }
    );
  }

  const status = results.status;
  const accent = status.top ? status.top.color : INK;
  const byId = Object.fromEntries(results.parties.map((p) => [p.id, p]));
  const headline = headlineFor(status);
  const headSize = headline.length > 22 ? 48 : 58;
  const rows = PARTIES.map((p) => byId[p.id]).sort((a, b) => b.votes - a.votes);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#e6ebe2", color: INK }}>
        <div style={{ display: "flex", width: 650, height: "100%", alignItems: "center", justifyContent: "center", padding: "24px 10px 24px 34px" }}>
          <img src={mapDataUri(results)} width={606} height={494} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 550, padding: "54px 56px 50px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, color: MUTED }}>My 2027 prediction</div>
            <div style={{ display: "flex", fontSize: headSize, fontWeight: 800, lineHeight: 1.04, letterSpacing: -1.5, marginTop: 10, color: accent }}>
              {headline}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {rows.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", marginTop: 14 }}>
                <div style={{ display: "flex", width: 22, height: 22, borderRadius: 4, background: p.color }} />
                <div style={{ display: "flex", width: 84, marginLeft: 14, fontSize: 30, fontWeight: 700 }}>{p.id}</div>
                <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
                  {`${Math.round(p.share)}%, 25%+ in ${p.unitsMet} states`}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", fontSize: 21, color: MUTED, marginTop: 14 }}>
              {`Round-one win needs 25%+ in ${REQUIRED_UNITS} of ${TOTAL_UNITS}`}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", background: INK, color: "#ffffff", borderRadius: 10, padding: "18px 24px" }}>
            <div style={{ display: "flex", fontSize: 38, fontWeight: 800 }}>electionmap.ng</div>
            <div style={{ display: "flex", fontSize: 22, color: "#c9d6cd", marginTop: 2 }}>Tap to make your own map, free</div>
          </div>
        </div>
      </div>
    ),
    { ...SIZE, headers: cache }
  );
}
