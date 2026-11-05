"use client";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Client-side search and category filter. Renders the cards passed from the server. */
export function BlogBrowser({ posts, categories, cards, featured }: { posts: BlogPost[]; categories: { slug: string; name: string }[]; cards: Record<string, React.ReactNode>; featured?: { slug: string; node: React.ReactNode } }) {
  const [q, setQ] = useState("");
  const [cat, setCatState] = useState("");
  const [tag, setTag] = useState("");
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setQ(p.get("q") ?? ""); setCatState(p.get("category") ?? ""); setTag(p.get("tag") ?? "");
  }, []);
  const setCat = (c: string) => {
    setCatState(c); setTag("");
    const p = new URLSearchParams(window.location.search);
    if (c) p.set("category", c); else p.delete("category");
    p.delete("tag");
    window.history.replaceState(null, "", `/blog${p.toString() ? `?${p}` : ""}`);
  };
  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter((p) => (!cat || p.category_slug === cat) && (!tag || p.tags.includes(tag)) &&
      (!term || [p.title, p.excerpt, ...p.tags].join(" ").toLowerCase().includes(term)));
  }, [posts, q, cat, tag]);
  const filtering = Boolean(q.trim() || cat || tag);
  const showFeatured = featured && !filtering;
  const grid = showFeatured ? list.filter((p) => p.slug !== featured.slug) : list;
  const used = categories.filter((c) => posts.some((p) => p.category_slug === c.slug));
  return (
    <>
      {showFeatured && <div className="mb-20 max-w-4xl">{featured.node}</div>}
      <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Category">
          {[{ slug: "", name: "All topics" }, ...used].map((c) => (
            <button key={c.slug} role="tab" aria-selected={cat === c.slug} onClick={() => setCat(c.slug)}
              className={cn("rounded-full border px-4 py-2 text-sm transition", cat === c.slug ? "border-plum bg-plum text-ivory" : "border-gold/40 text-plum hover:bg-cream")}>{c.name}</button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/75" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles" className="field !pl-11" />
        </label>
      </div>
      {tag && <p className="mb-8 text-charcoal/70">Showing articles tagged “{tag}”. <button className="text-plum underline decoration-gold" onClick={() => setCat(cat)}>Clear tag</button></p>}
      {grid.length === 0 && !showFeatured ? <p className="text-charcoal/75" role="status">No articles match “{q}”. Try a different word or choose another topic.</p>
        : <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">{grid.map((p) => <div key={p.slug}>{cards[p.slug]}</div>)}</div>}
    </>
  );
}
