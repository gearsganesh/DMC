import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO } from "../lib/data";

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[10000] bg-[#020202] grid place-items-center"
          data-testid="intro-splash"
        >
          <div className="text-center px-8">
            <motion.img
              src={LOGO}
              alt="Duraimohan Classics"
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-[min(560px,82vw)] max-h-[320px] object-contain mx-auto logo-blend"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 190 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="h-px bg-rust mx-auto my-5"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-[10px] tracking-[0.5em] text-primary uppercase"
            >
              Duraimohan Classics
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
