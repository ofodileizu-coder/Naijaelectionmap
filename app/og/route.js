import { ImageResponse } from "next/og";
import { PARTIES, REQUIRED_UNITS, TOTAL_UNITS } from "../../lib/data";
import {
  resultsFromCode,
  headlineFor,
  mapDataUri,
  PREVIEW_SCALE as S,
  PREVIEW_SIZE,
} from "../../lib/scenarioImage";
import GeneralPreview from "../../components/GeneralPreview";

export const runtime = "edge";

const INK = "#10261c";
const MUTED = "#55665c";
const px = (n) => Math.round(n * S);

// GET /og?s=CODE -> a picture of that person's map and result.
// Facebook, WhatsApp and X show it as the link preview when the map is shared.
export async function GET(request) {
  const code = new URL(request.url).searchParams.get("s");
  const results = resultsFromCode(code);
  const cache = { "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable" };
  if (!results) return new ImageResponse(<GeneralPreview />, { ...PREVIEW_SIZE, headers: cache });

  const status = results.status;
  const accent = status.top ? status.top.color : INK;
  const headline = headlineFor(status);
  const headSize = headline.length > 22 ? 48 : 58;
  const byId = Object.fromEntries(results.parties.map((p) => [p.id, p]));
  const rows = PARTIES.map((p) => byId[p.id]).sort((a, b) => b.votes - a.votes);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#e6ebe2", color: INK }}>
        <div style={{ display: "flex", width: px(650), height: "100%", alignItems: "center", justifyContent: "center", padding: `${px(24)}px ${px(10)}px ${px(24)}px ${px(34)}px` }}>
          <img src={mapDataUri(results)} width={px(606)} height={px(494)} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: px(550), padding: `${px(54)}px ${px(56)}px ${px(50)}px ${px(24)}px` }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: px(26), color: MUTED }}>My 2027 prediction</div>
            <div style={{ display: "flex", fontSize: px(headSize), fontWeight: 800, lineHeight: 1.04, letterSpacing: px(-1.5), marginTop: px(10), color: accent }}>
              {headline}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {rows.map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", marginTop: px(14) }}>
                <div style={{ display: "flex", width: px(22), height: px(22), borderRadius: px(4), background: p.color }} />
                <div style={{ display: "flex", width: px(84), marginLeft: px(14), fontSize: px(30), fontWeight: 700 }}>{p.id}</div>
                <div style={{ display: "flex", fontSize: px(26), color: MUTED }}>
                  {`${Math.round(p.share)}%, 25%+ in ${p.unitsMet} states`}
                </div>
              </div>
            ))}
            <div style={{ display: "flex", fontSize: px(21), color: MUTED, marginTop: px(14) }}>
              {`Round-one win needs 25%+ in ${REQUIRED_UNITS} of ${TOTAL_UNITS}`}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", background: INK, color: "#ffffff", borderRadius: px(10), padding: `${px(18)}px ${px(24)}px` }}>
            <div style={{ display: "flex", fontSize: px(38), fontWeight: 800 }}>electionmap.ng</div>
            <div style={{ display: "flex", fontSize: px(22), color: "#c9d6cd", marginTop: px(2) }}>Tap to make your own map, free</div>
          </div>
        </div>
      </div>
    ),
    { ...PREVIEW_SIZE, headers: cache }
  );
}
