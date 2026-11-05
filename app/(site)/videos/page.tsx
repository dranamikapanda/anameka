import { PageHero } from "@/components/PageHero";
import { VideoGrid } from "@/components/VideoGrid";
import { EmptyState } from "@/components/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { getVideos } from "@/lib/data";
import { buildMetadata, videoSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/videos", title: "Video Gallery | Talks & Explainers | Dr. Anameka S Panda", description: "Videos from Dr. Anameka S Panda: talks, explainers on astrology, Vastu and graphology, and client video testimonials." });
}
export default async function Videos() {
  const items = await getVideos();
  return (
    <>
      {items.length > 0 && <JsonLd data={items.map(videoSchema)} />}
      <PageHero title="Video gallery" crumbs={[{ name: "Gallery", path: "/gallery" }, { name: "Videos", path: "/videos" }]} intro="Talks, explainers and interviews." />
      <section className="section"><div className="container-x">
        {items.length ? <VideoGrid items={items} /> : <EmptyState title="Videos coming soon" body="Talks and explainers will be published here." />}
      </div></section>
    </>
  );
}
