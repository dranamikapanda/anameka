"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Testimonial } from "@/lib/types";

/** Quote carousel for written testimonials. Advances only on user action. */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const quotes = items.filter((t) => t.quote);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  if (!quotes.length) return null;
  const go = (d: number) => { setDir(d); setI((x) => (x + d + quotes.length) % quotes.length); };
  const t = quotes[i];
  return (
    <div className="relative" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="relative min-h-[260px] overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure key={t.id} custom={dir} initial={{ opacity: 0, x: 30 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 * dir }} transition={{ duration: 0.45 }}
            aria-roledescription="slide" aria-label={`${i + 1} of ${quotes.length}`}>
            <blockquote className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] italic leading-snug text-ivory">“{t.quote}”</blockquote>
            <figcaption className="mt-8 text-gold-light">{t.client_name}{t.client_location && <span className="text-ivory/70">, {t.client_location}</span>}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      {quotes.length > 1 && (
        <div className="mt-8 flex items-center gap-4">
          <button onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold-light hover:bg-white/10" aria-label="Previous testimonial"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold-light hover:bg-white/10" aria-label="Next testimonial"><ChevronRight className="h-5 w-5" /></button>
          <span className="ml-2 text-sm text-ivory/70" aria-live="polite">{i + 1} of {quotes.length}</span>
        </div>
      )}
    </div>
  );
}
