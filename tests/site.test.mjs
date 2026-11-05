// End-to-end checks against a running site. Usage: BASE_URL=https://your-site npm test
import { test } from "node:test";
import assert from "node:assert/strict";

const B = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const post = (path, body, ip = String(Math.random())) =>
  fetch(B + path, { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify(body) });
const html = async (p) => (await fetch(B + p)).text();

const pages = ["/", "/about", "/services", "/services/vedic-astrology", "/services/graphology", "/services/astro-vastu-integration",
  "/programmes", "/programmes/exam-ready-from-the-inside", "/programmes/student-inner-excellence", "/programmes/child-script-coach",
  "/programmes/handwriting-mastery-certification", "/programmes/teacher-handwriting-consultation", "/testimonials", "/success-stories",
  "/gallery", "/videos", "/blog", "/faq", "/contact", "/book-consultation", "/privacy-policy", "/terms-and-conditions",
  "/disclaimer", "/cookie-policy", "/cancellation-refund-policy"];

test("every public page returns 200 with a unique title, description and canonical", async () => {
  const titles = new Set();
  for (const p of pages) {
    const r = await fetch(B + p);
    assert.equal(r.status, 200, p);
    const h = await r.text();
    const title = h.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${p} has a title`);
    assert.ok(!titles.has(title), `${p} title is unique`); titles.add(title);
    assert.match(h, /<meta name="description" content=".{50,}"/, `${p} description`);
    assert.match(h, /<link rel="canonical"/, `${p} canonical`);
    assert.match(h, /property="og:title"/, `${p} open graph`);
    assert.equal((h.match(/<h1[\s>]/g) || []).length, 1, `${p} has exactly one h1`);
  }
});

test("unknown pages return 404", async () => {
  assert.equal((await fetch(B + "/does-not-exist")).status, 404);
  assert.equal((await fetch(B + "/services/does-not-exist")).status, 404);
});

test("legacy URLs 301-redirect", async () => {
  const r = await fetch(B + "/about-us", { redirect: "manual" });
  assert.equal(r.status, 301);
  assert.match(r.headers.get("location"), /\/about$/);
});

test("structured data is present where expected", async () => {
  assert.match(await html("/"), /"@type":"Person"/);
  assert.match(await html("/"), /"@type":"ProfessionalService"/);
  assert.match(await html("/services/graphology"), /"@type":"Service"/);
  assert.match(await html("/services/graphology"), /"@type":"FAQPage"/);
  assert.match(await html("/faq"), /"@type":"FAQPage"/);
  assert.match(await html("/blog/how-to-prepare-for-a-vedic-astrology-consultation"), /"@type":"Article"/);
  assert.match(await html("/about"), /"@type":"BreadcrumbList"/);
});

test("sitemap and robots", async () => {
  const sm = await html("/sitemap.xml");
  assert.match(sm, /\/services\/vedic-astrology/);
  assert.match(sm, /\/blog\//);
  const rb = await html("/robots.txt");
  assert.match(rb, /Disallow: \/admin/);
  assert.match(rb, /Sitemap:/);
});

test("unverified profile placeholders never appear publicly", async () => {
  assert.doesNotMatch(await html("/about"), /PLACEHOLDER/);
});

test("booking form: server-side validation", async () => {
  const r = await post("/api/enquiries", { kind: "consultation", full_name: "A", phone: "12", consent: false });
  assert.equal(r.status, 422);
  const j = await r.json();
  for (const f of ["full_name", "phone", "consent", "service_slug", "mode", "preferred_date"]) assert.ok(j.fieldErrors[f], f);
});

test("booking form: rejects past dates and unknown services", async () => {
  const base = { kind: "consultation", full_name: "Test User", phone: "+919876543210", mode: "online", consent: true };
  assert.equal((await post("/api/enquiries", { ...base, service_slug: "graphology", preferred_date: "2020-01-01" })).status, 422);
  assert.equal((await post("/api/enquiries", { ...base, service_slug: "nope", preferred_date: "2099-01-01" })).status, 422);
});

test("valid enquiry succeeds; honeypot gets a silent fake success", async () => {
  const ok = { kind: "contact", full_name: "Test User", phone: "+919876543210", consent: true };
  assert.equal((await post("/api/enquiries", ok)).status, 200);
  const bot = await post("/api/enquiries", { ...ok, website: "spam.example" });
  assert.equal(bot.status, 200);
  assert.deepEqual(await bot.json(), { ok: true });
});

test("rate limiting kicks in after 5 submissions", async () => {
  const ip = "rl-" + Date.now();
  const codes = [];
  for (let i = 0; i < 6; i++) codes.push((await post("/api/enquiries", { kind: "contact", full_name: "Rate Test", phone: "+919876543210", consent: true }, ip)).status);
  assert.deepEqual(codes, [200, 200, 200, 200, 200, 429]);
});

test("newsletter validates email", async () => {
  assert.equal((await post("/api/newsletter", { email: "nope" })).status, 422);
  assert.equal((await post("/api/newsletter", { email: `t${Date.now()}@example.com` })).status, 200);
});

test("admin and admin APIs are protected", async () => {
  for (const p of ["/admin", "/admin/enquiries", "/api/admin/export?table=enquiries"]) {
    const r = await fetch(B + p, { redirect: "manual" });
    assert.ok([302, 307].includes(r.status), p);
    assert.match(r.headers.get("location"), /\/admin\/login/);
  }
});

test("security headers", async () => {
  const r = await fetch(B + "/");
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.equal(r.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.ok(r.headers.get("strict-transport-security"));
  assert.equal(r.headers.get("x-powered-by"), null);
});
