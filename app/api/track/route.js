import { NextResponse } from "next/server";
import { kvPipeline, underLimit } from "../../../lib/kv";
import { outcomeFromCode } from "../../../lib/outcome";

// Anonymous counter: called when someone shares, copies or downloads their map.
// Stores only the map code (no names, no IP addresses kept) so each map counts once.
export async function POST(request) {
  let code = "";
  try {
    ({ code } = await request.json());
  } catch {}
  const outcome = outcomeFromCode(code);
  if (!outcome) return NextResponse.json({ ok: false }, { status: 400 });
  if (!(await underLimit(request, "track", 120))) return NextResponse.json({ ok: false }, { status: 429 });

  const added = await kvPipeline([["SADD", "maps:codes", code]]);
  if (added && Number(added[0]) === 1) {
    await kvPipeline([
      ["INCR", "maps:total"],
      ["HINCRBY", "maps:outcomes", outcome, "1"],
    ]);
  }
  return NextResponse.json({ ok: true });
}
