"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { browserClient } from "@/lib/supabase/browser";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    const { error } = await browserClient().auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
    setBusy(false);
    if (error) return setErr("That email and password don't match an admin account.");
    router.replace("/admin"); router.refresh();
  }
  if (!configured) return <p className="rounded-xl bg-cream p-4 text-sm text-plum">Supabase isn't configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment, then restart. See docs/SETUP.md.</p>;
  return (
    <form onSubmit={submit} className="space-y-5">
      <div><label htmlFor="email" className="label">Email</label><input id="email" name="email" type="email" required autoComplete="username" className="field" /></div>
      <div><label htmlFor="password" className="label">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className="field" /></div>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn-plum w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
