import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export function Breadcrumbs({ items, light = false }: { items: { name: string; path: string }[]; light?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className={light ? "text-sm text-ivory/70" : "text-sm text-charcoal/75"}>
        <ol className="flex flex-wrap items-center gap-2">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="text-gold">/</span>}
              {i === all.length - 1 ? <span aria-current="page" className={light ? "text-ivory/85" : "text-plum"}>{it.name}</span>
                : <Link href={it.path} className="hover:text-gold">{it.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
