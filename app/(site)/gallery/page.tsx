import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { EmptyState } from "@/components/EmptyState";
import { getGallery } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/gallery", title: "Gallery | Events, Workshops & Photographs | Dr. Anameka S Panda", description: "Photographs of Dr. Anameka S Panda's work: events, workshops, consultations, achievements and media coverage." });
}
export default async function Gallery() {
  const items = await getGallery();
  return (
    <>
      <PageHero
        badge="Visual Archive"
        title="Consultation & Event Gallery"
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        intro="Photographs from consultations, workshops, keynote speaking events, and media appearances with Dr. Anameka S Panda."
        ctaHref="/videos"
        ctaText="Watch Video Sessions"
        showWhatsAppCta
      />
      <section className="section"><div className="container-x">
        {items.length ? <GalleryGrid items={items} /> : <EmptyState title="Photographs coming soon" body="Images from events, workshops and consultations will be added here." />}
      </div></section>
    </>
  );
}
