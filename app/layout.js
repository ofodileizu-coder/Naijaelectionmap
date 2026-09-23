import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="en">
        <body className={`${display.variable} ${body.variable}`}>
          <div className="topbar">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
