import Link from "next/link";
import { LAST_UPDATED } from "../lib/site";

// Shared frame for every written page: breadcrumb, title, intro, body, and a
// call to action that sends readers back to the map.
export default function ContentPage({ crumbs = [], title, intro, children, cta = true, updated = LAST_UPDATED }) {
  return (
    <main className="page">
      {crumbs.length > 0 && (
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true"> / </span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </span>
          ))}
        </nav>
      )}
      <h1 className="page-title">{title}</h1>
      {intro && <p className="lede">{intro}</p>}
      <article className="prose">{children}</article>
      {cta && (
        <aside className="cta">
          <p>
            <strong>Try it yourself.</strong> Fill the map state by state and see whether your candidate reaches 25%
            in 24 of the 37 units.
          </p>
          <Link href="/" className="btn">
            Open the election map
          </Link>
        </aside>
      )}
      <p className="updated">Last updated {updated}.</p>
    </main>
  );
}
