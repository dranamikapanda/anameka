import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { getLegal } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { cleanHtml } from "@/lib/sanitize";
import { formatDate } from "@/lib/utils";

const slugs = ["privacy-policy", "terms-and-conditions", "disclaimer", "cookie-policy", "cancellation-refund-policy"];
type P = { params: Promise<{ legal: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return slugs.map((legal) => ({ legal })); }
export async function generateMetadata({ params }: P) {
  const p = await getLegal((await params).legal);
  return p ? buildMetadata({ path: `/${p.slug}`, title: `${p.title} | Dr. Anameka S Panda`, description: `${p.title} for the website of Dr. Anameka S Panda.` }) : {};
}
export default async function Legal({ params }: P) {
  const p = await getLegal((await params).legal);
  if (!p) notFound();
  return (
    <>
      <PageHero title={p.title} crumbs={[{ name: p.title, path: `/${p.slug}` }]} intro={p.updated_at ? `Last updated ${formatDate(p.updated_at)}` : undefined} />
      <section className="section"><div className="container-x"><div className="prose-rich mx-auto max-w-prose" dangerouslySetInnerHTML={{ __html: cleanHtml(p.body) }} /></div></section>
    </>
  );
}
