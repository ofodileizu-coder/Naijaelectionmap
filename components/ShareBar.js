"use client";
import { useState } from "react";
import { encodeScenario, captionFor } from "../lib/share";

export default function ShareBar({ data, turnoutPct, status, captureRef }) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const canShare = typeof navigator !== "undefined" && !!navigator.share;

  const buildLink = () => {
    const code = encodeScenario(data, turnoutPct);
    const url = new URL(window.location.href);
    url.search = `?s=${code}`;
    return url.toString();
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
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(captureRef.current, { backgroundColor: "#e6ebe2", scale: 2 });
      const link = document.createElement("a");
      link.download = "my-nigeria-election-map.png";
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
      <p className="hint tight">
        TikTok doesn't accept a pre-filled link like this. Use "Copy link", then paste it into your TikTok bio or
        caption.
      </p>
    </section>
  );
}
