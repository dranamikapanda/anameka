"use client";
import { Facebook, Link2, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const cls = "grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-plum hover:bg-cream";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-charcoal/75">Share</span>
      <a className={cls} href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><MessageCircle className="h-4 w-4" /></a>
      <a className={cls} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></a>
      <a className={cls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin className="h-4 w-4" /></a>
      <button className={cls} onClick={async () => { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }} aria-label="Copy link"><Link2 className="h-4 w-4" /></button>
      <span role="status" className="text-sm text-gold-deep">{copied ? "Link copied" : ""}</span>
    </div>
  );
}
