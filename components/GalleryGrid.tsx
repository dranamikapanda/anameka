"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Lightbox } from "./Lightbox";
import type { GalleryItem } from "@/lib/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const galleryCategories: Record<string, string> = {
  professional: "Professional photographs", events: "Events", workshops: "Workshops", consultations: "Consultations",
  "client-interactions": "Client interactions", achievements: "Achievements", "media-coverage": "Media coverage", flyers: "Programme flyers",
};

export function GalleryGrid({ items, limit }: { items: GalleryItem[]; limit?: number }) {
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (cat === "all" ? items : items.filter((i) => i.category === cat)).slice(0, limit), [items, cat, limit]);
  const present = Object.keys(galleryCategories).filter((c) => items.some((i) => i.category === c));
  return (
    <>
      {!limit && present.length > 1 && (
        <div role="tablist" aria-label="Gallery category" className="mb-10 flex flex-wrap gap-2">
          {[["all", "All"], ...present.map((c) => [c, galleryCategories[c]])].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={cat === k} onClick={() => { setCat(k); track("gallery_interaction", { action: "filter", category: k }); }}
              className={cn("rounded-full border px-4 py-2 text-sm transition", cat === k ? "border-plum bg-plum text-ivory" : "border-gold/40 text-plum hover:bg-cream")}>{l}</button>
          ))}
        </div>
      )}
      <ul className="columns-2 gap-4 md:columns-3 md:gap-6">
        {list.map((it, idx) => (
          <li key={it.id} className="mb-4 break-inside-avoid md:mb-6">
            <button onClick={() => { setOpen(idx); track("gallery_interaction", { action: "open", item: it.title }); }} className="group block w-full overflow-hidden rounded-2xl" aria-label={`Open ${it.title}`}>
              <Image src={it.image_url} alt={it.alt} width={it.width ?? 800} height={it.height ?? 1000} sizes="(min-width:768px) 33vw, 50vw"
                className="h-auto w-full transition duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={list.map((i) => ({ src: i.image_url, alt: i.alt, caption: i.title }))} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
