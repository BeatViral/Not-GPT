import type { NotGptAnswer } from "@/schemas/not-gpt";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function IncentiveAudit({ incentives }: { incentives: NotGptAnswer["audit"]["incentives"] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h3 className="text-lg font-semibold text-ink">Source incentives</h3>
      <div className="mt-4 space-y-3">
        {incentives.map((item) => (
          <article key={item.sourceId} className="rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap gap-2">
              <StatusBadge>{item.sourceType}</StatusBadge>
              <StatusBadge tone={item.incentive.includes("financial") ? "warn" : "info"}>
                {item.incentive}
              </StatusBadge>
            </div>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-ink/68">
              {item.observations.map((observation) => (
                <li key={observation}>{observation}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-ink/55">{item.uncertainty}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
