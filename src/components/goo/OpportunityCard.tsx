import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import type { GooOpportunity, GooProject } from "@/schemas/goo";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function OpportunityCard({
  opportunity,
  project
}: {
  opportunity: GooOpportunity;
  project?: GooProject | null;
}) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft-line">
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="good">{opportunity.status}</StatusBadge>
        <StatusBadge tone="info">{opportunity.opportunityType}</StatusBadge>
        <StatusBadge>{opportunity.placesRemaining} place{opportunity.placesRemaining === 1 ? "" : "s"}</StatusBadge>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-ink">{opportunity.title}</h2>
      {project && <p className="mt-1 text-sm font-medium text-moss">{project.name}</p>}
      <p className="mt-2 text-sm leading-6 text-ink/68">{opportunity.shortSummary}</p>
      <div className="mt-4 grid gap-2 text-sm text-ink/65 sm:grid-cols-2">
        <div className="rounded-lg bg-paper p-3">
          <span className="block font-semibold text-ink">Requires</span>
          {opportunity.requiredCapabilities.slice(0, 3).join(", ")}
        </div>
        <div className="rounded-lg bg-paper p-3">
          <span className="block font-semibold text-ink">Geography</span>
          {opportunity.geography.remote ? "Remote eligible" : opportunity.geography.regions.join(", ")}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href={`/goo/opportunities/${opportunity.slug}`}
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-paper hover:bg-ink/90"
        >
          Inspect opportunity
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
        <Link
          href={`/api/goo/opportunities/${opportunity.slug}`}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:bg-ink/5"
        >
          <Code2 aria-hidden="true" size={16} />
          JSON
        </Link>
      </div>
    </article>
  );
}
