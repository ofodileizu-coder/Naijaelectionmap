import { NextResponse } from "next/server";
import { kvPipeline } from "../../../lib/kv";

// Public totals for the counter on the homepage (no personal data).
export async function GET() {
  const out = await kvPipeline([["GET", "maps:total"], ["HGETALL", "maps:outcomes"]]);
  const total = out ? Number(out[0] || 0) : 0;
  const flat = (out && out[1]) || [];
  const outcomes = {};
  for (let i = 0; i + 1 < flat.length; i += 2) outcomes[flat[i]] = Number(flat[i + 1]);
  return NextResponse.json(
    { total, outcomes },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
