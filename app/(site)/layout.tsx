import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { getSettings, getSocial } from "@/lib/data";
import { organizationSchema, personSchema, websiteSchema } from "@/lib/seo";

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [s, social] = await Promise.all([getSettings(), getSocial()]);
  const sameAs = social.map((x) => x.url);
  return (
    <>
      <JsonLd data={[personSchema(s.name, s.portraitUrl || undefined, sameAs), organizationSchema(s.name, s.logoUrl || undefined, sameAs), websiteSchema(s.name)]} />
      <Navbar logoUrl={s.logoUrl} />
      <main id="main" className="overflow-x-clip w-full max-w-full relative">{children}</main>
      <Footer />
      <FloatingActions />
      <Analytics />
    </>
  );
}
