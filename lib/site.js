// Site-wide settings used by metadata, the sitemap and the content pages.
export const SITE_URL = "https://www.electionmap.ng";
export const SITE_NAME = "electionmap.ng";
export const CONTACT_EMAIL = "support@electionmap.ng";

// Presidential and National Assembly elections (INEC timetable, Electoral Act 2026).
export const ELECTION_DATE_TEXT = "16 January 2027";

// The 2027 tickets of the three leading candidates (INEC final list, September 2026).
export const TICKETS = [
  { party: "APC", partyName: "All Progressives Congress", candidate: "Bola Tinubu", runningMate: "Kashim Shettima" },
  { party: "ADC", partyName: "African Democratic Congress", candidate: "Atiku Abubakar", runningMate: "Rotimi Amaechi" },
  { party: "NDC", partyName: "Nigeria Democratic Congress", candidate: "Peter Obi", runningMate: "Rabiu Kwankwaso" },
];

// Shown at the bottom of every content page.
export const LAST_UPDATED = "1 October 2026";

// Per-page metadata: its own title, description, canonical URL and share preview.
export function pageMeta({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "article", siteName: SITE_NAME, locale: "en_NG", url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
