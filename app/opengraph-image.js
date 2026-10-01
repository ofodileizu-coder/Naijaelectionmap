import { ImageResponse } from "next/og";

// The preview image shown when the site is shared on WhatsApp, X or Facebook.
export const alt = "electionmap.ng: predict Nigeria's 2027 presidential election";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const bars = [
    { c: "#1F5FBF", w: 360 },
    { c: "#C0392B", w: 290 },
    { c: "#1E8A4C", w: 330 },
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#e6ebe2",
          color: "#10261c",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          electionmap<span style={{ color: "#1E8A4C" }}>.ng</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Who wins Nigeria in 2027?
          </div>
          <div style={{ fontSize: 34, marginTop: 20, color: "#55665c" }}>
            Build your map. Hit 25% in 24 states. Share your prediction.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {bars.map((b) => (
            <div key={b.c} style={{ display: "flex", height: 22, width: b.w * 2, background: b.c, borderRadius: 4 }} />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
