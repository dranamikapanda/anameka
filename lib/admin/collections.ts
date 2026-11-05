export type FieldType = "text" | "textarea" | "richtext" | "select" | "boolean" | "number" | "date" | "datetime" | "image" | "video" | "tags" | "list" | "status" | "slug";
export interface Field {
  name: string; label: string; type: FieldType; required?: boolean; help?: string;
  options?: { value: string; label: string }[]; sub?: { name: string; label: string; multiline?: boolean }[]; from?: string; // slug source
  half?: boolean;
}
export interface Collection {
  key: string; table: string; label: string; singular: string; pk: string; group: string;
  listColumns: string[]; searchColumns: string[]; order: { column: string; ascending: boolean };
  fields: Field[]; revalidate: (row: Record<string, unknown>) => string[]; minRole?: "editor" | "admin";
}

const status: Field = { name: "status", label: "Status", type: "status", half: true };
const statusOpts = (scheduled = false) => [
  { value: "draft", label: "Draft" }, ...(scheduled ? [{ value: "scheduled", label: "Scheduled" }] : []),
  { value: "published", label: "Published" }, { value: "archived", label: "Archived" },
];
const order: Field = { name: "sort_order", label: "Display order", type: "number", half: true, help: "Lower numbers appear first" };
const serviceOptions = "services"; // resolved at runtime into a select of services

export const collections: Collection[] = [
  {
    key: "services", table: "services", label: "Services", singular: "service", pk: "id", group: "Content",
    listColumns: ["title", "slug", "status"], searchColumns: ["title", "slug"], order: { column: "sort_order", ascending: true },
    revalidate: (r) => ["/", "/services", `/services/${r.slug}`, "/sitemap.xml"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, half: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, half: true, help: "Changing this changes the page address. Add a redirect in lib/redirects.mjs." },
      { name: "short_description", label: "Short description", type: "textarea", required: true, help: "Shown on cards and as the default meta description." },
      { name: "icon", label: "Icon", type: "select", half: true, options: ["Orbit", "Compass", "Home", "PenLine", "Feather", "Signature", "Watch", "Shapes", "Smartphone", "Flame", "Sunrise", "TrendingUp", "Sparkles"].map((v) => ({ value: v, label: v })) },
      { name: "image_url", label: "Image", type: "image", half: true },
      { name: "intro", label: "Introduction", type: "textarea" },
      { name: "what_is", label: "What is this service?", type: "textarea" },
      { name: "process", label: "Understanding the process", type: "textarea" },
      { name: "who_for", label: "Who may find it useful?", type: "textarea" },
      { name: "procedure", label: "Consultation procedure", type: "list", sub: [{ name: "title", label: "Step" }, { name: "body", label: "Description", multiline: true }] },
      { name: "benefits", label: "Benefits", type: "list" },
      { name: "limitations", label: "Limitations", type: "list" },
      { name: "faqs", label: "FAQs", type: "list", sub: [{ name: "q", label: "Question" }, { name: "a", label: "Answer", multiline: true }] },
      { name: "seo_title", label: "SEO title", type: "text", help: "About 50–60 characters" },
      { name: "seo_description", label: "SEO description", type: "textarea", help: "About 140–160 characters" },
      order, status,
    ],
  },
  {
    key: "programmes", table: "programmes", label: "Programmes", singular: "programme", pk: "id", group: "Content",
    listColumns: ["title", "audience", "status"], searchColumns: ["title", "audience"], order: { column: "sort_order", ascending: true },
    revalidate: (r) => ["/", "/programmes", `/programmes/${r.slug}`, "/sitemap.xml"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, half: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, half: true },
      { name: "audience", label: "Who it is for (short)", type: "text", required: true, half: true },
      { name: "audience_key", label: "Audience group", type: "select", required: true, half: true, options: [["students", "Students and parents"], ["teachers", "Teachers and schools"], ["business", "Business owners"], ["families", "Individuals and families"]].map(([value, label]) => ({ value, label })) },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "summary", label: "Summary", type: "textarea", required: true, help: "Shown on cards and as the default meta description." },
      { name: "intro", label: "Introduction", type: "textarea" },
      { name: "pillars", label: "Three pillars", type: "list", sub: [{ name: "title", label: "Title" }, { name: "body", label: "Description", multiline: true }] },
      { name: "includes", label: "What the programme includes", type: "list", sub: [{ name: "title", label: "Title" }, { name: "body", label: "Description", multiline: true }] },
      { name: "for_whom", label: "Who it is for", type: "list" },
      { name: "format", label: "Format", type: "text", help: "For example: Begins with a free discovery call. Online or in person." },
      { name: "price_note", label: "Price note", type: "text", half: true, help: "Shown on the page, for example “₹599 per consultation”" },
      { name: "price_inr", label: "Price in ₹ (for search results)", type: "number", half: true },
      { name: "cta_label", label: "Button text", type: "text", half: true },
      { name: "whatsapp_keyword", label: "WhatsApp keyword", type: "text", half: true, help: "For example COACH or CERTIFY. Pre-fills the WhatsApp message." },
      { name: "poster_url", label: "Programme flyer", type: "image", half: true }, { name: "poster_alt", label: "Flyer description", type: "text", half: true },
      { name: "faqs", label: "FAQs", type: "list", sub: [{ name: "q", label: "Question" }, { name: "a", label: "Answer", multiline: true }] },
      { name: "seo_title", label: "SEO title", type: "text" }, { name: "seo_description", label: "SEO description", type: "textarea" },
      order, status,
    ],
  },
  {
    key: "testimonials", table: "testimonials", label: "Testimonials", singular: "testimonial", pk: "id", group: "Social proof",
    listColumns: ["client_name", "kind", "permission_confirmed", "status"], searchColumns: ["client_name", "quote"], order: { column: "created_at", ascending: false },
    revalidate: (r) => ["/", "/testimonials", ...(r.service_slug ? [`/services/${r.service_slug}`] : [])],
    fields: [
      { name: "kind", label: "Type", type: "select", required: true, half: true, options: [{ value: "written", label: "Written" }, { value: "whatsapp", label: "WhatsApp screenshot" }, { value: "video", label: "Video" }] },
      { name: "client_name", label: "Client name as they agreed to be shown", type: "text", required: true, half: true, help: "Initials are fine, for example “R. S.”" },
      { name: "client_location", label: "Location", type: "text", half: true },
      { name: "service_slug", label: "Related service", type: "select", half: true, from: serviceOptions },
      { name: "quote", label: "Testimonial text", type: "textarea" },
      { name: "image_url", label: "WhatsApp screenshot", type: "image", help: "Blur phone numbers, profile photos and names of third parties before uploading." },
      { name: "video_url", label: "Video URL", type: "video", help: "YouTube link or uploaded video" },
      { name: "permission_confirmed", label: "The client has given written permission to publish this", type: "boolean", required: true },
      { name: "permission_note", label: "How permission was recorded", type: "text", help: "For example: “WhatsApp message, 12 Oct 2026”" },
      { name: "featured", label: "Feature on the home page", type: "boolean" },
      status,
    ],
  },
  {
    key: "success_stories", table: "success_stories", label: "Success stories", singular: "story", pk: "id", group: "Social proof",
    listColumns: ["title", "client_label", "permission_confirmed", "status"], searchColumns: ["title", "client_label"], order: { column: "updated_at", ascending: false },
    revalidate: () => ["/", "/success-stories"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, half: true },
      { name: "slug", label: "Anchor slug", type: "slug", from: "title", required: true, half: true },
      { name: "client_label", label: "Client label", type: "text", required: true, half: true, help: "For example “A business owner in Pune”" },
      { name: "service_slug", label: "Related service", type: "select", half: true, from: serviceOptions },
      { name: "context", label: "Where the client started", type: "textarea", required: true },
      { name: "approach", label: "The guidance given", type: "textarea", required: true },
      { name: "outcome", label: "In the client's words", type: "textarea", required: true, help: "Use the client's own description. Avoid claims of guaranteed results." },
      { name: "image_url", label: "Image", type: "image" },
      { name: "permission_confirmed", label: "The client has approved this story for publication", type: "boolean", required: true },
      status,
    ],
  },
  {
    key: "gallery_items", table: "gallery_items", label: "Gallery", singular: "photo", pk: "id", group: "Media",
    listColumns: ["title", "category", "status"], searchColumns: ["title", "alt"], order: { column: "sort_order", ascending: true },
    revalidate: () => ["/", "/gallery", "/about"],
    fields: [
      { name: "image_url", label: "Image", type: "image", required: true },
      { name: "title", label: "Caption", type: "text", required: true, half: true },
      { name: "category", label: "Category", type: "select", required: true, half: true, options: [["professional", "Professional photographs"], ["events", "Events"], ["workshops", "Workshops"], ["consultations", "Consultations"], ["client-interactions", "Client interactions"], ["achievements", "Achievements"], ["media-coverage", "Media coverage"], ["flyers", "Programme flyers"]].map(([value, label]) => ({ value, label })) },
      { name: "alt", label: "Alt text", type: "text", required: true, help: "Describe the image for people using screen readers." },
      { name: "width", label: "Width (px)", type: "number", half: true }, { name: "height", label: "Height (px)", type: "number", half: true },
      { name: "taken_on", label: "Date taken", type: "date", half: true }, order, status,
    ],
  },
  {
    key: "videos", table: "videos", label: "Videos", singular: "video", pk: "id", group: "Media",
    listColumns: ["title", "category", "status"], searchColumns: ["title"], order: { column: "sort_order", ascending: true },
    revalidate: () => ["/videos"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "video_url", label: "Video", type: "video", required: true },
      { name: "thumbnail_url", label: "Thumbnail", type: "image", help: "Optional for YouTube videos" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "category", label: "Category", type: "select", half: true, options: [["talks", "Talks"], ["explainers", "Explainers"], ["interviews", "Interviews"], ["testimonials", "Testimonials"], ["events", "Events"]].map(([value, label]) => ({ value, label })) },
      { name: "duration_iso", label: "Duration (ISO 8601)", type: "text", half: true, help: "For example PT4M12S. Used for search results." },
      { name: "published_on", label: "Published on", type: "date", half: true }, order, status,
    ],
  },
  {
    key: "blog_posts", table: "blog_posts", label: "Blog posts", singular: "post", pk: "id", group: "Knowledge centre",
    listColumns: ["title", "category_slug", "status", "publish_at"], searchColumns: ["title", "excerpt"], order: { column: "publish_at", ascending: false },
    revalidate: (r) => ["/", "/blog", `/blog/${r.slug}`, "/sitemap.xml"],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "URL slug", type: "slug", from: "title", required: true, half: true },
      { name: "category_slug", label: "Category", type: "select", required: true, half: true, from: "blog_categories" },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "body", label: "Article", type: "richtext", required: true },
      { name: "cover_url", label: "Cover image", type: "image", half: true },
      { name: "cover_alt", label: "Cover alt text", type: "text", half: true },
      { name: "tags", label: "Tags", type: "tags", help: "Comma separated" },
      { name: "featured", label: "Featured article", type: "boolean" },
      { name: "seo_title", label: "SEO title", type: "text" }, { name: "seo_description", label: "SEO description", type: "textarea" },
      { name: "publish_at", label: "Publish date and time", type: "datetime", half: true, help: "Set a future time with status Scheduled to publish automatically." },
      { ...status, options: statusOpts(true) },
    ],
  },
  {
    key: "blog_categories", table: "blog_categories", label: "Blog categories", singular: "category", pk: "slug", group: "Knowledge centre",
    listColumns: ["name", "slug"], searchColumns: ["name"], order: { column: "name", ascending: true }, revalidate: () => ["/blog"],
    fields: [{ name: "name", label: "Name", type: "text", required: true, half: true }, { name: "slug", label: "Slug", type: "slug", from: "name", required: true, half: true }, { name: "description", label: "Description", type: "textarea" }],
  },
  {
    key: "faqs", table: "faqs", label: "FAQ", singular: "question", pk: "id", group: "Content",
    listColumns: ["question", "topic", "status"], searchColumns: ["question"], order: { column: "sort_order", ascending: true }, revalidate: () => ["/faq"],
    fields: [
      { name: "question", label: "Question", type: "text", required: true }, { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "topic", label: "Topic", type: "select", half: true, options: [{ value: "general", label: "About Dr. Anameka" }, { value: "booking", label: "Booking and preparation" }, { value: "approach", label: "What to expect" }] },
      order, status,
    ],
  },
  {
    key: "profile_sections", table: "profile_sections", label: "Profile", singular: "profile section", pk: "id", group: "Profile",
    listColumns: ["title", "verified", "status"], searchColumns: ["title"], order: { column: "sort_order", ascending: true }, revalidate: () => ["/about"],
    fields: [
      { name: "title", label: "Section title", type: "text", required: true, half: true },
      { name: "slug", label: "Slug", type: "slug", from: "title", required: true, half: true },
      { name: "body", label: "Content", type: "richtext" },
      { name: "verified", label: "I have verified every fact in this section", type: "boolean", help: "Only verified sections are shown on the website. Never publish unverified qualifications, awards or years of experience." },
      order, status,
    ],
  },
  {
    key: "timeline_items", table: "timeline_items", label: "Career timeline", singular: "timeline entry", pk: "id", group: "Profile",
    listColumns: ["period", "title", "status"], searchColumns: ["title"], order: { column: "sort_order", ascending: true }, revalidate: () => ["/about"],
    fields: [{ name: "period", label: "Year or period", type: "text", required: true, half: true }, { name: "title", label: "Title", type: "text", required: true, half: true }, { name: "description", label: "Description", type: "textarea" }, order, status],
  },
  {
    key: "legal_pages", table: "legal_pages", label: "Legal pages", singular: "legal page", pk: "slug", group: "Settings", minRole: "admin",
    listColumns: ["title", "last_reviewed", "status"], searchColumns: ["title"], order: { column: "title", ascending: true }, revalidate: (r) => [`/${r.slug}`],
    fields: [{ name: "title", label: "Title", type: "text", required: true, half: true }, { name: "slug", label: "Slug", type: "slug", from: "title", required: true, half: true }, { name: "body", label: "Content", type: "richtext", required: true }, { name: "last_reviewed", label: "Last legal review", type: "date", half: true }, status],
  },
  {
    key: "seo_pages", table: "seo_pages", label: "SEO overrides", singular: "SEO override", pk: "path", group: "Settings",
    listColumns: ["path", "title", "noindex"], searchColumns: ["path", "title"], order: { column: "path", ascending: true }, revalidate: (r) => [String(r.path)],
    fields: [
      { name: "path", label: "Page path", type: "text", required: true, help: "For example / or /about or /services/graphology" },
      { name: "title", label: "SEO title", type: "text" }, { name: "description", label: "Meta description", type: "textarea" },
      { name: "og_image_url", label: "Social sharing image (1200 × 630)", type: "image" }, { name: "noindex", label: "Hide this page from search engines", type: "boolean" },
    ],
  },
  {
    key: "social_links", table: "social_links", label: "Social media", singular: "social link", pk: "id", group: "Settings",
    listColumns: ["platform", "url", "status"], searchColumns: ["platform"], order: { column: "sort_order", ascending: true }, revalidate: () => ["/"],
    fields: [{ name: "platform", label: "Platform", type: "select", required: true, half: true, options: ["instagram", "facebook", "youtube", "linkedin"].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) })) }, { name: "url", label: "Profile URL", type: "text", required: true, half: true }, order, status],
  },
];

export const getCollection = (key: string) => collections.find((c) => c.key === key);
export const defaultStatusOptions = statusOpts();
