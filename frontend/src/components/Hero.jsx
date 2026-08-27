import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChromeBackground from "./ChromeBackground";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ scrollRef }) {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 hero-grid-lines opacity-70" />
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ChromeBackground scrollRef={scrollRef} />
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div
            variants={item}
            className="flex items-center gap-3 text-[12px] uppercase tracking-[0.28em] text-foreground/60 mb-8"
          >
            <span className="w-10 h-px bg-rust" />
            Duraimohan Classics · Est. 1996
          </motion.div>

          <motion.h1
            variants={item}
            className="text-serif font-light leading-[0.92] tracking-tight text-6xl sm:text-7xl md:text-8xl"
          >
            Where <span className="italic text-rust">Automotive</span>
            <br />
            History Lives.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-10 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl font-light"
          >
            A private collection shaped by three decades of passion, preservation
            and the enduring character of the automobile — now a cinematic digital
            museum.
          </motion.p>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#collection"
              data-testid="hero-enter-collection"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/80 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              Enter the Collection
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
            </a>
            <a
              href="#journey"
              data-testid="hero-discover-story"
              className="inline-flex items-center rounded-full border border-border px-8 py-4 text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground hover:border-foreground/60 transition-all duration-500"
            >
              Discover the Story
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/40">
          Scroll
        </span>
        <span className="w-px h-12 bg-gradient-to-b from-foreground/60 to-transparent" />
      </motion.div>
    </section>
  );
}
