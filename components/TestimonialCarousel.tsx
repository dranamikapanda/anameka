"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { Testimonial } from "@/lib/types";

/** Interactive Quote carousel for client testimonials with auto-play & smooth transitions */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const quotes = items.filter((t) => t.quote);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setI((x) => (x + d + quotes.length) % quotes.length);
    },
    [quotes.length]
  );

  // Auto-advance every 6.5 seconds when not hovered
  useEffect(() => {
    if (isPaused || quotes.length <= 1) return;
    const interval = setInterval(() => {
      go(1);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, quotes.length, go]);

  if (!quotes.length) return null;
  const t = quotes[i];

  return (
    <div
      className="relative"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative quote mark */}
      <div className="mb-4 text-gold/30">
        <Quote className="h-10 w-10 rotate-180" />
      </div>

      <div className="relative min-h-[220px] overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={t.id || i}
            custom={dir}
            initial={{ opacity: 0, x: 25 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 * dir }}
            transition={{ duration: 0.4 }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${quotes.length}`}
          >
            {/* 5 Gold stars */}
            <div className="flex items-center gap-1 text-gold-light mb-4">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-gold-light text-gold-light" />
              ))}
            </div>

            <blockquote className="font-display text-[clamp(1.4rem,2.4vw,2.1rem)] italic leading-relaxed text-ivory font-normal">
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-gold/15 text-gold-light font-display font-semibold">
                {t.client_name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gold-light text-sm">{t.client_name}</p>
                {t.client_location && (
                  <p className="text-xs text-ivory/70">{t.client_location}</p>
                )}
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Navigation controls */}
      {quotes.length > 1 && (
        <div className="mt-8 flex items-center justify-between border-t border-gold/20 pt-5">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {quotes.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setDir(dotIdx > i ? 1 : -1);
                  setI(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dotIdx === i ? "w-6 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/60"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Left/Right buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-light transition-all hover:bg-white/10 hover:border-gold active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold-light transition-all hover:bg-white/10 hover:border-gold active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
