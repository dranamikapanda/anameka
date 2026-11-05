import { Download, MessageCircle, Phone } from "lucide-react";
import { requireStaff } from "@/lib/admin-auth";
import { updateEnquiry } from "../../actions";

const statuses = ["new", "contacted", "scheduled", "completed", "closed", "spam"];
type SP = Promise<{ status?: string; kind?: string; q?: string }>;

export default async function Enquiries({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const staff = (await requireStaff("viewer"))!;
  let q = staff.db.from("enquiries").select("*").order("created_at", { ascending: false }).limit(300);
  if (sp.status) q = q.eq("status", sp.status);
  if (sp.kind) q = q.eq("kind", sp.kind);
  if (sp.q) { const t = sp.q.replace(/[%,()]/g, ""); q = q.or(`full_name.ilike.%${t}%,phone.ilike.%${t}%,email.ilike.%${t}%`); }
  const { data } = await q;
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl">Enquiries and bookings</h1>
        <a href="/api/admin/export?table=enquiries" className="btn-ghost"><Download className="h-4 w-4" />Export CSV</a>
      </div>
      <form className="mt-8 flex flex-wrap gap-3">
        <input name="q" defaultValue={sp.q} placeholder="Name, phone or email" className="field !w-64" aria-label="Search" />
        <select name="status" defaultValue={sp.status ?? ""} className="field !w-40" aria-label="Status"><option value="">Any status</option>{statuses.map((s) => <option key={s}>{s}</option>)}</select>
        <select name="kind" defaultValue={sp.kind ?? ""} className="field !w-44" aria-label="Type"><option value="">Contact and booking</option><option value="consultation">Bookings</option><option value="contact">Contact messages</option></select>
        <button className="btn-ghost !py-2">Filter</button>
      </form>
      <ul className="mt-6 space-y-3">
        {(data ?? []).map((e) => (
          <li key={e.id}>
            <details className="rounded-2xl border border-plum/10 bg-white open:border-gold/50">
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 px-5 py-4">
                <span><span className="font-medium text-plum">{e.full_name}</span> <span className="text-sm text-charcoal/75">{e.kind === "consultation" ? "Booking" : "Message"}{e.service_slug ? `, ${e.service_slug}` : ""}</span></span>
                <span className="flex items-center gap-3 text-sm"><span className={`rounded-full px-3 py-1 ${e.status === "new" ? "bg-gold text-white" : "bg-cream text-plum"}`}>{e.status}</span><span className="text-charcoal/75">{new Date(e.created_at).toLocaleString("en-IN")}</span></span>
              </summary>
              <div className="grid gap-6 border-t border-plum/10 px-5 py-5 md:grid-cols-2">
                <dl className="space-y-2 text-[0.95rem]">
                  {[["Phone", e.phone], ["Email", e.email], ["Mode", e.mode], ["Preferred", [e.preferred_date, e.preferred_time].filter(Boolean).join(" ")], ["From page", e.source_page], ["Message", e.message]].map(([k, v]) => v ? <div key={k}><dt className="text-sm text-charcoal/75">{k}</dt><dd className="whitespace-pre-wrap">{v}</dd></div> : null)}
                  <div className="flex gap-2 pt-2">
                    <a href={`tel:${e.phone}`} className="btn-ghost !px-4 !py-2 text-sm"><Phone className="h-4 w-4" />Call</a>
                    <a href={`https://wa.me/${String(e.phone).replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2 text-sm"><MessageCircle className="h-4 w-4" />WhatsApp</a>
                  </div>
                </dl>
                {staff.role !== "viewer" && (
                  <form action={updateEnquiry.bind(null, e.id)} className="space-y-3">
                    <label className="label" htmlFor={`s-${e.id}`}>Status</label>
                    <select id={`s-${e.id}`} name="status" defaultValue={e.status} className="field">{statuses.map((s) => <option key={s}>{s}</option>)}</select>
                    <label className="label" htmlFor={`n-${e.id}`}>Internal notes</label>
                    <textarea id={`n-${e.id}`} name="admin_notes" defaultValue={e.admin_notes ?? ""} rows={3} className="field" />
                    <button className="btn-plum !py-2">Update enquiry</button>
                  </form>
                )}
              </div>
            </details>
          </li>
        ))}
        {!data?.length && <li className="rounded-2xl border border-dashed border-plum/20 px-5 py-10 text-center text-charcoal/75">No enquiries match these filters.</li>}
      </ul>
    </>
  );
}
