"use client";
import Link from "next/link";
import { MessageCircle, Phone, ArrowRight, Calendar } from "lucide-react";
import { YantraLines } from "./YantraLines";
import { env, formatPhone, waLink } from "@/lib/env";
import { track } from "@/lib/analytics";

export function CtaBand({
  title = "Bring your questions. Leave with clarity.",
  body = "Consultations are available online worldwide and in person. Share what is on your mind and we'll arrange a dedicated, unhurried time for you.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-plum-deep via-plum to-plum-darkest text-ivory py-14 sm:py-20 md:py-24 border-y border-gold/20">
      <YantraLines className="pointer-events-none absolute -left-32 -top-32 h-[560px] w-[560px] text-gold/15" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="container-x relative grid gap-8 sm:gap-10 md:grid-cols-12 md:items-center">
        <div className="md:col-span-7">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold-light mb-2 sm:mb-3">
            Begin Your Consultation
          </span>
          <h2 className="text-ivory font-display">{title}</h2>
          <p className="mt-3 sm:mt-4 max-w-xl text-sm sm:text-base md:text-lg text-ivory/80 leading-relaxed font-normal">
            {body}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
          {/* Primary Book */}
          <Link href="/book-consultation" className="btn-gold group !py-3 w-full sm:w-auto text-center justify-center">
            <Calendar className="h-4 w-4" />
            <span>Book consultation</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* WhatsApp Direct */}
          <a
            href={waLink("Namaste Dr. Anameka, I would like to schedule a consultation time.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "cta_band" })}
            className="btn-whatsapp !py-3 w-full sm:w-auto text-center justify-center"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Direct Call */}
          <a
            href={`tel:${env.phone}`}
            onClick={() => track("phone_click", { location: "cta_band" })}
            className="btn-ghost-light !py-3 w-full sm:w-auto text-center justify-center"
          >
            <Phone className="h-4 w-4 text-gold-light" />
            <span>{formatPhone(env.phone)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
