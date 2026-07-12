import type { Contradiction } from "@/schemas/not-gpt";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ContradictionAudit({ contradictions }: { contradictions: Contradiction[] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h3 className="text-lg font-semibold text-ink">Contradictions and limits</h3>
      <div className="mt-4 space-y-3">
        {contradictions.map((contradiction) => (
          <article key={contradiction.claim} className="rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone={contradiction.quality === "limited" ? "warn" : "info"}>
                {contradiction.quality}
              </StatusBadge>
              <span className="text-sm text-ink/55">{contradiction.sourceIds.join(", ")}</span>
            </div>
            <h4 className="mt-3 font-semibold text-ink">{contradiction.claim}</h4>
            <p className="mt-2 text-sm leading-6 text-ink/65">{contradiction.interpretation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
