import { notFound } from "next/navigation";
import { AgentPermissionsPanel } from "@/components/goo/AgentPermissionsPanel";
import { CommercialTermsPanel } from "@/components/goo/CommercialTermsPanel";
import { InterestForm } from "@/components/goo/InterestForm";
import { OpportunityDetail } from "@/components/goo/OpportunityDetail";
import { OpportunityRequirements } from "@/components/goo/OpportunityRequirements";
import { OpportunitySchemaViewer } from "@/components/goo/OpportunitySchemaViewer";
import { getOpportunityBySlug, getProjectById } from "@/services/goo/registry";

export default function GooOpportunityPage({ params }: { params: { slug: string } }) {
  const opportunity = getOpportunityBySlug(params.slug);
  if (!opportunity) {
    notFound();
  }

  const project = getProjectById(opportunity.projectId);

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
      <div className="space-y-6">
        <OpportunityDetail opportunity={opportunity} project={project} />
        <OpportunityRequirements opportunity={opportunity} />
        <CommercialTermsPanel opportunity={opportunity} />
        <AgentPermissionsPanel opportunity={opportunity} />
        <OpportunitySchemaViewer opportunity={opportunity} />
      </div>
      <div>
        <InterestForm opportunity={opportunity} />
      </div>
    </div>
  );
}
