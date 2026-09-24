export const metadata = { title: "Contact -- Nigeria Election Map" };

export default function ContactPage() {
  return (
    <main className="app">
      <header className="masthead">
        <h1>Contact</h1>
      </header>
      <div className="block" style={{ maxWidth: "70ch" }}>
        {/* Placeholder -- replace with a real address you check. */}
        <p>
          Questions, corrections, or feedback about Nigeria Election Map can be sent to{" "}
          <a href="mailto:hello@example.com">hello@example.com</a>.
        </p>
        <p>Replace this address with your own before sharing the site widely.</p>
      </div>
    </main>
  );
}
