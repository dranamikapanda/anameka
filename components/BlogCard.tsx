import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { YantraLines } from "./YantraLines";

export function BlogCard({ post, categoryName, large = false, level: H = "h3" }: { post: BlogPost; categoryName?: string; large?: boolean; level?: "h2" | "h3" }) {
  return (
    <article className="group relative flex flex-col">
      <div className={`relative overflow-hidden rounded-2xl bg-cream ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {post.cover_url ? <Image src={post.cover_url} alt={post.cover_alt || ""} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
          : <YantraLines className="absolute -right-10 -top-10 h-[130%] text-gold/30" />}
      </div>
      <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/75">
        <span className="text-gold-deep">{categoryName}</span>
        <time dateTime={post.publish_at}>{formatDate(post.publish_at)}</time>
        <span>{post.reading_minutes} min read</span>
      </p>
      <H className={`mt-2 ${large ? "text-[2.1rem]" : "text-[1.65rem]"} leading-tight`}>
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-gold-deep">{post.title}</Link>
      </H>
      <p className="mt-3 text-charcoal/75">{post.excerpt}</p>
    </article>
  );
}
