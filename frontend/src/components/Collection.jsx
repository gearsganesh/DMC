import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { carImage } from "../lib/data";

function CarCard({ car, i, onOpen }) {
  const featured = car.featured;
  const span = featured
    ? "md:col-span-2 md:row-span-2"
    : i % 5 === 0
    ? "md:col-span-2"
    : "";
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
      onClick={() => onOpen(car, i)}
      data-testid={`car-card-${i}`}
      className={`group relative overflow-hidden bg-surface text-left ${span}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={carImage(car, i)}
          alt={`${car.year} ${car.make} ${car.model}`}
          loading="lazy"
          className="w-full h-full object-cover opacity-70 grayscale-[35%] group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105 transition-all duration-[1100ms] ease-smooth"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      <div className="relative z-10 h-full min-h-[220px] flex flex-col justify-between p-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.25em] text-foreground/60">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/45 border border-border rounded-full px-2.5 py-1">
              {car.vehicle_type || "CAR"}
            </span>
            {featured && (
              <span className="text-[10px] uppercase tracking-[0.25em] text-rust border border-rust/50 rounded-full px-3 py-1">
                Featured
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="text-serif italic text-4xl md:text-5xl text-rust/90">
            {car.year}
          </div>
          <h3 className="text-serif text-2xl md:text-3xl mt-1">
            {car.make} {car.model}
          </h3>
          <p className="text-[12px] uppercase tracking-[0.18em] text-foreground/50 mt-2">
            {car.category}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function Collection({ cars, onDelete }) {
  const [active, setActive] = useState(null);

  return (
    <section id="collection" className="py-24 md:py-32" data-testid="collection-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            The DMC Register
          </div>
          <h2 className="text-serif text-5xl md:text-7xl leading-[0.95]">
            The <span className="italic">Collection.</span>
          </h2>
          <p className="mt-6 text-foreground/60 leading-relaxed text-lg font-light">
            A living register of vintage automobiles and two-wheel classics —
            spanning 1924 to 1993, each preserved and kept running as a piece of
            motoring heritage.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-border/60 mb-12">
          {[
            ["25", "Registered Classics"],
            ["1924–1993", "Years Represented"],
            ["4", "Decades of History"],
            ["3", "Two-Wheel Classics"],
          ].map(([n, l], k) => (
            <div
              key={k}
              className="py-7 px-5 border-r border-border/60 last:border-r-0 flex flex-col justify-center"
              data-testid={`register-metric-${k}`}
            >
              <span className="text-serif text-3xl md:text-4xl text-primary">{n}</span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                {l}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[240px] gap-4 md:gap-5"
        >
          {cars.map((car, i) => (
            <CarCard key={car.id || i} car={car} i={i} onOpen={(c) => setActive({ car: c, i })} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] bg-background/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            data-testid="car-modal"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl grid md:grid-cols-2 bg-surface border border-border/60"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-20 text-foreground/70 hover:text-foreground p-2"
                data-testid="car-modal-close"
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <div className="h-64 md:h-auto overflow-hidden">
                <img
                  src={carImage(active.car, active.i)}
                  alt={`${active.car.year} ${active.car.make}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-serif italic text-5xl text-rust/90">
                  {active.car.year}
                </div>
                <h3 className="text-serif text-4xl mt-2">
                  {active.car.make} {active.car.model}
                </h3>
                <p className="text-[12px] uppercase tracking-[0.2em] text-foreground/50 mt-3">
                  {active.car.category}
                </p>
                <p className="mt-6 text-foreground/70 leading-relaxed font-light">
                  {active.car.description || "A cherished piece of the DMC register."}
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                      Origin
                    </div>
                    <div className="text-serif text-2xl mt-1">
                      {active.car.origin || "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                      Status
                    </div>
                    <div className="text-serif text-2xl mt-1">DMC Collection</div>
                  </div>
                </div>
                {onDelete && active.car.id && (
                  <button
                    onClick={() => {
                      onDelete(active.car.id);
                      setActive(null);
                    }}
                    data-testid="car-modal-delete"
                    className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-foreground/40 hover:text-rust transition-colors"
                  >
                    <Trash2 size={14} /> Remove from register
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
