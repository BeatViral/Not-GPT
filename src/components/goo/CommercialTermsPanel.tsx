import type { GooOpportunity } from "@/schemas/goo";

export function CommercialTermsPanel({ opportunity }: { opportunity: GooOpportunity }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h2 className="text-xl font-semibold text-ink">Commercial terms and trust</h2>
      <dl className="mt-4 grid gap-3 md:grid-cols-3">
        <Term label="Model" value={opportunity.commercialModel.model} />
        <Term label="Fees" value={opportunity.commercialModel.fees} />
        <Term label="Sponsorship" value={opportunity.commercialModel.sponsorship} />
      </dl>
      <p className="mt-4 rounded-lg border border-line bg-paper p-4 text-sm leading-6 text-ink/68">
        {opportunity.terms.summary}
      </p>
    </section>
  );
}

function Term({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <dt className="text-sm font-semibold text-ink">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-ink/65">{value}</dd>
    </div>
  );
}
