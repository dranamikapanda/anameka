"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/types";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

const categories = [
  { id: "all", label: "All Disciplines" },
  { id: "astrology", label: "Vedic Astrology", slugs: ["vedic-astrology", "remedial-measures", "astro-vastu-integration"] },
  { id: "vastu", label: "Vastu Shastra", slugs: ["vastu-consultation", "non-invasive-vastu", "astro-vastu-integration"] },
  { id: "graphology", label: "Graphology & Mind", slugs: ["graphology", "graphotherapy", "signature-analysis"] },
  { id: "energy", label: "Energy & Numerology", slugs: ["mobile-number-analysis", "logo-design-guidance", "watch-correction"] },
  { id: "coaching", label: "Life & Business Coaching", slugs: ["life-transformation-coaching", "business-growth-guidance"] },
];

export function ServiceBrowser({ services }: { services: Service[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat =
        activeCategory === "all" ||
        categories.find((c) => c.id === activeCategory)?.slugs.includes(s.slug);
      const matchSearch =
        !searchQuery.trim() ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.short_description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, activeCategory, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Category Filter Pills & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCategory(c.id);
                track("service_view", { category: c.id });
              }}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === c.id
                  ? "border border-gold bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-soft"
                  : "border border-gold/30 bg-white/80 text-plum hover:border-gold hover:bg-cream"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search consultations..."
            className="w-full rounded-full border border-gold/30 bg-white/90 px-4 py-2 text-sm text-plum placeholder:text-charcoal/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      {/* Symmetrical Luxury Card Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gold/40 bg-white/60 p-12 text-center">
          <p className="text-lg font-display text-plum">No consultations found matching your search.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="btn-gold mt-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.slug}
              className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/95 p-6 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1"
            >
              <div>
                {/* Icon & Discipline Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold-deep transition-transform duration-300 group-hover:scale-105">
                    <ServiceIcon name={s.icon} className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold-deep">
                    1-on-1 Guidance
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-medium leading-tight text-plum group-hover:text-gold-deep transition-colors">
                  <Link href={`/services/${s.slug}`} className="focus:outline-none">
                    {s.title}
                  </Link>
                </h3>

                {/* Short Description */}
                <p className="mt-3 text-sm leading-relaxed text-charcoal/75 line-clamp-3">
                  {s.short_description}
                </p>

                {/* Preview bullets if available */}
                {s.benefits && s.benefits.length > 0 && (
                  <ul className="mt-4 space-y-1.5 border-t border-gold/20 pt-4">
                    {s.benefits.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-charcoal/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-whatsapp shrink-0" />
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Action Bar */}
              <div className="mt-6 border-t border-gold/20 pt-4 flex items-center justify-between gap-3">
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-plum transition-colors hover:text-gold-deep"
                >
                  <span>Explore Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={waLink(`Namaste Dr. Anameka, I would like to inquire about "${s.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Ask on WhatsApp"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-whatsapp/40 bg-whatsapp/10 text-whatsapp-dark transition-all hover:bg-whatsapp hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

