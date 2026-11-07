import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/env";
import type { Programme } from "@/lib/types";

export function ProgrammeCard({ p, dark = false }: { p: Programme; dark?: boolean }) {
  const waMessage = `Hello Dr. Anameka, I would like to inquire about the ${p.title} programme.`;

  return (
    <article
      className={`group relative flex h-full flex-col justify-between rounded-3xl p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 ${
        dark
          ? "border border-gold/30 bg-gradient-to-br from-plum-deep via-plum to-plum-darkest text-ivory shadow-luxury hover:border-gold/60"
          : "border border-gold/30 bg-white/90 text-charcoal shadow-soft hover:border-gold hover:shadow-gold-glow"
      }`}
    >
      <div>
        {/* Audience badge */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium border ${
              dark
                ? "border-gold/40 bg-gold/15 text-gold-light"
                : "border-gold/30 bg-gold/10 text-gold-deep"
            }`}
          >
            {p.audience}
          </span>
          {p.price_note && (
            <span
              className={`text-xs font-semibold ${
                dark ? "text-gold-light" : "text-plum"
              }`}
            >
              {p.price_note}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`mt-5 font-display text-[1.75rem] leading-tight transition-colors ${
            dark ? "text-ivory group-hover:text-gold-light" : "text-plum group-hover:text-gold-deep"
          }`}
        >
          <Link href={`/programmes/${p.slug}`}>
            {p.title}
          </Link>
        </h3>

        {/* Summary */}
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            dark ? "text-ivory/80" : "text-charcoal/75"
          }`}
        >
          {p.summary}
        </p>
      </div>

      {/* Card Actions */}
      <div
        className={`mt-7 flex items-center justify-between border-t pt-4 ${
          dark ? "border-gold/20" : "border-gold/20"
        }`}
      >
        <Link
          href={`/programmes/${p.slug}`}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
            dark ? "text-gold-light hover:text-white" : "text-plum hover:text-gold-deep"
          }`}
        >
          <span>Programme details</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* 1-tap WhatsApp consultation query */}
        <a
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Inquire about ${p.title} on WhatsApp`}
          className="inline-flex items-center gap-1.5 rounded-full border border-whatsapp/40 bg-whatsapp/15 px-3 py-1.5 text-xs font-medium text-whatsapp transition-all hover:bg-whatsapp hover:text-white"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          <span>Ask</span>
        </a>
      </div>
    </article>
  );
}
