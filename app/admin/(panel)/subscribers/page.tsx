import { Download } from "lucide-react";
import { requireStaff } from "@/lib/admin-auth";
export default async function Subscribers() {
  const staff = (await requireStaff("viewer"))!;
  const { data } = await staff.db.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(1000);
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4"><h1 className="text-4xl">Newsletter subscribers</h1><a href="/api/admin/export?table=newsletter_subscribers" className="btn-ghost"><Download className="h-4 w-4" />Export CSV</a></div>
      <p className="mt-2 text-charcoal/75">{data?.length ?? 0} subscribers</p>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-plum/10 bg-white">
        <table className="w-full text-left"><thead className="border-b border-plum/10 text-sm text-charcoal/75"><tr><th className="px-5 py-3 font-normal">Email</th><th className="px-5 py-3 font-normal">Subscribed</th><th className="px-5 py-3 font-normal">Status</th></tr></thead>
          <tbody className="divide-y divide-plum/5">{(data ?? []).map((s) => <tr key={s.id}><td className="px-5 py-3">{s.email}</td><td className="px-5 py-3">{new Date(s.created_at).toLocaleDateString("en-IN")}</td><td className="px-5 py-3">{s.unsubscribed_at ? "Unsubscribed" : "Active"}</td></tr>)}</tbody></table>
      </div>
    </>
  );
}
