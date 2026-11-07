import { Plus } from "lucide-react";

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-gold/25 border-y border-gold/25">
      {items.map((f) => (
        <details key={f.q} className="group py-4 sm:py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg sm:text-[1.35rem] md:text-[1.45rem] text-plum [&::-webkit-details-marker]:hidden">
            <h3 className="min-w-0 flex-1 font-medium leading-snug break-words">{f.q}</h3>
            <Plus className="mt-1 h-5 w-5 shrink-0 text-gold transition duration-200 group-open:rotate-45" />
          </summary>
          <p className="mt-3 max-w-prose text-sm sm:text-base leading-relaxed text-charcoal/80 break-words">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
