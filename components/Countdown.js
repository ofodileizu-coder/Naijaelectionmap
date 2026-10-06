"use client";
import { useEffect, useState } from "react";
import { PARTIES } from "../lib/data";
import { ELECTION_DATE_TEXT, ELECTION_START_ISO, TICKETS } from "../lib/site";
import MapCounter from "./MapCounter";

const START = new Date(ELECTION_START_ISO).getTime();
const colorOf = (id) => PARTIES.find((p) => p.id === id)?.color || "#7D857F";

function timeLeft(now) {
  const ms = Math.max(0, START - now);
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    mins: Math.floor(ms / 60000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

// Countdown to election day plus the main call to action:
// tap a candidate to start colouring states for them, or roll a random map.
export default function Countdown({ onPick, onRandom }) {
  const [left, setLeft] = useState(null); // null until mounted, so server and browser HTML match

  useEffect(() => {
    const tick = () => setLeft(timeLeft(Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const unit = (value, label) => (
    <div className="cd-unit">
      <span className="cd-num">{left ? String(value).padStart(2, "0") : "--"}</span>
      <span className="cd-label">{label}</span>
    </div>
  );

  return (
    <section className="countdown" aria-label="Countdown to election day">
      <div className="cd-clock">
        <p className="cd-kicker">
          {left?.done ? "Nigeria is voting today" : `Nigeria votes on ${ELECTION_DATE_TEXT}`}
        </p>
        {!left?.done && (
          <div className="cd-units" role="timer" aria-live="off">
            {unit(left?.days ?? 0, "days")}
            {unit(left?.hours ?? 0, "hours")}
            {unit(left?.mins ?? 0, "mins")}
            {unit(left?.secs ?? 0, "secs")}
          </div>
        )}
        <MapCounter />
      </div>

      <div className="cd-cta">
        <h2 className="cd-title">Who wins the next election? You decide.</h2>
        <p className="cd-sub">Tap a candidate, then tap the states you think they'll win.</p>
        <div className="cd-picks">
          {TICKETS.map((t) => (
            <button key={t.party} type="button" className="cd-pick" onClick={() => onPick(t.party)}>
              <span className="cd-dot" style={{ background: colorOf(t.party) }} aria-hidden="true" />
              <span className="cd-name">{t.fullName}</span>
              <span className="cd-party">{t.party}</span>
            </button>
          ))}
        </div>
        <div className="cd-actions">
          <a className="btn cd-main" href="#build">Make my prediction</a>
          <button type="button" className="btn ghost cd-random" onClick={onRandom}>
            Surprise me: random map
          </button>
        </div>
      </div>
    </section>
  );
}
