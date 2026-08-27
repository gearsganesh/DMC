import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "../lib/data";

function Counter({ value, suffix, raw }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(tick);
      else setN(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {raw ? n : n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="border-l border-border pl-5"
            data-testid={`stat-${i}`}
          >
            <div className="text-serif text-6xl md:text-7xl font-light text-foreground">
              <Counter value={s.value} suffix={s.suffix} raw={s.raw} />
            </div>
            <div className="mt-3 text-[12px] uppercase tracking-[0.2em] text-foreground/50">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
