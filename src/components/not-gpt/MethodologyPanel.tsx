import { ShieldCheck, Split, Unplug, Workflow } from "lucide-react";

const protocol = [
  "Question interpretation",
  "Search-plan generation",
  "Diverse retrieval",
  "Source extraction",
  "Source classification",
  "Claim extraction",
  "Claim clustering and repetition removal",
  "Original evidence tracing",
  "Evidence-question match",
  "Contradiction search",
  "Uncertainty construction",
  "Structured answer generation"
];

export function MethodologyPanel() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-line bg-white p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck aria-hidden="true" className="mt-1 text-moss" size={22} />
          <div>
            <h2 className="text-xl font-semibold text-ink">Normal search experience. Abnormal standards underneath.</h2>
            <p className="mt-3 leading-7 text-ink/72">
              NOT GPT does not treat visibility as authority or repetition as proof. Every material conclusion must
              be traceable to source records, claim clusters and evidence-question matches.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-lg border border-line bg-white p-6">
        <div className="flex items-start gap-3">
          <Workflow aria-hidden="true" className="mt-1 text-signal" size={22} />
          <div>
            <h2 className="text-xl font-semibold text-ink">Evidence protocol</h2>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {protocol.map((stage, index) => (
                <li key={stage} className="rounded-lg border border-line bg-paper p-3 text-sm">
                  <span className="font-semibold text-signal">{index + 1}.</span> {stage}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-line bg-white p-6">
          <Split aria-hidden="true" className="text-rust" size={22} />
          <h2 className="mt-3 text-xl font-semibold text-ink">Source type is not incentive</h2>
          <p className="mt-3 leading-7 text-ink/72">
            A commercial source can contain useful evidence. An academic source can be weak or indirect. The
            system records both evidence quality and observable incentive, then lets the answer earn its shape.
          </p>
        </article>
        <article className="rounded-lg border border-line bg-white p-6">
          <Unplug aria-hidden="true" className="text-moss" size={22} />
          <h2 className="mt-3 text-xl font-semibold text-ink">GOO is separate</h2>
          <p className="mt-3 leading-7 text-ink/72">
            GOO is not part of the NOT GPT answer pipeline. It is an independent opportunity-discovery framework
            deployed within the same platform.
          </p>
        </article>
      </section>
    </div>
  );
}
