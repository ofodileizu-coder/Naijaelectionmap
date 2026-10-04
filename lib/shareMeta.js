// Builds the title and preview-picture tags for a shared map link.
import { SITE_NAME } from "./site";
import { resultsFromCode, headlineFor, PREVIEW_SIZE } from "./scenarioImage";

export function shareMetadata(code, pageUrl) {
  const results = resultsFromCode(code);
  if (!results) return null;
  const title = `My prediction: ${headlineFor(results.status)}`;
  const description = "Do you agree? Build your own Nigeria 2027 election map at electionmap.ng and share it.";
  const image = { url: `/og?s=${encodeURIComponent(code)}`, ...PREVIEW_SIZE, alt: title };
  return {
    title,
    description,
    alternates: { canonical: "/" },
    robots: { index: false, follow: true },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_NG", url: pageUrl, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
