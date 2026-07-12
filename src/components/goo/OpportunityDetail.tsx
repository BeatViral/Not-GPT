import type { GooOpportunity, GooProject } from "@/schemas/goo";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function OpportunityDetail({
  opportunity,
  project
}: {
  opportunity: GooOpportunity;
  project: GooProject | null;
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="good">{opportunity.status}</StatusBadge>
        <StatusBadge tone="info">{opportunity.opportunityType}</StatusBadge>
        <StatusBadge>{opportunity.placesRemaining} of {opportunity.placesTotal} places open</StatusBadge>
      </div>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink">{opportunity.title}</h1>
      {project && <p className="mt-2 text-lg font-medium text-moss">{project.name}</p>}
      <p className="mt-5 text-lg leading-8 text-ink/72">{opportunity.fullDescription}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-paper p-4">
          <h2 className="font-semibold text-ink">Why this opportunity exists</h2>
          <p className="mt-2 text-sm leading-6 text-ink/68">{opportunity.whyExists}</p>
        </div>
        <div className="rounded-lg border border-line bg-paper p-4">
          <h2 className="font-semibold text-ink">What happens after you express interest</h2>
          <p className="mt-2 text-sm leading-6 text-ink/68">{opportunity.afterInterest}</p>
        </div>
      </div>
    </section>
  );
}
