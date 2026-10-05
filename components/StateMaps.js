import { UNITS } from "../lib/data";
import { STATE_PATHS, MAP_VIEWBOX, STATE_CENTROIDS } from "../lib/geo";

// Bounding box of a state outline (paths use only absolute M/L/Z commands).
function bbox(d) {
  const nums = d.match(/-?\d+(?:\.\d+)?/g).map(Number);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    minX = Math.min(minX, nums[i]);
    maxX = Math.max(maxX, nums[i]);
    minY = Math.min(minY, nums[i + 1]);
    maxY = Math.max(maxY, nums[i + 1]);
  }
  return { minX, minY, w: maxX - minX, h: maxY - minY };
}

const GREY = "#d3dbd0";
const EDGE = "#f4f6f0";

// Two small maps for a state page: where the state is in Nigeria, and a close-up
// of the state with its neighbours, shaded in the colour of its 2023 winner.
export default function StateMaps({ code, name, color, winnerLabel }) {
  const b = bbox(STATE_PATHS[code]);
  const side = Math.max(b.w, b.h) * 2.1;
  const cx = b.minX + b.w / 2;
  const cy = b.minY + b.h / 2;
  const zoom = `${cx - side / 2} ${cy - side / 2} ${side} ${side}`;
  const labelSize = side / 18;

  return (
    <figure className="state-maps">
      <div className="state-maps-row">
        <svg viewBox={MAP_VIEWBOX} role="img" aria-label={`${name} highlighted on a map of Nigeria`}>
          {UNITS.map((u) => (
            <path key={u.code} d={STATE_PATHS[u.code]} fill={u.code === code ? color : GREY} stroke={EDGE} strokeWidth="2" />
          ))}
        </svg>
        <svg viewBox={zoom} role="img" aria-label={`Close-up map of ${name} and its neighbours`}>
          {UNITS.map((u) => (
            <path
              key={u.code}
              d={STATE_PATHS[u.code]}
              fill={u.code === code ? color : GREY}
              stroke={EDGE}
              strokeWidth={side / 260}
            />
          ))}
          {UNITS.filter((u) => u.code !== code).map((u) => {
            const [x, y] = STATE_CENTROIDS[u.code];
            return (
              <text key={u.code} x={x} y={y} fontSize={labelSize} textAnchor="middle" dominantBaseline="middle" fill="#55665c">
                {u.code === "FC" ? "FCT" : u.name}
              </text>
            );
          })}
        </svg>
      </div>
      <figcaption>
        {name} is shaded in the colour of its 2023 winner, {winnerLabel}. The close-up shows its neighbouring states.
      </figcaption>
    </figure>
  );
}
