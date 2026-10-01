import { SITE_URL } from "../lib/site";
import { STATES_2023 } from "../lib/results2023";

export default function sitemap() {
  const now = new Date();
  const main = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/paths-to-victory", priority: 0.9, changeFrequency: "weekly" },
    { path: "/2023-election-results", priority: 0.9, changeFrequency: "monthly" },
    { path: "/25-percent-rule", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.2, changeFrequency: "yearly" },
  ];
  const states = STATES_2023.map((s) => ({ path: `/states/${s.slug}`, priority: 0.7, changeFrequency: "monthly" }));
  return [...main, ...states].map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
