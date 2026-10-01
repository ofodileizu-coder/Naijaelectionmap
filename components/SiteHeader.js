import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NAV = [
  { href: "/", label: "Map" },
  { href: "/paths-to-victory", label: "Paths to victory" },
  { href: "/2023-election-results", label: "2023 results" },
  { href: "/25-percent-rule", label: "The 25% rule" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="electionmap.ng home">
          electionmap<span className="brand-tld">.ng</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="account">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
