import Link from "next/link";
import ContentPage from "../../components/ContentPage";
import { pageMeta, ELECTION_DATE_TEXT, TICKETS } from "../../lib/site";
import { STATES_2023, unitsOver25, statesWonBy, NATIONAL_2023 } from "../../lib/results2023";
import { THRESHOLD_PCT, REQUIRED_UNITS, TOTAL_UNITS } from "../../lib/data";

export const metadata = pageMeta({
  title: "Paths to victory: how Tinubu, Atiku or Obi can win in 2027",
  description:
    "Every route to winning Nigeria's 2027 presidential election: the 25% in 24 states rule, each candidate's base, the battleground states, and what happens in a runoff.",
  path: "/paths-to-victory",
});

function StateLinks({ states }) {
  return states.map((s, i) => (
    <span key={s.code}>
      {i > 0 && (i === states.length - 1 ? " and " : ", ")}
      <Link href={`/states/${s.slug}`}>{s.code === "FC" ? "the FCT" : s.name}</Link>
    </span>
  ));
}

export default function PathsPage() {
  const over25 = unitsOver25();
  const apcWon = statesWonBy("APC");
  const pdpWon = statesWonBy("PDP");
  const lpWon = statesWonBy("LP");
  const battlegrounds = STATES_2023.filter((s) => s.marginPts < 10).sort((a, b) => a.marginPts - b.marginPts);
  const combinedOver25 = STATES_2023.filter((s) => s.obiPlusKwankwaso >= THRESHOLD_PCT);
  const combinedUnder10 = STATES_2023.filter((s) => s.obiPlusKwankwaso < 10);
  const pct = (id) => NATIONAL_2023.find((n) => n.id === id).pct;

  return (
    <ContentPage
      crumbs={[{ label: "Paths to victory" }]}
      title="Paths to victory: how a candidate wins Nigeria's 2027 election"
      intro={`Nigeria votes for president on ${ELECTION_DATE_TEXT}. Winning takes more than the most votes. Here is how the rule works, where each leading candidate starts from, and the states that will decide it.`}
    >
      <h2>The two tests every winner must pass</h2>
      <p>
        Under Section 134 of the 1999 Constitution, a candidate is elected in the first round only if they pass two
        tests at the same time:
      </p>
      <ol>
        <li>They win the most votes in the country.</li>
        <li>
          They win at least {THRESHOLD_PCT}% of the vote in at least {REQUIRED_UNITS} of the {TOTAL_UNITS} units: the 36
          states and the Federal Capital Territory.
        </li>
      </ol>
      <p>
        The second test is what makes Nigerian elections different. A candidate with a huge vote in one region but
        little support elsewhere cannot win outright, however large their total. Our{" "}
        <Link href="/25-percent-rule">guide to the 25% rule</Link> explains it in detail.
      </p>
      <p>
        In 2023, Bola Tinubu reached 25% in {over25.APC} units by our count, Atiku Abubakar in {over25.PDP}, and Peter
        Obi in {over25.LP}. Only Tinubu cleared {REQUIRED_UNITS}, and he also led the national vote with {pct("APC")}%,
        so he won in the first round.
      </p>

      <h2>The 2027 field</h2>
      <p>
        INEC's final list has 18 presidential candidates. Three tickets lead the race, and two of them have changed
        shape since 2023:
      </p>
      <ul>
        {TICKETS.map((t) => (
          <li key={t.party}>
            <strong>
              {t.candidate} ({t.party})
            </strong>
            , {t.partyName}, with {t.runningMate} as running mate.
          </li>
        ))}
      </ul>
      <p>
        Atiku ran for the PDP in 2023 and now runs for the ADC. Obi ran for the Labour Party in 2023 and now leads the
        NDC, with Rabiu Kwankwaso, who won Kano for the NNPP in 2023, as his running mate. That makes the 2023 state
        results a useful starting point, but only a starting point: voters do not move as blocs when politicians change
        parties.
      </p>

      <h2>Tinubu's path (APC)</h2>
      <p>
        Tinubu starts with the widest spread of support. In 2023 he won <StateLinks states={apcWon} />, and he crossed
        25% in more units than anyone else. His strongest ground is the South West, much of the North Central and
        parts of the North West.
      </p>
      <p>
        His challenge is the first test, not the second. He won in 2023 with {pct("APC")}% because the opposition vote
        was split three ways. The question for 2027 is whether he can still lead the national count if opposition
        voters concentrate behind one challenger in more states.
      </p>

      <h2>Atiku's path (ADC)</h2>
      <p>
        Atiku's base is in the North. In 2023 he won <StateLinks states={pdpWon} />, many of them in the North East and
        North West. He reached 25% in {over25.PDP} units, three short of {REQUIRED_UNITS}.
      </p>
      <p>
        To win, he needs to hold that northern base on a new party platform and push past 25% in at least three more
        states, most likely in the South South and South West. Choosing Rotimi Amaechi, a former governor of Rivers
        State, as running mate is aimed at exactly that gap.
      </p>

      <h2>Obi's path (NDC)</h2>
      <p>
        Obi's 2023 base was the South East, the South South, the FCT and the Middle Belt. He won{" "}
        <StateLinks states={lpWon} />, and reached 25% in {over25.LP} units.
      </p>
      <p>
        Adding Kwankwaso to the ticket changes the arithmetic on paper. If you add their 2023 votes together, the pair
        reached 25% in {combinedOver25.length} units, including Kano and Kaduna. But in {combinedUnder10.length} units
        their combined 2023 share was under 10%, among them <StateLinks states={combinedUnder10.slice(0, 6)} />. Obi's
        route to {REQUIRED_UNITS} runs through the states in between: lifting his vote to a quarter across the North
        Central and North West while holding his southern base.
      </p>

      <h2>The battleground states</h2>
      <p>
        These states were decided by fewer than 10 percentage points in 2023 (shares of the four leading candidates'
        votes). Small swings here change who wins them, and often who crosses 25%:
      </p>
      <ul className="tight-list">
        {battlegrounds.map((s) => (
          <li key={s.code}>
            <Link href={`/states/${s.slug}`}>{s.title}</Link>: {s.winner.name} led {s.runnerUp.name} by {s.marginPts}{" "}
            points
          </li>
        ))}
      </ul>
      <p>
        Lagos matters more than any other. It has the most registered voters in the country, and it was decided by
        less than one point in 2023.
      </p>

      <h2>If nobody wins in the first round</h2>
      <p>
        If no candidate passes both tests, the Constitution requires a second election. It is held between the
        candidate with the most votes and the candidate who won a majority of votes in the highest number of states
        among the rest. The runoff winner still has to meet the same two tests. If the runoff also fails to produce a
        winner, a further election is decided by a simple majority of votes.
      </p>
      <p>
        Nigeria has never held a presidential runoff. With three strong tickets dividing the vote, 2027 could be the
        first, and you can test that on the map: fill the states so that no candidate reaches {REQUIRED_UNITS}, and the
        verdict will tell you who would face whom.
      </p>

      <h2>Reading these numbers carefully</h2>
      <p>
        Every figure on this page comes from the 2023 results, which are history, not a forecast. Turnout in 2023 was
        about 27%, new voters have registered since, and candidates' coalitions have changed. Treat 2023 as the map you
        start from, then use your own judgement about what has moved.
      </p>
    </ContentPage>
  );
}
