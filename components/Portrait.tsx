import Image from "next/image";
import { YantraLines } from "./YantraLines";

/**
 * Refined Luxury Portrait Frame for Dr. Anameka S Panda.
 * Uses a classic 4:5 executive editorial aspect ratio so the photograph
 * is perfectly balanced, elegant, and not overwhelmingly tall.
 */
export function Portrait({
  src,
  priority = false,
  className = "",
  variant = "full",
  aspect = "aspect-[4/5]",
}: {
  src?: string;
  priority?: boolean;
  className?: string;
  variant?: "full" | "avatar";
  aspect?: string;
  fit?: "cover" | "contain";
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
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/45 bg-gradient-to-b from-gold/30 via-gold/10 to-plum-deep/30 p-1.5 sm:p-2 shadow-luxury transition-all duration-500 hover:border-gold hover:shadow-gold-glow ${className}`}
    >
      {/* Inner card with classic luxury 4:5 executive editorial framing */}
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-xl sm:rounded-2xl border border-gold/30 bg-gradient-to-b from-cream/95 to-ivory shadow-inner`}
      >
        {/* Soft celestial radial radiance */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(242,199,102,0.15)_0%,transparent_70%)]" />

        {/* Delicate gold filigree corner brackets */}
        <div className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-gold/60 rounded-tl-sm z-10" />
        <div className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-gold/60 rounded-tr-sm z-10" />
        <div className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-gold/60 rounded-bl-sm z-10" />
        <div className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-gold/60 rounded-br-sm z-10" />

        {src ? (
          <Image
            src={src}
            alt="Dr. Anameka S Panda - Vedic Astrologer, Vastu & Graphology Consultant"
            fill
            priority={priority}
            sizes="(min-width:1024px) 320px, (min-width:640px) 280px, 90vw"
            className="object-cover object-[center_12%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center">
            <YantraLines className="absolute inset-0 m-auto h-[75%] text-gold/25" />
            <p className="relative max-w-[14rem] text-sm font-medium text-plum/80">
              Portrait placeholder. Upload Dr. Anameka’s photograph in Admin → Settings.
            </p>
          </div>
        )}

        {/* Subtle gold inner rim */}
        <div className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-gold/25 z-10" />
      </div>
    </div>
  );
}
