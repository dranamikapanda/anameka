"use client";
import Image from "next/image";
import { useState } from "react";
import { ZoomIn, MessageCircle } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { waLink } from "@/lib/env";

export function FlyerViewer({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(0)}
        className="group relative block w-full overflow-hidden rounded-2xl border-2 border-gold/30 bg-cream/30 p-2 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow"
        aria-label={`View full resolution ${alt}`}
      >
        <div className="relative overflow-hidden rounded-xl bg-plum-deep/5 flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={600}
            height={900}
            sizes="(min-width:1024px) 24rem, 90vw"
            className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />

          {/* Hover zoom overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-plum-deep/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-plum-deep/90 px-4 py-2 text-xs font-semibold text-gold-light shadow-xl">
              <ZoomIn className="h-4 w-4" />
              <span>Tap to expand full flyer</span>
            </span>
          </div>
        </div>
      </button>

      {/* Quick 1-tap query for this flyer */}
      <a
        href={waLink(`Namaste Dr. Anameka, I saw the flyer for "${alt}" on your website and would like details.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-whatsapp/40 bg-whatsapp/15 px-3 py-2 text-xs font-medium text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
      >
        <MessageCircle className="h-3.5 w-3.5 fill-current" />
        <span>Ask about this flyer on WhatsApp</span>
      </a>

      <Lightbox
        items={[{ src, alt, caption: alt }]}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </div>
  );
}
