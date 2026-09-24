import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-row">
          <span>© {year} Nigeria Election Map</span>
          <nav className="footer-nav">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <p className="footer-credit">
          State boundaries: <a href="https://www.geoboundaries.org" target="_blank" rel="noreferrer">geoBoundaries</a>,
          CC BY 4.0 -- simplified, not for surveying or legal use. Registered voters: INEC (2023). This site is an
          independent simulation, not affiliated with INEC or any political party.
        </p>
      </div>
    </footer>
  );
}
