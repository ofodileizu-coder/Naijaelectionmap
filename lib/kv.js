// Tiny client for Upstash Redis over its REST API (no extra packages needed).
// Vercel's Upstash integration adds these environment variables automatically.
// If they are missing, every call returns null and the features simply switch off.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvEnabled = Boolean(URL_ && TOKEN);

// Run several commands in one request, e.g. [["INCR","a"],["GET","b"]]. Returns an array of results.
export async function kvPipeline(commands) {
  if (!kvEnabled) return null;
  try {
    const res = await fetch(`${URL_}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.map((d) => (d && "result" in d ? d.result : null));
  } catch {
    return null;
  }
}

export async function kv(...command) {
  const out = await kvPipeline([command]);
  return out ? out[0] : null;
}

// Simple limit: at most `max` actions per IP address per hour for a given purpose.
export async function underLimit(request, purpose, max) {
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const key = `rl:${purpose}:${ip}`;
  const out = await kvPipeline([["INCR", key], ["EXPIRE", key, "3600", "NX"]]);
  if (!out) return true;
  return Number(out[0]) <= max;
}
