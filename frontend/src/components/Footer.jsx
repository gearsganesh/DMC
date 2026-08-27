import React from "react";
import { NAV, LOGO } from "../lib/data";
import { Monogram } from "./Monogram";

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <div className="text-center border-b border-border/40 pb-16 mb-16">
          <p className="text-serif text-4xl md:text-6xl leading-tight">
            Not just cars.
            <br />
            <span className="italic text-rust">A piece of history, kept alive.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src={LOGO} alt="Duraimohan Classics" className="logo-blend h-20 w-auto object-contain" />
            <p className="mt-6 text-foreground/55 leading-relaxed font-light max-w-xs">
              A private collection of vintage automobiles celebrating more than three
              decades of automotive passion and preservation.
            </p>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.25em] text-foreground/50 mb-6">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-foreground/70 hover:text-rust transition-colors w-max"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[12px] uppercase tracking-[0.25em] text-foreground/50 mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+919444009900" className="text-foreground/70 hover:text-rust transition-colors w-max">
                +91 9444 009 900
              </a>
              <a href="mailto:MD@duraimohanclassics.com" className="text-foreground/70 hover:text-rust transition-colors w-max">
                MD@duraimohanclassics.com
              </a>
              <a href="#contact" className="text-foreground/70 hover:text-rust transition-colors w-max">
                Location
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30 text-[11px] uppercase tracking-[0.2em] text-foreground/35">
          © 2026 Duraimohan Classics (DMC) · Heritage · Passion · Preservation
        </div>
      </div>
    </footer>
  );
}
