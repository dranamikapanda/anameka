"use client";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./Lightbox";

export function FlyerViewer({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <button onClick={() => setOpen(0)} className="group block w-full overflow-hidden rounded-2xl border border-gold/30" aria-label={`View ${alt}`}>
        <Image src={src} alt={alt} width={600} height={900} sizes="(min-width:1024px) 22rem, 90vw" className="h-auto w-full transition duration-700 group-hover:scale-[1.02]" />
      </button>
      <Lightbox items={[{ src, alt, caption: alt }]} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
