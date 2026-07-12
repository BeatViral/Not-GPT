import { GooDirectory } from "@/components/goo/GooDirectory";
import { GooHero } from "@/components/goo/GooHero";
import { listPublishedOpenOpportunities, listPublishedProjects } from "@/services/goo/registry";

export default function GooPage() {
  const projects = listPublishedProjects();
  const opportunities = listPublishedOpenOpportunities();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <GooHero />
      <div className="mt-10">
        <GooDirectory projects={projects} opportunities={opportunities} />
      </div>
    </div>
  );
}
