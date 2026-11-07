import Image from "next/image";
import { YantraLines } from "./YantraLines";

/**
 * Premium Luxury Portrait Frame for Dr. Anameka S Panda.
 * Preserves 100% of the photograph without any harsh arch clipping, zooming, or cutoffs.
 */
export function Portrait({
  src,
  priority = false,
  className = "",
  variant = "full",
}: {
  src?: string;
  priority?: boolean;
  className?: string;
  variant?: "full" | "avatar";
  fit?: "cover" | "contain";
  aspect?: string;
}) {
  if (variant === "avatar") {
    return (
      <div
        className={`group relative aspect-square overflow-hidden rounded-full border-2 border-gold/60 bg-gradient-to-br from-gold/30 via-cream to-plum/20 p-1 shadow-gold-glow ${className}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full bg-cream">
          {src ? (
            <Image
              src={src}
              alt="Dr. Anameka S Panda"
              fill
              priority={priority}
              sizes="120px"
              className="object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center bg-cream">
              <YantraLines className="h-4/5 w-4/5 text-gold/40" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-gold/45 bg-gradient-to-b from-gold/30 via-plum-deep/30 to-plum-darkest/60 p-2 sm:p-2.5 shadow-luxury transition-all duration-500 hover:border-gold hover:shadow-gold-glow ${className}`}
    >
      {/* Inner ornamental card with warm sacred aura */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-gold/30 bg-gradient-to-b from-white/95 via-cream/90 to-ivory/95 shadow-inner">
        {/* Soft celestial radial radiance behind portrait */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(242,199,102,0.18)_0%,transparent_70%)]" />

        {/* Corner filigree accents */}
        <div className="pointer-events-none absolute top-2 left-2 h-3.5 w-3.5 border-t-2 border-l-2 border-gold/60 rounded-tl-sm" />
        <div className="pointer-events-none absolute top-2 right-2 h-3.5 w-3.5 border-t-2 border-r-2 border-gold/60 rounded-tr-sm" />
        <div className="pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-gold/60 rounded-bl-sm" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-gold/60 rounded-br-sm" />

        {src ? (
          <div className="relative w-full overflow-hidden">
            <Image
              src={src}
              alt="Dr. Anameka S Panda - Vedic Astrologer, Vastu & Graphology Consultant"
              width={412}
              height={740}
              priority={priority}
              sizes="(min-width:1024px) 380px, (min-width:640px) 340px, 90vw"
              className="h-auto w-full block object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </div>
        ) : (
          <div className="grid aspect-[412/740] place-items-center p-6 text-center">
            <YantraLines className="absolute inset-0 m-auto h-[75%] text-gold/25" />
            <p className="relative max-w-[14rem] text-sm font-medium text-plum/80">
              Portrait placeholder. Upload Dr. Anameka’s photograph in Admin → Settings.
            </p>
          </div>
        )}

        {/* Subtle gold inner rim */}
        <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-gold/25" />
      </div>
    </div>
  );
}
