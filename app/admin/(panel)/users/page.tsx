import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/admin-auth";
import { setRole } from "../../actions";
export default async function Users() {
  const staff = await requireStaff("admin");
  if (!staff) redirect("/admin");
  const { data } = await staff.db.from("profiles").select("id,full_name,role,created_at").order("created_at");
  return (
    <>
      <h1 className="text-4xl">Users and roles</h1>
      <p className="mt-3 max-w-2xl text-charcoal/70">Invite people from Supabase → Authentication → Users. They appear here as viewers. Editors manage content and enquiries; administrators can also delete content, change settings, legal pages and roles.</p>
      <ul className="mt-8 divide-y divide-plum/10 rounded-2xl border border-plum/10 bg-white">
        {(data ?? []).map((u) => (
          <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <span className="text-plum">{u.full_name || u.id.slice(0, 8)}{u.id === staff.user.id && <span className="text-sm text-charcoal/75"> (you)</span>}</span>
            {u.id === staff.user.id ? <span className="text-sm">{u.role}</span> : (
              <form action={setRole.bind(null, u.id)} className="flex gap-2">
                <select name="role" defaultValue={u.role} className="field !w-36 !py-2" aria-label="Role">{["viewer", "editor", "admin"].map((r) => <option key={r}>{r}</option>)}</select>
                <button className="btn-ghost !py-2 text-sm">Update role</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
