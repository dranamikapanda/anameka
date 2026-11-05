import Link from "next/link";
import type { Programme } from "@/lib/types";

export function ProgrammeCard({ p, dark = false }: { p: Programme; dark?: boolean }) {
  return (
    <article className={`group relative flex h-full flex-col rounded-[1.75rem] p-7 transition-shadow duration-500 hover:shadow-soft ${dark ? "bg-plum-deep text-ivory" : "border border-gold/30 bg-white"}`}>
      <p className={`text-sm ${dark ? "text-gold-light" : "text-gold-deep"}`}>{p.audience}</p>
      <h3 className={`mt-3 text-[1.85rem] leading-tight ${dark ? "text-ivory" : ""}`}>
        <Link href={`/programmes/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
      </h3>
      <p className={`mt-3 flex-1 ${dark ? "text-ivory/75" : "text-charcoal/75"}`}>{p.summary}</p>
      {p.price_note && <p className={`mt-5 text-sm ${dark ? "text-ivory/70" : "text-plum"}`}>{p.price_note}</p>}
      <span className={`mt-5 text-sm font-medium underline underline-offset-4 ${dark ? "text-gold-light decoration-gold/60" : "text-plum decoration-gold/60 group-hover:decoration-gold"}`}>About the programme</span>
    </article>
  );
}
