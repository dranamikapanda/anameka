"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/admin-auth";
import { getCollection, type Field } from "@/lib/admin/collections";
import { cleanHtml, cleanText } from "@/lib/sanitize";
import { readingMinutes, slugify } from "@/lib/utils";

export type ActionState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> } | undefined;

function coerce(f: Field, raw: FormDataEntryValue | null): unknown {
  const s = typeof raw === "string" ? raw : "";
  switch (f.type) {
    case "boolean": return raw === "on" || raw === "true";
    case "number": return s === "" ? null : Number(s);
    case "richtext": return cleanHtml(s);
    case "tags": return s.split(",").map((t) => cleanText(t).toLowerCase()).filter(Boolean);
    case "list": { try { const v = JSON.parse(s || "[]"); return Array.isArray(v) ? v.map((x) => typeof x === "string" ? cleanText(x) : Object.fromEntries(Object.entries(x).map(([k, val]) => [k, cleanText(String(val))]))).filter((x) => typeof x === "string" ? x : Object.values(x).some(Boolean)) : []; } catch { return []; } }
    case "slug": return slugify(s);
    case "datetime": return s ? new Date(s).toISOString() : null;
    case "date": return s || null;
    case "image": case "video": return /^(https:\/\/|\/(?!\/))/.test(s) ? s : null;
    default: return s === "" ? null : cleanText(s);
  }
}

export async function saveRecord(collectionKey: string, id: string | null, _prev: ActionState, fd: FormData): Promise<ActionState> {
  const c = getCollection(collectionKey);
  if (!c) return { error: "Unknown section." };
  const staff = await requireStaff(c.minRole ?? "editor");
  if (!staff) return { error: "You don't have permission to edit this. Ask an administrator for access." };

  const row: Record<string, unknown> = {};
  const fieldErrors: Record<string, string> = {};
  for (const f of c.fields) {
    const v = coerce(f, fd.get(f.name));
    if (f.required && f.type !== "boolean" && (v == null || v === "" || (Array.isArray(v) && !v.length))) fieldErrors[f.name] = `${f.label} is required`;
    if ((f.type === "image" || f.type === "video") && fd.get(f.name) && !v) fieldErrors[f.name] = "Use a secure https:// link or a site path starting with /";
    row[f.name] = v;
  }
  if ("permission_confirmed" in row && row.status === "published" && !row.permission_confirmed) fieldErrors.permission_confirmed = "Publishing requires confirmed client permission";
  if (c.key === "blog_posts") {
    row.reading_minutes = readingMinutes(String(row.body ?? ""));
    if (!row.publish_at) row.publish_at = new Date().toISOString();
    if (row.status === "scheduled" && new Date(String(row.publish_at)) <= new Date()) fieldErrors.publish_at = "Scheduled posts need a future date";
  }
  if (Object.keys(fieldErrors).length) return { error: "Some fields need attention.", fieldErrors };

  const q = id ? staff.db.from(c.table).update(row).eq(c.pk, id) : staff.db.from(c.table).insert(row);
  const { error } = await q;
  if (error) return { error: error.code === "23505" ? "That slug or path is already used. Choose another." : `Couldn't save: ${error.message}` };

  await staff.db.from("audit_log").insert({ actor: staff.user.id, action: id ? "update" : "create", entity: c.table, entity_id: String(row[c.pk] ?? id ?? "") });
  c.revalidate(row).forEach((p) => revalidatePath(p));
  revalidatePath(`/admin/${c.key}`);
  redirect(`/admin/${c.key}?saved=1`);
}

export async function deleteRecord(collectionKey: string, id: string) {
  const c = getCollection(collectionKey);
  const staff = c && await requireStaff("admin");
  if (!c || !staff) throw new Error("Only administrators can delete content.");
  const { data } = await staff.db.from(c.table).select("*").eq(c.pk, id).single();
  await staff.db.from(c.table).delete().eq(c.pk, id);
  await staff.db.from("audit_log").insert({ actor: staff.user.id, action: "delete", entity: c.table, entity_id: id });
  if (data) c.revalidate(data).forEach((p) => revalidatePath(p));
  redirect(`/admin/${c.key}?deleted=1`);
}

export async function updateEnquiry(id: string, fd: FormData) {
  const staff = await requireStaff("editor");
  if (!staff) throw new Error("Not allowed");
  const status = String(fd.get("status"));
  if (!["new", "contacted", "scheduled", "completed", "closed", "spam"].includes(status)) throw new Error("Invalid status");
  await staff.db.from("enquiries").update({ status, admin_notes: cleanText(String(fd.get("admin_notes") ?? "")) }).eq("id", id);
  revalidatePath("/admin/enquiries"); revalidatePath("/admin");
}

export async function saveSettings(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const staff = await requireStaff("admin");
  if (!staff) return { error: "Only administrators can change site settings." };
  const keys = ["name", "tagline", "heroHeadline", "heroSubheading", "shortBio", "serviceArea", "hours", "logoUrl", "portraitUrl", "ogImageUrl"];
  const value = Object.fromEntries(keys.map((k) => [k, cleanText(String(fd.get(k) ?? ""))]));
  const { error } = await staff.db.from("site_settings").upsert({ key: "global", value });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function setRole(userId: string, fd: FormData) {
  const staff = await requireStaff("admin");
  if (!staff) throw new Error("Not allowed");
  const role = String(fd.get("role"));
  if (!["admin", "editor", "viewer"].includes(role) || userId === staff.user.id) throw new Error("Invalid change");
  await staff.db.from("profiles").update({ role }).eq("id", userId);
  revalidatePath("/admin/users");
}

export async function signOut() {
  const staff = await requireStaff("viewer");
  await staff?.db.auth.signOut();
  redirect("/admin/login");
}
