"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, MessageCircle } from "lucide-react";
import { useCallback, useEffect } from "react";
import { waLink } from "@/lib/env";

export interface LightboxItem {
  src?: string;
  alt: string;
  caption?: string;
  embed?: string;
}

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const go = useCallback(
    (d: number) => index !== null && onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex]
  );

  useEffect(() => {
    if (index === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [index, go, onClose]);

  const it = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {it && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-plum-deep/96 p-4 sm:p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={it.alt}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            className="absolute right-4 top-4 z-10 rounded-full border border-gold/30 bg-plum-deep/80 p-2.5 text-ivory hover:bg-gold/20 hover:text-gold-light transition-colors"
            aria-label="Close"
            autoFocus
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation arrows */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-3 sm:left-6 z-10 rounded-full border border-gold/30 bg-plum-deep/80 p-3 text-ivory hover:bg-gold/20 hover:text-gold-light transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-3 sm:right-6 z-10 rounded-full border border-gold/30 bg-plum-deep/80 p-3 text-ivory hover:bg-gold/20 hover:text-gold-light transition-all"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Main content frame */}
          <motion.figure
            key={index}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex flex-col items-center justify-center max-h-[92vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {it.embed ? (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl border border-gold/30">
                <iframe
                  src={it.embed}
                  title={it.alt}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={it.src}
                alt={it.alt}
                className="mx-auto max-h-[75vh] w-auto max-w-full rounded-2xl border border-gold/40 object-contain shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]"
              />
            )}

            {/* Caption & WhatsApp action */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-xl text-center sm:text-left px-4">
              <div>
                {it.caption && (
                  <p className="font-display text-base text-gold-light font-medium">
                    {it.caption}
                  </p>
                )}
                <p className="text-xs text-ivory/70">{it.alt}</p>
              </div>

              {it.src && (
                <a
                  href={waLink(`Namaste Dr. Anameka, I am inquiring about "${it.caption || it.alt}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp !py-2 !px-4 text-xs shrink-0"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </a>
              )}
            </div>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
