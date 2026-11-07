"use client";
import Image from "next/image";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import { Lightbox, type LightboxItem } from "./Lightbox";
import type { Testimonial } from "@/lib/types";
import { youtubeId, cn } from "@/lib/utils";

const kinds = [["all", "All"], ["written", "Written"], ["whatsapp", "WhatsApp"], ["video", "Video"]] as const;

export function TestimonialBrowser({ items, services }: { items: Testimonial[]; services: { slug: string; title: string }[] }) {
  const [kind, setKind] = useState<string>("all");
  const [svc, setSvc] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => items.filter((t) => (kind === "all" || t.kind === kind) && (!svc || t.service_slug === svc)), [items, kind, svc]);
  const media: LightboxItem[] = list.map((t) => {
    const yt = t.video_url ? youtubeId(t.video_url) : null;
    return { alt: `Testimonial from ${t.client_name}`, caption: t.client_name, src: t.image_url ?? undefined, embed: yt ? `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1` : t.video_url ?? undefined };
  });
  return (
    <>
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div role="tablist" aria-label="Testimonial type" className="flex flex-wrap gap-2">
          {kinds.map(([k, l]) => (
            <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)}
              className={cn("rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition", kind === k ? "border-plum bg-plum text-ivory" : "border-gold/40 text-plum hover:bg-cream")}>{l}</button>
          ))}
        </div>
        <div className="w-full sm:w-auto">
          <label className="sr-only" htmlFor="t-svc">Filter by service</label>
          <select id="t-svc" value={svc} onChange={(e) => setSvc(e.target.value)} className="field w-full sm:!w-auto !py-2 text-sm">
            <option value="">All services</option>{services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
        </div>
      </div>
      {list.length === 0 ? <p className="text-charcoal/75">No testimonials match these filters yet.</p> : (
        <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {list.map((t, idx) => (
            <li key={t.id} className="mb-6 break-inside-avoid rounded-3xl border border-gold/20 bg-white p-6">
              {t.kind === "written" && <blockquote className="font-display text-xl italic leading-relaxed text-plum">“{t.quote}”</blockquote>}
              {t.kind === "whatsapp" && t.image_url && (
                <button onClick={() => setOpen(idx)} className="block w-full overflow-hidden rounded-2xl" aria-label={`View WhatsApp message from ${t.client_name}`}>
                  <Image src={t.image_url} alt={`WhatsApp message from ${t.client_name}`} width={600} height={900} className="h-auto w-full" sizes="(min-width:1024px) 33vw, 100vw" />
                </button>
              )}
              {t.kind === "video" && (
                <button onClick={() => setOpen(idx)} className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-plum" aria-label={`Play video from ${t.client_name}`}>
                  {t.video_url && youtubeId(t.video_url) && <Image src={`https://img.youtube.com/vi/${youtubeId(t.video_url)}/hqdefault.jpg`} alt="" fill className="object-cover opacity-80 transition group-hover:opacity-100" sizes="33vw" />}
                  <span className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-white shadow-gold"><Play className="ml-0.5 h-6 w-6" /></span></span>
                </button>
              )}
              {t.kind !== "written" && t.quote && <p className="mt-4 text-charcoal/80">{t.quote}</p>}
              <p className="mt-4 text-sm text-charcoal/75"><span className="font-medium text-plum">{t.client_name}</span>{t.client_location && `, ${t.client_location}`}</p>
            </li>
          ))}
        </ul>
      )}
      <Lightbox items={media} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
