import { Breadcrumbs } from "./Breadcrumbs";
import { YantraLines } from "./YantraLines";

/** Inner-page header. Cream, left-aligned, with a faint yantra drawn off the right edge. */
export function PageHero({ title, intro, crumbs, children }: { title: string; intro?: string; crumbs: { name: string; path: string }[]; children?: React.ReactNode }) {
  return (
    <section className="grain relative overflow-hidden bg-cream pb-12 pt-28 sm:pb-16 sm:pt-36 md:pb-20 md:pt-44">
      <YantraLines className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 text-gold/25 md:-right-24" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-4xl">{title}</h1>
        {intro && <p className="lede mt-6">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
