import React from "react";

const WORDS = [
  "Heritage",
  "Passion",
  "Preservation",
  "Chrome",
  "Legacy",
  "Provenance",
  "1924—1993",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="border-y border-border/50 py-6 overflow-hidden bg-surface/40">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="text-serif italic text-3xl md:text-4xl px-8 text-foreground/80">
              {w}
            </span>
            <span className="text-rust text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
