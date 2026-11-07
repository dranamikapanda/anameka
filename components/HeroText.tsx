"use client";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

/** Modern Luxury Hero with orchestrated typography, gold accents and instant WhatsApp CTA */
export function HeroText({ headline, sub }: { headline: string; sub: string }) {
  const lines = headline.split(/(?<=\.)\s+/);

  return (
    <div>
      {/* Luxury spiritual badge */}
      <div
        style={{ animationDelay: "100ms" }}
        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-light backdrop-blur-md animate-[rise_.8s_cubic-bezier(.2,.7,.2,1)_both] mb-6"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold-light animate-pulse" />
        <span>Vedic Astrology · Vastu Shastra · Graphology · Life Coaching</span>
      </div>

      {/* Main Title */}
      <h1 className="text-ivory font-display">
        {lines.map((l, i) => (
          <span
            key={l}
            style={{ animationDelay: `${i * 120 + 150}ms` }}
            className={`block animate-[settle_1.1s_cubic-bezier(.2,.7,.2,1)_both] ${
              i === 1
                ? "pl-[0.4em] sm:pl-[0.6em] text-gold-gradient font-normal italic"
                : ""
            } ${i === 2 ? "pl-[0.8em] sm:pl-[1.2em]" : ""}`}
          >
            {l}
          </span>
        ))}
      </h1>

      {/* Subheading */}
      <p
        style={{ animationDelay: "450ms" }}
        className="mt-7 max-w-lg animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both] text-base sm:text-lg leading-relaxed text-ivory/80 font-normal"
      >
        {sub}
      </p>

      {/* Action Buttons: Book + WhatsApp + Explore */}
      <div
        style={{ animationDelay: "600ms" }}
        className="mt-9 flex animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both] flex-wrap items-center gap-3.5"
      >
        <Link href="/book-consultation" className="btn-gold group">
          <span>Book a consultation</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* WhatsApp Instant CTA */}
        <a
          href={waLink("Namaste Dr. Anameka, I would like to schedule a consultation or ask a question.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "hero" })}
          className="btn-whatsapp group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <MessageCircle className="h-4 w-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>

        <Link href="/services" className="btn-ghost-light">
          Explore services
        </Link>
      </div>
    </div>
  );
}
