import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireStaff } from "@/lib/admin-auth";
import { defaultStatusOptions, getCollection } from "@/lib/admin/collections";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { RecordForm } from "@/components/admin/RecordForm";
import { deleteRecord, saveRecord } from "../../../actions";

type P = { params: Promise<{ collection: string; id: string }> };

export default async function Edit({ params }: P) {
  const { collection, id: raw } = await params;
  const c = getCollection(collection);
  if (!c) notFound();
  const staff = await requireStaff(c.minRole ?? "editor");
  if (!staff) redirect(`/admin/${collection}`);
  const id = raw === "new" ? null : decodeURIComponent(raw);
  let initial: Record<string, unknown> = {};
  if (id) {
    const { data } = await staff.db.from(c.table).select("*").eq(c.pk, id).single();
    if (!data) notFound();
    initial = data;
  }
  const [svc, cats] = await Promise.all([
    staff.db.from("services").select("slug,title").order("sort_order"),
    staff.db.from("blog_categories").select("slug,name").order("name"),
  ]);
  const dynamicOptions = {
    services: (svc.data ?? []).map((s) => ({ value: s.slug, label: s.title })),
    blog_categories: (cats.data ?? []).map((s) => ({ value: s.slug, label: s.name })),
  };
  return (
    <>
      <Link href={`/admin/${c.key}`} className="text-sm text-charcoal/75 hover:text-plum">Back to {c.label.toLowerCase()}</Link>
      <h1 className="mb-8 mt-2 text-4xl">{id ? `Edit ${c.singular}` : `New ${c.singular}`}</h1>
      <RecordForm fields={c.fields} initial={initial} action={saveRecord.bind(null, c.key, id)} dynamicOptions={dynamicOptions} statusOptions={defaultStatusOptions} />
      {id && staff.role === "admin" && (
        <form action={deleteRecord.bind(null, c.key, id)} className="mt-10 border-t border-plum/10 pt-6">
          <ConfirmButton message={`Delete this ${c.singular}? This cannot be undone.`} className="text-sm text-[#A1321F] underline underline-offset-4">Delete this {c.singular} permanently</ConfirmButton>
        </form>
      )}
    </>
  );
}
