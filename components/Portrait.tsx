import Image from "next/image";
import { YantraLines } from "./YantraLines";

/** Arched portrait frame. Shows a marked placeholder until a photograph is uploaded in Admin → Settings. */
export function Portrait({ src, priority = false, className = "" }: { src?: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl border border-gold/40 bg-plum-soft/20 p-2 ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[20px] bg-cream">
        {src ? <Image src={src} alt="Dr. Anameka S Panda" fill priority={priority} sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
          : <div className="grid h-full place-items-center text-center">
              <YantraLines className="absolute inset-0 m-auto h-[80%] text-gold/30" />
              <p className="relative max-w-[14rem] px-4 text-sm text-plum/70">Portrait placeholder. Upload Dr. Anameka's photograph in Admin → Settings.</p>
            </div>}
      </div>
    </div>
  );
}
