import Link from "next/link";
import ContentPage from "../../components/ContentPage";
import { pageMeta } from "../../lib/site";

export const metadata = pageMeta({
  title: "Disclaimer",
  description: "electionmap.ng is independent and unofficial. Maps on this site are user-made predictions, not results or polls.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <ContentPage crumbs={[{ label: "Disclaimer" }]} title="Disclaimer" cta={false}>
      <h2>Not official</h2>
      <p>
        electionmap.ng is an independent website. It is not run by, connected to, or endorsed by the Independent
        National Electoral Commission (INEC), any political party, any candidate, or any government body. Official
        election results are published only by INEC.
      </p>

      <h2>Predictions are opinions</h2>
      <p>
        Every map on this site, including shared links and downloaded images, is a scenario built by a user. It shows
        what that person thinks might happen. It is not a result, a poll, or a forecast by electionmap.ng.
      </p>

      <h2>Past results</h2>
      <p>
        Figures from past elections are drawn from INEC's declared results as published by reputable news sources. Our
        state percentages count the four leading candidates only, so they differ slightly from INEC's official
        percentages; the <Link href="/2023-election-results">2023 results page</Link> explains this. If you find an
        error, please <Link href="/contact">tell us</Link>.
      </p>

      <h2>Neutrality</h2>
      <p>
        The site does not support any party or candidate. Its tools work the same way for everyone, and our written
        guides describe every leading candidate's position using the same data.
      </p>
    </ContentPage>
  );
}
