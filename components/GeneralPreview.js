import { blankMapDataUri, PREVIEW_SCALE as S } from "../lib/scenarioImage";

const INK = "#10261c";
const MUTED = "#55665c";
const px = (n) => Math.round(n * S);

// Used for the homepage and any link without a map.
export default function GeneralPreview() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#e6ebe2", color: INK }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: px(600), padding: `${px(64)}px ${px(20)}px ${px(56)}px ${px(64)}px` }}>
        <div style={{ display: "flex", fontSize: px(34), fontWeight: 800 }}>
          electionmap<span style={{ color: "#1E8A4C" }}>.ng</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: px(66), fontWeight: 800, lineHeight: 1.04, letterSpacing: px(-2) }}>
            Who wins Nigeria in 2027?
          </div>
          <div style={{ display: "flex", fontSize: px(28), color: MUTED, marginTop: px(18), lineHeight: 1.3 }}>
            Colour the map. Hit 25% in 24 states. Share your prediction.
          </div>
        </div>
        <div style={{ display: "flex", alignSelf: "flex-start", background: INK, color: "#ffffff", borderRadius: px(10), padding: `${px(14)}px ${px(24)}px`, fontSize: px(26), fontWeight: 700 }}>
          Make your map, free
        </div>
      </div>
      <div style={{ display: "flex", width: px(600), height: "100%", alignItems: "center", justifyContent: "center", padding: px(24) }}>
        <img src={blankMapDataUri()} width={px(552)} height={px(450)} alt="" />
      </div>
    </div>
  );
}
