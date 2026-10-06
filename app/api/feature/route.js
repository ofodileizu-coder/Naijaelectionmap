import { NextResponse } from "next/server";
import { kvEnabled, kvPipeline, underLimit } from "../../../lib/kv";
import { resultsFromCode, headlineFor } from "../../../lib/scenarioImage";

// "Feature my map": someone asks for their map to be reposted with credit.
// Stores the map code, the name or handle they typed, the platform, their consent and the time.
export async function POST(request) {
  if (!kvEnabled) return NextResponse.json({ ok: false, error: "Not available yet" }, { status: 503 });
  let body = {};
  try {
    body = await request.json();
  } catch {}
  const code = String(body.code || "");
  const handle = String(body.handle || "").trim().slice(0, 50);
  const platform = ["Facebook", "X", "Instagram", "TikTok", "WhatsApp", "Other"].includes(body.platform)
    ? body.platform
    : "Other";

  const results = resultsFromCode(code);
  if (!results) return NextResponse.json({ ok: false, error: "Colour some states first." }, { status: 400 });
  if (handle.length < 2) return NextResponse.json({ ok: false, error: "Please add your name or handle." }, { status: 400 });
  if (body.consent !== true) return NextResponse.json({ ok: false, error: "Please tick the consent box." }, { status: 400 });
  if (!(await underLimit(request, "feature", 5))) {
    return NextResponse.json({ ok: false, error: "Too many requests. Try again in an hour." }, { status: 429 });
  }

  const entry = {
    code,
    handle,
    platform,
    headline: headlineFor(results.status),
    consent: true,
    at: new Date().toISOString(),
  };
  await kvPipeline([
    ["LPUSH", "features", JSON.stringify(entry)],
    ["LTRIM", "features", "0", "1999"],
  ]);
  return NextResponse.json({ ok: true });
}
