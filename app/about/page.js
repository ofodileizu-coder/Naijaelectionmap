import Link from "next/link";
import ContentPage from "../../components/ContentPage";
import { pageMeta, ELECTION_DATE_TEXT, CONTACT_EMAIL } from "../../lib/site";

export const metadata = pageMeta({
  title: "About us: Nigeria's election prediction and simulation map",
  description:
    "electionmap.ng is an independent tool for predicting and simulating Nigeria's presidential election and testing every path to victory, state by state.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <ContentPage
      crumbs={[{ label: "About us" }]}
      title="About electionmap.ng"
      intro="An independent, interactive map for predicting Nigeria's presidential election, simulating different outcomes, and working out every candidate's path to victory."
    >
      <h2>What this site is for</h2>
      <p>
        Every election season, Nigerians argue about who will win. Most of those arguments skip the hardest part of the
        question. Winning the most votes is not enough to become president. The Constitution also demands a spread of
        support across the country, and that rule decides elections as much as the headline vote does.
      </p>
      <p>
        electionmap.ng turns that argument into something you can see. You build a result one state at a time, and the
        map tells you, using the real rules, whether your candidate wins outright, falls short and faces a runoff, or
        loses. The presidential election is scheduled for {ELECTION_DATE_TEXT}, and the site is built to be most useful
        in the months before it and on election night itself.
      </p>

      <h2>Election prediction</h2>
      <p>
        A prediction on this site is your own call on how each state will vote. You pick a winner in Lagos, Kano,
        Rivers, Kaduna and the rest, set their margins, and the map adds everything up. Because votes are weighted by
        each state's registered voters from INEC's register, a big win in a large state counts for more than the same
        win in a small one, just as it does on the day.
      </p>
      <p>
        Your prediction is yours to share. One tap gives you a link, or an image for WhatsApp, X and Facebook, so your
        friends can open exactly the map you built and argue with it. If you sign in, you can also save named
        predictions and come back to them later.
      </p>

      <h2>Election simulation</h2>
      <p>
        Prediction asks what you think will happen. Simulation asks what could happen. The map's tools let you change
        national turnout, give one party a whole geopolitical zone, or generate a random result to see how often a
        candidate clears the bar under different conditions. Running many "what if" versions is the quickest way to
        learn which states really decide the race and which ones only look important.
      </p>

      <h2>Paths to victory</h2>
      <p>
        A path to victory is a combination of states that gets a candidate over both lines at once: the most votes
        nationally, and at least 25% of the vote in 24 of the 37 states and the FCT. Some candidates have a
        strong vote in a few regions and need to reach 25% in many more. Others are competitive almost everywhere but
        need to win the national count. Our{" "}
        <Link href="/paths-to-victory">paths to victory guide</Link> walks through each leading candidate's route, the
        states each one needs, and what happens if nobody gets there in the first round.
      </p>

      <h2>Where the numbers come from</h2>
      <ul>
        <li>
          Registered voters per state come from INEC's final register for the 2023 general election (93,469,008
          voters). We will update them when INEC publishes its final register for 2027.
        </li>
        <li>
          Past results come from INEC's official declarations for the 2023 presidential election. You can browse them on
          our <Link href="/2023-election-results">2023 results page</Link> and on a page for each state.
        </li>
        <li>State boundaries come from the geoBoundaries project (CC BY 4.0), simplified for display.</li>
      </ul>

      <h2>Independence</h2>
      <p>
        electionmap.ng is an independent project run from Nigeria. It is not affiliated with, funded by, or endorsed by
        INEC, any political party, or any candidate. Every scenario on the map is built by a user and is not an official
        result or a poll. Supporters of every party are welcome to build, share and challenge maps here.
      </p>
      <p>
        Spotted an error, or have an idea? <Link href="/contact">Get in touch</Link> or email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </ContentPage>
  );
}
