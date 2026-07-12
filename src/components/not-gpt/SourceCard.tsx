import { ExternalLink } from "lucide-react";
import type { NotGptAnswer } from "@/schemas/not-gpt";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function SourceCard({ source }: { source: NotGptAnswer["sourceHighlights"][number] }) {
  return (
    <article className="rounded-lg border border-line bg-paper p-4">
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="neutral">{source.sourceCategory}</StatusBadge>
        <StatusBadge tone={source.incentiveCategory.includes("financial") ? "warn" : "info"}>
          {source.incentiveCategory}
        </StatusBadge>
      </div>
      <h3 className="mt-3 text-base font-semibold text-ink">
        <a href={source.url} className="inline-flex items-center gap-2 hover:text-signal">
          {source.title}
          <ExternalLink aria-hidden="true" size={15} />
        </a>
      </h3>
      <p className="mt-1 text-sm text-ink/55">
        {source.publisher} · {formatDate(source.date)}
      </p>
      <p className="mt-3 text-sm leading-6 text-ink/68">{source.whyUsed}</p>
    </article>
  );
}
