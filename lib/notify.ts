import "server-only";
import type { EnquiryInput } from "@/lib/validation";

const esc = (s = "") => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function send(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY, from = process.env.NOTIFY_FROM_EMAIL;
  if (!key || !from || !to) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  return res.ok;
}

export async function notifyEnquiry(e: EnquiryInput, serviceTitle?: string) {
  const rows = [
    ["Type", e.kind], ["Name", e.full_name], ["Phone", e.phone], ["Email", e.email || "–"],
    ["Service", serviceTitle || e.service_slug || "–"], ["Mode", e.mode || "–"],
    ["Preferred", [e.preferred_date, e.preferred_time].filter(Boolean).join(" ") || "–"], ["Message", e.message || "–"],
  ].map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#777">${k}</td><td>${esc(String(v))}</td></tr>`).join("");
  const admin = send(process.env.NOTIFY_ADMIN_EMAIL || "", `New ${e.kind} request from ${e.full_name}`, `<table>${rows}</table>`);
  const client = e.email
    ? send(e.email, "We have received your request", `<p>Dear ${esc(e.full_name)},</p><p>Thank you for reaching out to Dr. Anameka S Panda. We have received your ${e.kind === "consultation" ? "consultation request" : "message"} and will contact you shortly to confirm the details.</p><p>Warm regards,<br/>Office of Dr. Anameka S Panda</p>`)
    : Promise.resolve(false);
  await Promise.allSettled([admin, client]);
}
