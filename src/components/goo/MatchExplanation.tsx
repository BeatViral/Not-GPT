import type { GooMatchResult } from "@/schemas/goo";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function MatchExplanation({ result }: { result: GooMatchResult }) {
  return (
    <article className="rounded-lg border border-line bg-paper p-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge tone={result.eligible ? "good" : "danger"}>
          {result.eligible ? "eligible" : "excluded"}
        </StatusBadge>
        <span className="text-sm font-semibold text-signal">{result.score}/100</span>
        <span className="text-sm text-ink/55">{result.opportunityId}</span>
      </div>
      {result.hardFilters.length > 0 && (
        <List title="Hard filters" items={result.hardFilters} />
      )}
      {result.matchReasons.length > 0 && (
        <List title="Match reasons" items={result.matchReasons} />
      )}
      {result.missingData.length > 0 && (
        <List title="Missing data" items={result.missingData} />
      )}
      {result.exclusions.length > 0 && (
        <List title="Exclusions" items={result.exclusions} />
      )}
    </article>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-3">
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-ink/65">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
