"use client";
import { useEffect, useMemo, useState } from "react";
import { UNITS } from "../lib/data";
import { emptyState, computeResults, withShare, quickShares, randomShares } from "../lib/engine";
import TileMap from "../components/TileMap";
import Ranking from "../components/Ranking";
import Verdict from "../components/Verdict";
import StatePanel from "../components/StatePanel";
import Tools from "../components/Tools";

const KEY = "naija-election-map:v1";
const blank = (entry) => ({ ...entry, shares: Object.fromEntries(Object.keys(entry.shares).map((k) => [k, 0])) });

export default function Page() {
  const [data, setData] = useState(emptyState);
  const [selected, setSelected] = useState("LA");
  const [view, setView] = useState("leader");
  const [ready, setReady] = useState(false);

  // Load / save the scenario in the browser.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...emptyState(), ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(data));
  }, [data, ready]);

  const results = useMemo(() => computeResults(data), [data]);
  const unit = UNITS.find((u) => u.code === selected);
  const entry = data[selected];

  const patch = (code, fn) => setData((d) => ({ ...d, [code]: fn(d[code]) }));

  return (
    <main className="app">
      <header className="masthead">
        <h1>Nigeria Election Map</h1>
        <p>
          To win in the first round a candidate needs the most votes and at least 25% in 24 of the 37 units
          (36 states and the FCT).
        </p>
        <Verdict status={results.status} />
      </header>

      <div className="layout">
        <div className="col-map">
          <TileMap results={results} selected={selected} onSelect={setSelected} view={view} />
        </div>

        <div className="col-side">
          <Ranking results={results} view={view} onView={setView} />
          <StatePanel
            unit={unit}
            entry={entry}
            onShare={(pid, v) => patch(selected, (e) => withShare(e, pid, v))}
            onTurnout={(v) => patch(selected, (e) => ({ ...e, turnout: v }))}
            onQuick={(pid) => patch(selected, (e) => ({ ...e, shares: quickShares(pid) }))}
            onClear={() => patch(selected, blank)}
          />
          <Tools
            onZone={(zone, pid) =>
              setData((d) => {
                const next = { ...d };
                UNITS.filter((u) => u.zone === zone).forEach((u) => {
                  next[u.code] = { ...d[u.code], shares: quickShares(pid) };
                });
                return next;
              })
            }
            onRandom={() =>
              setData((d) => {
                const next = { ...d };
                UNITS.forEach((u) => (next[u.code] = { ...d[u.code], shares: randomShares() }));
                return next;
              })
            }
            onReset={() => setData(emptyState())}
          />
        </div>
      </div>
    </main>
  );
}
