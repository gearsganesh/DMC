import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Check } from "lucide-react";

const FIELDS = [
  { name: "year", label: "Year", placeholder: "1964", required: true },
  { name: "make", label: "Make", placeholder: "Volkswagen", required: true },
  { name: "model", label: "Model", placeholder: "Beetle" },
  { name: "origin", label: "Origin", placeholder: "German" },
  { name: "category", label: "Category", placeholder: "VW classic" },
  { name: "image_url", label: "Image URL (optional)", placeholder: "https://…" },
];

const empty = {
  year: "",
  make: "",
  model: "",
  origin: "",
  category: "",
  image_url: "",
  description: "",
  featured: false,
};

export default function AddCollection({ onAdd }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState("idle");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.year || !form.make) return;
    setStatus("saving");
    try {
      await onAdd(form);
      setStatus("done");
      setForm(empty);
      setTimeout(() => setStatus("idle"), 2200);
    } catch (err) {
      setStatus("idle");
    }
  };

  return (
    <section id="add" className="py-24 md:py-32" data-testid="add-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="text-[12px] uppercase tracking-[0.28em] text-rust mb-5">
            Curator's Desk
          </div>
          <h2 className="text-serif text-5xl md:text-6xl leading-[0.95]">
            Add to the <span className="italic">register.</span>
          </h2>
          <p className="mt-6 text-foreground/60 leading-relaxed font-light">
            Expand the DMC museum. New automobiles appear instantly in the
            collection grid above, complete with their year, origin and story.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={submit}
          className="lg:col-span-8 grid sm:grid-cols-2 gap-6"
          data-testid="add-car-form"
        >
          {FIELDS.map((f) => (
            <div key={f.name} className="flex flex-col">
              <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
                {f.label}
                {f.required && <span className="text-rust"> *</span>}
              </label>
              <input
                type="text"
                value={form[f.name]}
                onChange={(e) => set(f.name, e.target.value)}
                placeholder={f.placeholder}
                required={f.required}
                data-testid={`add-field-${f.name}`}
                className="bg-background border border-border px-4 py-3 text-foreground placeholder:text-foreground/25 focus:border-rust focus:outline-none transition-colors font-light"
              />
            </div>
          ))}

          <div className="sm:col-span-2 flex flex-col">
            <label className="text-[11px] uppercase tracking-[0.2em] text-foreground/50 mb-2">
              Story / Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="A short story about this automobile…"
              data-testid="add-field-description"
              className="bg-background border border-border px-4 py-3 text-foreground placeholder:text-foreground/25 focus:border-rust focus:outline-none transition-colors resize-none font-light"
            />
          </div>

          <label className="sm:col-span-2 flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              data-testid="add-field-featured"
              className="w-4 h-4 accent-rust"
            />
            <span className="text-sm text-foreground/70 uppercase tracking-[0.15em]">
              Mark as featured automobile
            </span>
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "saving"}
              data-testid="add-car-submit"
              className="group inline-flex items-center gap-3 rounded-full border border-foreground/80 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500 disabled:opacity-50"
            >
              {status === "saving" && <Loader2 size={16} className="animate-spin" />}
              {status === "done" && <Check size={16} className="text-racing" />}
              {status === "idle" && <Plus size={16} />}
              {status === "done" ? "Added to Register" : "Add Automobile"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
