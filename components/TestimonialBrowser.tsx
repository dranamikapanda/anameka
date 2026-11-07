"use client";
import Image from "next/image";
import { Play, Star, Quote, CheckCircle2, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";
import type { Testimonial } from "@/lib/types";
import { youtubeId, cn } from "@/lib/utils";
import { waLink } from "@/lib/env";

const kinds = [
  ["all", "All Reviews"],
  ["written", "Verified Reviews"],
  ["whatsapp", "WhatsApp Feedback"],
  ["video", "Video Experiences"],
] as const;

export function TestimonialBrowser({
  items,
  services,
}: {
  items: Testimonial[];
  services: { slug: string; title: string }[];
}) {
  const [kind, setKind] = useState<string>("all");
  const [svc, setSvc] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(
    () =>
      items.filter(
        (t) =>
          (kind === "all" || t.kind === kind) &&
          (!svc || t.service_slug === svc)
      ),
    [items, kind, svc]
  );

  const media: LightboxItem[] = list.map((t) => {
    const yt = t.video_url ? youtubeId(t.video_url) : null;
    return {
      alt: `Testimonial from ${t.client_name}`,
      caption: t.client_name,
      src: t.image_url ?? undefined,
      embed: yt
        ? `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1`
        : t.video_url ?? undefined,
    };
  });

  const getServiceTitle = (slug?: string | null) =>
    services.find((s) => s.slug === slug)?.title;

  return (
    <>
      {/* Filters Toolbar */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gold/20 pb-6">
        <div role="tablist" aria-label="Testimonial type" className="flex flex-wrap gap-2">
          {kinds.map(([k, l]) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300",
                kind === k
                  ? "border-gold bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-soft"
                  : "border-gold/30 bg-white/80 text-plum hover:border-gold hover:bg-cream"
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-auto">
          <label className="sr-only" htmlFor="t-svc">
            Filter by service
          </label>
          <select
            id="t-svc"
            value={svc}
            onChange={(e) => setSvc(e.target.value)}
            className="field w-full sm:!w-auto !py-2 text-xs sm:text-sm rounded-full border-gold/30"
          >
            <option value="">All Services</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gold/40 bg-white/60 p-12 text-center">
          <p className="text-charcoal/75">No testimonials match these filters yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {list.map((t, idx) => (
            <article
              key={t.id}
              className="flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/95 p-6 sm:p-7 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1"
            >
              <div>
                {/* 5 Stars & Discipline Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-gold-light">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>

                  {t.service_slug && (
                    <span className="rounded-full border border-gold/25 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold-deep truncate max-w-[140px]">
                      {getServiceTitle(t.service_slug)}
                    </span>
                  )}
                </div>

                {/* Quote */}
                {t.kind === "written" && (
                  <blockquote className="font-display text-lg sm:text-xl italic leading-relaxed text-plum">
                    “{t.quote}”
                  </blockquote>
                )}

                {t.kind === "whatsapp" && t.image_url && (
                  <button
                    onClick={() => setOpen(idx)}
                    className="block w-full overflow-hidden rounded-2xl border border-gold/25"
                    aria-label={`View WhatsApp message from ${t.client_name}`}
                  >
                    <Image
                      src={t.image_url}
                      alt={`WhatsApp message from ${t.client_name}`}
                      width={600}
                      height={900}
                      className="h-auto w-full object-contain"
                      sizes="(min-width:1024px) 33vw, 100vw"
                    />
                  </button>
                )}

                {t.kind === "video" && (
                  <button
                    onClick={() => setOpen(idx)}
                    className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-plum"
                    aria-label={`Play video from ${t.client_name}`}
                  >
                    {t.video_url && youtubeId(t.video_url) && (
                      <Image
                        src={`https://img.youtube.com/vi/${youtubeId(t.video_url)}/hqdefault.jpg`}
                        alt=""
                        fill
                        className="object-cover opacity-80 transition group-hover:opacity-100"
                        sizes="33vw"
                      />
                    )}
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-white shadow-gold">
                        <Play className="ml-0.5 h-5 w-5 fill-current" />
                      </span>
                    </span>
                  </button>
                )}

                {t.kind !== "written" && t.quote && (
                  <p className="mt-4 text-sm leading-relaxed text-charcoal/80">{t.quote}</p>
                )}
              </div>

              {/* Client Info Strip */}
              <div className="mt-6 border-t border-gold/20 pt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-gold/15 text-gold-deep font-display font-semibold text-sm shrink-0">
                    {t.client_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-plum flex items-center gap-1.5">
                      <span>{t.client_name}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-whatsapp shrink-0" />
                    </p>
                    {t.client_location && (
                      <p className="text-xs text-charcoal/60">{t.client_location}</p>
                    )}
                  </div>
                </div>

                <a
                  href={waLink(`Namaste Dr. Anameka, I saw the client review from ${t.client_name} and would like to consult with you.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ask on WhatsApp"
                  className="grid h-8 w-8 place-items-center rounded-full border border-whatsapp/40 bg-whatsapp/10 text-whatsapp-dark transition-all hover:bg-whatsapp hover:text-white shrink-0"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-current" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <Lightbox
        items={media}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
