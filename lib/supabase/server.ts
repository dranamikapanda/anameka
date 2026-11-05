import "server-only";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { env, hasSupabase } from "@/lib/env";

/** Anonymous client for public, cacheable reads (respects RLS: published rows only). */
export function publicClient() {
  if (!hasSupabase) return null;
  return createClient(env.supabaseUrl, env.supabaseAnon, { auth: { persistSession: false } });
}

/** Cookie-bound client for the signed-in admin user (respects RLS by role). */
export async function sessionClient() {
  const store = await cookies();
  return createServerClient(env.supabaseUrl, env.supabaseAnon, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a Server Component */ }
      },
    },
  });
}

/** Service-role client. Server only. Used for inserting leads from validated API routes. */
export function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!hasSupabase || !key) return null;
  return createClient(env.supabaseUrl, key, { auth: { persistSession: false } });
}
