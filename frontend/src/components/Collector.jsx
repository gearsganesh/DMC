import React from "react";
import { motion } from "framer-motion";
import { STEERING_IMG, CONTACT } from "../lib/data";

export default function Collector() {
  return (
    <section id="collector" className="py-24 md:py-32" data-testid="collector-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative overflow-hidden min-h-[420px] lg:min-h-[600px]"
        >
          <img
            src={STEERING_IMG}
            alt="Classic steering wheel detail"
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7"
        >
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-6">
            The Collector
          </div>
          <h2 className="text-serif text-6xl md:text-8xl leading-none">{CONTACT.collector}</h2>
          <p className="mt-8 text-xl text-foreground/70 leading-relaxed font-light max-w-2xl">
            For over three decades, a passion for vintage automobiles has taken the
            collection across cities, forums and communities — bringing timeless
            classics back to life.
          </p>
          <p className="mt-6 text-lg text-foreground/60 leading-relaxed font-light max-w-2xl">
            DMC is not simply about collecting cars. It is about preserving stories,
            celebrating engineering, and sharing the joy of classic automobiles.
          </p>

          <div className="mt-12 border-l-2 border-rust pl-6">
            <p className="text-serif italic text-3xl md:text-4xl leading-tight">
              “Not just cars… but a piece of history, kept alive.”
            </p>
            <div className="text-mono-brand text-2xl tracking-[0.15em] mt-6">
              {CONTACT.collector}
            </div>
            <div className="text-[12px] uppercase tracking-[0.2em] text-foreground/50 mt-1">
              {CONTACT.role}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
