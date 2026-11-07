import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { rateLimit, clientIp, hashIp } from "@/lib/rate-limit";
import { serviceClient } from "@/lib/supabase/server";
import { cleanText } from "@/lib/sanitize";
import { notifyEnquiry } from "@/lib/notify";
import { syncToGoogleSheet } from "@/lib/google-sheets";
import { getProgrammes, getServices } from "@/lib/data";

export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const rl = rateLimit(`enq:${ip}`, 5, 10 * 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many requests from this connection. Wait a few minutes, or reach us on WhatsApp." }, { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  const body = await req.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    return NextResponse.json({ error: "Some fields need attention.", fieldErrors }, { status: 422 });
  }
  const e = parsed.data;
  // Bot traps: filled honeypot, or submitted faster than a human could type. Pretend success.
  if (e.website || (e.started_at && Date.now() - e.started_at < 2500)) return NextResponse.json({ ok: true });

  const [services, programmes] = await Promise.all([getServices(), getProgrammes()]);
  const service = [...services, ...programmes].find((s) => s.slug === e.service_slug);
  if (e.service_slug && !service) return NextResponse.json({ error: "Choose a service from the list.", fieldErrors: { service_slug: "Choose a service from the list" } }, { status: 422 });

  const row = {
    kind: e.kind, full_name: cleanText(e.full_name), phone: e.phone.replace(/[^\d+]/g, ""), email: e.email || null,
    service_slug: e.service_slug || null, mode: e.mode ?? null, preferred_date: e.preferred_date || null, preferred_time: e.preferred_time || null,
    message: e.message ? cleanText(e.message) : null, consent: true, source_page: e.source_page?.slice(0, 200) ?? null, ip_hash: hashIp(ip),
  };

  const db = serviceClient();
  if (db) {
    const { error } = await db.from("enquiries").insert(row);
    if (error) {
      console.error("[enquiries] Supabase insert failed:", error.message);
    }
  } else {
    console.warn("[enquiries] Supabase not configured – saving via Google Sheets & email notification");
  }
  // Forward to email notification and Google Sheets simultaneously
  await Promise.allSettled([
    notifyEnquiry(e, service?.title).catch((err) => console.error("[enquiries] notify failed", err)),
    syncToGoogleSheet({
      kind: e.kind === "consultation" ? "Consultation Booking" : "Contact Enquiry",
      full_name: row.full_name,
      phone: row.phone,
      email: row.email,
      service: service?.title || e.service_slug,
      mode: row.mode,
      preferred_date: row.preferred_date,
      preferred_time: row.preferred_time,
      message: row.message,
      source_page: row.source_page,
    }).catch((err) => console.error("[enquiries] sheet sync failed", err)),
  ]);
  return NextResponse.json({ ok: true });
}
