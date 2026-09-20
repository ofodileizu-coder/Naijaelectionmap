# Nigeria Election Map

An interactive presidential election simulator for Nigeria's 36 states and the FCT.
Its main feature is a live constitutional threshold meter: a candidate wins in the first round
only with the most votes AND at least 25% in 24 of the 37 units.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy on Vercel (free)

1. Push this folder to a GitHub repository.
2. On vercel.com choose "Add New Project", import the repo, and click Deploy.
   No environment variables are needed.

## Where things live

| File | What it does |
| --- | --- |
| `lib/data.js` | Parties, colours, the 37 units, map positions, default turnout |
| `lib/engine.js` | The maths: national totals, 25% counts, first-round winner or runoff |
| `components/TileMap.js` | The map (one tile per state) |
| `components/Ranking.js` | National result and the 24-of-37 threshold strips |
| `components/StatePanel.js` | Edit one state's votes cast and party shares |
| `components/Tools.js` | Zone-wide scenarios, random scenario, reset |

## Common changes

- Add or rename a party: edit `PARTIES` in `lib/data.js`.
- Real turnout: fill `TURNOUT_OVERRIDES` in `lib/data.js` (e.g. `LA: 2500000`).
- Real map shapes: keep the engine as is and replace `TileMap.js` with a component that draws
  GeoJSON paths, using the same `results.units[code]` data to colour each state.
