"use client";
import { useState } from "react";
import FeatureForm from "./FeatureForm";
import { SOCIAL_HANDLE, HASHTAG } from "../lib/site";
import { encodeScenario, captionFor } from "../lib/share";

function shortVerdict(status) {
  if (status?.kind === "elected") return `My prediction: ${status.top.id} wins round one`;
  if (status?.kind === "runoff") return `My prediction: ${status.top.id} vs ${status.opponent.id} runoff`;
  return "";
}

// Adds a branded strip under the captured map so every shared image carries the site address.
function brandImage(shot, caption) {
  const w = shot.width;
  const band = Math.max(110, Math.round(w * 0.11));
  const out = document.createElement("canvas");
  out.width = w;
  out.height = shot.height + band;
  const ctx = out.getContext("2d");
  ctx.fillStyle = "#e6ebe2";
  ctx.fillRect(0, 0, w, out.height);
  ctx.drawImage(shot, 0, 0);
  ctx.fillStyle = "#10261c";
  ctx.fillRect(0, shot.height, w, band);

  const font = (typeof document !== "undefined" && getComputedStyle(document.body).fontFamily) || "system-ui, sans-serif";
  const pad = Math.round(band * 0.32);
  const big = Math.round(band * 0.33);
  const small = Math.round(band * 0.15);
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = "#ffffff";
  ctx.font = `700 ${big}px ${font}`;
  ctx.fillText("electionmap.ng", pad, shot.height + band * 0.5);

  ctx.fillStyle = "#c9d6cd";
  ctx.font = `400 ${small}px ${font}`;
  ctx.fillText("Make your own 2027 prediction, free", pad, shot.height + band * 0.8);

  if (caption) {
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${big}px ${font}`;
    const leftW = ctx.measureText("electionmap.ng").width;
    const room = w - leftW - pad * 3;
    let size = Math.round(band * 0.24);
    ctx.font = `700 ${size}px ${font}`;
    while (ctx.measureText(caption).width > room && size > 12) {
      size -= 1;
      ctx.font = `700 ${size}px ${font}`;
    }
    if (ctx.measureText(caption).width <= room) {
      ctx.fillText(caption, w - pad, shot.height + band * 0.5 + size * 0.1);
    }
    ctx.textAlign = "left";
  }
  return out;
}

// Anonymous count of maps shared (fire-and-forget; never blocks the share itself).
function track(code) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export default function ShareBar({ data, turnoutPct, status, captureRef }) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  const buildLink = () => {
    const code = encodeScenario(data, turnoutPct);
    track(code);
    // Short /p/ links carry their own preview picture on Facebook, WhatsApp and X.
    return `${window.location.origin}/p/${code}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildLink());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Nigeria Election Map", text: captionFor(status), url: buildLink() });
    } catch {}
  };

  const openIntent = (kind) => {
    const url = buildLink();
    const text = captionFor(status);
    const targets = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };
    window.open(targets[kind], "_blank", "noopener,noreferrer,width=600,height=500");
  };

  const downloadImage = async () => {
    if (!captureRef?.current) return;
    setBusy(true);
    track(encodeScenario(data, turnoutPct));
    try {
      const { default: html2canvas } = await import("html2canvas");
      const shot = await html2canvas(captureRef.current, { backgroundColor: "#e6ebe2", scale: 2 });
      const canvas = brandImage(shot, shortVerdict(status));
      const link = document.createElement("a");
      link.download = "electionmap-ng-2027-prediction.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {}
    setBusy(false);
  };

  return (
    <section className="block" aria-label="Share your prediction">
      <h2>Share your map</h2>
      <p className="hint">Anyone who opens your link sees this exact scenario, ready to tweak or share again.</p>
      <div className="zonerow">
        {canShare && (
          <button type="button" className="btn" onClick={nativeShare}>
            Share...
          </button>
        )}
        <button type="button" className="btn" onClick={() => openIntent("x")}>
          Share to X
        </button>
        <button type="button" className="btn" onClick={() => openIntent("facebook")}>
          Share to Facebook
        </button>
        <button type="button" className="btn" onClick={() => openIntent("whatsapp")}>
          Share to WhatsApp
        </button>
      </div>
      <div className="zonerow">
        <button type="button" className="btn ghost" onClick={copyLink}>
          {copied ? "Link copied" : "Copy link"}
        </button>
        <button type="button" className="btn ghost" onClick={downloadImage} disabled={busy}>
          {busy ? "Preparing image..." : "Download as image"}
        </button>
      </div>
      <p className="tagline">
        Tag <strong>{SOCIAL_HANDLE}</strong> or use <strong>{HASHTAG}</strong> when you post, and we may share your
        map.
      </p>
      <FeatureForm code={() => encodeScenario(data, turnoutPct)} hasMap={status?.kind !== "empty"} />
      <p className="hint tight">
        TikTok doesn't accept a pre-filled link like this. Use "Copy link", then paste it into your TikTok bio or
        caption.
      </p>
    </section>
  );
}
