"use client";
import { useState } from "react";
import { useUser, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { encodeScenario, decodeScenario } from "../lib/share";

const MAX_SAVED = 20;

export default function SaveBar({ data, turnoutPct, onLoad }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isLoaded) return null;

  const saved = (isSignedIn && user.unsafeMetadata?.savedPredictions) || [];

  const save = async () => {
    const label = name.trim();
    if (!label) return;
    setBusy(true);
    try {
      const code = encodeScenario(data, turnoutPct);
      const entry = { name: label.slice(0, 40), code, savedAt: Date.now() };
      const next = [entry, ...saved.filter((s) => s.name !== entry.name)].slice(0, MAX_SAVED);
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, savedPredictions: next } });
      setName("");
    } catch {}
    setBusy(false);
  };

  const remove = async (idx) => {
    const next = saved.filter((_, i) => i !== idx);
    try {
      await user.update({ unsafeMetadata: { ...user.unsafeMetadata, savedPredictions: next } });
    } catch {}
  };

  const load = (s) => {
    const decoded = decodeScenario(s.code);
    if (decoded) onLoad(decoded);
  };

  return (
    <section className="block" aria-label="Save this prediction to your account">
      <h2>Save this prediction</h2>
      <SignedOut>
        <p className="hint">
          Sign in to save predictions to your account and reload them later. Using and sharing the map never
          requires signing in.
        </p>
        <SignInButton mode="modal">
          <button type="button" className="btn">
            Sign in to save
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="zonerow">
          <input
            className="save-input"
            type="text"
            placeholder="Name this prediction"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="button" className="btn" onClick={save} disabled={busy || !name.trim()}>
            {busy ? "Saving..." : "Save"}
          </button>
        </div>
        {saved.length === 0 ? (
          <p className="hint tight">No saved predictions yet.</p>
        ) : (
          <ul className="saved-list">
            {saved.map((s, i) => (
              <li key={s.savedAt + s.name}>
                <span>{s.name}</span>
                <button type="button" className="btn small" onClick={() => load(s)}>
                  Load
                </button>
                <button type="button" className="btn small ghost" onClick={() => remove(i)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="hint tight">Saved predictions live on your account (up to {MAX_SAVED}), not on a public leaderboard.</p>
      </SignedIn>
    </section>
  );
}
