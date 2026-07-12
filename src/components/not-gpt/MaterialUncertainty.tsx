import type { NotGptAnswer } from "@/schemas/not-gpt";

export function MaterialUncertainty({
  uncertainties
}: {
  uncertainties: NotGptAnswer["materialUncertainties"];
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">What remains uncertain</h2>
      <div className="mt-4 divide-y divide-line">
        {uncertainties.map((uncertainty) => (
          <article key={uncertainty.id} className="py-4 first:pt-0 last:pb-0">
            <h3 className="font-semibold text-ink">{uncertainty.text}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/68">{uncertainty.whyItMatters}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
