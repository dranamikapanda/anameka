export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
export const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
export const readingMinutes = (html: string) => Math.max(1, Math.round(stripHtml(html).split(" ").length / 200));
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
export const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-").slice(0, 80);

/** Adds ids to h2/h3 and returns a table of contents. Input must already be sanitised. */
export function withHeadingIds(html: string) {
  const toc: { id: string; text: string; level: number }[] = [];
  const out = html.replace(/<h([23])>(.*?)<\/h\1>/g, (_m, lvl: string, inner: string) => {
    const text = stripHtml(inner);
    const id = slugify(text);
    toc.push({ id, text, level: Number(lvl) });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

export function youtubeId(url: string) {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}
