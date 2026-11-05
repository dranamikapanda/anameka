import Link from "next/link";
import { YantraLines } from "./YantraLines";
import { env, formatPhone } from "@/lib/env";

export function CtaBand({ title = "Bring your questions. Leave with clarity.", body = "Consultations are available online and in person. Tell us what's on your mind and we'll find a time that suits you." }: { title?: string; body?: string }) {
  return (
    <section className="relative overflow-hidden bg-plum text-ivory">
      <YantraLines className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] text-gold/20" />
      <div className="container-x relative grid gap-10 py-20 md:grid-cols-12 md:items-end md:py-24">
        <div className="md:col-span-7">
          <h2 className="text-ivory">{title}</h2>
          <p className="mt-5 max-w-xl text-lg text-ivory/75">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:col-span-5 md:justify-end">
          <Link href="/book-consultation" className="btn-gold">Book a consultation</Link>
          <a href={`tel:${env.phone}`} className="btn-ghost-light">Call {formatPhone(env.phone)}</a>
        </div>
      </div>
    </section>
  );
}
