import Link from "next/link";
import MapApp from "../components/MapApp";
import { ELECTION_DATE_TEXT, SITE_NAME } from "../lib/site";
import { resultsFromCode, headlineFor } from "../lib/scenarioImage";

// A shared link (/?s=CODE) gets its own title and a preview picture of that
// person's map, so Facebook, WhatsApp and X show their actual prediction.
export function generateMetadata({ searchParams }) {
  const base = { alternates: { canonical: "/" } };
  const code = typeof searchParams?.s === "string" ? searchParams.s : null;
  const results = resultsFromCode(code);
  if (!results) return base;

  const title = `My prediction: ${headlineFor(results.status)}`;
  const description = "Do you agree? Build your own Nigeria 2027 election map at electionmap.ng and share it.";
  const image = { url: `/og?s=${encodeURIComponent(code)}`, width: 1800, height: 945, alt: title };
  return {
    ...base,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_NG",
      url: `/?s=${encodeURIComponent(code)}`,
      title,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
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
