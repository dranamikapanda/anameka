import sanitizeHtml from "sanitize-html";

/** Whitelist for rich-text content saved from the admin editor. */
export function cleanHtml(dirty: string) {
  return sanitizeHtml(dirty, {
    allowedTags: ["h2", "h3", "h4", "p", "br", "strong", "em", "u", "s", "blockquote", "ul", "ol", "li", "a", "hr", "code", "pre", "img", "figure", "figcaption"],
    allowedAttributes: { a: ["href", "title", "rel", "target"], img: ["src", "alt", "width", "height", "loading"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) },
  });
}
export const cleanText = (s: string) => sanitizeHtml(s, { allowedTags: [], allowedAttributes: {} }).trim();
