import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, LOGO } from "../lib/data";
import { Monogram } from "./Monogram";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border-b border-border/40"
            : "bg-transparent border-b border-transparent"
        }`}
        data-testid="site-header"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <a href="#top" data-testid="logo-link" className="flex items-center">
            <img
              src={LOGO}
              alt="Duraimohan Classics"
              className="logo-blend h-14 md:h-16 w-auto object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`nav-${n.label.toLowerCase()}`}
                className="link-underline text-[13px] uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block text-right">
            <a
              href="tel:+919444009900"
              className="text-[12px] tracking-[0.15em] text-foreground/60 hover:text-rust transition-colors"
            >
              +91 9444 009 900
            </a>
          </div>

          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setOpen(true)}
            data-testid="mobile-menu-open"
            aria-label="Open menu"
          >
            <Menu size={24} strokeWidth={1.4} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl flex flex-col p-8"
            data-testid="mobile-menu"
          >
            <div className="flex justify-between items-center mb-16">
              <Monogram size="text-2xl" />
              <button
                onClick={() => setOpen(false)}
                data-testid="mobile-menu-close"
                aria-label="Close menu"
              >
                <X size={26} strokeWidth={1.4} />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-serif italic text-4xl py-3 border-b border-border/40"
                  data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
