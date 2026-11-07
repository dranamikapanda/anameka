import { PageHero } from "@/components/PageHero";
import { ProgrammesBrowser } from "@/components/ProgrammesBrowser";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getProgrammes } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    path: "/programmes",
    title: "Signature Programmes | Students, Parents & Educators | Dr. Anameka S Panda",
    description:
      "Exam Ready From the Inside, Student Inner Excellence, Child Script Coach and Handwriting Mastery: Structured signature programmes by Dr. Anameka S Panda.",
  });
}

export default async function Programmes() {
  const all = await getProgrammes();

  return (
    <>
      <JsonLd
        data={webPageSchema(
          "/programmes",
          "Programmes",
          "Signature programmes by Dr. Anameka S Panda for students, parents, educators and professionals"
        )}
      />

      <PageHero
        title="Signature Programmes"
        badge="Transformational Curriculums"
        crumbs={[{ name: "Programmes", path: "/programmes" }]}
        intro="Structured, transformative multi-week mentoring journeys that bring handwriting analysis, nervous system regulation, and focus habits to learners, parents, and educators."
      />

      <section className="section bg-ivory">
        <div className="container-x">
          <ProgrammesBrowser programmes={all} />
        </div>
      </section>

      <CtaBand
        title="Looking for a custom workshop for your institution?"
        body="Dr. Anameka conducts specialized faculty training and student workshops for leading schools, colleges, and corporate organizations across India and abroad."
      />
    </>
  );
}
