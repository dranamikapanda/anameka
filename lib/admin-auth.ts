import "server-only";
import { sessionClient } from "@/lib/supabase/server";
import { hasSupabase } from "@/lib/env";

export type Role = "admin" | "editor" | "viewer";
/** Returns the signed-in staff user and role, or null. Every admin route and action calls this. */
export async function requireStaff(min: "editor" | "admin" | "viewer" = "editor") {
  if (!hasSupabase) return null;
  const db = await sessionClient();
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;
  const { data } = await db.from("profiles").select("role, full_name").eq("id", user.id).single();
  const role = (data?.role ?? "viewer") as Role;
  const rank = { viewer: 0, editor: 1, admin: 2 };
  if (rank[role] < rank[min]) return null;
  return { user, role, name: data?.full_name ?? user.email, db };
}
