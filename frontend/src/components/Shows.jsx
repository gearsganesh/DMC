import React from "react";
import { motion } from "framer-motion";
import { SHOWS, CAR_IMAGES } from "../lib/data";

export default function Shows() {
  return (
    <section id="shows" className="py-24 md:py-32" data-testid="shows-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            Shows & Awards
          </div>
          <h2 className="text-serif text-5xl md:text-7xl leading-[0.95]">
            Where the classics <span className="italic">meet the world.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {SHOWS.map((s, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="group relative overflow-hidden border border-border/50 min-h-[340px] flex flex-col justify-end p-8"
              data-testid={`show-${i}`}
            >
              <img
                src={CAR_IMAGES[(i + 3) % CAR_IMAGES.length]}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-[1100ms] ease-smooth"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <div className="relative z-10">
                <div className="text-[11px] uppercase tracking-[0.25em] text-rust">{s.year}</div>
                <h3 className="text-serif text-3xl mt-3">{s.title}</h3>
                <p className="mt-3 text-foreground/60 leading-relaxed font-light">{s.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
