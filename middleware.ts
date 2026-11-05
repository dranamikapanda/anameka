import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/** Refreshes the Supabase session and keeps signed-out visitors out of /admin. */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = req.nextUrl.pathname === "/admin/login";
  if (!url || !key) return isLogin ? res : NextResponse.redirect(new URL("/admin/login", req.url));
  const db = createServerClient(url, key, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)),
    },
  });
  const { data: { user } } = await db.auth.getUser();
  if (!user && !isLogin) return NextResponse.redirect(new URL("/admin/login", req.url));
  if (user && isLogin) return NextResponse.redirect(new URL("/admin", req.url));
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
