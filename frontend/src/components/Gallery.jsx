import React from "react";
import { motion } from "framer-motion";
import { CAR_IMAGES } from "../lib/data";

const layout = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "md:row-span-2",
  "md:col-span-2",
  "",
];

export default function Gallery() {
  return (
    <section
      id="archive"
      className="py-24 md:py-32 bg-surface/30 border-t border-border/40"
      data-testid="archive-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            The Archive
          </div>
          <h2 className="text-serif text-5xl md:text-7xl leading-[0.95]">
            A visual <span className="italic">archive.</span>
          </h2>
          <p className="mt-6 text-foreground/60 leading-relaxed text-lg font-light">
            Front, rear, interior, engine bay and detail shots — one cinematic
            system for every machine. Replace these placeholders with DMC's own
            photographs at any time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3 md:gap-4">
          {layout.map((span, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden ${span}`}
              data-testid={`gallery-slot-${i}`}
            >
              <img
                src={CAR_IMAGES[(i + 5) % CAR_IMAGES.length]}
                alt="DMC archive"
                className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1100ms] ease-smooth"
              />
              <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
