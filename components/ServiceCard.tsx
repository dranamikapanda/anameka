import Link from "next/link";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/types";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group relative flex h-full flex-col border-t border-gold/40 pt-6 transition-colors">
      <ServiceIcon name={s.icon} className="h-9 w-9 text-gold transition-transform duration-500 group-hover:-rotate-6" />
      <h3 className="mt-5 text-[1.75rem] leading-tight">
        <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 group-hover:text-gold-deep">{s.title}</Link>
      </h3>
      <p className="mt-3 flex-1 text-charcoal/75">{s.short_description}</p>
      <span className="mt-5 text-sm font-medium text-plum underline decoration-gold/60 underline-offset-4 group-hover:decoration-gold">Learn more about {s.title.toLowerCase()}</span>
    </article>
  );
}
