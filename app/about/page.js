export const metadata = { title: "About -- Nigeria Election Map" };

export default function AboutPage() {
  return (
    <main className="app">
      <header className="masthead">
        <h1>About this site</h1>
      </header>
      <div className="block" style={{ maxWidth: "70ch" }}>
        {/* Placeholder copy -- edit this to say what you want it to say. */}
        <p>
          Nigeria Election Map is an independent, unofficial tool for exploring "what if" presidential election
          scenarios under Nigeria's constitutional rule: a candidate wins in the first round only with the most
          votes nationally and at least 25% of the vote in 24 of the 37 units (36 states and the FCT).
        </p>
        <p>
          It is not affiliated with, endorsed by, or connected to INEC, any political party, or any candidate.
          Every scenario on this site is user-built and does not represent a real result, poll, or prediction.
        </p>
        <p>
          Registered voter figures come from INEC's 2023 register. State boundaries come from geoBoundaries (CC BY
          4.0). The site was built by [your name here] to make Nigeria's electoral map more accessible and easier
          to explore.
        </p>
      </div>
    </main>
  );
}
