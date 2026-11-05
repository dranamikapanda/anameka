import Image from "next/image";
import { cn } from "@/lib/utils";

/** Uses the official logo from Admin → Settings. Until uploaded, shows a typographic placeholder. */
export function Logo({ src, light = false, className }: { src?: string; light?: boolean; className?: string }) {
  if (src) return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image src={src} alt="" width={44} height={44} className="h-10 w-10 sm:h-11 sm:w-11" priority unoptimized={src.endsWith(".svg")} />
      <span className={cn("font-display text-[1.35rem] leading-none", light ? "text-ivory" : "text-plum")}>Dr. Anameka <span className="whitespace-nowrap">S Panda</span></span>
    </span>
  );
  return (
    <span className={cn("flex items-center gap-3", className)} title="Placeholder – upload the official logo in Admin → Settings">
      <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="#C8912F" strokeWidth="1" />
        <path d="M20 4 34 28H6Z M20 36 6 12h28Z" fill="none" stroke="#C8912F" strokeWidth="1" />
        <circle cx="20" cy="20" r="2.2" fill="#C8912F" />
      </svg>
      <span className={cn("font-display text-[1.35rem] leading-none", light ? "text-ivory" : "text-plum")}>
        Dr. Anameka <span className="whitespace-nowrap">S Panda</span>
      </span>
    </span>
  );
}
