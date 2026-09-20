import { TOTAL_UNITS, REQUIRED_UNITS } from "../lib/data";

export default function Verdict({ status }) {
  let tone = "idle";
  let text = "Select a state and enter vote shares, or load a scenario, to see the result.";

  if (status.kind === "elected") {
    tone = "win";
    text = `${status.top.id} wins in the first round: most votes, and 25% or more in ${status.top.unitsMet} of ${TOTAL_UNITS} states.`;
  } else if (status.kind === "runoff") {
    tone = "runoff";
    text = `No first-round winner. ${status.top.id} has the most votes but met 25% in ${status.top.unitsMet} of ${REQUIRED_UNITS} required states. Runoff: ${status.top.id} against ${status.opponent.id}.`;
  } else if (status.kind === "counting") {
    tone = "live";
    const lead = `${status.entered} of ${TOTAL_UNITS} states entered. ${status.top.id} leads nationally`;
    text = status.canReach
      ? `${lead} and needs ${status.needed} more states at 25% or above.`
      : `${lead}, but can no longer reach ${REQUIRED_UNITS} states. A runoff is likely.`;
  }

  return (
    <div className={`verdict ${tone}`} role="status" aria-live="polite">
      {text}
    </div>
  );
}
