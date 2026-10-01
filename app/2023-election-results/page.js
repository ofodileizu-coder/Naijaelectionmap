import Link from "next/link";
import ContentPage from "../../components/ContentPage";
import ResultBars from "../../components/ResultBars";
import { pageMeta } from "../../lib/site";
import { STATES_2023, NATIONAL_2023, CANDIDATES_2023, TURNOUT_2023_PCT } from "../../lib/results2023";
import { ZONES } from "../../lib/data";

export const metadata = pageMeta({
  title: "2023 presidential election results by state",
  description:
    "Nigeria's 2023 presidential election results for all 36 states and the FCT: votes and shares for Tinubu, Atiku, Obi and Kwankwaso, winners, margins and the 25% threshold.",
  path: "/2023-election-results",
});

export default function Results2023Page() {
  const national = NATIONAL_2023.map((n) => ({ ...n, ...CANDIDATES_2023[n.id] }));
  const zones = Object.entries(ZONES);

  return (
    <ContentPage
      crumbs={[{ label: "2023 results" }]}
      title="2023 presidential election results by state"
      intro="The official result of Nigeria's 25 February 2023 presidential election, nationally and in each of the 36 states and the FCT."
    >
      <h2>National result</h2>
      <ResultBars
        rows={national}
        caption={`Official national shares declared by INEC. Turnout was ${TURNOUT_2023_PCT}% of 93,469,008 registered voters. The vertical line marks 25%.`}
      />
      <p>
        Bola Tinubu of the APC was declared winner. Tinubu, Atiku Abubakar and Peter Obi each won 12 of the 37 units,
        and Rabiu Kwankwaso won Kano. Tinubu was the only candidate to win the most votes and reach 25% in at least 24
        units.
      </p>

      <h2>Results in every state</h2>
      <p>
        Shares below are each candidate's share of the votes for the four leading candidates, so they run slightly
        above INEC's official percentages, which also count 14 smaller parties. The winner and the order are the same.
        Select a state for its full breakdown.
      </p>
      {zones.map(([code, zoneName]) => (
        <section key={code}>
          <h3>{zoneName}</h3>
          <div className="table-wrap">
            <table className="results-table">
              <thead>
                <tr>
                  <th scope="col">State</th>
                  <th scope="col">Winner</th>
                  <th scope="col">Runner-up</th>
                  <th scope="col">Margin</th>
                </tr>
              </thead>
              <tbody>
                {STATES_2023.filter((s) => s.zone === code).map((s) => (
                  <tr key={s.code}>
                    <th scope="row">
                      <Link href={`/states/${s.slug}`}>{s.code === "FC" ? "FCT" : s.name}</Link>
                    </th>
                    <td>
                      <span className="swatch" style={{ background: s.winner.color }} aria-hidden="true" />
                      {s.winner.party} {s.winner.pct.toFixed(1)}%
                    </td>
                    <td>
                      {s.runnerUp.party} {s.runnerUp.pct.toFixed(1)}%
                    </td>
                    <td>{s.marginPts.toFixed(1)} pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <h2>Sources</h2>
      <p>
        State totals are the figures announced by INEC's state collation officers and published by Legit.ng on 25 April
        2023. One published figure, Peter Obi's vote in Ondo, appeared as 4,405; we use 44,405, which matches his
        official 8.59% share there. For official figures to the decimal, see INEC's Result Viewing Portal (IReV).
      </p>
    </ContentPage>
  );
}
