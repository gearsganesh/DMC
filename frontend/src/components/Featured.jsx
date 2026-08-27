import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { carImage } from "../lib/data";

export default function Featured({ cars }) {
  const car = cars.find((c) => c.featured) || cars[0];
  if (!car) return null;
  const idx = cars.indexOf(car);

  return (
    <section id="featured" className="py-24 md:py-32 bg-surface/30" data-testid="featured-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            Featured Automobile
          </div>
          <h2 className="text-serif text-5xl md:text-7xl leading-[0.95]">
            The signature <span className="italic">story.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden min-h-[380px] lg:min-h-[560px]"
          >
            <img
              src={carImage(car, idx)}
              alt={`${car.year} ${car.make}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="text-serif italic text-6xl text-primary">{car.year}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div className="text-[12px] uppercase tracking-[0.2em] text-foreground/50">
              Vehicle Story · 01
            </div>
            <h3 className="text-serif text-5xl md:text-6xl mt-3 leading-none">
              {car.make}
              <br />
              <span className="italic">{car.model}</span>
            </h3>
            <p className="mt-7 text-foreground/70 leading-relaxed text-lg font-light">
              {car.description}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8 border-t border-border/50 pt-8">
              {[
                ["Model", `${car.make} ${car.model}`],
                ["Year", car.year],
                ["Origin", car.origin || "—"],
                ["Status", "DMC Collection"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                    {k}
                  </div>
                  <div className="text-serif text-xl mt-1">{v}</div>
                </div>
              ))}
            </div>

            <a
              href="#collection"
              data-testid="featured-browse"
              className="group mt-10 inline-flex items-center gap-3 rounded-full border border-foreground/70 px-7 py-3.5 text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500 w-max"
            >
              Browse the Register
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
