"use client";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, Compass, FileSignature, Hash, Target, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

const disciplines = [
  {
    key: "jyotish",
    icon: Sparkles,
    name: "Vedic Astrology",
    sanskrit: "Jyotish Vidya",
    tagline: "Cosmic timing, life pathways & remedial alignment",
    body: "Reading the Janam Kundli (birth chart) as a profound blueprint for reflecting on planetary periods (Dashas), innate strengths, timing for major decisions, and practical remedial measures.",
    href: "/services/vedic-astrology",
    links: ["Remedial measures", "Watch correction", "Birth chart analysis"],
    waMsg: "Namaste Dr. Anameka, I would like to consult with you regarding Vedic Astrology / Kundli reading.",
  },
  {
    key: "vastu",
    icon: Compass,
    name: "Vastu Shastra",
    sanskrit: "Vastu Shastra",
    tagline: "Harmonizing spaces without invasive demolition",
    body: "Evaluating the energy flow, orientations, and elemental balance of residences and commercial premises. Focused on non-invasive adjustments that enhance peace, health, and prosperity.",
    href: "/services/vastu-consultation",
    links: ["Non-invasive Vastu", "Residential layouts", "Business premises"],
    waMsg: "Namaste Dr. Anameka, I am interested in a Vastu Shastra consultation for my property.",
  },
  {
    key: "graph",
    icon: FileSignature,
    name: "Graphology & Graphotherapy",
    sanskrit: "Handwriting & Signature Analysis",
    tagline: "Subconscious diagnosis and positive behavioral rewiring",
    body: "Analyzing handwriting strokes and signatures to uncover hidden behavioral patterns, emotional blocks, and subconscious tendencies—followed by guided therapy strokes for lasting positive change.",
    href: "/services/graphology",
    links: ["Signature analysis", "Subconscious rewiring", "Graphotherapy"],
    waMsg: "Namaste Dr. Anameka, I would like to get my handwriting / signature analysed.",
  },
  {
    key: "names",
    icon: Hash,
    name: "Numerology & Brand Marks",
    sanskrit: "Numbers, Logos & Vibration",
    tagline: "Vibrational harmony for phone numbers, business logos & names",
    body: "Reviewing mobile numbers, corporate logos, visiting cards, and brand names to ensure their numerical and symbolic vibrations align with your personal astrological chart and goals.",
    href: "/services/mobile-number-analysis",
    links: ["Logo design guidance", "Mobile number analysis", "Name vibration"],
    waMsg: "Namaste Dr. Anameka, I would like to consult on mobile number numerology and logo guidance.",
  },
  {
    key: "coach",
    icon: Target,
    name: "Life & Business Coaching",
    sanskrit: "Transformative Mentorship",
    tagline: "Bridging timeless wisdom with clear, actionable strategy",
    body: "One-to-one coaching sessions that integrate your astrological timing, psychological mindset, and practical life goals into a focused, unhurried roadmap for personal and professional growth.",
    href: "/services/life-transformation-coaching",
    links: ["Life transformation", "Executive mentorship", "Mindset alignment"],
    waMsg: "Namaste Dr. Anameka, I would like to explore life and business transformation coaching.",
  },
];

export function DisciplineExplorer() {
  const [active, setActive] = useState(0);
  const d = disciplines[active];
  const Icon = d.icon;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      {/* Left interactive tab list */}
      <ul
        className="space-y-3 lg:col-span-6"
        role="tablist"
        aria-label="Areas of expertise"
        aria-orientation="vertical"
      >
        {disciplines.map((x, i) => {
          const TabIcon = x.icon;
          const isSelected = i === active;
          return (
            <li key={x.key} role="presentation">
              <button
                role="tab"
                id={`tab-${x.key}`}
                aria-selected={isSelected}
                aria-controls="discipline-panel"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "group flex w-full items-center justify-between gap-3 sm:gap-4 rounded-2xl p-3.5 sm:p-5 text-left transition-all duration-300",
                  isSelected
                    ? "border border-gold/60 bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-soft"
                    : "border border-gold/20 bg-white/70 text-plum hover:border-gold/50 hover:bg-cream/60"
                )}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className={cn(
                      "grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl transition-all duration-300",
                      isSelected
                        ? "bg-gold/20 text-gold-light border border-gold/50"
                        : "bg-cream text-plum/70 group-hover:text-plum group-hover:bg-gold/15"
                    )}
                  >
                    <TabIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        "font-display text-lg sm:text-2xl transition-colors truncate",
                        isSelected ? "text-ivory" : "text-plum group-hover:text-gold-deep"
                      )}
                    >
                      {x.name}
                    </h3>
                    <p
                      className={cn(
                        "text-xs sm:text-sm transition-colors truncate",
                        isSelected ? "text-gold-light/90" : "text-charcoal/60"
                      )}
                    >
                      {x.sanskrit}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full transition-all shrink-0",
                    isSelected
                      ? "bg-gold text-plum-deep font-semibold"
                      : "text-plum/50 group-hover:text-plum group-hover:translate-x-1"
                  )}
                >
                  {isSelected ? "Active" : "Explore →"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Right detail showcase panel */}
      <div
        className="lg:col-span-6"
        id="discipline-panel"
        role="tabpanel"
        aria-labelledby={`tab-${d.key}`}
      >
        <div
          key={d.key}
          className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-plum-deep via-plum to-plum-darkest p-5 sm:p-7 lg:p-9 text-ivory shadow-luxury lg:sticky lg:top-32 animate-[rise_.35s_ease-out_both]"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          {/* Header pill */}
          <div className="flex items-center justify-between gap-4 border-b border-gold/20 pb-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold/20 border border-gold/40 text-gold-light">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-lg text-gold-light italic">{d.sanskrit}</p>
                <p className="text-xs text-ivory/60 uppercase tracking-widest">{d.name}</p>
              </div>
            </div>
            <span className="text-xs rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-gold-light">
              Core Discipline
            </span>
          </div>

          <h4 className="mt-6 font-display text-xl text-ivory font-normal leading-snug">
            {d.tagline}
          </h4>

          <p className="mt-4 text-base leading-relaxed text-ivory/85">
            {d.body}
          </p>

          {/* Topics covered chips */}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-gold-light/75 mb-2 font-medium">
              Consultation scope includes:
            </p>
            <div className="flex flex-wrap gap-2">
              {d.links.map((link) => (
                <span
                  key={link}
                  className="rounded-lg border border-gold/25 bg-white/5 px-2.5 py-1 text-xs text-ivory/90"
                >
                  ✓ {link}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={d.href}
              className="btn-gold group !py-2.5 !px-5 text-sm justify-center"
            >
              <span>Detailed methodology</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href={waLink(d.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "discipline_explorer", discipline: d.key })}
              className="btn-whatsapp !py-2.5 !px-4 text-sm justify-center"
            >
              <MessageCircle className="h-4 w-4 fill-current" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
