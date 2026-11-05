import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { serviceClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  if (!rateLimit(`nl:${clientIp(req.headers)}`, 5).ok) return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  const parsed = newsletterSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Enter a valid email address" }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const db = serviceClient();
  if (db) {
    const { error } = await db.from("newsletter_subscribers").upsert({ email: parsed.data.email, consent: true, unsubscribed_at: null }, { onConflict: "email" });
    if (error) return NextResponse.json({ error: "Subscription didn't go through. Try again shortly." }, { status: 500 });
  }
  const hook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (hook) await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: parsed.data.email }) }).catch(() => {});
  return NextResponse.json({ ok: true });
}
