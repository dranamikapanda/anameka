import Image from "next/image";
import { YantraLines } from "./YantraLines";

/**
 * Royal arched portrait frame with full-aspect preservation.
 * Ensures Dr. Anameka's portrait is NEVER cropped or partially cut off.
 */
export function Portrait({
  src,
  priority = false,
  className = "",
  fit = "contain",
  aspect = "aspect-[412/740]",
}: {
  src?: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  aspect?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-2 border-gold/40 bg-gradient-to-b from-gold/30 via-plum-soft/20 to-plum-deep/40 p-2.5 shadow-luxury transition-all duration-500 hover:border-gold hover:shadow-gold-glow ${aspect} ${className}`}
    >
      {/* Sacred ornamental inner border */}
      <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[1.6rem] border border-gold/30 bg-gradient-to-b from-plum-deep/90 via-plum/80 to-plum-darkest flex items-end justify-center">
        {/* Soft celestial aura glow behind portrait */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(242,199,102,0.18)_0%,transparent_70%)] pointer-events-none" />

        {src ? (
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt="Dr. Anameka S Panda"
              fill
              priority={priority}
              sizes="(min-width:1024px) 35vw, 85vw"
              className={
                fit === "contain"
                  ? "object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.02]"
                  : "object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              }
            />
          </div>
        ) : (
          <div className="grid h-full place-items-center text-center p-6">
            <YantraLines className="absolute inset-0 m-auto h-[75%] text-gold/25" />
            <p className="relative max-w-[14rem] text-sm text-ivory/80 font-medium">
              Portrait placeholder. Upload Dr. Anameka’s photograph in Admin → Settings.
            </p>
          </div>
        )}

        {/* Subtle gold ornamental arch rim */}
        <div className="pointer-events-none absolute inset-0 rounded-t-[999px] rounded-b-[1.6rem] ring-1 ring-inset ring-gold/25" />
      </div>
    </div>
  );
}
