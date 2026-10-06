import ContentPage from "../../components/ContentPage";
import { pageMeta, CONTACT_EMAIL } from "../../lib/site";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: "How electionmap.ng collects, uses and protects information, including cookies and advertising.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ContentPage crumbs={[{ label: "Privacy policy" }]} title="Privacy policy" cta={false}>
      <p>
        This policy explains what information electionmap.ng ("we", "us") collects when you use the site, why, and the
        choices you have. We follow the Nigeria Data Protection Act 2023. If you have a question, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Using the map without an account</h2>
      <p>
        You can build, view and share maps without signing in. The map you build stays in your browser. When you share
        a map, your choices are packed into the link itself. To count how many maps are made and which results people
        predict, we also store a copy of each shared map's choices on our servers. This copy contains no name, email or
        other personal details, and we publish only totals.
      </p>

      <h2>Featured maps</h2>
      <p>
        If you use &quot;Get your map featured&quot;, we store your map, the name or social handle you type, the
        platform you choose, your consent and the time you sent it. We use this only to repost your map on our website
        and social media with credit to you. This is based on your consent, which you give by ticking the box. You can
        withdraw it at any time by emailing us, and we will delete your entry and stop using your map. These entries are
        held by our storage provider, Upstash, and kept for no longer than 12 months.
      </p>

      <h2>Accounts</h2>
      <p>
        Signing in is optional and only needed to save named predictions. Sign-in is handled by our authentication
        provider, Clerk. If you create an account, Clerk processes your email address, your name and profile picture
        if you sign in with Google, and the predictions you choose to save. We use this only to run your account. You
        can delete saved predictions at any time, and you can ask us to delete your account.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        Like most websites, our hosting provider, Vercel, records technical information when pages are requested, such
        as IP address, browser type and the pages visited. This is used to keep the site running, secure and fast.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies that are needed for sign-in to work. If we show advertising, our advertising partners will also
        use cookies, as described below. You can block or delete cookies in your browser settings; the map works
        without them, but signing in will not.
      </p>

      <h2>Advertising</h2>
      <p>
        We may show ads served by Google and other third-party vendors. These vendors, including Google, use cookies to
        serve ads based on your previous visits to this site and other sites. Google's use of advertising cookies
        enables it and its partners to serve ads to you based on those visits. You can opt out of personalised
        advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noreferrer">
          Google's Ads Settings
        </a>
        , and you can opt out of some third-party vendors' use of cookies for personalised advertising at{" "}
        <a href="https://www.aboutads.info/choices" target="_blank" rel="noreferrer">
          aboutads.info
        </a>
        . Learn more in{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">
          how Google uses information from sites that use its services
        </a>
        .
      </p>

      <h2>Who we share information with</h2>
      <p>
        We do not sell your personal information. We share it only with the service providers that run the site
        (Vercel for hosting, Clerk for accounts, and advertising partners where ads are shown), or where the law
        requires it.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to
        delete it. Email us from the address on your account and we will respond within 30 days. You can also complain
        to the Nigeria Data Protection Commission.
      </p>

      <h2>Children</h2>
      <p>The site is meant for adults and is not directed at children under 13.</p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we will update it on this page and change the date below.
      </p>
    </ContentPage>
  );
}
