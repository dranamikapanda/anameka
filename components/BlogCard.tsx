import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { YantraLines } from "./YantraLines";

export function BlogCard({
  post,
  categoryName,
  large = false,
  level: H = "h3",
}: {
  post: BlogPost;
  categoryName?: string;
  large?: boolean;
  level?: "h2" | "h3";
}) {
  return (
    <article className="group relative flex flex-col justify-between rounded-3xl border border-gold/30 bg-white/90 p-5 sm:p-6 shadow-soft transition-all duration-300 hover:border-gold hover:shadow-gold-glow hover:-translate-y-1">
      <div>
        {/* Cover Image Frame */}
        <div
          className={`relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-cream via-ivory to-cream ${
            large ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt={post.cover_alt || post.title}
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="relative h-full w-full flex items-center justify-center p-6 text-center">
              <YantraLines className="absolute inset-0 m-auto h-[120%] text-gold/25" />
              <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-plum shadow-sm">
                <BookOpen className="h-3.5 w-3.5 text-gold-deep" />
                <span>Knowledge Centre</span>
              </span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-charcoal/70">
          {categoryName && (
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 font-medium text-gold-deep">
              {categoryName}
            </span>
          )}
          <time dateTime={post.publish_at} className="font-medium">
            {formatDate(post.publish_at)}
          </time>
          {post.reading_minutes && (
            <span>• {post.reading_minutes} min read</span>
          )}
        </div>

        {/* Title */}
        <H
          className={`mt-3 font-display ${
            large ? "text-[1.85rem] sm:text-[2.2rem]" : "text-[1.5rem] sm:text-[1.7rem]"
          } leading-tight text-plum transition-colors group-hover:text-gold-deep`}
        >
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </H>

        {/* Excerpt */}
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75 line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* Read link */}
      <div className="mt-5 border-t border-gold/20 pt-3">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-plum transition-colors hover:text-gold-deep"
        >
          <span>Read full article</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
