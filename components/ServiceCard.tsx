import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import { waLink } from "@/lib/env";
import type { Service } from "@/lib/types";

export function ServiceCard({ s }: { s: Service }) {
  const waMessage = `Hello Dr. Anameka, I would like to inquire about the ${s.title} consultation.`;

  return (
    <article className="group relative flex h-full flex-col justify-between rounded-3xl border border-gold/30 bg-white/90 p-5 sm:p-7 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1.5">
      <div>
        {/* Top bar with icon and category badge */}
        <div className="flex items-center justify-between">
          <div className="grid h-13 w-13 place-items-center rounded-2xl border border-gold/40 bg-gradient-to-br from-cream to-ivory text-gold transition-all duration-300 group-hover:bg-gold/15 group-hover:scale-105 p-2.5">
            <ServiceIcon
              name={s.icon}
              className="h-7 w-7 text-gold-deep transition-transform duration-500 group-hover:-rotate-6"
            />
          </div>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-deep">
            Personal Consultation
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-[1.65rem] leading-tight font-display text-plum transition-colors group-hover:text-gold-deep">
          <Link href={`/services/${s.slug}`} className="focus:outline-none">
            {s.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-charcoal/75">
          {s.short_description}
        </p>
      </div>

      {/* Card actions */}
      <div className="mt-7 flex items-center justify-between border-t border-gold/20 pt-4">
        <Link
          href={`/services/${s.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-plum transition-colors hover:text-gold-deep"
        >
          <span>Explore details</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* 1-tap WhatsApp consultation query */}
        <a
          href={waLink(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          title={`Inquire about ${s.title} on WhatsApp`}
          className="inline-flex items-center gap-1.5 rounded-full border border-whatsapp/40 bg-whatsapp/10 px-3 py-1.5 text-xs font-medium text-whatsapp-dark transition-all hover:bg-whatsapp hover:text-white"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          <span>Ask</span>
        </a>
      </div>
    </article>
  );
}
