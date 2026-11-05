import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { requireStaff } from "@/lib/admin-auth";
import { collections } from "@/lib/admin/collections";
import { signOut } from "../actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff("viewer");
  if (!staff) redirect("/admin/login");
  const groups = [...new Set(collections.map((c) => c.group))];
  const link = "block rounded-lg px-3 py-2 text-[0.95rem] text-ivory/75 hover:bg-white/10 hover:text-ivory";
  return (
    <div className="min-h-screen bg-ivory lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-plum-deep p-5 text-ivory lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <Link href="/admin" className="block font-display text-2xl text-gold-light">Admin</Link>
        <p className="mt-1 truncate text-sm text-ivory/70">{staff.name} · {staff.role}</p>
        <details className="mt-6 lg:hidden"><summary className="cursor-pointer text-sm text-gold-light">Menu</summary><Nav groups={groups} link={link} role={staff.role} /></details>
        <div className="hidden lg:block"><Nav groups={groups} link={link} role={staff.role} /></div>
        <div className="mt-8 space-y-1 border-t border-white/10 pt-4">
          <Link href="/" target="_blank" className={`${link} flex items-center gap-2`}><ExternalLink className="h-4 w-4" />View website</Link>
          <form action={signOut}><button className={`${link} flex w-full items-center gap-2 text-left`}><LogOut className="h-4 w-4" />Sign out</button></form>
        </div>
      </aside>
      <main className="p-5 md:p-10">{children}</main>
    </div>
  );
}

function Nav({ groups, link, role }: { groups: string[]; link: string; role: string }) {
  return (
    <nav className="mt-6 space-y-6" aria-label="Admin">
      <ul className="space-y-0.5">
        <li><Link className={link} href="/admin">Overview</Link></li>
        <li><Link className={link} href="/admin/enquiries">Enquiries and bookings</Link></li>
        <li><Link className={link} href="/admin/subscribers">Newsletter subscribers</Link></li>
        <li><Link className={link} href="/admin/analytics">Analytics</Link></li>
      </ul>
      {groups.map((g) => (
        <div key={g}>
          <p className="px-3 text-xs text-gold-light/70">{g}</p>
          <ul className="mt-1 space-y-0.5">
            {collections.filter((c) => c.group === g && (!c.minRole || role === "admin")).map((c) => <li key={c.key}><Link className={link} href={`/admin/${c.key}`}>{c.label}</Link></li>)}
            {g === "Settings" && role === "admin" && <><li><Link className={link} href="/admin/settings">Website settings</Link></li><li><Link className={link} href="/admin/users">Users and roles</Link></li></>}
          </ul>
        </div>
      ))}
    </nav>
  );
}
