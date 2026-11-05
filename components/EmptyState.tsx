import Link from "next/link";
export function EmptyState({ title, body, cta }: { title: string; body: string; cta?: { href: string; label: string } }) {
  return (
    <div className="rounded-3xl border border-dashed border-gold/40 bg-white/60 px-8 py-14 text-center">
      <h2 className="text-2xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-charcoal/70">{body}</p>
      {cta && <Link href={cta.href} className="btn-ghost mt-6">{cta.label}</Link>}
    </div>
  );
}
