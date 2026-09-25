"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UNITS, REGISTERED_VOTERS, DEFAULT_TURNOUT_PCT, DEFAULT_WEIGHTS } from "../lib/data";
import {
  emptyState,
  computeResults,
  withShare,
  quickShares,
  randomScenario,
  votesCast,
  setLandslide,
} from "../lib/engine";
import { decodeScenario } from "../lib/share";
import NigeriaMap from "../components/NigeriaMap";
import Ranking from "../components/Ranking";
import Verdict from "../components/Verdict";
import StatePanel from "../components/StatePanel";
import Tools from "../components/Tools";
import ShareBar from "../components/ShareBar";
import SaveBar from "../components/SaveBar";
import PaintTool from "../components/PaintTool";

const KEY = "naija-election-map:v3";
const blank = (entry) => ({ ...entry, shares: Object.fromEntries(Object.keys(entry.shares).map((k) => [k, 0])) });

function PageInner() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(emptyState);
  const [turnoutPct, setTurnoutPct] = useState(DEFAULT_TURNOUT_PCT);
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [selected, setSelected] = useState("LA");
  const [paint, setPaint] = useState(null);
  const [view, setView] = useState("leader");
  const [ready, setReady] = useState(false);
  const captureRef = useRef(null);

  // A shared link (?s=...) always wins over anything saved locally.
  useEffect(() => {
    const shared = searchParams.get("s");
    const fromLink = shared ? decodeScenario(shared) : null;
    if (fromLink) {
      setData(fromLink.data);
      setTurnoutPct(fromLink.turnoutPct);
      setReady(true);
      return;
    }
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.data) setData({ ...emptyState(), ...saved.data });
        if (saved.turnoutPct) setTurnoutPct(saved.turnoutPct);
        if (saved.weights) setWeights({ ...DEFAULT_WEIGHTS, ...saved.weights });
      }
    } catch {}
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify({ data, turnoutPct, weights }));
  }, [data, turnoutPct, weights, ready]);

  const results = useMemo(() => computeResults(data, turnoutPct), [data, turnoutPct]);
  const unit = UNITS.find((u) => u.code === selected);
  const entry = data[selected];

  const patch = (code, fn) => setData((d) => ({ ...d, [code]: fn(d[code]) }));

  const selectOrPaint = (code) => {
    setSelected(code);
    if (paint) {
      patch(code, (e) => (paint.pct === 25 ? withShare(e, paint.partyId, 25) : setLandslide(e, paint.partyId, paint.pct)));
    }
  };

  return (
    <main className="app">
      <header className="masthead">
        <h1>Nigeria Election Map</h1>
        <p>
          To win in the first round a candidate needs the most votes and at least 25% in 24 of the 37 units
          (36 states and the FCT). Votes are weighted by each state's registered voters (INEC, 2023).
        </p>
        <Verdict status={results.status} />
      </header>

      {/* The main way to build a scenario: pick a party + share, then tap states below. */}
      <PaintTool armed={paint} onArm={setPaint} />

      {/* Everything you need for one simulation, in view together. */}
      <div className="cockpit">
        <div className="col-map" ref={captureRef}>
          <NigeriaMap results={results} selected={selected} onSelect={selectOrPaint} view={view} />
        </div>

        <div className="col-editor">
          <StatePanel
            unit={unit}
            entry={entry}
            registered={REGISTERED_VOTERS[selected]}
            votes={votesCast(selected, entry, turnoutPct)}
            nationalPct={turnoutPct}
            onShare={(pid, v) => patch(selected, (e) => withShare(e, pid, v))}
            onTurnoutPct={(v) => patch(selected, (e) => ({ ...e, turnoutPct: v }))}
            onQuick={(pid) => patch(selected, (e) => ({ ...e, shares: quickShares(pid) }))}
            onClear={() => patch(selected, blank)}
          />
        </div>
      </div>

      <Ranking results={results} view={view} onView={setView} />

      {/* Secondary tools -- share, save, scenario builders. Scroll for these. */}
      <div className="extras">
        <ShareBar data={data} turnoutPct={turnoutPct} status={results.status} captureRef={captureRef} />
        <SaveBar
          data={data}
          turnoutPct={turnoutPct}
          onLoad={(decoded) => {
            setData(decoded.data);
            setTurnoutPct(decoded.turnoutPct);
          }}
        />
        <Tools
          turnoutPct={turnoutPct}
          onTurnoutPct={setTurnoutPct}
          weights={weights}
          onWeights={setWeights}
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
              const scenario = randomScenario(weights);
              const next = { ...d };
              UNITS.forEach((u) => (next[u.code] = { ...d[u.code], shares: scenario[u.code] }));
              return next;
            })
          }
          onReset={() => setData(emptyState())}
        />
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageInner />
    </Suspense>
  );
}
