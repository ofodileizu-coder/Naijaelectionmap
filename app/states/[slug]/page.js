import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPage from "../../../components/ContentPage";
import ResultBars from "../../../components/ResultBars";
import { pageMeta } from "../../../lib/site";
import { STATES_2023, stateBySlug, statesInZone, TURNOUT_2023_PCT } from "../../../lib/results2023";
import { THRESHOLD_PCT } from "../../../lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return STATES_2023.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = stateBySlug(params.slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.title}: 2023 presidential results and 2027 outlook`,
    description: `How ${s.title} voted in the 2023 presidential election (${s.winner.name} ${s.winner.pct.toFixed(
      1
    )}%, ${s.runnerUp.name} ${s.runnerUp.pct.toFixed(1)}%), who reached 25%, and what it means for 2027.`,
    path: `/states/${s.slug}`,
  });
}

const TOTAL_REGISTERED = STATES_2023.reduce((a, s) => a + s.registered, 0);
const BY_SIZE = [...STATES_2023].sort((a, b) => b.registered - a.registered).map((s) => s.code);

function ordinal(n) {
  const v = n % 100;
  const suffix = v >= 11 && v <= 13 ? "th" : { 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th";
  return `${n}${suffix}`;
}

function listNames(names) {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function capitalise(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function raceCharacter(s) {
  if (s.marginPts >= 50) return "one of the most one-sided results in the country";
  if (s.marginPts >= 20) return "a clear, comfortable win";
  if (s.marginPts >= 10) return "a solid but contested win";
  if (s.marginPts >= 5) return "a close race";
  return "one of the closest contests in the country";
}

export default function StatePage({ params }) {
  const s = stateBySlug(params.slug);
  if (!s) notFound();

  const pct = (id) => s.rows.find((r) => r.id === id).pct;
  const rank = BY_SIZE.indexOf(s.code) + 1;
  const share = ((s.registered / TOTAL_REGISTERED) * 100).toFixed(1);
  const reached = s.rows.filter((r) => r.pct >= THRESHOLD_PCT).map((r) => r.name);
  const missed = s.rows.filter((r) => r.pct < THRESHOLD_PCT && r.id !== "NNPP").map((r) => `${r.name} (${r.pct.toFixed(1)}%)`);

  const baseline = [
    { label: "Bola Tinubu (APC)", short: "the APC", value: pct("APC"), note: "his own 2023 share" },
    { label: "Atiku Abubakar (ADC)", short: "the ADC", value: pct("PDP"), note: "his 2023 share as the PDP candidate" },
    {
      label: "Peter Obi and Rabiu Kwankwaso (NDC)",
      short: "the NDC",
      value: s.obiPlusKwankwaso,
      note: "their two 2023 shares added together",
    },
  ];
  const above = baseline.filter((b) => b.value >= THRESHOLD_PCT).map((b) => b.short);
  const near = baseline.filter((b) => b.value >= 15 && b.value < THRESHOLD_PCT).map((b) => b.short);

  const neighbours = statesInZone(s.zone).filter((x) => x.code !== s.code);
  const name = s.code === "FC" ? "The FCT" : s.name;

  return (
    <ContentPage
      crumbs={[{ label: "2023 results", href: "/2023-election-results" }, { label: s.title }]}
      title={`${s.title}: presidential election results`}
      intro={`${name} is in the ${s.zoneName} and had ${s.registered.toLocaleString(
        "en-NG"
      )} registered voters in 2023, ${rank === 1 ? "the largest" : `the ${ordinal(rank)} largest`} electorate of the 37 units and ${share}% of the national register.`}
    >
      <h2>2023 result</h2>
      <ResultBars
        rows={s.rows}
        caption="Shares of the four leading candidates' votes. The vertical line marks the 25% threshold."
      />
      <p>
        {s.winner.name} ({s.winner.party}) won {name === "The FCT" ? "the FCT" : name} with {s.winner.pct.toFixed(1)}%,{" "}
        {s.marginPts.toFixed(1)} points ahead of {s.runnerUp.name} ({s.runnerUp.party}): {raceCharacter(s)}.{" "}
        {reached.length > 1
          ? `${listNames(reached)} ${reached.length === 2 ? "both" : "all"} reached 25% here, so the state counted toward the 24-state target for each of them.`
          : `Only ${reached[0]} reached 25% here.`}{" "}
        {missed.length > 0 && `${listNames(missed)} fell short of the line.`}
      </p>
      <p>
        About {s.turnoutApprox}% of registered voters cast a ballot for one of the four leading candidates, against a
        national turnout of {TURNOUT_2023_PCT}%.
      </p>

      <h2>What it means for 2027</h2>
      <p>
        The three leading 2027 tickets all have a 2023 baseline here. As a rough starting point:
      </p>
      <ul className="tight-list">
        {baseline.map((b) => (
          <li key={b.label}>
            {b.label}: {b.value.toFixed(1)}%, {b.note}
          </li>
        ))}
      </ul>
      <p>
        {above.length > 0
          ? `On those numbers, ${listNames(above)} ${above.length > 1 ? "start" : "starts"} above the 25% line in ${
              name === "The FCT" ? "the FCT" : name
            }.`
          : "On those numbers, no ticket starts above the 25% line here."}{" "}
        {near.length > 0 &&
          `${capitalise(listNames(near))} ${near.length > 1 ? "are" : "is"} within ten points of it, which makes ${
            name === "The FCT" ? "the FCT a unit" : `${name} a state`
          } to watch for the 24-state count.`}
      </p>
      <p>
        These are 2023 figures, not a forecast. Party switches, new running mates, new voters and turnout will all move
        the numbers. Build your own version on the map and see how {name === "The FCT" ? "the FCT" : name} changes the
        national picture.
      </p>

      <h2>Other states in the {s.zoneName}</h2>
      <p className="chip-links">
        {neighbours.map((n) => (
          <Link key={n.code} href={`/states/${n.slug}`}>
            {n.code === "FC" ? "FCT" : n.name}
          </Link>
        ))}
      </p>
      <p>
        See <Link href="/2023-election-results">all 37 results</Link> or read about every{" "}
        <Link href="/paths-to-victory">path to victory in 2027</Link>.
      </p>
    </ContentPage>
  );
}
