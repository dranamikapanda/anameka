"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ZoomIn, MessageCircle } from "lucide-react";
import { Lightbox } from "./Lightbox";
import type { GalleryItem } from "@/lib/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { waLink } from "@/lib/env";

export const galleryCategories: Record<string, string> = {
  all: "All photographs & media",
  events: "Events & workshops",
  consultations: "Consultations",
  achievements: "Achievements & honors",
  professional: "Professional portraits",
};

export function GalleryGrid({ items, limit }: { items: GalleryItem[]; limit?: number }) {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(
    () => (cat === "all" ? items : items.filter((i) => i.category === cat)).slice(0, limit),
    [items, cat, limit]
  );

  const presentCategories = ["all", "events", "consultations", "achievements", "professional"].filter(
    (c) => c === "all" || items.some((i) => i.category === c)
  );

  return (
    <>
      {/* Category filter pills */}
      {!limit && presentCategories.length > 1 && (
        <div role="tablist" aria-label="Gallery category" className="mb-10 flex flex-wrap gap-2.5">
          {presentCategories.map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={cat === k}
              onClick={() => {
                setCat(k);
                track("gallery_interaction", { action: "filter", category: k });
              }}
              className={cn(
                "rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300",
                cat === k
                  ? "border border-gold bg-gradient-to-r from-plum to-plum-deep text-ivory shadow-soft"
                  : "border border-gold/30 bg-white/70 text-plum hover:border-gold hover:bg-cream"
              )}
            >
              {galleryCategories[k] ?? k}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid rendering exact native aspect ratios */}
      <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {list.map((it, idx) => (
          <li key={it.id || it.image_url} className="mb-6 break-inside-avoid">
            <div className="group relative overflow-hidden rounded-3xl border border-gold/30 bg-white p-3 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(idx);
                  track("gallery_interaction", { action: "open", item: it.title });
                }}
                className="relative block w-full overflow-hidden rounded-2xl bg-cream/40"
                aria-label={`Open ${it.title}`}
              >
                <Image
                  src={it.image_url}
                  alt={it.alt}
                  width={it.width ?? 1000}
                  height={it.height ?? 1400}
                  sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Hover overlay with zoom button */}
                <div className="absolute inset-0 flex items-center justify-center bg-plum-deep/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-plum-deep/95 px-4 py-2 text-xs font-semibold text-gold-light shadow-xl">
                    <ZoomIn className="h-4 w-4" />
                    <span>View image</span>
                  </span>
                </div>
              </button>

              {/* Title & WhatsApp Inquiry */}
              <div className="mt-3.5 px-2 pb-1 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold text-plum truncate">
                    {it.title}
                  </h3>
                  <p className="text-xs text-charcoal/60 capitalize">
                    {galleryCategories[it.category] ?? it.category}
                  </p>
                </div>

                <a
                  href={waLink(`Namaste Dr. Anameka, I am inquiring about "${it.title}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Ask on WhatsApp"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-whatsapp/40 bg-whatsapp/10 text-whatsapp-dark transition-all hover:bg-whatsapp hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Fullscreen Lightbox ensuring full image is visible */}
      <Lightbox
        items={list.map((i) => ({ src: i.image_url, alt: i.alt, caption: i.title }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
