"use client";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

/** Modern Luxury Hero with orchestrated typography, mobile-safe alignment and instant WhatsApp CTA */
export function HeroText({ headline, sub }: { headline: string; sub: string }) {
  const lines = headline.split(/(?<=\.)\s+/);

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Luxury spiritual badge - fully responsive */}
      <div
        style={{ animationDelay: "100ms" }}
        className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-gold-light backdrop-blur-md animate-[rise_.8s_cubic-bezier(.2,.7,.2,1)_both] mb-4 sm:mb-6 max-w-full"
      >
        <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 text-gold-light animate-pulse" />
        <span className="truncate">
          Spiritual Science · Astrology & Vastu · Healing
        </span>
      </div>

      {/* Main Title - Symmetrical, responsive and clean across all screens */}
      <h1 className="text-ivory font-display tracking-tight text-[1.85rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.12] break-words">
        {lines.map((l, i) => (
          <span
            key={l}
            style={{ animationDelay: `${i * 120 + 150}ms` }}
            className={`block animate-[settle_1.1s_cubic-bezier(.2,.7,.2,1)_both] ${
              i === 1 ? "text-gold-gradient font-normal italic py-0.5" : ""
            }`}
          >
            {l}
          </span>
        ))}
      </h1>

      {/* Subheading */}
      <p
        style={{ animationDelay: "450ms" }}
        className="mt-4 sm:mt-5 max-w-xl animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both] text-sm sm:text-base lg:text-lg leading-relaxed text-ivory/80 font-normal"
      >
        {sub}
      </p>

      {/* Action Buttons: Responsive, non-crowded */}
      <div
        style={{ animationDelay: "600ms" }}
        className="mt-6 sm:mt-8 flex animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both] flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5"
      >
        <Link href="/book-consultation" className="btn-gold group justify-center text-center shadow-md">
          <span>Book a consultation</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* WhatsApp Instant CTA */}
        <a
          href={waLink("Namaste Dr. Anameka, I would like to schedule a consultation or ask a question.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "hero" })}
          className="btn-whatsapp group justify-center text-center shadow-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <MessageCircle className="h-4 w-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>

        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs sm:text-sm font-medium text-gold-light/90 hover:text-ivory transition-colors text-center"
        >
          <span>Explore services</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
