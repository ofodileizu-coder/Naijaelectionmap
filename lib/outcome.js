import { resultsFromCode } from "./scenarioImage";

// Turns a shared map into a short outcome label for the anonymous counter,
// e.g. "elected:APC", "runoff:ADC-NDC" or "partial" (not every state filled in).
export function outcomeFromCode(code) {
  const results = resultsFromCode(code);
  if (!results) return null;
  const st = results.status;
  if (st.kind === "elected") return `elected:${st.top.id}`;
  if (st.kind === "runoff") return `runoff:${[st.top.id, st.opponent.id].sort().join("-")}`;
  return "partial";
}

export function describeOutcome(key) {
  if (key === "partial") return "Not finished (some states left blank)";
  const [kind, who] = key.split(":");
  if (kind === "elected") return `${who} wins in round one`;
  if (kind === "runoff") return `Runoff: ${who.replace("-", " vs ")}`;
  return key;
}
