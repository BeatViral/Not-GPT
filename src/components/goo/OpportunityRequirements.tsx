import type { GooOpportunity } from "@/schemas/goo";

export function OpportunityRequirements({ opportunity }: { opportunity: GooOpportunity }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h2 className="text-xl font-semibold text-ink">Requirements</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Panel title="Required capabilities" items={opportunity.requiredCapabilities} />
        <Panel title="Preferred capabilities" items={opportunity.preferredCapabilities} />
        <Panel title="Organisation types" items={opportunity.organisationTypes} />
        <Panel title="Individual roles" items={opportunity.individualRoles} />
        <Panel title="Excluded fits" items={opportunity.excludedFits} />
        <div className="rounded-lg border border-line bg-paper p-4">
          <h3 className="font-semibold text-ink">Geography</h3>
          <p className="mt-2 text-sm leading-6 text-ink/65">{opportunity.geography.notes}</p>
        </div>
      </div>
    </section>
  );
}

function Panel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <h3 className="font-semibold text-ink">{title}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink/65">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
