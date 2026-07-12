import { Bot, ShieldCheck } from "lucide-react";
import type { GooOpportunity } from "@/schemas/goo";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function AgentPermissionsPanel({ opportunity }: { opportunity: GooOpportunity }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <div className="flex items-start gap-3">
        <Bot aria-hidden="true" className="mt-1 text-signal" size={22} />
        <div>
          <h2 className="text-xl font-semibold text-ink">Agent permissions</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge tone={opportunity.agentPermissions.discoverable ? "good" : "danger"}>
              Discoverable
            </StatusBadge>
            <StatusBadge tone={opportunity.agentPermissions.maySubmitInterest ? "good" : "danger"}>
              Interest allowed
            </StatusBadge>
            <StatusBadge tone="warn">Human confirmation required</StatusBadge>
            <StatusBadge tone="danger">No binding term acceptance</StatusBadge>
          </div>
          <p className="mt-4 flex gap-2 text-sm leading-6 text-ink/68">
            <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-moss" size={17} />
            Agents may discover this opportunity and help prepare a confirmed expression of interest. They cannot
            accept terms, award a role or create a binding commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
