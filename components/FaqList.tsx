import { Plus } from "lucide-react";
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-gold/25 border-y border-gold/25">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.45rem] text-plum [&::-webkit-details-marker]:hidden">
            <h3 className="text-[1.45rem] font-medium">{f.q}</h3>
            <Plus className="mt-1.5 h-5 w-5 shrink-0 text-gold transition group-open:rotate-45" />
          </summary>
          <p className="mt-3 max-w-prose leading-relaxed text-charcoal/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
