import Link from "next/link";
import ContentPage from "../../components/ContentPage";
import { pageMeta } from "../../lib/site";
import { unitsOver25 } from "../../lib/results2023";

export const metadata = pageMeta({
  title: "The 25% in 24 states rule, explained",
  description:
    "How Nigeria's presidential election is won: the most votes plus 25% in two-thirds of the 36 states and the FCT. What the rule means, how the FCT counts, and when there is a runoff.",
  path: "/25-percent-rule",
});

const FAQ = [
  {
    q: "What is the 25% in 24 states rule?",
    a: "To be elected president in the first round, a candidate must win the most votes nationally and at least 25% of the votes cast in at least two-thirds of the 36 states and the FCT. Two-thirds of 37 is 24.67, which in practice means 24 states and the FCT counted together as units.",
  },
  {
    q: "Does the FCT count as a state for the 25% rule?",
    a: "For the purpose of this rule, the FCT is treated like a state, so there are 37 units in total. In 2023 there was a court argument that a winner must also get 25% in the FCT itself. The Presidential Election Petition Court rejected that argument, treating the FCT as one of the 37 units rather than a separate requirement, and the Supreme Court upheld Tinubu's election on appeal.",
  },
  {
    q: "What happens if no candidate meets the rule?",
    a: "The Constitution requires a second election between the candidate with the most votes and the candidate who won a majority of votes in the highest number of states among the rest. The winner of that runoff must still meet the same spread requirement. If no one does, a further election is decided by a simple majority.",
  },
  {
    q: "Has Nigeria ever had a presidential runoff?",
    a: "No. Every presidential election since 1999 has been decided in the first round.",
  },
  {
    q: "Is 25% measured against registered voters or votes cast?",
    a: "Votes cast. A candidate needs a quarter of the valid votes in a state, not a quarter of everyone registered there, so turnout does not change the 25% line itself.",
  },
];

export default function RulePage() {
  const over25 = unitsOver25();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <ContentPage
      crumbs={[{ label: "The 25% rule" }]}
      title="The 25% in 24 states rule, explained"
      intro="Nigeria's president is not chosen by the national vote alone. A winner also needs a quarter of the vote across most of the country. Here is how that works."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <h2>What the Constitution says</h2>
      <p>
        Section 134(2) of the 1999 Constitution says a candidate is duly elected president when there are more than two
        candidates and they have the highest number of votes cast, plus not less than one quarter of the votes cast in
        each of at least two-thirds of all the states and the Federal Capital Territory.
      </p>
      <p>
        Nigeria has 36 states and the FCT, so 37 units. Two-thirds of 37 is 24.67. Because a candidate cannot win a
        fraction of a state, the working target is 24 of the 37 units. That is the number the map on this site uses.
      </p>

      <h2>Why the rule exists</h2>
      <p>
        The rule was written so that a president cannot be elected by one region alone. A candidate whose support is
        concentrated in a few large states could win the most votes but still lack a mandate across the country.
        Requiring a quarter of the vote in two-thirds of the units forces every serious candidate to campaign well
        beyond their home base.
      </p>

      <h2>How it played out in 2023</h2>
      <p>
        Counting the four leading candidates' votes, Bola Tinubu reached 25% in {over25.APC} units, Atiku Abubakar in{" "}
        {over25.PDP}, Peter Obi in {over25.LP} and Rabiu Kwankwaso in {over25.NNPP}. Tinubu was the only candidate to
        pass both tests. You can see every state's numbers on our{" "}
        <Link href="/2023-election-results">2023 results page</Link>.
      </p>

      <h2>How to read the rule on the map</h2>
      <p>
        On the <Link href="/">election map</Link>, each state shows who leads and by how much. The threshold strips under
        the national result count how many units each candidate has reached 25% in, with a mark at 24. Small dots on a
        state show any candidate who crosses 25% there without winning it, because those states count toward the
        target too. A candidate can lose a state and still bank it for the 25% rule.
      </p>

      <h2>Common questions</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </ContentPage>
  );
}
