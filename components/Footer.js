import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-cols">
          <div>
            <p className="footer-brand">electionmap.ng</p>
            <p className="footer-credit">
              An independent tool for exploring Nigeria's presidential election, state by state. Not affiliated with
              INEC, any political party or any candidate.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Explore">
            <Link href="/">Election map</Link>
            <Link href="/paths-to-victory">Paths to victory</Link>
            <Link href="/2023-election-results">2023 results by state</Link>
            <Link href="/25-percent-rule">The 25% in 24 states rule</Link>
          </nav>
          <nav className="footer-nav" aria-label="Site">
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </nav>
        </div>
        <p className="footer-credit">
          © {year} electionmap.ng. State boundaries:{" "}
          <a href="https://www.geoboundaries.org" target="_blank" rel="noreferrer">
            geoBoundaries
          </a>
          , CC BY 4.0, simplified. Registered voters and 2023 results: INEC.
        </p>
      </div>
    </footer>
  );
}
