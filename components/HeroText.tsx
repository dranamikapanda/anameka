import Link from "next/link";

/** The page's one orchestrated moment, in pure CSS: headline lines settle, then the subheading and actions fade up. */
export function HeroText({ headline, sub }: { headline: string; sub: string }) {
  const lines = headline.split(/(?<=\.)\s+/);
  return (
    <div>
      <h1 className="text-ivory">
        {lines.map((l, i) => (
          <span key={l} style={{ animationDelay: `${i * 120}ms` }}
            className={`block animate-[settle_1.1s_cubic-bezier(.2,.7,.2,1)_both] ${i === 1 ? "pl-[0.6em] text-gold-light" : ""} ${i === 2 ? "pl-[1.2em]" : ""}`}>{l}</span>
        ))}
      </h1>
      <p style={{ animationDelay: "350ms" }} className="mt-8 max-w-lg animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both] text-lg leading-relaxed text-ivory/75">{sub}</p>
      <div style={{ animationDelay: "500ms" }} className="mt-10 flex animate-[rise_.9s_cubic-bezier(.2,.7,.2,1)_both] flex-col gap-3 sm:flex-row">
        <Link href="/book-consultation" className="btn-gold">Book a consultation</Link>
        <Link href="/services" className="btn-ghost-light">Explore our services</Link>
      </div>
    </div>
  );
}
