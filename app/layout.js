import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/Footer";
import { SITE_URL, SITE_NAME } from "../lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const DESCRIPTION =
  "Predict Nigeria's 2027 presidential election state by state. Build your own map, test every path to victory under the 25% in 24 states rule, and share your prediction.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nigeria 2027 Election Map: Predict Who Wins | electionmap.ng",
    template: "%s | electionmap.ng",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_NG",
    url: "/",
    title: "Nigeria 2027 Election Map: Predict Who Wins",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigeria 2027 Election Map: Predict Who Wins",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: DESCRIPTION,
  inLanguage: "en-NG",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${display.variable} ${body.variable}`}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <SiteHeader />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

export const viewport = { themeColor: "#10261c" };
