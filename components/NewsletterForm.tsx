"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("loading");
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: fd.get("email"), website: fd.get("website") }) }).catch(() => null);
    const j = await res?.json().catch(() => ({}));
    if (res?.ok) { setState("done"); track("newsletter_signup"); }
    else { setState("error"); setMsg(j?.error || "Subscription didn't go through. Check your connection and try again."); }
  }
  if (state === "done") return <p className={dark ? "text-gold-light" : "text-plum"} role="status">You're subscribed. The next letter will arrive in your inbox.</p>;
  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row" noValidate>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input id="nl-email" name="email" type="email" required placeholder="Your email address" autoComplete="email"
        className={dark ? "field border-gold/30 bg-white/5 text-ivory placeholder:text-ivory/70" : "field"} />
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button className="btn-gold shrink-0" disabled={state === "loading"}>{state === "loading" ? "Subscribing…" : "Subscribe"}</button>
      {state === "error" && <p className="err sm:basis-full" role="alert">{msg}</p>}
    </form>
  );
}
