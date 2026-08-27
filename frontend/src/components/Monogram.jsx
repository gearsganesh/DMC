import React from "react";

export function Monogram({ className = "", size = "text-2xl" }) {
  return (
    <span
      className={`text-mono-brand ${size} tracking-[0.3em] leading-none flex items-center gap-[0.18em] ${className}`}
      aria-label="Duraimohan Classics"
    >
      <span>D</span>
      <span className="text-rust text-[0.7em] -translate-y-[0.05em]">·</span>
      <span>M</span>
      <span className="text-rust text-[0.7em] -translate-y-[0.05em]">·</span>
      <span>C</span>
    </span>
  );
}
