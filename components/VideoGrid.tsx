"use client";
import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { Lightbox } from "./Lightbox";
import type { Video } from "@/lib/types";
import { track } from "@/lib/analytics";
import { youtubeId } from "@/lib/utils";

export function VideoGrid({ items }: { items: Video[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const embed = (v: Video) => { const id = youtubeId(v.video_url); return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` : v.video_url; };
  const thumb = (v: Video) => v.thumbnail_url || (youtubeId(v.video_url) ? `https://img.youtube.com/vi/${youtubeId(v.video_url)}/hqdefault.jpg` : "");
  return (
    <>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v, i) => (
          <li key={v.id}>
            <button onClick={() => { setOpen(i); track("video_play", { title: v.title }); }} className="group block w-full text-left" aria-label={`Play ${v.title}`}>
              <span className="relative block aspect-video overflow-hidden rounded-2xl bg-plum">
                {thumb(v) && <Image src={thumb(v)} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />}
                <span className="absolute inset-0 grid place-items-center"><span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-white shadow-gold transition group-hover:scale-110"><Play className="ml-0.5 h-6 w-6" /></span></span>
              </span>
              <span className="mt-4 block font-display text-2xl text-plum">{v.title}</span>
              {v.description && <span className="mt-1 block text-charcoal/70">{v.description}</span>}
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items.map((v) => ({ alt: v.title, caption: v.title, embed: embed(v) }))} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
