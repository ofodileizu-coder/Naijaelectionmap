import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: "Nigeria Election Map",
  description:
    "Build a presidential result state by state and see whether a candidate reaches 25% in 24 of the 37 states and the FCT.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
