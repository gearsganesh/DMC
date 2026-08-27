import React from "react";
import { motion } from "framer-motion";
import { JOURNEY } from "../lib/data";

export default function Journey() {
  return (
    <section
      id="journey"
      className="py-24 md:py-32 bg-surface/30 border-y border-border/40"
      data-testid="journey-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            The Motoring Journey
          </div>
          <h2 className="text-serif text-5xl md:text-7xl leading-[0.95]">
            A life <span className="italic">on the road.</span>
          </h2>
          <p className="mt-6 text-foreground/60 leading-relaxed text-lg font-light">
            Duraimohan's cars have travelled far beyond the garage — appearing at
            vintage-car shows, heritage displays, rallies and club gatherings across
            South India.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/60" />
          <div className="space-y-14 md:space-y-24">
            {JOURNEY.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className={`relative pl-8 md:pl-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                }`}
                data-testid={`journey-event-${i}`}
              >
                <span
                  className={`absolute top-2 w-3 h-3 rounded-full bg-rust ring-4 ring-background -left-[6px] md:left-auto ${
                    i % 2 === 0 ? "md:-right-[6px]" : "md:-left-[6px]"
                  }`}
                />
                <div className="text-[12px] uppercase tracking-[0.2em] text-rust">{e.tag}</div>
                <h3 className="text-serif text-3xl md:text-4xl mt-2">{e.title}</h3>
                <p className="mt-3 text-foreground/60 leading-relaxed font-light">{e.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
