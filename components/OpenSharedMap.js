"use client";

import { useEffect } from "react";

// Sends a visitor from a short share link to the interactive map.
export default function OpenSharedMap({ code }) {
  const target = `/?s=${encodeURIComponent(code)}`;
  useEffect(() => {
    window.location.replace(target);
  }, [target]);
  return (
    <main style={{ padding: "48px 20px", textAlign: "center" }}>
      <p>
        Opening the map... <a href={target}>Tap here if it doesn't open.</a>
      </p>
    </main>
  );
}
