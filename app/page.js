import Link from "next/link";
import MapApp from "../components/MapApp";
import { ELECTION_DATE_TEXT } from "../lib/site";
import { shareMetadata } from "../lib/shareMeta";

// Render on every request so a shared link's ?s= code reaches generateMetadata.
// (Without this, Next.js can pre-build the homepage once with the default preview.)
export const dynamic = "force-dynamic";

// A shared link (/?s=CODE) gets its own title and a preview picture of that
// person's map, so Facebook, WhatsApp and X show their actual prediction.
export function generateMetadata({ searchParams }) {
  const code = typeof searchParams?.s === "string" ? searchParams.s : null;
  const shared = code ? shareMetadata(code, `/?s=${encodeURIComponent(code)}`) : null;
  return shared ? { ...shared, robots: undefined } : { alternates: { canonical: "/" } };
}

// The map is interactive (client-side). The text below it is rendered on the
// server so search engines can read what the page is about.
export default function HomePage() {
  return (
    <>
      <MapApp />
      <section className="home-intro" aria-labelledby="home-intro-title">
        <h2 id="home-intro-title">Predict Nigeria's 2027 presidential election</h2>
        <p>
          Nigerians vote for president on {ELECTION_DATE_TEXT}. electionmap.ng lets you play out the result yourself:
          click a state, choose who wins it and by how much, and watch the national count update. The map applies the
          real constitutional rule, so a candidate only wins in the first round with the most votes nationally and at
          least 25% of the vote in 24 of the 37 states and the FCT.
        </p>
        <p>
          Votes are weighted by each state's registered voters, so Lagos and Kano count for more than Bayelsa or Ekiti.
          When you finish, share your map on WhatsApp, X or Facebook and challenge your friends to beat it.
        </p>
        <div className="intro-links">
          <Link href="/paths-to-victory">Every path to victory in 2027</Link>
          <Link href="/2023-election-results">2023 results, state by state</Link>
          <Link href="/25-percent-rule">How the 25% rule works</Link>
        </div>
      </section>
    </>
  );
}
