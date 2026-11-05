import Link from "next/link";
import { requireStaff } from "@/lib/admin-auth";

export default async function Overview() {
  const staff = (await requireStaff("viewer"))!;
  const count = async (t: string, f?: [string, string]) => {
    let q = staff.db.from(t).select("*", { count: "exact", head: true });
    if (f) q = q.eq(f[0], f[1]);
    return (await q).count ?? 0;
  };
  const [newEnq, allEnq, subs, posts, drafts, testimonials] = await Promise.all([
    count("enquiries", ["status", "new"]), count("enquiries"), count("newsletter_subscribers"), count("blog_posts", ["status", "published"]), count("blog_posts", ["status", "draft"]), count("testimonials", ["status", "published"]),
  ]);
  const { data: recent } = await staff.db.from("enquiries").select("id,full_name,kind,service_slug,status,created_at").order("created_at", { ascending: false }).limit(8);
  const stats = [["New enquiries", newEnq, "/admin/enquiries?status=new"], ["All enquiries", allEnq, "/admin/enquiries"], ["Subscribers", subs, "/admin/subscribers"], ["Published articles", posts, "/admin/blog_posts"], ["Draft articles", drafts, "/admin/blog_posts?status=draft"], ["Published testimonials", testimonials, "/admin/testimonials"]] as const;
  return (
    <>
      <h1 className="text-4xl">Overview</h1>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([l, n, h]) => <li key={l}><Link href={h} className="block rounded-2xl border border-plum/10 bg-white p-6 hover:border-gold"><p className="font-display text-5xl text-plum">{n}</p><p className="mt-1 text-charcoal/75">{l}</p></Link></li>)}
      </ul>
      <h2 className="mt-12 text-2xl">Latest enquiries</h2>
      {recent?.length ? (
        <ul className="mt-4 divide-y divide-plum/10 rounded-2xl border border-plum/10 bg-white">
          {recent.map((e) => <li key={e.id} className="flex flex-wrap justify-between gap-2 px-5 py-4"><span className="font-medium text-plum">{e.full_name}</span><span className="text-sm text-charcoal/75">{e.kind} · {e.service_slug ?? "general"} · {e.status} · {new Date(e.created_at).toLocaleDateString("en-IN")}</span></li>)}
        </ul>
      ) : <p className="mt-4 text-charcoal/75">No enquiries yet. New contact and booking requests will appear here.</p>}
    </>
  );
}
