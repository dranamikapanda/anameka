import { requireStaff } from "@/lib/admin-auth";

const tables: Record<string, string[]> = {
  enquiries: ["created_at", "kind", "status", "full_name", "phone", "email", "service_slug", "mode", "preferred_date", "preferred_time", "message", "admin_notes", "source_page"],
  newsletter_subscribers: ["created_at", "email", "consent", "unsubscribed_at"],
};
// Prefix cells that spreadsheet apps would treat as formulas (CSV injection).
const cell = (v: unknown) => { let s = v == null ? "" : String(v); if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; return `"${s.replace(/"/g, '""')}"`; };

export async function GET(req: Request) {
  const staff = await requireStaff("editor");
  if (!staff) return new Response("Unauthorised", { status: 401 });
  const table = new URL(req.url).searchParams.get("table") ?? "";
  const cols = tables[table];
  if (!cols) return new Response("Unknown table", { status: 400 });
  const { data, error } = await staff.db.from(table).select(cols.join(",")).order("created_at", { ascending: false }).limit(10000);
  if (error) return new Response(error.message, { status: 500 });
  const csv = [cols.join(","), ...(data as unknown as Record<string, unknown>[]).map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
  return new Response("\uFEFF" + csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${table}-${new Date().toISOString().slice(0, 10)}.csv"` } });
}
