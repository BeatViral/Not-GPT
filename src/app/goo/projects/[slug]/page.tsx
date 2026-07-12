import { notFound } from "next/navigation";
import { OpportunityCard } from "@/components/goo/OpportunityCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { getOpportunitiesForProject, getProjectBySlug } from "@/services/goo/registry";

export default function GooProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    notFound();
  }

  const opportunities = getOpportunitiesForProject(project.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-line bg-white p-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge tone="info">{project.category}</StatusBadge>
          <StatusBadge>{project.stage}</StatusBadge>
        </div>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink">{project.name}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/72">{project.fullDescription}</p>
        <p className="mt-4 text-sm text-ink/55">Operator: {project.operator}</p>
      </section>
      <section className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">Open roles</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Published opportunities</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
