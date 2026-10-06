"use client";
import { useEffect, useState } from "react";

// "12,345 maps made and shared so far", shown once there are enough to be worth showing.
export default function MapCounter({ min = 50 }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetch("/api/stats")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setTotal(d.total || 0))
      .catch(() => {});
  }, []);
  if (total < min) return null;
  return (
    <p className="map-counter">
      <strong>{total.toLocaleString("en-NG")}</strong> maps made and shared so far
    </p>
  );
}
