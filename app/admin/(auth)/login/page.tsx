import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { hasSupabase } from "@/lib/env";
export const metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export default function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-3xl border border-gold/30 bg-ivory p-8 shadow-soft">
        <Logo /><h1 className="mt-8 text-3xl">Sign in to manage the website</h1>
        <div className="mt-8"><LoginForm configured={hasSupabase} /></div>
      </div>
    </main>
  );
}
