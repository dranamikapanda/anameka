"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, CheckCircle2, Sparkles, Users } from "lucide-react";
import type { Programme } from "@/lib/types";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

const audienceFilters = [
  { id: "all", label: "All Programmes" },
  { id: "students", label: "Students & Parents" },
  { id: "teachers", label: "Teachers & Schools" },
  { id: "business", label: "Business Owners" },
  { id: "families", label: "Individuals & Families" },
];

export function ProgrammesBrowser({ programmes }: { programmes: Programme[] }) {
  const [activeAudience, setActiveAudience] = useState("all");

  const filtered = useMemo(() => {
    return activeAudience === "all"
      ? programmes
      : programmes.filter((p) => p.audience_key === activeAudience);
  }, [programmes, activeAudience]);

  return (
    <div className="space-y-10">
      {/* Interactive Audience Filter Tabs */}
      <div className="flex justify-center border-b border-gold/20 pb-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {audienceFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActiveAudience(f.id);
                track("service_view", { audience: f.id });
              }}
              className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeAudience === f.id
                  ? "border border-gold bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-soft"
                  : "border border-gold/30 bg-white/80 text-plum hover:border-gold hover:bg-cream"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Symmetrical Programme Cards Grid */}
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {filtered.map((p) => (
          <article
            key={p.slug}
            className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-7 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold-deep">
                  <Users className="h-3 w-3" />
                  <span>{p.audience}</span>
                </span>
                {p.price_inr && (
                  <span className="font-display font-semibold text-plum text-sm">
                    ₹{p.price_inr}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-medium leading-tight text-plum group-hover:text-gold-deep transition-colors">
                <Link href={`/programmes/${p.slug}`} className="focus:outline-none">
                  {p.title}
                </Link>
              </h3>

              {/* Tagline */}
              {p.tagline && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                  {p.tagline}
                </p>
              )}

              {/* Summary */}
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75 line-clamp-3">
                {p.summary}
              </p>

              {/* Pillars preview */}
              {p.pillars && p.pillars.length > 0 && (
                <div className="mt-5 space-y-2 border-t border-gold/20 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60">
                    What You’ll Master:
                  </p>
                  <ul className="space-y-1.5">
                    {p.pillars.slice(0, 2).map((item) => (
                      <li key={item.title} className="flex items-start gap-2 text-xs text-charcoal/80">
                        <CheckCircle2 className="h-3.5 w-3.5 text-whatsapp shrink-0 mt-0.5" />
                        <span className="truncate">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-6 border-t border-gold/20 pt-4 flex items-center justify-between gap-3">
              <Link
                href={`/programmes/${p.slug}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-plum transition-colors hover:text-gold-deep"
              >
                <span>Full Programme</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={waLink(`Namaste Dr. Anameka, I am interested in enrolling in the "${p.title}" programme.`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Inquire on WhatsApp"
                className="inline-flex items-center gap-1.5 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-3 py-1.5 text-xs font-medium text-whatsapp-dark transition-all hover:bg-whatsapp hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span className="hidden xs:inline">WhatsApp</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

