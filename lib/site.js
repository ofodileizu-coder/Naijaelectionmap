// Site-wide settings used by metadata, the sitemap and the content pages.
export const SITE_URL = "https://www.electionmap.ng";
export const SITE_NAME = "electionmap.ng";
export const CONTACT_EMAIL = "support@electionmap.ng";
// Social handle and hashtag shown next to the share buttons. Change these if your page uses a different name.
export const SOCIAL_HANDLE = "@electionmapng";
export const HASHTAG = "#MyElectionMap";

// Presidential and National Assembly elections (INEC timetable, Electoral Act 2026).
export const ELECTION_DATE_TEXT = "16 January 2027";
// Polls open at 8:30 a.m. West Africa Time.
export const ELECTION_START_ISO = "2027-01-16T08:30:00+01:00";

// The 2027 tickets of the three leading candidates (INEC final list, September 2026).
export const TICKETS = [
  { party: "APC", partyName: "All Progressives Congress", candidate: "Bola Tinubu", fullName: "Bola Ahmed Tinubu", runningMate: "Kashim Shettima" },
  { party: "ADC", partyName: "African Democratic Congress", candidate: "Atiku Abubakar", fullName: "Atiku Abubakar", runningMate: "Rotimi Amaechi" },
  { party: "NDC", partyName: "Nigeria Democratic Congress", candidate: "Peter Obi", fullName: "Peter Obi", runningMate: "Rabiu Kwankwaso" },
];

// Shown at the bottom of every content page.
export const LAST_UPDATED = "6 October 2026";

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
