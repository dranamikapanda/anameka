import Link from "next/link";
import { MessageCircle, Calendar, Sparkles } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { YantraLines } from "./YantraLines";
import { waLink } from "@/lib/env";

/**
 * Royal Sanctuary PageHero for all inner subpages.
 * Provides a unified, high-end luxury spiritual aesthetic with sacred geometry,
 * gold typography, breadcrumbs, and instant consultation actions.
 */
export function PageHero({
  title,
  intro,
  crumbs,
  badge,
  children,
}: {
  title: string;
  intro?: string;
  crumbs: { name: string; path: string }[];
  badge?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-plum-deep via-plum to-plum-darkest text-ivory pb-16 pt-32 sm:pb-20 sm:pt-40 md:pb-24 md:pt-44 border-b border-gold/25 shadow-luxury">
      {/* Ambient celestial gold radial glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_35%,rgba(212,175,55,0.15)_0%,rgba(68,31,81,0.5)_45%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />

      {/* Sacred Yantra geometry lines off the right edge */}
      <YantraLines className="pointer-events-none absolute -right-32 top-1/2 h-[600px] w-[600px] -translate-y-1/2 text-gold/20 md:-right-16" />

      <div className="container-x relative z-10">
        {/* Breadcrumb pill container */}
        <div className="inline-flex items-center rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
          <Breadcrumbs light items={crumbs} />
        </div>

        {/* Optional decorative category badge */}
        {badge && (
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </span>
          </div>
        )}

        {/* Majestic Page Title */}
        <h1 className="max-w-4xl text-ivory font-display text-[2.4rem] xs:text-[2.8rem] sm:text-[3.4rem] md:text-[4rem] leading-[1.1] tracking-tight">
          {title}
        </h1>

        {/* Subtitle / Intro */}
        {intro && (
          <p className="mt-5 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-ivory/80 font-normal">
            {intro}
          </p>
        )}

        {/* Dual Quick Action strip on subpages */}
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/book-consultation"
            className="btn-gold !py-2.5 !px-5 text-xs sm:text-sm shadow-gold"
          >
            <Calendar className="h-4 w-4" />
            <span>Book a Consultation</span>
          </Link>

          <a
            href={waLink(`Namaste Dr. Anameka, I am visiting your "${title}" page and have a question.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !py-2.5 !px-5 text-xs sm:text-sm"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

        {/* Sub-page custom interactive tabs or filters */}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
