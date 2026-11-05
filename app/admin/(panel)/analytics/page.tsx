import { requireStaff } from "@/lib/admin-auth";
import { env } from "@/lib/env";

export default async function Analytics() {
  const staff = (await requireStaff("viewer"))!;
  const since = new Date(Date.now() - 180 * 864e5).toISOString();
  const { data } = await staff.db.from("enquiries").select("created_at,service_slug,kind,status").gte("created_at", since).neq("status", "spam");
  const rows = data ?? [];
  const byMonth = new Map<string, number>(); const bySvc = new Map<string, number>();
  rows.forEach((r) => {
    const m = r.created_at.slice(0, 7); byMonth.set(m, (byMonth.get(m) ?? 0) + 1);
    const s = r.service_slug ?? "general"; bySvc.set(s, (bySvc.get(s) ?? 0) + 1);
  });
  const months = [...byMonth.entries()].sort();
  const max = Math.max(1, ...months.map(([, n]) => n));
  const converted = rows.filter((r) => ["scheduled", "completed"].includes(r.status)).length;
  return (
    <>
      <h1 className="text-4xl">Analytics</h1>
      <p className="mt-3 max-w-2xl text-charcoal/70">Lead figures below come from the website database. Traffic, page views and event reports (whatsapp_click, phone_click, service_view, blog_view and others) are in Google Analytics 4.</p>
      {env.ga4Id && <a className="btn-ghost mt-5" href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">Open Google Analytics</a>}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[["Leads, last 6 months", rows.length], ["Bookings requested", rows.filter((r) => r.kind === "consultation").length], ["Scheduled or completed", converted]].map(([l, n]) => (
          <div key={l} className="rounded-2xl border border-plum/10 bg-white p-6"><p className="font-display text-5xl text-plum">{n}</p><p className="mt-1 text-charcoal/75">{l}</p></div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-plum/10 bg-white p-6">
          <h2 className="text-2xl">Leads by month</h2>
          <ul className="mt-6 flex h-48 items-end gap-3">{months.map(([m, n]) => (
            <li key={m} className="flex flex-1 flex-col items-center gap-2"><span className="text-sm text-plum">{n}</span><span className="w-full rounded-t-md bg-gold" style={{ height: `${(n / max) * 140}px` }} /><span className="text-xs text-charcoal/75">{m.slice(5)}/{m.slice(2, 4)}</span></li>
          ))}{!months.length && <li className="text-charcoal/75">No leads yet.</li>}</ul>
        </section>
        <section className="rounded-2xl border border-plum/10 bg-white p-6">
          <h2 className="text-2xl">Leads by service</h2>
          <ul className="mt-6 space-y-3">{[...bySvc.entries()].sort((a, b) => b[1] - a[1]).map(([s, n]) => (
            <li key={s}><div className="flex justify-between text-sm"><span>{s}</span><span className="text-plum">{n}</span></div><div className="mt-1 h-2 rounded-full bg-cream"><div className="h-2 rounded-full bg-plum" style={{ width: `${(n / Math.max(1, rows.length)) * 100}%` }} /></div></li>
          ))}</ul>
        </section>
      </div>
    </>
  );
}
