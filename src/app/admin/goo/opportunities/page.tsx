import { AdminGate } from "@/components/goo/AdminGate";
import { AdminOpportunityEditor } from "@/components/goo/AdminOpportunityEditor";
import { listPublishedOpenOpportunities } from "@/services/goo/registry";

export default function AdminOpportunitiesPage() {
  return (
    <AdminGate>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminOpportunityEditor opportunities={listPublishedOpenOpportunities()} />
      </div>
    </AdminGate>
  );
}
