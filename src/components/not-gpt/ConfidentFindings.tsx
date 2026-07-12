import type { NotGptAnswer } from "@/schemas/not-gpt";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ConfidentFindings({ findings }: { findings: NotGptAnswer["confidentFindings"] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">What we can say confidently</h2>
      <div className="mt-4 space-y-3">
        {findings.map((finding) => (
          <article key={finding.id} className="rounded-lg border border-line bg-paper p-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone={finding.supportLevel === "moderate" ? "good" : "info"}>
                {finding.supportLevel}
              </StatusBadge>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
                {finding.sourceIds.length} source link{finding.sourceIds.length === 1 ? "" : "s"}
              </span>
            </div>
            <p className="mt-3 leading-7 text-ink/78">{finding.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
