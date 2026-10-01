import Link from "next/link";
import ContentPage from "../../components/ContentPage";
import { pageMeta, CONTACT_EMAIL } from "../../lib/site";

export const metadata = pageMeta({
  title: "Terms of use",
  description: "The terms for using electionmap.ng, its election map, and the predictions you create and share.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ContentPage crumbs={[{ label: "Terms of use" }]} title="Terms of use" cta={false}>
      <p>By using electionmap.ng you agree to these terms. If you do not agree, please do not use the site.</p>

      <h2>What the site is</h2>
      <p>
        electionmap.ng is a free tool for building and sharing election scenarios. Maps made here are the opinions and
        guesses of the people who make them. They are not official results, polls or forecasts. See our{" "}
        <Link href="/disclaimer">disclaimer</Link>.
      </p>

      <h2>Your predictions</h2>
      <p>
        You own the maps you create, and you are responsible for how you share them. Do not present a map from this
        site as an official INEC result, a real poll, or the view of any candidate or party. Do not use it to mislead
        voters, for example by sharing a made-up map as real results on election day.
      </p>

      <h2>Accounts</h2>
      <p>
        If you create an account, keep your sign-in details safe. We may suspend accounts used to abuse the site or
        break these terms.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not try to break, overload or reverse-engineer the site, scrape it at scale, or use it for anything unlawful.
      </p>

      <h2>Content and data</h2>
      <p>
        The site's design, text and code belong to electionmap.ng. Official election figures belong to INEC and are
        used for public information. State boundaries are from geoBoundaries under the CC BY 4.0 licence. You may quote
        and link to our pages; please credit electionmap.ng.
      </p>

      <h2>No warranty</h2>
      <p>
        We work to keep figures accurate but provide the site as it is, without guarantees. We are not liable for
        decisions made using it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date below shows the latest version. Questions:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </ContentPage>
  );
}
