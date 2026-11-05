import { PageHero } from "@/components/PageHero";
import { ProgrammeCard } from "@/components/ProgrammeCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getProgrammes } from "@/lib/data";
import { buildMetadata, webPageSchema } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({ path: "/programmes", title: "Programmes for Students, Parents & Teachers | Dr. Anameka S Panda", description: "Exam Ready From the Inside, Student Inner Excellence, Child Script Coach and Handwriting Mastery: Anameka S Panda's programmes for students, parents and teachers." });
}
const groups = [["students", "For students and parents"], ["teachers", "For teachers and schools"], ["business", "For business owners"], ["families", "For individuals and families"]] as const;

export default async function Programmes() {
  const all = await getProgrammes();
  return (
    <>
      <JsonLd data={webPageSchema("/programmes", "Programmes", "Programmes by Anameka S Panda for students, parents and teachers")} />
      <PageHero title="Programmes" crumbs={[{ name: "Programmes", path: "/programmes" }]}
        intro="Structured programmes that bring handwriting analysis, coaching and a calm daily routine to the people who shape a child's learning: students, parents and teachers." />
      <section className="section"><div className="container-x space-y-20">
        {groups.map(([k, label]) => {
          const list = all.filter((p) => p.audience_key === k);
          if (!list.length) return null;
          return (
            <div key={k}>
              <h2 className="mb-10">{label}</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProgrammeCard key={p.slug} p={p} />)}</div>
            </div>
          );
        })}
      </div></section>
      <CtaBand title="Not sure which programme fits?" body="Tell us about your child, your class or your school, and we'll suggest the right starting point." />
    </>
  );
}
