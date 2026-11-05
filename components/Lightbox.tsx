"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";

export interface LightboxItem { src?: string; alt: string; caption?: string; embed?: string }

export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const go = useCallback((d: number) => index !== null && onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);
  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [index, go, onClose]);
  const it = index !== null ? items[index] : null;
  return (
    <AnimatePresence>
      {it && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-plum-deep/95 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          role="dialog" aria-modal="true" aria-label={it.alt} onClick={onClose}>
          <button className="absolute right-4 top-4 rounded-full p-2 text-ivory hover:bg-white/10" aria-label="Close" autoFocus><X className="h-7 w-7" /></button>
          {items.length > 1 && <>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-3 rounded-full p-3 text-ivory hover:bg-white/10" aria-label="Previous"><ChevronLeft className="h-7 w-7" /></button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-3 rounded-full p-3 text-ivory hover:bg-white/10" aria-label="Next"><ChevronRight className="h-7 w-7" /></button>
          </>}
          <motion.figure key={index} initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {it.embed ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black"><iframe src={it.embed} title={it.alt} className="h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.src} alt={it.alt} className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain" />
            )}
            {it.caption && <figcaption className="mt-4 text-center text-ivory/80">{it.caption}</figcaption>}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
