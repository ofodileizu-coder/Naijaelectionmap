"use client";
import { useState } from "react";
import { SOCIAL_HANDLE } from "../lib/site";

const PLATFORMS = ["Facebook", "X", "Instagram", "TikTok", "WhatsApp", "Other"];

// "Feature my map": visitors can ask for their map to be reposted with credit.
export default function FeatureForm({ code, hasMap }) {
  const [open, setOpen] = useState(false);
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState("Facebook");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState({ busy: false, done: false, error: "" });

  if (!open) {
    return (
      <button type="button" className="btn ghost feature-open" onClick={() => setOpen(true)}>
        Get your map featured on {SOCIAL_HANDLE}
      </button>
    );
  }

  if (state.done) {
    return (
      <div className="feature-box">
        <p className="feature-thanks">Thanks! Your map is in our list. If we post it, we'll credit {handle}.</p>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setState({ busy: true, done: false, error: "" });
    try {
      const res = await fetch("/api/feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code(), handle, platform, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setState({ busy: false, done: true, error: "" });
      else setState({ busy: false, done: false, error: data.error || "Something went wrong. Please try again." });
    } catch {
      setState({ busy: false, done: false, error: "No connection. Please try again." });
    }
  };

  return (
    <form className="feature-box" onSubmit={submit}>
      <h3>Get your map featured</h3>
      {!hasMap && <p className="feature-error">Colour some states first, then send your map.</p>}
      <label className="field stack">
        <span>Your name or social handle (shown when we credit you)</span>
        <input value={handle} onChange={(e) => setHandle(e.target.value)} maxLength={50} placeholder="e.g. @ChidiLagos" />
      </label>
      <label className="field stack">
        <span>Where should we tag you?</span>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          {PLATFORMS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className="check">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          I agree that electionmap.ng may repost this map with my name or handle on its website and social media.
          See the <a href="/privacy">privacy policy</a>.
        </span>
      </label>
      {state.error && <p className="feature-error">{state.error}</p>}
      <div className="zonerow">
        <button type="submit" className="btn" disabled={state.busy || !hasMap}>
          {state.busy ? "Sending..." : "Send my map"}
        </button>
        <button type="button" className="btn ghost" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
