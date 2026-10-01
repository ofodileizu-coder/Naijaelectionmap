import ContentPage from "../../components/ContentPage";
import { pageMeta, CONTACT_EMAIL } from "../../lib/site";

export const metadata = pageMeta({
  title: "Contact us",
  description: "Contact electionmap.ng with corrections, feedback, partnership or advertising enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <ContentPage crumbs={[{ label: "Contact" }]} title="Contact us" cta={false}>
      <p>
        We read every message. Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we aim to reply
        within three working days.
      </p>
      <h2>What to write to us about</h2>
      <ul>
        <li>
          <strong>Corrections.</strong> If a figure on the site does not match INEC's official records, tell us the
          state, the figure, and where you saw the correct one. We fix confirmed errors quickly.
        </li>
        <li>
          <strong>Feedback and ideas.</strong> Features you want on the map, things that confused you, or bugs on your
          phone or browser.
        </li>
        <li>
          <strong>Media and partnerships.</strong> Journalists, researchers and civic groups are welcome to use and link
          to the map. Ask us about embedding it or using it on air.
        </li>
        <li>
          <strong>Advertising and sponsorship.</strong> We accept sponsors who are not political parties, candidates or
          campaigns, so the site stays independent.
        </li>
        <li>
          <strong>Privacy requests.</strong> To see or delete data linked to your account, see our{" "}
          <a href="/privacy">privacy policy</a> and email us from the address on your account.
        </li>
      </ul>
    </ContentPage>
  );
}
