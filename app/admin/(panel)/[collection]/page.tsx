import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { requireStaff } from "@/lib/admin-auth";
import { getCollection } from "@/lib/admin/collections";

type P = { params: Promise<{ collection: string }>; searchParams: Promise<{ q?: string; status?: string; saved?: string; deleted?: string }> };
const show = (v: unknown) => typeof v === "boolean" ? (v ? "Yes" : "No") : v == null ? "–" : String(v).length > 60 ? String(v).slice(0, 60) + "…" : String(v);

export default async function List({ params, searchParams }: P) {
  const [{ collection }, sp] = await Promise.all([params, searchParams]);
  const c = getCollection(collection);
  if (!c) notFound();
  const staff = (await requireStaff("viewer"))!;
  let q = staff.db.from(c.table).select("*").order(c.order.column, { ascending: c.order.ascending }).limit(200);
  if (sp.status && c.fields.some((f) => f.name === "status")) q = q.eq("status", sp.status);
  if (sp.q) q = q.or(c.searchColumns.map((col) => `${col}.ilike.%${sp.q!.replace(/[%,()]/g, "")}%`).join(","));
  const { data, error } = await q;
  const hasStatus = c.fields.some((f) => f.name === "status");
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl">{c.label}</h1>
        {staff.role !== "viewer" && <Link href={`/admin/${c.key}/new`} className="btn-gold"><Plus className="h-4 w-4" />New {c.singular}</Link>}
      </div>
      {sp.saved && <p className="mt-4 rounded-xl bg-cream px-4 py-3 text-plum" role="status">Saved. The website has been updated.</p>}
      {sp.deleted && <p className="mt-4 rounded-xl bg-cream px-4 py-3 text-plum" role="status">Deleted.</p>}
      <form className="mt-8 flex flex-wrap gap-3">
        <input name="q" defaultValue={sp.q} placeholder={`Search ${c.label.toLowerCase()}`} className="field !w-64" aria-label="Search" />
        {hasStatus && <select name="status" defaultValue={sp.status ?? ""} className="field !w-44" aria-label="Status"><option value="">Any status</option>{["draft", "scheduled", "published", "archived"].map((s) => <option key={s}>{s}</option>)}</select>}
        <button className="btn-ghost !py-2">Filter</button>
      </form>
      {error && <p className="err mt-6">{error.message}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-plum/10 bg-white">
        <table className="w-full text-left text-[0.95rem]">
          <thead className="border-b border-plum/10 text-sm text-charcoal/75"><tr>{c.listColumns.map((col) => <th key={col} className="px-5 py-3 font-normal">{c.fields.find((f) => f.name === col)?.label ?? col}</th>)}</tr></thead>
          <tbody className="divide-y divide-plum/5">
            {(data ?? []).map((r: Record<string, unknown>) => (
              <tr key={String(r[c.pk])} className="hover:bg-ivory">
                {c.listColumns.map((col, i) => <td key={col} className="px-5 py-3">{i === 0 ? <Link className="font-medium text-plum underline decoration-gold/40 underline-offset-4" href={`/admin/${c.key}/${encodeURIComponent(String(r[c.pk]))}`}>{show(r[col])}</Link> : show(r[col])}</td>)}
              </tr>
            ))}
            {!data?.length && <tr><td colSpan={c.listColumns.length} className="px-5 py-10 text-center text-charcoal/75">Nothing here yet. Use “New {c.singular}” to add the first one.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
