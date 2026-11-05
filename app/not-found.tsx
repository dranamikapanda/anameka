import Link from "next/link";
import { YantraLines } from "@/components/YantraLines";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-plum-deep px-6 text-center text-ivory">
      <YantraLines className="absolute h-[140vmin] w-[140vmin] animate-[spin_180s_linear_infinite] text-gold/15" />
      <div className="relative max-w-xl">
        <p className="font-display text-[clamp(6rem,18vw,11rem)] leading-none text-gold-light">404</p>
        <h1 className="mt-2 text-ivory">This page has moved or never existed</h1>
        <p className="mt-5 text-ivory/70">Check the address, or start again from one of these.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">Go to the home page</Link>
          <Link href="/services" className="btn-ghost-light">Browse services</Link>
          <Link href="/contact" className="btn-ghost-light">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
