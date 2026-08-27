import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User } from "lucide-react";
import { CONTACT } from "../lib/data";

const cards = [
  { icon: User, title: CONTACT.collector, sub: CONTACT.role, href: null },
  { icon: Phone, title: CONTACT.phone, sub: "Call / WhatsApp", href: `tel:${CONTACT.phoneRaw}` },
  { icon: Mail, title: "Email", sub: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: MapPin, title: "Visit / Location", sub: CONTACT.coords, href: CONTACT.maps },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-surface/30 border-t border-border/40"
      data-testid="contact-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            Get in Touch
          </div>
          <h2 className="text-serif text-5xl md:text-7xl leading-[0.95]">
            Keep the classic <span className="italic">spirit alive.</span>
          </h2>
          <p className="mt-6 text-foreground/60 leading-relaxed text-lg font-light">
            For classic-car enthusiasts, collectors, events and automotive
            conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div className="grid sm:grid-cols-2 gap-5">
            {cards.map((c, i) => {
              const Icon = c.icon;
              const inner = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="border border-border/50 p-7 h-full hover:border-rust/60 transition-colors duration-500 group"
                  data-testid={`contact-card-${i}`}
                >
                  <Icon size={20} strokeWidth={1.3} className="text-rust mb-6" />
                  <h3 className="text-serif text-2xl">{c.title}</h3>
                  <p className="text-foreground/55 mt-2 text-sm tracking-wide break-words">
                    {c.sub}
                  </p>
                </motion.div>
              );
              return c.href ? (
                <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-testid="contact-map"
            className="relative overflow-hidden border border-border/50 min-h-[300px]"
          >
            <iframe
              src={CONTACT.mapEmbed}
              title="Duraimohan Classics location"
              loading="lazy"
              className="w-full h-full min-h-[300px] border-0"
              style={{ filter: "grayscale(1) contrast(0.6) brightness(0.75) invert(0.02)" }}
            />
            <a
              href={CONTACT.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-background/80 border border-rust/50 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-rust hover:bg-rust hover:text-primary-foreground transition-colors"
              data-testid="contact-map-link"
            >
              Open Location →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
